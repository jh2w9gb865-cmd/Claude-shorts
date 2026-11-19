# Claude Shorts — kids' cartoon songs for YouTube

Animated 2D cartoon songs for kids (ages 2–6), made with Remotion (`cartoon/`) and
songs from ElevenLabs Music. **Audience: English-speaking (US/UK). All on-screen
text, lyrics, titles and metadata are in English.** The owner talks to Claude in
Armenian or Russian; reply in the language they write in.

**Platform: YouTube only** (no TikTok/Instagram).

## Every video ships as a full package

For **every** new cartoon, produce all of the following without being asked:

1. **Short**: 9:16, 1080×1920 (`layout="portrait"`).
2. **Regular video**: 16:9, 1920×1080 (`layout="landscape"`).
3. **Thumbnails**: 1280×720 JPG for the regular video, and a 9:16 cover frame for the Short.
4. **Metadata**, separately for the Short and the regular video:
   - title (≤100 chars; the Short title ends with `#shorts`),
   - description (hook, what kids learn, full lyrics, age range, subscribe call, 3–5 hashtags),
   - tags (comma-separated, ≤500 chars),
   - settings (Made for kids = Yes, category Education, language English).
5. **English subtitles**: an `.srt` file timed to the vocals (one per video; both versions share timing).
6. Character names and a one-line description of each new character.

Put the package in `publishing/<slug>/`: the metadata in `<slug>.md` and the subtitles in
`<slug>.en.srt`, alongside the cover and thumbnail images. Rendered `.mp4` files are
gitignored, so send them to the user directly.

## ElevenLabs credits are scarce

- Generate **one** song per request. Only make another version if the user rejects it.
- Prefer `composition_plan` with `model_id: "music_v2_5"` (chunks with `text`,
  `duration_ms`, `positive_styles`, `negative_styles`) so the lyrics are sung exactly.
- Don't spend credits on transcription; get line timings from audio analysis
  (tempo and vocal energy) as was done for `veggie-squad`.

## Rendering in the cloud container

- Remotion can't download its browser here. Pass
  `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Fonts are bundled in `cartoon/public/fonts/` because the headless browser can't load Google Fonts through the proxy.
- `npx remotion render VeggieCartoon …` makes the Short, and `VeggieCartoonWide …` makes the regular video.

## Style

Bright, saturated colors, thick dark outlines (`#2b1a3d`), cute faces (blinking, talking
mouths, cheeks), characters that wave and dance on the beat, sparkles, rainbow and
confetti in the chorus. Text uses Nunito Black with a white outline and rainbow letters.
