#!/usr/bin/env bash
# Render the full YouTube package for one engine song:
#   publishing/<slug>/<slug>-short.mp4, <slug>-16x9.mp4, <slug>-cover.jpg, <slug>-thumbnail-1280x720.jpg, .srt, .md
# Usage: tools/render_song.sh <slug>
set -euo pipefail
slug="$1"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
B=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
P="$ROOT/publishing/$slug"
mkdir -p "$P"
cd "$ROOT/cartoon"
id=$(python3 -I -c "import json,sys;print(json.load(open('src/songs/$slug.json'))['id'])")
# frame for stills: the "HOORAY" moment of the outro, or the middle of the last chorus for calm songs
still=$(python3 -I - "$slug" <<'EOF'
import json, sys
s = json.load(open(f"src/songs/{sys.argv[1]}.json"))
at = 0; marks = []
for sec in s["sections"]:
    n = round(sec["ms"] / 1000 * 30); marks.append((sec["kind"], at, at + n)); at += n
outro = [m for m in marks if m[0] == "outro"]
chor = [m for m in marks if m[0] == "chorus"]
print(outro[0][1] + 12 if outro else (chor[-1][1] + chor[-1][2]) // 2)
EOF
)
cover=$(python3 -I - "$slug" <<'EOF'
import json, sys
s = json.load(open(f"src/songs/{sys.argv[1]}.json"))
at = 0
for sec in s["sections"]:
    n = round(sec["ms"] / 1000 * 30)
    if sec["kind"] == "chorus":
        print(at + n // 2); break
    at += n
EOF
)
common=(--is-production=false --browser-executable="$B" --log=error)
vq=(--jpeg-quality=95 --audio-bitrate=320k)
npx remotion render "${id}Short" "$P/raw-short.mp4" "${common[@]}" "${vq[@]}" --crf=14 --concurrency=4
ffmpeg -v error -y -i "$P/raw-short.mp4" -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p -c:a copy -movflags +faststart "$P/$slug-short.mp4"
rm -f "$P/raw-short.mp4"
npx remotion render "${id}Wide" "$P/raw-wide.mp4" "${common[@]}" "${vq[@]}" --crf=14 --concurrency=4
ffmpeg -v error -y -i "$P/raw-wide.mp4" -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p -c:a copy -movflags +faststart "$P/$slug-16x9.mp4"
rm -f "$P/raw-wide.mp4"
npx remotion still "${id}Short" "$P/$slug-cover.jpg" --frame="$cover" --image-format=jpeg --jpeg-quality=95 "${common[@]}"
npx remotion still "${id}Wide" "$P/$slug-thumbnail-1280x720.jpg" --frame="$still" --scale=0.6667 --image-format=jpeg --jpeg-quality=95 "${common[@]}"
cd "$ROOT" && python3 -I tools/song.py package "$slug"
echo "DONE $slug $(du -sh "$P" | cut -f1)"
