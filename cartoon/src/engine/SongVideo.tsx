import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../cartoon/font";
import { Confetti, SkyContext, SkyTheme } from "../cartoon/Scenery";
import { OUTLINE, clamp, mix } from "../cartoon/shared";
import { HeyBurst, IntroTitle } from "../cartoon/Text";
import { Burst, Shadow } from "../cartoon/Veggie";
import { CHARACTERS } from "./registry";
import { Leaves, Rain, SceneBack, SceneKind, Snowfall } from "./scenes";

/* ---------- spec ---------- */

export type Section = {
  kind: "intro" | "verse" | "chorus" | "bridge" | "outro";
  ms: number;
  lines?: string[];
  /** cast indices that sing this section (default: everyone) */
  focus?: number[];
  /** big word per line, e.g. RED / MONDAY / 3 */
  words?: ({ word: string; color: string } | null)[];
  weather?: "rain" | "snow" | "wind" | "sun";
  /** the vocals of this section start this many ms late (lines are spread over the rest) */
  delayMs?: number;
};

export type SongSpec = {
  slug: string;
  id: string;
  audio: string;
  durationFrames: number;
  scene: SceneKind;
  sky?: SkyTheme;
  mood?: "party" | "calm";
  title: { portrait: string[]; landscape: string[] };
  cast: { kind: string; name: string; about: string }[];
  sections: Section[];
  outroText?: string;
};

export const FPS = 30;
const f = (ms: number) => Math.round((ms / 1000) * FPS);

export type Timed = Section & { from: number; to: number; lineTimes: { from: number; to: number; text: string }[] };

export const timeline = (spec: SongSpec): Timed[] => {
  let at = 0;
  return spec.sections.map((s) => {
    const from = at;
    const to = at + f(s.ms);
    at = to;
    const lines = s.lines ?? [];
    const start = from + f(s.delayMs ?? 0);
    const step = (to - start) / Math.max(1, lines.length);
    return {
      ...s,
      from,
      to,
      lineTimes: lines.map((text, i) => ({ from: Math.round(start + i * step), to: Math.round(start + (i + 1) * step), text })),
    };
  });
};

/** Frame where the Short ends: the end of the first chorus. */
export const shortEnd = (spec: SongSpec) => {
  const t = timeline(spec);
  const c = t.find((s) => s.kind === "chorus");
  return Math.min(spec.durationFrames, (c ? c.to : t[Math.min(2, t.length - 1)].to) + 20);
};

/* ---------- layout ---------- */

type Spot = { x: number; y: number; size: number };

const spots = (spec: SongSpec, wide: boolean): Spot[] => {
  const n = spec.cast.length;
  const sizeFor = (kind: string, target: number) => Math.min(1.5, target / (CHARACTERS[kind]?.height ?? 350));
  if (wide) {
    const target = n <= 3 ? 430 : n === 4 ? 410 : n === 5 ? 380 : n === 6 ? 340 : 300;
    const span = n <= 3 ? 1200 : 1680;
    return spec.cast.map((c, i) => ({ x: 960 - span / 2 + (i + 0.5) * (span / n), y: 1010, size: sizeFor(c.kind, target) }));
  }
  if (n <= 3) {
    return spec.cast.map((c, i) => ({ x: (i + 0.5) * (1080 / n), y: 1740, size: sizeFor(c.kind, 500) }));
  }
  const back = Math.ceil(n / 2);
  return spec.cast.map((c, i) => {
    const isBack = i < back;
    const k = isBack ? back : n - back;
    const j = isBack ? i : i - back;
    const target = k >= 4 ? 330 : isBack ? 400 : 430;
    return { x: (j + 0.5) * (1080 / k), y: isBack ? 1330 : 1770, size: sizeFor(c.kind, target) };
  });
};

/* ---------- characters ---------- */

