// ==UserScript==
// @name         Bluesky Thread Unroller
// @namespace    https://github.com/hughescr/userscripts
// @version      1.0.0
// @description  Adds an "Unroll thread" link to each bsky.app post, just left of Save, that opens the post on tbsky.app.
// @author       Craig R. Hughes
// @match        https://bsky.app/*
// @icon         https://tbsky.app/static/threadskyicon.png
// @run-at       document-idle
// @noframes
// @homepageURL  https://github.com/hughescr/userscripts/tree/main/bsky-unroller
// @supportURL   https://github.com/hughescr/userscripts/issues
// @downloadURL  https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js
// @updateURL    https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js
// @grant        none
// @license      Apache-2.0
// ==/UserScript==

/*
 * Bluesky Thread Unroller
 * =======================
 *
 * Adds a small, theme-matched "Unroll thread" link immediately to the LEFT of
 * the native Save (bookmark) button on every bsky.app post. It is a REAL anchor
 * (<a href>) pointing at the same post on https://tbsky.app, which renders the
 * whole thread unrolled. Because it is a genuine link, the browser handles clicks
 * natively:
 *   - Left-click       -> navigate to tbsky in the SAME tab.
 *   - Middle-click /
 *     Cmd-click        -> open tbsky in a new (background) tab.
 *   - Right-click      -> the native context menu ("Open Link in New Tab", etc.).
 * We deliberately set NO `target` attribute, so the browser's default per-click
 * behavior is preserved. The href is (re)computed from the live DOM just before
 * each activation (pointerdown/mousedown/focus) so it always points at THIS post.
 *
 * THE tbsky.app URL SCHEME (verified against a real post):
 *   tbsky.app's scheme is literally "prepend the letter 't' to any bsky.app URL".
 *   So  bsky.app/profile/<handle>/post/<rkey>
 *   ->  tbsky.app/profile/<handle>/post/<rkey>
 *   Verified live: https://tbsky.app/profile/jay.bsky.team/post/3mnzowafx4c2a -> HTTP 200.
 *   Because the host swap keeps the exact same path, we only ever need the
 *   canonical path "/profile/<handle>/post/<rkey>" and concatenate it onto
 *   "https://tbsky.app". This is NOT a coincidence -- it is tbsky's documented scheme.
 *
 * WHY THIS SCRIPT IS TIGHTLY COUPLED TO bsky's DOM:
 *   bsky.app is a react-native-web SPA. Its css-* / r-* atomic class names are
 *   NOT stable across builds, so we key off `data-testid` attributes ONLY (those
 *   ARE stable). Every selector below is derived from live-DOM recon. If bsky
 *   restructures these testids, the script simply no-ops -- it never throws and
 *   never breaks the page.
 *
 * CSP NOTE (verified 2026-06-15):
 *   bsky.app currently sends NO Content-Security-Policy header and NO CSP <meta>.
 *   So an injected <style> element and innerHTML SVG would both work today.
 *   For future-proofing (and lint cleanliness) we nonetheless:
 *     - build the SVG via createElementNS (not innerHTML), and
 *     - set the link's box styles via element.style.setProperty (JS-set inline
 *       styles are NOT subject to a future `style-src` directive).
 *   The one <style> element we inject for :hover WOULD break under a future
 *   `style-src` without 'unsafe-inline'; if that ever happens, move the hover
 *   highlight to JS pointerenter/pointerleave handlers. Documented here so the
 *   fix path is obvious.
 */

