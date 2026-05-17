#!/usr/bin/env bash
# Print Gumroad product asset paths for a given year and reveal them in Finder.
#
# Order matches Gumroad's cover/carousel layout:
#   1) OG poster (1200x630)  → main cover
#   2-4) Per-theme yearly preview PNGs (editorial/mono/pixel) → carousel
#
# Usage:
#   scripts/gumroad-assets.sh 2027            # print paths + open Finder
#   scripts/gumroad-assets.sh 2027 --print    # print paths only
#
# Assumes you've run `pnpm generate:custom --year=YEAR` so the preview PNGs
# exist under apps/generator/generated/.

set -euo pipefail

YEAR="${1:?Usage: $0 <year> [--print]}"
shift || true
PRINT_ONLY=0
if [[ "${1:-}" == "--print" ]]; then PRINT_ONLY=1; fi

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"

OG="$ROOT/apps/frontend/public/og/calendar-$YEAR-editorial.png"

assets=("$OG")
for theme in editorial mono pixel; do
  # Use English / Monday-start / default style as the canonical preview.
  p="$ROOT/apps/generator/generated/$theme/$YEAR/a4/en/monday-start/simple/yearly/preview/portrait/calendar.png"
  assets+=("$p")
done

missing=0
for f in "${assets[@]}"; do
  if [[ -f "$f" ]]; then
    echo "✓ $f"
  else
    echo "✗ MISSING: $f"
    missing=1
  fi
done

if (( missing == 1 )); then
  echo
  echo "Run \`pnpm generate:custom --year=$YEAR --locale=en\` to populate missing previews."
  exit 1
fi

if (( PRINT_ONLY == 0 )); then
  echo
  echo "Opening Finder…"
  open -R "${assets[0]}"
fi
