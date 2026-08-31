#!/usr/bin/env sh
#
# Per-client scaffolding helper for the config-driven site template.
#
# Copies the current working tree into a brand-new client folder, excluding
# generated and Version-Control directories, and initialises a fresh git
# history so the client project starts clean. Run this from the repo root
# after you have pulled the latest working branch.
#
# Usage:
#   ./scripts/create-client.sh                 # prompts for a folder name
#   ./scripts/create-client.sh studio-slug     # or pass it as an argument
#
# Afterwards:
#   cd <folder>
#   npm install
#   # edit src/config/studio.ts, swap public/images/, then build & deploy
#   npm run build

set -eu

TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  printf 'New client folder name (e.g. studio-name): '
  read -r TARGET
fi
[ -n "$TARGET" ] || { echo "error: a target folder name is required" >&2; exit 1; }
[ -e "$TARGET" ] && { echo "error: '$TARGET' already exists" >&2; exit 1; }

# Snapshot top-level entries BEFORE creating the target folder: the `for item`
# loop globs the working tree, and if it ran after `mkdir` it would pick up the
# (now-existing) target and try to copy it into itself, which `cp` refuses and
# `set -e` would turn into a hard failure.
set -- ./* ./.[!.]*

mkdir -p "$TARGET"

# Copy everything except heavy/generated dirs and Version-Control state.
for item do
  [ -e "$item" ] || continue
  base="${item#./}"
  case "$base" in
    node_modules|dist|.git|*.tsbuildinfo) continue ;;
  esac
  cp -R "$item" "$TARGET/"
done

# Fresh client projects start with their own git history.
git -C "$TARGET" init -q
git -C "$TARGET" add -A
git -C "$TARGET" commit -q -m "chore: scaffold client site from template"

printf '\nCreated client project at: %s\n' "$TARGET"
printf 'Next steps:\n'
printf '  1. cd %s\n' "$TARGET"
printf '  2. npm install\n'
printf '  3. Edit src/config/studio.ts (studioName, tagline, city, whatsapp,\n'
printf '     instagram, address, hours, artists, portfolio, services, faq, theme).\n'
printf '  4. Replace public/images/ with the client photos (same file names, or\n'
printf '     re-point the config image paths).\n'
printf '  5. npm run build  &&  npx tsc --noEmit\n'