(() => {
    'use strict';

    // ---------------------------------------------------------------------------
    // Constants
    // ---------------------------------------------------------------------------

    // Where the unrolled thread lives. Host-swap target per the "prepend t" scheme.
    const TBSKY_ORIGIN = 'https://tbsky.app';

    // Class on OUR injected button -- used for hover styling + sibling detection.
    const BTN_CLASS = 'bsky-unroller-btn';

    // Informational marker we set on the native bookmark button once processed.
    // NOTE: this is NOT used as a query filter (that would defeat re-heal -- see
    // the scan() comments). It exists only as a debugging breadcrumb.
    const MARK_ATTR = 'data-bsky-unroller';

    // Stable anchor: the native Save/bookmark button. Everything keys off this.
    const BOOKMARK_SELECTOR = '[data-testid="postBookmarkBtn"]';

    // Fallback theme color (bsky light-theme bookmark icon = #667B99) used only if
    // we cannot read the sibling icon's computed color at insert time.
    const FALLBACK_THEME_COLOR = 'rgb(102, 123, 153)';

    // ---------------------------------------------------------------------------
    // One-time hover stylesheet
    // ---------------------------------------------------------------------------

    /**
     * Inject a tiny scoped stylesheet for OUR link only. bsky drives its own
     * hover via JS (no CSS :hover), so we add a subtle circular background
     * highlight that reads correctly on light/dim/dark themes (neutral grey-alpha,
     * not the theme color). Runs exactly once.
     *
     * Safari hardening: target (document.head || document.documentElement) and
     * null-guard, because under some early-injection models document.head may not
     * exist yet.
     */
    function injectStyles() {
        try {
            const root = document.head || document.documentElement;
            if (!root) {
                return;
            }
            // Idempotent: never inject the stylesheet twice.
            if (document.getElementById('bsky-unroller-style')) {
                return;
            }
            const style = document.createElement('style');
            style.id = 'bsky-unroller-style';
            style.textContent = [
                '.' + BTN_CLASS + ' { transition: background-color .12s ease; }',
                '.' + BTN_CLASS + ':hover { background-color: rgba(120,120,120,0.12) !important; }',
                '.' + BTN_CLASS + ':active { background-color: rgba(120,120,120,0.20) !important; }',
                '.' + BTN_CLASS + ':focus-visible { outline: 2px solid currentColor; outline-offset: 1px; }'
            ].join('\n');
            root.appendChild(style);
        } catch (e) {
            // Never throw out of init; a missing hover highlight is cosmetic.
        }
    }

    // ---------------------------------------------------------------------------
    // Canonical-URL helpers
    // ---------------------------------------------------------------------------

    /**
     * Strip a bsky post href down to its canonical path
     * "/profile/<handle>/post/<rkey>", discarding any trailing sub-route such as
     * /reposted-by, /quotes, /liked-by and any ?query / #hash. Returns null if the
     * string is not a post path.
     */
    function canon(path) {
        if (!path) {
            return null;
        }
        const m = path.match(/^(\/profile\/[^/]+\/post\/[^/?#]+)/);
        return m ? m[1] : null;
    }

    /**
     * Resolve an <a> element to a clean pathname.
     *
     * We deliberately use `new URL(a.href).pathname` rather than
     * a.getAttribute('href'):
     *   - a.href is always absolute-resolved by the DOM, so a raw .href would
     *     never match our ^-anchored /^\/profile/ regex.
     *   - .pathname gives the path with the origin stripped, which is exactly what
     *     canon() expects, and handles both relative ("/profile/...") and absolute
     *     ("https://bsky.app/profile/...") authored hrefs uniformly.
     *   - .pathname URL-encodes some characters, but bsky handles/rkeys are drawn
     *     from [a-zA-Z0-9._:-], none of which get encoded, so this is safe.
     */
    function pathOf(a) {
        try {
            return new URL(a.href).pathname;
        } catch (e) {
            return null;
        }
    }

    function canonicalPathFor(bookmarkBtn) {
        // Climb from the bookmark button outward. At the FIRST ancestor that contains a
        // qualifying post link appearing BEFORE the button in DOM order, return that
        // post's canonical path. This is deliberately CONTAINER-AGNOSTIC: it does NOT
        // depend on feedItem-by-/postThreadItem-by- wrappers, because some views (notably
        // SEARCH RESULTS under #searchScreen, and certain embeds) render posts without
        // any such testid'd container. Climbing stops at the post's own card before it
        // can reach sibling posts, and "nearest-preceding" selection guarantees we pick
        // THIS post's link, never an earlier sibling's.
        //
        // Verified live (2026-06-15): home feed + search results 253/253 resolved (P1);
        // a post thread 49/49 resolved (48 P1 + the FOCUSED post via P2), the focused
        // post correctly yielding its own canonical path (stat-link suffix stripped).
        let node = bookmarkBtn.parentElement;
        while (node && node !== document.body) {
            // Links in this subtree that appear BEFORE the bookmark button. The
            // timestamp / stat links live above the action bar; restricting to
            // "preceding" also drops the NEXT post if we ever climb past our own card.
            const links = [];
            for (const a of node.querySelectorAll('a[href*="/post/"]')) {
                if ((a.compareDocumentPosition(bookmarkBtn) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
                    links.push(a);
                }
            }

            // P1 -- TIMESTAMP link: canonical (raw === canon(raw), i.e. no /reposted-by
            // etc. sub-route) AND a non-null aria-label containing a digit (the localized
            // date, e.g. "June 15, 2026 at 9:34 AM"). A quoted embed's link has a null
            // aria-label, so it is skipped here. We keep the LAST match in DOM order
            // (nearest-preceding) so we bind to THIS post's timestamp, not a sibling's.
            let p1 = null;
            for (const a of links) {
                const raw = pathOf(a);
                const c = canon(raw);
                if (c && raw === c) {
                    const label = a.getAttribute('aria-label');
                    if (label && /\d/.test(label)) {
                        p1 = c;
                    }
                }
            }
            if (p1) {
                return p1;
            }

            // P2 -- FOCUSED thread post: it has NO timestamp link, only stat links
            // (/post/<rkey>/reposted-by | /quotes | /liked-by). canon() strips the
            // suffix to recover the focused post's canonical path.
            let p2 = null;
            for (const a of links) {
                const raw = pathOf(a);
                if (raw && /\/post\/[^/]+\/(reposted-by|quotes|liked-by)/.test(raw)) {
                    const c = canon(raw);
                    if (c) {
                        p2 = c;
                    }
                }
            }
            if (p2) {
                return p2;
            }

            node = node.parentElement;
        }
        // Nothing resolvable -> caller no-ops (never opens a broken tab).
        return null;
    }

    // ---------------------------------------------------------------------------
    // Icon + link construction
    // ---------------------------------------------------------------------------

    const SVG_NS = 'http://www.w3.org/2000/svg';

    /**
     * Build the inline "unroll thread" icon as real SVG DOM (not innerHTML, for
     * CSP future-proofing). 18x18 in a 0 0 24 24 viewBox to sit inside the 28px
     * box with 5px padding, matching the native bookmark icon.
     *
     * Glyph: a stacked-list (three horizontal lines) with a downward chevron
     * beneath it -- reads as "expand / unroll the thread". Stroked with
     * currentColor so it inherits the theme color from the link.
     *
     * aria-hidden + focusable="false" so screen readers announce only the
     * link's aria-label, not the SVG.
     */
    function buildIcon() {
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('width', '18');
        svg.setAttribute('height', '18');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');

        // Three stacked list lines (the rolled-up thread).
        const lines = [
            ['4', '5', '20', '5'],
            ['4', '9', '20', '9'],
            ['4', '13', '14', '13']
        ];
        for (const [x1, y1, x2, y2] of lines) {
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            svg.appendChild(line);
        }

        // Downward chevron (the "unroll / expand" motion).
        const chevron = document.createElementNS(SVG_NS, 'polyline');
        chevron.setAttribute('points', '8 16 12 20 16 16');
        svg.appendChild(chevron);

        return svg;
    }

    /**
     * Build the <a>. A REAL anchor lets the browser handle clicks natively:
     * left-click navigates in the SAME tab, middle-click / Cmd-click open a new
     * (background) tab, and right-click yields the native "Open Link in New Tab"
     * context menu. We deliberately set NO `target` attribute so the browser's
     * per-click default is preserved (a `target="_blank"` would force a new tab on
     * every click, which we do NOT want). `rel="noopener noreferrer"` hardens any
     * new-tab open against reverse-tabnabbing / referrer leakage.
     *
     * Box styles are set via style.setProperty (JS-set inline styles dodge any
     * future `style-src` CSP) to mirror the native bookmark button exactly.
     * 'text-decoration':'none' suppresses the default anchor underline.
     */
    function buildLink(themeColor) {
        const link = document.createElement('a');
        link.className = BTN_CLASS;
        link.setAttribute('aria-label', 'Unroll thread on tbsky.app');
        link.title = 'Unroll thread on tbsky.app';
        // No target => left-click stays in this tab; middle/Cmd-click natively
        // open a new tab. noopener/noreferrer harden any new-tab open.
        link.setAttribute('rel', 'noopener noreferrer');

        // Mirror the native bookmark button's 28x28 circular transparent box.
        // (28px deliberately matches native bsky; it is below the 44x44 WCAG
        // touch-target guideline, but visual consistency with the native control
        // wins here -- the native Save button is also 28px.)
        const box = {
            'width': '28px',
            'height': '28px',
            'padding': '5px',
            'border-radius': '999px',
            'display': 'inline-flex',
            'flex-direction': 'row',
            'justify-content': 'center',
            'align-items': 'center',
            'gap': '4px',
            'background-color': 'rgba(0,0,0,0)',
            'background-image': 'none',
            'border': '0',
            'outline': '0',
            'margin': '0',
            'cursor': 'pointer',
            'box-sizing': 'border-box',
            // Anchors underline by default; suppress it.
            'text-decoration': 'none',
            // currentColor source for the SVG; theme-matched at insert time.
            'color': themeColor || FALLBACK_THEME_COLOR
        };
        for (const prop in box) {
            if (Object.prototype.hasOwnProperty.call(box, prop)) {
                link.style.setProperty(prop, box[prop]);
            }
        }

        link.appendChild(buildIcon());
        return link;
    }

    // ---------------------------------------------------------------------------
    // Injection + re-heal
    // ---------------------------------------------------------------------------

    /**
     * Process a single native bookmark button: insert our link immediately
     * before it (joining the right-hand action group and inheriting its 8px gap),
     * unless our link is already present.
     *
     * Idempotency / re-heal: React may re-render the action bar and DROP our
     * injected sibling while keeping the bookmark button. So we never trust a
     * marker alone -- we check whether our sibling actually still exists:
     *   - PRIMARY O(1) check: previousElementSibling is our link (we always
     *     insert immediately before the bookmark button). This keys off BTN_CLASS,
     *     which is set on the <a>, so it recognizes our element fine.
     *   - FALLBACK: a scoped query of the parent for our class (covers the rare
     *     case where React reordered siblings).
     * If our link is gone, we (re)insert it. This makes MARK_ATTR purely
     * informational, never a correctness dependency.
     */
    function processBookmarkButton(bookmarkBtn) {
        try {
            if (!bookmarkBtn || !bookmarkBtn.isConnected) {
                return;
            }

            // O(1) already-present check: our link is always the immediate
            // previous sibling when present.
            const prev = bookmarkBtn.previousElementSibling;
            if (prev && prev.classList && prev.classList.contains(BTN_CLASS)) {
                bookmarkBtn.setAttribute(MARK_ATTR, '1');
                return;
            }

            // Fallback presence check (handles a sibling reorder).
            const parent = bookmarkBtn.parentElement;
            if (parent && parent.querySelector(':scope > .' + BTN_CLASS)) {
                bookmarkBtn.setAttribute(MARK_ATTR, '1');
                return;
            }

            // Read the theme color from the sibling bookmark icon at insert time
            // so our icon matches light/dim/dark, then bake it into our link's
            // inline color. LIMITATION: this is a one-time snapshot. A re-heal
            // re-reads it, but a re-heal only fires on a childList mutation. So a
            // theme toggle recolors us ONLY if it re-renders the action bar
            // (childList change); a pure CSS-variable/class swap on the existing
            // nodes would NOT trigger us and our icon would keep the old color
            // until the next action-bar re-render. Cosmetic, low impact.
            const sibSvg = bookmarkBtn.querySelector('svg');
            const themeColor = sibSvg
                ? getComputedStyle(sibSvg).color
                : FALLBACK_THEME_COLOR;

            const link = buildLink(themeColor);

            // Recompute the href from the LIVE DOM and stamp it on the anchor.
            // canonicalPathFor() reflects the current post under this button, so
            // resolving it just before activation keeps the link correct even
            // after React re-renders / SPA navigation. A transient null must
            // NEVER blank a previously-good href, so on null we leave href as-is.
            function refreshHref() {
                try {
                    const path = canonicalPathFor(bookmarkBtn);
                    if (path) {
                        link.href = TBSKY_ORIGIN + path;
                    }
                    // path === null -> keep the existing href untouched.
                } catch (e) {
                    // Never throw -- keep whatever href we already had.
                }
            }

            // Set the initial href immediately.
            refreshHref();

            // Two handler shapes, both of which NEVER call preventDefault (that
            // would cancel the browser's native navigation / new-tab behavior --
            // the whole point of using a real anchor):
            //   - stopOnly        : just stopPropagation, so bsky's post-card
            //                       click handlers can't hijack the interaction.
            //   - refreshAndStop  : refresh the href from the live DOM FIRST
            //                       (the press fires before navigation, so this
            //                       guarantees we navigate to THIS post), then
            //                       stopPropagation.
            const stopOnly = function (ev) {
                ev.stopPropagation();
            };
            const refreshAndStop = function (ev) {
                refreshHref();
                ev.stopPropagation();
            };

            // Press-phase events fire BEFORE the click/navigation: refresh + stop.
            // (One combined handler per event -- no duplicate listeners.)
            link.addEventListener('pointerdown', refreshAndStop);
            link.addEventListener('mousedown', refreshAndStop);
            // Keyboard activation focuses first; capture so we refresh early.
            link.addEventListener('focus', refreshHref, true);
            // click + auxclick (middle-click): stop bsky from hijacking, but let
            // the browser perform its native navigation / new-tab open.
            link.addEventListener('click', stopOnly);
            link.addEventListener('auxclick', stopOnly);

            // Insert just to the LEFT of Save (joins the right action group).
            bookmarkBtn.before(link);
            bookmarkBtn.setAttribute(MARK_ATTR, '1');
        } catch (e) {
            // Never throw -- the observer will retry on the next mutation.
        }
    }

    /**
     * Scan the whole document for native bookmark buttons and (re)process each.
     *
     * IMPORTANT: we scan ALL [data-testid="postBookmarkBtn"] -- we do NOT filter
     * by the marker attribute. Filtering by ":not([data-bsky-unroller])" would
     * defeat re-heal: a button React kept (marked) but whose sibling React dropped
     * would be skipped forever. processBookmarkButton() decides per-button via the
     * sibling-presence check, so re-running over everything is correct and cheap
     * (the present-button path is O(1) and inserts nothing).
     *
     * SELF-TRIGGER NOTE: our own bookmarkBtn.before(btn) is a childList mutation,
     * which re-fires the observer and schedules one more scan. That follow-up scan
     * finds our sibling already present and inserts nothing -> no new mutation ->
     * the loop terminates. It is self-limiting, NOT infinite.
     */
    function scan() {
        const buttons = document.querySelectorAll(BOOKMARK_SELECTOR);
        for (const bm of buttons) {
            processBookmarkButton(bm);
        }
    }

    // rAF-coalesced debounce: collapse the burst of mutations from a single feed
    // render into one scan, run after layout, and self-throttle in background tabs
    // (rAF is paused when the tab is hidden -- acceptable: hidden tabs need no
    // visible buttons; they appear on refocus).
    let scanScheduled = false;
    function scheduleScan() {
        if (scanScheduled) {
            return;
        }
        scanScheduled = true;
        requestAnimationFrame(() => {
            scanScheduled = false;
            try {
                scan();
            } catch (e) {
                // swallow -- observer will fire again on the next mutation
            }
        });
    }

    // ---------------------------------------------------------------------------
    // Bootstrap
    // ---------------------------------------------------------------------------

    function init() {
        // Double-init guard. @grant none shares the page's window, so we avoid a
        // window global (page-script collision risk) and use a dataset flag on
        // <html> instead. If init somehow runs twice (loader quirk), the second
        // run no-ops -- preventing duplicate observers / double scans.
        try {
            if (document.documentElement.dataset.bskyUnroller) {
                return;
            }
            document.documentElement.dataset.bskyUnroller = '1';
        } catch (e) {
            // If we can't set the flag, proceed once anyway.
        }

        injectStyles();
        scan();

        // One observer on the whole document subtree. We watch childList only
        // (NOT attributes) -- like/bookmark toggles are attribute changes and
        // would be pure noise. React adding/removing action-bar subtrees and SPA
        // route changes are childList mutations we catch here.
        try {
            const observer = new MutationObserver(scheduleScan);
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        } catch (e) {
            // Without an observer we still injected once on initial scan; the page
            // remains fully functional, just no late re-heal.
        }
    }

    // @run-at document-idle usually means the DOM is ready, but guard for both
    // loaders/timings to be safe.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
