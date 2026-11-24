#!/usr/bin/env python3
"""Song pipeline for Sunny Sprouts.

  python3 -I tools/song.py plan <slug>      # print the ElevenLabs composition plan
  python3 -I tools/song.py generate <slug>  # ONE ElevenLabs request -> mp3, writes durationFrames into the spec
  python3 -I tools/song.py package <slug>   # subtitles (.srt) + YouTube metadata (.md) into publishing/<slug>/

Specs live in cartoon/src/songs/<slug>.json.
"""
import json
import os
import shutil
import subprocess
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, "cartoon", "src", "songs")
FPS = 30

BASE_STYLES = [
    "happy children's song",
    "upbeat kids pop",
    "bright cheerful lead vocal",
    "120 bpm",
    "clear simple lyrics, every word easy to hear",
    "hand claps",
    "great production quality",
]
CALM_STYLES = [
    "gentle children's lullaby",
    "soft warm female vocal",
    "music box and soft piano",
    "slow 80 bpm feel",
    "clear simple lyrics, every word easy to hear",
    "great production quality",
]


def load(slug):
    with open(os.path.join(SPECS, f"{slug}.json")) as fh:
        return json.load(fh)


def save(slug, spec):
    with open(os.path.join(SPECS, f"{slug}.json"), "w") as fh:
        json.dump(spec, fh, indent=2, ensure_ascii=False)
        fh.write("\n")


def plan(spec):
    calm = spec.get("mood") == "calm"
    base = (CALM_STYLES if calm else BASE_STYLES) + spec.get("styles", [])
    chunks = []
    for i, s in enumerate(spec["sections"]):
        name = {"intro": "Intro", "verse": "Verse", "chorus": "Chorus", "bridge": "Bridge", "outro": "Outro"}[s["kind"]]
        lines = s.get("lines", [])
        text = f"[{name}]" + ("\n" + "\n".join(lines) if lines else "")
        pos = list(base) if i == 0 else []
        neg = ["sad", "dark", "explicit"]
        if s["kind"] == "intro":
            pos += ["short instrumental intro before the vocals start", "catchy melody hook"]
        elif s["kind"] == "chorus":
            pos += ["catchy sing-along chorus", "kids choir backing vocals", "energetic" if not calm else "soft and dreamy"]
        elif s["kind"] == "verse":
            pos += ["playful verse", "same lead vocal"]
        elif s["kind"] == "bridge":
            pos += ["fun bridge", "same lead vocal"]
        elif s["kind"] == "outro":
            pos += ["short happy ending, big final shout" if not calm else "soft fade-out ending"]
        chunks.append(
            {"text": text, "duration_ms": s["ms"], "positive_styles": pos, "negative_styles": neg, "context_adherence": "high" if i else "medium"}
        )
    return {"model_id": "music_v2_5", "composition_plan": {"chunks": chunks}}


def generate(slug):
    spec = load(slug)
    body = json.dumps(plan(spec)).encode()
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128",
        data=body,
        headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=600) as r:
        audio = r.read()
    if len(audio) < 10000:
        raise SystemExit(f"unexpected response: {audio[:300]!r}")
    os.makedirs(os.path.join(ROOT, "songs"), exist_ok=True)
    out = os.path.join(ROOT, "songs", f"{slug}.mp3")
    with open(out, "wb") as fh:
        fh.write(audio)
    pub = os.path.join(ROOT, "cartoon", "public", "audio", f"{slug}.mp3")
    shutil.copy(out, pub)
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).decode().strip())
    spec["audio"] = f"audio/{slug}.mp3"
    spec["durationFrames"] = int(round(dur * FPS))
    save(slug, spec)
    print(f"{slug}: {dur:.1f}s -> {out}")


def timeline(spec):
    at = 0
    out = []
    for s in spec["sections"]:
        start = at
        end = at + round(s["ms"] / 1000 * FPS)
        at = end
        lines = s.get("lines", [])
        sing = start + round(s.get("delayMs", 0) / 1000 * FPS)
        step = (end - sing) / max(1, len(lines))
        out.append((s, start, end, [(round(sing + i * step), round(sing + (i + 1) * step), t) for i, t in enumerate(lines)]))
    return out


def ts(frames):
    ms = round(frames / FPS * 1000)
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def mmss(frames):
    s = int(frames / FPS)
    return f"{s // 60}:{s % 60:02}"


def srt(spec):
    cues = []
    for s, a, b, lines in timeline(spec):
        if s["kind"] == "intro":
            cues.append((a, b, "♪ [Upbeat music] ♪" if spec.get("mood") != "calm" else "♪ [Gentle music] ♪"))
        elif lines and lines[0][0] > a + 30:
            cues.append((a, lines[0][0], "♪ [Music] ♪"))
        for la, lb, text in lines:
            cues.append((la, lb, f"♪ {text} ♪"))
    return "\n".join(f"{i}\n{ts(a)} --> {ts(min(b, spec['durationFrames']))}\n{t}\n" for i, (a, b, t) in enumerate(cues, 1))


