# userscripts

A monorepo for all of Craig's userscripts — small, dependency-free browser
scripts that add quality-of-life features to sites I use. Each script lives in
its own folder with its own README and a self-contained `*.user.js` file. No
build step, no bundler, just vanilla JS.

## Scripts

| Script | Description | Install |
| --- | --- | --- |
| [bsky-unroller](bsky-unroller/) | Adds an "Unroll thread" button to bsky.app posts that opens the post on tbsky.app. | [Install](https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js) |

## Installing a userscript

These scripts target **Safari with [Tampermonkey](https://www.tampermonkey.net/)**,
but they're plain userscripts and work equally well with:

- The free **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)**
  Safari extension, and
- **Tampermonkey on Chrome** (and other Chromium browsers).

To install any script:

1. Install a userscript manager (Tampermonkey or the Userscripts extension) and
   enable it for the relevant site.
2. Click the script's **Install** link in the table above — this opens the raw
   `.user.js` file on GitHub.
3. Your userscript manager detects the `.user.js` URL and offers to install it.
   Confirm the install.

That's it — reload the target site and the script is active.

## How auto-update works

Each script's metadata block declares `@downloadURL` and `@updateURL` pointing at
the **raw `main` URL** on GitHub, for example:

```
https://raw.githubusercontent.com/hughescr/userscripts/main/bsky-unroller/bsky-unroller.user.js
```

- **Installing** is just opening that raw URL — your userscript manager reads the
  metadata and installs it.
- **Updating** is automatic: Tampermonkey periodically polls each script's
  `@updateURL`, compares the `@version` it finds there against the installed
  version, and prompts (or silently applies, depending on your settings) when a
  newer version ships.

## Development & release model

- **`develop`** — all work happens here. Edit scripts, iterate, test against the
  live site.
- **`main`** — the release branch. The raw `main` URLs are what every installed
  client polls, so anything merged to `main` goes live to users.

To ship an update:

1. Make changes on `develop`.
2. **Bump `@version`** (semver) in the affected script's metadata block. This is
   what triggers clients to auto-update — without a version bump, Tampermonkey
   won't pick up the change.
3. Merge `develop` → `main`. Tampermonkey polls `@updateURL`, sees the higher
   `@version`, and rolls the update out to clients.

## License

[Apache-2.0](LICENSE) © 2026 Craig R. Hughes.