const Singer: React.FC<{ kind: string; spot: Spot; enterAt: number; phase: number; tl: Timed[]; idx: number; calm: boolean; heyAt: number }> = ({
  kind,
  spot,
  enterAt,
  phase,
  tl,
  idx,
  calm,
  heyAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < enterAt) return null;
  const entry = CHARACTERS[kind];
  if (!entry) return null;
  const { C, height } = entry;
  const local = frame - enterAt;
  const t = frame + phase * 17;

  const sec = tl.find((s) => frame >= s.from && frame < s.to);
  const singing = !!sec && (sec.kind === "verse" || sec.kind === "bridge") && (!sec.focus || sec.focus.includes(idx));
  const dancing = !!sec && (sec.kind === "chorus" || sec.kind === "outro");
  const ramp = (on: boolean) => {
    if (!sec) return 0;
    return on ? Math.min(interpolate(frame, [sec.from, sec.from + 6], [0, 1], clamp), interpolate(frame, [sec.to - 6, sec.to], [1, 0], clamp)) : 0;
  };
  const wTalk = ramp(singing);
  const wDance = ramp(dancing);

  const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 140, mass: 0.7 } });
  const hop = local < 20 ? -Math.sin((local / 20) * Math.PI) * 140 : 0;
  const beat = (frame * Math.PI) / 15;
  const air = Math.abs(Math.sin(beat));
  const heyT = (frame - heyAt) / 24;
  const wHey = heyT > 0 && heyT < 1 && !calm ? Math.sin(heyT * Math.PI) : 0;
  const nod = (1 - wDance) * Math.abs(Math.sin(beat)) * (calm ? 4 : 10);
  const jump = calm ? -nod * spot.size : (wDance * -air * 80 * (1 - wHey) - wHey * 220 - nod) * spot.size;
  const ground = calm ? 0 : wDance * Math.pow(1 - air, 6);
  const breathe = Math.sin(t * 0.15);
  const sy = (1 + breathe * 0.025) * (1 - 0.13 * ground) * (1 + wTalk * 0.05 * Math.abs(Math.sin(frame * 0.45)));
  const sx = (1 - breathe * 0.02) * (1 + 0.11 * ground);
  const sway = calm ? Math.sin(frame * 0.05 + phase) * 6 : 0;
  const rot = (1 - wDance) * (Math.sin(t * 0.07) * 3 + wTalk * Math.sin(frame * 0.22) * 6) + wDance * (calm ? Math.sin(frame * 0.07 + phase) * 7 : Math.sin(beat) * 10) + sway * 0.3;

  const baseR = -22 + Math.sin(t * 0.1) * 8;
  const baseL = 22 - Math.sin(t * 0.1 + 1) * 8;
  const danceR = calm ? -120 + Math.sin(frame * 0.08 + phase) * 30 : -145 + Math.sin(beat * 2) * 25;
  const danceL = calm ? 120 + Math.sin(frame * 0.08 + phase) * 30 : 145 + Math.sin(beat * 2) * 25;
  const armR = mix(mix(mix(baseR, -150 + Math.sin(frame * 0.5) * 28, wTalk), danceR, wDance), -172, wHey);
  const armL = mix(mix(mix(baseL, 38, wTalk), danceL, wDance), 172, wHey);
  const mouth = mix(mix(0.15, 0.2 + 0.8 * Math.abs(Math.sin(frame * 0.45)), wTalk), 0.4 + 0.45 * Math.abs(Math.sin(frame * 0.4 + phase)), wDance);
  const cyc = (frame + phase * 29) % 90;
  const blink = cyc < 6 ? interpolate(cyc, [0, 3, 6], [1, 0.08, 1]) : 1;

  return (
    <>
      <g transform={`translate(${spot.x} ${spot.y + hop + jump}) rotate(${rot}) scale(${sx * pop * spot.size} ${sy * pop * spot.size})`}>
        <C blink={blink} mouth={mouth} armL={armL} armR={armR} t={t} />
      </g>
      <Burst x={spot.x} y={spot.y - (height * spot.size) / 2} local={local - 4} />
    </>
  );
};

/* ---------- lyric cards ---------- */

const OutlinedWord: React.FC<{ text: string; color: string; size: number }> = ({ text, color, size }) => (
  <span style={{ position: "relative", display: "inline-block", fontSize: size, lineHeight: 1 }}>
    <span style={{ position: "absolute", left: 0, top: 0, color: OUTLINE, WebkitTextStroke: `${size * 0.22}px ${OUTLINE}`, translate: "0px 8px" }}>{text}</span>
    <span style={{ position: "absolute", left: 0, top: 0, color: "#fff", WebkitTextStroke: `${size * 0.16}px #fff` }}>{text}</span>
    <span style={{ position: "relative", color }}>{text}</span>
  </span>
);

