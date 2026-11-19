import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VeggieCartoon } from "../cartoon/VeggieCartoon";
import { ColorsCartoon } from "../colors/ColorsCartoon";
import { SkyContext, SkyTheme } from "../cartoon/Scenery";
import { fontFamily } from "../cartoon/font";
import { OUTLINE, clamp } from "../cartoon/shared";

export const COLORS_LEN = 1322;
export const VEGGIE_LEN = 842;

type Segment = { song: "colors" | "veggie"; label: string; sky: SkyTheme; badge: string };

export const SEGMENTS: Segment[] = [
  { song: "colors", label: "Rainbow Colors Song", sky: "day", badge: "#ff3b3b" },
  { song: "veggie", label: "Eat Your Veggies!", sky: "day", badge: "#3ec43e" },
  { song: "colors", label: "Rainbow Colors · Sing Along!", sky: "sunset", badge: "#ff8a1f" },
  { song: "veggie", label: "Eat Your Veggies · Sing Along!", sky: "sunset", badge: "#2fa8ff" },
  { song: "colors", label: "Rainbow Colors · Dance Party!", sky: "magic", badge: "#8e5bff" },
];

export const segmentStarts = () => {
  let at = 0;
  return SEGMENTS.map((s) => {
    const start = at;
    at += s.song === "colors" ? COLORS_LEN : VEGGIE_LEN;
    return start;
  });
};
export const COMPILATION_LEN = SEGMENTS.reduce((n, s) => n + (s.song === "colors" ? COLORS_LEN : VEGGIE_LEN), 0);

/** Circle "iris" reveal at the start of every song after the first. */
const Iris: React.FC<{ children: React.ReactNode; on: boolean }> = ({ children, on }) => {
  const frame = useCurrentFrame();
  const r = on ? interpolate(frame, [0, 18], [0, 120], { ...clamp, easing: Easing.out(Easing.cubic) }) : 120;
  return <AbsoluteFill style={{ clipPath: `circle(${r}% at 50% 55%)` }}>{children}</AbsoluteFill>;
};

/** Song title chip in the top-left corner for the first few seconds of each song. */
const SongBadge: React.FC<{ n: number; text: string; color: string }> = ({ n, text, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 11, stiffness: 160 } });
  const out = interpolate(frame, [110, 124], [1, 0], clamp);
  if (out <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        bottom: 40,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "14px 34px 14px 14px",
        background: "#fff",
        border: `7px solid ${OUTLINE}`,
        borderRadius: 60,
        boxShadow: "0 10px 0 rgba(43,26,61,0.25)",
        fontFamily,
        fontWeight: 900,
        fontSize: 48,
        color: OUTLINE,
        translate: `${(1 - pop) * -700}px 0px`,
        opacity: out,
      }}
    >
      <span
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          background: color,
          border: `5px solid ${OUTLINE}`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitTextStroke: `2px ${OUTLINE}`,
        }}
      >
        {n}
      </span>
      {text}
    </div>
  );
};

export const Compilation: React.FC = () => {
  const starts = segmentStarts();
  return (
    <AbsoluteFill style={{ background: "#2b1a3d" }}>
      {SEGMENTS.map((s, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={s.song === "colors" ? COLORS_LEN : VEGGIE_LEN} name={s.label}>
          <SkyContext.Provider value={s.sky}>
            <Iris on={i > 0}>
              {s.song === "colors" ? <ColorsCartoon layout="landscape" /> : <VeggieCartoon layout="landscape" />}
            </Iris>
          </SkyContext.Provider>
          <SongBadge n={i + 1} text={s.label} color={s.badge} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Thumbnail: render frame 1222 (the Dance Party "HOORAY!") with a "3 min" sticker. */
export const CompilationThumb: React.FC = () => {
  return (
    <AbsoluteFill>
      <SkyContext.Provider value="magic">
        <ColorsCartoon layout="landscape" />
      </SkyContext.Provider>
      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 60,
          rotate: "-8deg",
          background: "#ffd60a",
          border: `9px solid ${OUTLINE}`,
          borderRadius: 40,
          padding: "10px 40px",
          fontFamily,
          fontWeight: 900,
          fontSize: 92,
          color: "#ff3b3b",
          WebkitTextStroke: `4px ${OUTLINE}`,
          boxShadow: "0 12px 0 rgba(43,26,61,0.3)",
        }}
      >
        3 MIN MIX!
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 9:16 teaser Short: both choruses back to back ---------- */

export const TEASER_PARTS = [
  { song: "veggie" as const, from: 440, to: VEGGIE_LEN, sky: "sunset" as SkyTheme },
  { song: "colors" as const, from: 840, to: COLORS_LEN, sky: "magic" as SkyTheme },
];
export const TEASER_LEN = TEASER_PARTS.reduce((n, p) => n + p.to - p.from, 0);

export const MixTeaserShort: React.FC = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{ background: "#2b1a3d" }}>
      {TEASER_PARTS.map((p, i) => {
        const start = at;
        at += p.to - p.from;
        return (
          <Sequence key={i} from={start} durationInFrames={p.to - p.from}>
            {/* shift the song so it starts from its chorus */}
            <Sequence from={-p.from}>
              <SkyContext.Provider value={p.sky}>
                <Iris on={i > 0}>
                  {p.song === "colors" ? <ColorsCartoon layout="portrait" /> : <VeggieCartoon layout="portrait" />}
                </Iris>
              </SkyContext.Provider>
            </Sequence>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
