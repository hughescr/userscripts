---
name: new-userscript
description: Scaffold, create, or add a new Tampermonkey userscript in this monorepo. Use when the user wants to start a new userscript / browser script folder here — collects a slug, name, description, and @match pattern(s), then runs the bundled scaffold.sh to pre-wire all repo conventions (metadata block, SPA starter, README).
---

# new-userscript

Scaffolds a new userscript folder in this monorepo, pre-wired with every repo
convention so the user can jump straight to implementing behavior.

## When to use

Use this whenever the user wants to **start / create / add a new userscript** in
this repo. Each script lives in its own folder: `<slug>/<slug>.user.js` plus
`<slug>/README.md`. This skill creates both from templates and wires up the
correct `@namespace`, `@homepageURL`, `@downloadURL`/`@updateURL` (raw `main`
URLs), `@license Apache-2.0`, and a self-healing SPA DOM starter.

## Invocation contract

Collect these four inputs from the user (ask via the normal flow if any are
missing — do not guess):

1. **slug** — kebab-case folder/file name, e.g. `youtube-tidy`.
2. **name** — human-readable `@name`, e.g. `YouTube Tidy`.
3. **description** — one-line `@description`.
4. **match(es)** — one or more `@match` URL patterns, e.g. `https://www.youtube.com/*`.

## Steps

1. **Run the scaffolder** (deterministic — do NOT hand-write the files):

   ```
   bash .claude/skills/new-userscript/scaffold.sh <slug> "<name>" "<description>" "<match>" [more matches...]
   ```

   It validates the slug is kebab-case, refuses to clobber an existing folder,
   renders both files, and prints next steps including the exact README index row.

2. **Add the index row** the script printed to the `## Scripts` table in the root
   `README.md`. The row format is:

   ```
   | [<slug>](<slug>/) | <description> | [Install](https://raw.githubusercontent.com/hughescr/userscripts/main/<slug>/<slug>.user.js) |
   ```

3. **Tell the user the remaining work:**
   - Implement the `process()` TODO in `<slug>/<slug>.user.js` — pick a stable
     selector (prefer `data-testid` / `aria-*` / `role` over framework class
     names) and inject the desired UI/behavior.
   - **Releasing:** work on `develop`; bump `@version` (semver) for any change
     you want shipped; merge `develop` -> `main`. The raw `main` URL is what
     installed clients poll.
   - **Auto-update:** Tampermonkey polls `@updateURL` on `main`, compares
     `@version`, and rolls out updates automatically.

## Notes

- The starter is intentionally generic (a throttled MutationObserver +
  idempotent `process()` for dynamic React/SPA sites). It no-ops safely until the
  `process()` TODO is filled in.
- If the user later wants a `@version` bump or release, that is a normal git
  edit + merge, not this skill.
