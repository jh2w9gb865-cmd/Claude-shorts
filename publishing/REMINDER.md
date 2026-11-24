# What to do when an upload reminder fires

A reminder names a **slug**, a **version** (`Short` or `Regular`) and the upload **time** (Yerevan).
Reply to the owner in **Armenian**. Files live in `publishing/<slug>/`.

| Version | Video | Image | Subtitles | Section of `<slug>.md` | Composition |
|---|---|---|---|---|---|
| Short | `<slug>-short.mp4` | `<slug>-cover.jpg` | `<slug>-short.en.srt` | "YouTube Shorts" | `<Id>Short` |
| Regular | `<slug>-16x9.mp4` | `<slug>-thumbnail-1280x720.jpg` | `<slug>.en.srt` | "YouTube — regular video (16:9)" | `<Id>Wide` |

`<Id>` is the `id` field of `cartoon/src/songs/<slug>.json`.

1. **Check the video exists.** If the container was replaced and it's missing, re-render it (the audio and specs are in git):
   ```bash
   cd /home/user/Claude-shorts/cartoon && [ -d node_modules ] || npm ci
   npx remotion render <Id><Short|Wide> raw.mp4 --is-production=false \
     --jpeg-quality=95 --audio-bitrate=320k --crf=14 \
     --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
   ffmpeg -y -i raw.mp4 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a copy -movflags +faststart ../publishing/<slug>/<video> && rm raw.mp4
   ```
   If the image, subtitles or `.md` are missing too, run `tools/render_song.sh <slug>` (it rebuilds everything, ~10 min).
   If a render will take a while, send the text message (step 3) first and the files after.
2. **Send the files** with SendUserFile, status `"proactive"`: video, image, subtitles.
3. **Message**: "upload in ~15 min (<time>)", then paste ready-to-copy blocks (Title, Description, Tags, Settings) from the right section of `publishing/<slug>/<slug>.md`.
   For a Regular upload, also remind them to set it as the same song's Short's **Related video** once it's live.
