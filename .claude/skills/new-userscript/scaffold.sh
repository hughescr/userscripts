#!/usr/bin/env bash
#
# scaffold.sh — deterministically scaffold a new userscript folder in this monorepo.
#
# Usage:
#   scaffold.sh <slug> <name> <description> <match> [<match> ...]
#
#   <slug>         kebab-case folder/file name, e.g. "youtube-tidy"
#   <name>         human-readable @name,    e.g. "YouTube Tidy"
#   <description>  one-line @description,   e.g. "Hides Shorts from the YouTube home feed."
#   <match...>     one or more @match URL patterns, e.g. "https://www.youtube.com/*"
#
# Creates <repo>/<slug>/<slug>.user.js and <repo>/<slug>/README.md from the
# bundled templates, substituting placeholders. Does NOT clobber an existing folder.

set -euo pipefail

# -----------------------------------------------------------------------------
# Resolve paths robustly. This script lives at:
#   <repo>/.claude/skills/new-userscript/scaffold.sh
# so the repo root is three directories up from the script's own directory.
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="${SCRIPT_DIR}/templates"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"

SCRIPT_TMPL="${TEMPLATES_DIR}/script.user.js.tmpl"
README_TMPL="${TEMPLATES_DIR}/README.md.tmpl"

# -----------------------------------------------------------------------------
# Argument parsing & validation.
# -----------------------------------------------------------------------------
if [ "$#" -lt 4 ]; then
    echo "Error: too few arguments." >&2
    echo "Usage: scaffold.sh <slug> <name> <description> <match> [<match> ...]" >&2
    exit 2
fi

SLUG="$1"
NAME="$2"
DESCRIPTION="$3"
shift 3
# Remaining positional args ("$@") are the one-or-more @match patterns.

# Slug must be kebab-case: lowercase alphanumerics, single hyphens between groups.
if ! printf '%s' "$SLUG" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$'; then
    echo "Error: slug '$SLUG' is not kebab-case (^[a-z0-9]+(-[a-z0-9]+)*\$)." >&2
    echo "       Use lowercase letters, digits, and single hyphens, e.g. 'youtube-tidy'." >&2
    exit 2
fi

if [ ! -f "$SCRIPT_TMPL" ] || [ ! -f "$README_TMPL" ]; then
    echo "Error: template(s) missing under ${TEMPLATES_DIR}." >&2
    exit 1
fi

DEST_DIR="${REPO_ROOT}/${SLUG}"
if [ -e "$DEST_DIR" ]; then
    echo "Error: '${DEST_DIR}' already exists — refusing to clobber." >&2
    exit 1
fi

# -----------------------------------------------------------------------------
# Build MATCH_BLOCK from the trailing match args: one aligned `// @match` line each.
# The alignment (spaces after @match) matches the rest of the metadata block.
# -----------------------------------------------------------------------------
MATCH_BLOCK=""
for pattern in "$@"; do
    line="// @match        ${pattern}"
    if [ -z "$MATCH_BLOCK" ]; then
        MATCH_BLOCK="$line"
    else
        MATCH_BLOCK="${MATCH_BLOCK}
${line}"
    fi
done

# -----------------------------------------------------------------------------
# Render a template -> destination, substituting placeholders.
# We use awk with placeholder VALUES passed in via env (-v can't carry newlines
# safely), and do literal (non-regex) string replacement so slashes, ampersands,
# and other regex-special characters in URLs/descriptions are handled correctly.
# MATCH_BLOCK may contain newlines; awk's ENVIRON values preserve them.
# -----------------------------------------------------------------------------
render() {
    src="$1"
    dst="$2"
    SUB_NAME="$NAME" \
    SUB_DESCRIPTION="$DESCRIPTION" \
    SUB_SLUG="$SLUG" \
    SUB_MATCH_BLOCK="$MATCH_BLOCK" \
    awk '
        function repl(s, from, to,    out, idx) {
            out = ""
            idx = index(s, from)
            while (idx > 0) {
                out = out substr(s, 1, idx - 1) to
                s = substr(s, idx + length(from))
                idx = index(s, from)
            }
            return out s
        }
        {
            line = $0
            line = repl(line, "{{NAME}}",        ENVIRON["SUB_NAME"])
            line = repl(line, "{{DESCRIPTION}}", ENVIRON["SUB_DESCRIPTION"])
            line = repl(line, "{{SLUG}}",        ENVIRON["SUB_SLUG"])
            line = repl(line, "{{MATCH_BLOCK}}", ENVIRON["SUB_MATCH_BLOCK"])
            print line
        }
    ' "$src" > "$dst"
}

# -----------------------------------------------------------------------------
# Create the folder and render both files.
# -----------------------------------------------------------------------------
mkdir -p "$DEST_DIR"
render "$SCRIPT_TMPL" "${DEST_DIR}/${SLUG}.user.js"
render "$README_TMPL" "${DEST_DIR}/README.md"

# -----------------------------------------------------------------------------
# Report next steps.
# -----------------------------------------------------------------------------
INSTALL_URL="https://raw.githubusercontent.com/hughescr/userscripts/main/${SLUG}/${SLUG}.user.js"
INDEX_ROW="| [${SLUG}](${SLUG}/) | ${DESCRIPTION} | [Install](${INSTALL_URL}) |"

cat <<EOF

Scaffolded '${SLUG}' successfully.

Created:
  ${DEST_DIR}/${SLUG}.user.js
  ${DEST_DIR}/README.md

Next steps:
  1. Implement the process() TODO in ${SLUG}/${SLUG}.user.js
     (pick a stable selector for your target elements and inject your UI).
  2. Add this row to the "## Scripts" table in the root README.md:

       ${INDEX_ROW}

  3. Commit on the 'develop' branch and merge 'develop' -> 'main' to release.
     Bump the @version (semver) on every subsequent change you want shipped.
  4. Tampermonkey auto-updates installed clients by polling @updateURL on 'main':
       ${INSTALL_URL}

EOF