def lyrics_text(spec):
    out = []
    for s in spec["sections"]:
        if s.get("lines"):
            out.append("\n".join(s["lines"]))
    # collapse repeated choruses for readability
    seen, uniq = set(), []
    for block in out:
        if block in seen:
            continue
        seen.add(block)
        uniq.append(block)
    return "\n\n".join(uniq)


def short_end(spec):
    tl = timeline(spec)
    for s, a, b, _ in tl:
        if s["kind"] == "chorus":
            return min(spec["durationFrames"], b + 20)
    return tl[min(2, len(tl) - 1)][2]


def package(slug):
    spec = load(slug)
    m = spec["meta"]
    pub = os.path.join(ROOT, "publishing", slug)
    os.makedirs(pub, exist_ok=True)
    with open(os.path.join(pub, f"{slug}.en.srt"), "w") as fh:
        fh.write(srt(spec))
    # The Short is the beginning of the song, so its subtitles are the same cues cut at the Short's end.
    end = short_end(spec)
    short_cues = [c for c in srt(spec).strip().split("\n\n") if c]
    keep = []
    for c in short_cues:
        lines = c.split("\n")
        a = lines[1].split(" --> ")[0]
        h, mi, rest = a.split(":")
        sec, ms = rest.split(",")
        start = (int(h) * 3600 + int(mi) * 60 + int(sec)) * FPS + int(ms) * FPS // 1000
        if start < end - 15:
            keep.append("\n".join([str(len(keep) + 1)] + lines[1:]))
    with open(os.path.join(pub, f"{slug}-short.en.srt"), "w") as fh:
        fh.write("\n\n".join(keep) + "\n")

    lyr = lyrics_text(spec)
    cast = "\n".join(f"- {c['emoji']} **{c['name']}**: {c['about']}" for c in spec["cast"])
    cast_line = ", ".join(f"{c['emoji']} {c['name']}" for c in spec["cast"])
    learn = "\n".join(f"✔ {x}" for x in m["learn"])
    tags = ", ".join(m["tags"])
    tags_short = ", ".join(m["tags"][:15])
    hashtags = " ".join(m["hashtags"][:3])
    dur = spec["durationFrames"]
    tl = timeline(spec)
    chorus_at = next((a for s, a, b, _ in tl if s["kind"] == "chorus"), 0)

    md = f"""# {m['song']}

| File | What it is |
|---|---|
| `{slug}-short.mp4` | **Short**: 9:16, 1080×1920, {mmss(short_end(spec))}, with music |
| `{slug}-cover.jpg` | Short cover (9:16) |
| `{slug}-short.en.srt` | English subtitles for the Short |
| `{slug}-16x9.mp4` | **Regular video**: 16:9, 1920×1080, **{mmss(dur)}**, with music |
| `{slug}-thumbnail-1280x720.jpg` | Regular video thumbnail |
| `{slug}.en.srt` | English subtitles for the regular video |

---

## Song

**Title:** {m['song']}

**Lyrics**

```
{lyr}
```

**Characters**
{cast}

---

## YouTube Shorts

**Title:**
```
{m['shortTitle']} #shorts
```

**Description:**
```
{m['hook']}

{cast_line}

🎵 Sing along:
{chr(10).join(spec['sections'][[s['kind'] for s in spec['sections']].index('chorus')]['lines'])}

Perfect for toddlers and preschoolers (ages {m.get('ages', '2–6')}).
▶ Watch the full song on our channel!
👍 Subscribe to Sunny Sprouts for new songs every week!

{' '.join(m['hashtags'][:4])} #shorts
```

**Tags:**
```
{tags_short}
```

**Settings:** Made for kids = **Yes** · Category: **Education** · Language: **English** · Subtitles: upload `{slug}-short.en.srt` · Cover: `{slug}-cover.jpg` · Once the regular video is live, set it as this Short's **Related video**.

---

## YouTube — regular video (16:9)

**Title:**
```
{m['longTitle']}
```

**Description:**
```
{m['hook']}

{m['about']}

Meet the friends: {cast_line}

Kids will learn:
{learn}

⏱ 0:00 Song starts · {mmss(chorus_at)} Sing-along chorus

🎵 LYRICS
{lyr}

👶 Best for ages {m.get('ages', '2–6')}
👍 Subscribe to Sunny Sprouts for new songs every week!

{hashtags}
```

**Tags:**
```
{tags}
```

**Settings:** Made for kids = **Yes** · Category: **Education** · Language: **English** · Thumbnail: `{slug}-thumbnail-1280x720.jpg` · Subtitles: upload `{slug}.en.srt` · Playlist: **{m.get('playlist', 'Kids Songs')}**
"""
    with open(os.path.join(pub, f"{slug}.md"), "w") as fh:
        fh.write(md)
    print(f"packaged {slug}: {mmss(dur)} (short {mmss(short_end(spec))})")


if __name__ == "__main__":
    cmd, slug = sys.argv[1], sys.argv[2]
    if cmd == "plan":
        print(json.dumps(plan(load(slug)), indent=2))
    elif cmd == "generate":
        generate(slug)
    elif cmd == "package":
        package(slug)
