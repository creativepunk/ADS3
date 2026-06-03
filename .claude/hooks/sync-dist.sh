#!/usr/bin/env bash
# PostToolUse hook: keep each package's compiled dist/ in sync with its source
# after an Edit/Write. Reads the hook payload (JSON on stdin) to find the edited
# file, then rebuilds only the affected package.
#
# Tokens note: the package `build` script runs `figma:sync`, which OVERWRITES
# tokens/*.json from the Figma export. We deliberately do NOT call it here —
# instead we regenerate dist non-destructively (`sd:build` for token JSON,
# plain `tsc` emit for src), so auto-rebuild never clobbers local token edits.
set -uo pipefail

R="/Users/pushpal/ADS3"

f=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)
[ -z "$f" ] && exit 0
cd "$R" || exit 0

case "$f" in
  "$R"/packages/components/src/*)     pkg="@my-ds/components"; cmd=(pnpm --filter @my-ds/components build) ;;
  "$R"/packages/react/src/*)          pkg="@my-ds/react";      cmd=(pnpm --filter @my-ds/react build) ;;
  "$R"/packages/tokens/src/*)         pkg="@my-ds/tokens";     cmd=(pnpm --filter @my-ds/tokens exec -- tsc -p tsconfig.json) ;;
  "$R"/packages/tokens/tokens/*.json) pkg="@my-ds/tokens";     cmd=(pnpm --filter @my-ds/tokens sd:build) ;;
  *) exit 0 ;;  # not a build-relevant source file
esac

if out=$("${cmd[@]}" 2>&1); then
  exit 0
fi

# Build failed (often a transient mid-edit state). Surface it so a stale dist
# is never silent — but exit 0 so the edit itself is not blocked.
jq -nc --arg pkg "$pkg" --arg out "$(printf '%s' "$out" | tail -20)" \
  '{systemMessage: ("⚠️ Auto-build failed for " + $pkg + " — dist may be stale until the next successful build:\n" + $out)}'
exit 0