const LyricCard: React.FC<{ tl: Timed[]; wide: boolean }> = ({ tl, wide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = tl.find((s) => frame >= s.from && frame < s.to);
  if (!sec || sec.kind === "intro" || sec.kind === "outro") return null;
  const li = sec.lineTimes.findIndex((l) => frame >= l.from && frame < l.to);
  if (li < 0) return null;
  const line = sec.lineTimes[li];
  const word = sec.words?.[li] ?? null;
  const chorus = sec.kind === "chorus";
  const pop = spring({ frame: frame - line.from, fps, config: { damping: 10, stiffness: 200 } });
  const box = wide ? { left: 310, top: 205, width: 1300, height: 230 } : { left: 50, top: 500, width: 980, height: 270 };
  const fill = interpolate(frame, [line.from, line.to - 6], [0, 100], clamp);
  return (
    <div
      style={{
        position: "absolute",
        ...box,
        background: "#ffffff",
        border: `8px solid ${OUTLINE}`,
        borderRadius: 90,
        boxShadow: `0 14px 0 rgba(43,26,61,0.25)${word ? `, inset 0 -18px 0 ${word.color}33` : ""}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 44px",
        gap: 4,
        scale: `${interpolate(pop, [0, 1], [0.82, 1])}`,
        fontFamily,
        fontWeight: 900,
        textAlign: "center",
      }}
    >
      {word ? (
        <div style={{ rotate: `${Math.sin(frame * 0.2) * 3}deg`, whiteSpace: "nowrap" }}>
          <OutlinedWord text={word.word} color={word.color} size={Math.min(wide ? 118 : 130, ((wide ? 1150 : 860) / Math.max(1, word.word.length)) * 1.45)} />
        </div>
      ) : null}
      <div
        style={{
          fontSize: word ? (wide ? 50 : 54) : wide ? 64 : 64,
          lineHeight: 1.1,
          textWrap: "balance",
          ...(chorus
            ? {
                backgroundImage: "linear-gradient(90deg, #ff3b3b, #ff8a1f, #ffc300, #3ec43e, #2fa8ff, #8e5bff)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: `3px ${OUTLINE}`,
                maskImage: `linear-gradient(90deg, #000 ${fill}%, rgba(0,0,0,0.45) ${fill + 8}%)`,
              }
            : { color: OUTLINE }),
        }}
      >
        {line.text}
      </div>
    </div>
  );
};

const WeatherLayer: React.FC<{ tl: Timed[] }> = ({ tl }) => (
  <>
    {tl.map((s, i) =>
      s.weather && s.weather !== "sun" ? (
        <Sequence key={i} from={s.from} durationInFrames={s.to - s.from}>
          {s.weather === "rain" ? <Rain /> : s.weather === "snow" ? <Snowfall count={90} seed="w" /> : <Leaves />}
        </Sequence>
      ) : null,
    )}
  </>
);

/* ---------- composition ---------- */

export const SongVideo: React.FC<{ spec: SongSpec; short?: boolean }> = ({ spec, short }) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const wide = width > height;
  const tl = timeline(spec);
  const calm = spec.mood === "calm";
  const where = spots(spec, wide);
  const firstChorus = tl.find((s) => s.kind === "chorus");
  const outro = tl.find((s) => s.kind === "outro");
  const heyAt = outro ? outro.from : 1e9;
  const back = spec.cast.map((_, i) => i).sort((a, b) => where[a].y - where[b].y);
  const intro = tl[0].kind === "intro" ? tl[0] : null;
  const enterAt = (i: number) => (intro ? Math.min(intro.to - 20, 50 + i * Math.min(20, (intro.to - 70) / spec.cast.length)) : 10 + i * 8);

  return (
    <SkyContext.Provider value={spec.sky ?? "day"}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Audio
          src={staticFile(spec.audio)}
          volume={(fr: number) => (short ? interpolate(fr, [durationInFrames - 20, durationInFrames], [1, 0], clamp) : 1)}
        />
        <SceneBack kind={spec.scene} rainbowAt={(spec.scene === "meadow" || spec.scene === "farm") && firstChorus ? firstChorus.from : undefined} />
        <WeatherLayer tl={tl} />
        <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {back.map((i) => (
            <React.Fragment key={i}>
              <Shadow x={where[i].x} y={where[i].y} enterAt={enterAt(i)} danceAt={0} phase={0} size={where[i].size * 0.9} />
              <Singer kind={spec.cast[i].kind} spot={where[i]} enterAt={enterAt(i)} phase={i + 1} tl={tl} idx={i} calm={calm} heyAt={heyAt} />
            </React.Fragment>
          ))}
        </svg>
        {!calm
          ? tl.map((s, i) =>
              s.kind === "chorus" || s.kind === "outro" ? (
                <Sequence key={`c${i}`} from={s.from} durationInFrames={s.to - s.from}>
                  <Confetti startAt={0} count={wide ? 110 : 80} />
                </Sequence>
              ) : null,
            )
          : null}
        <LyricCard tl={tl} wide={wide} />
        <IntroTitle
          exitAt={1e9}
          cfg={
            wide
              ? { lines: spec.title.landscape, size: spec.title.landscape[0].length > 20 ? 112 : 130, topFrom: 380, topTo: 28, scaleFrom: 1.15, scaleTo: 0.9 }
              : { lines: spec.title.portrait, size: 140, topFrom: 760, topTo: 160, scaleFrom: 1.15, scaleTo: 0.92 }
          }
        />
        {outro ? <HeyBurst at={outro.from} x={wide ? 960 : 540} y={wide ? 400 : 660} text={spec.outroText ?? "HOORAY!"} fontSize={(spec.outroText ?? "HOORAY!").length > 6 ? 104 : 140} /> : null}
      </AbsoluteFill>
    </SkyContext.Provider>
  );
};
