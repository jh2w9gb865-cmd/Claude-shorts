import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ANIMALS, AnimalKind } from "../characters/Animals";
import { fontFamily } from "../cartoon/font";
import { LANDSCAPE, Layout, PORTRAIT } from "../cartoon/layout";
import { Butterflies, Clouds, Confetti, Hills, Sky, Sun } from "../cartoon/Scenery";
import { OUTLINE, clamp, mix } from "../cartoon/shared";
import { FinalTitle, HeyBurst, IntroTitle } from "../cartoon/Text";
import { Burst, Shadow } from "../cartoon/Veggie";

/*
 * Timings (frames @ 30fps) measured from songs/rainbow-colors-v1.mp3:
 * 120 BPM (a beat every 15 frames), vocals start at 4.0s, each verse line is 2 bars (4s),
 * an instrumental break around 15.5-17.8s, chorus from ~28.9s, "Hooray!" at ~40.3s.
 */
const DANCE_AT = 870;
const CHORUS_AT = 867;
const HOORAY_AT = 1209;

type ColorLine = {
  kind: AnimalKind;
  color: string;
  word: string;
  line: string;
  from: number;
  to: number;
  phase: number;
};

const COLORS: ColorLine[] = [
  { kind: "ladybug", color: "#ff3b3b", word: "RED", line: "The ladybug is red!", from: 120, to: 240, phase: 1 },
  { kind: "fox", color: "#ff8a1f", word: "ORANGE", line: "A fox from tail to head!", from: 240, to: 360, phase: 2 },
  { kind: "chick", color: "#ffc300", word: "YELLOW", line: "The little chick says peep!", from: 360, to: 468, phase: 3 },
  { kind: "frog", color: "#3ec43e", word: "GREEN", line: "The froggy loves to leap!", from: 534, to: 678, phase: 4 },
  { kind: "bluebird", color: "#2fa8ff", word: "BLUE", line: "The bluebird sings a song!", from: 684, to: 774, phase: 5 },
  { kind: "grapes", color: "#8e5bff", word: "PURPLE", line: "Grapes, come sing along!", from: 777, to: 862, phase: 6 },
];

const CHORUS = [
  { from: CHORUS_AT, to: 1047, text: "Red, orange, yellow, green,\nblue and purple, can't you see?" },
  { from: 1047, to: HOORAY_AT - 3, text: "All the colors, one, two, three,\nmake a rainbow just for me!" },
];

/* ---------- layouts ---------- */

type Spot = { x: number; y: number; size: number };
type ColorsLayout = {
  base: Layout;
  sun: [number, number];
  rainbow: { cx: number; cy: number; r: number; band: number };
  card: { top: number; left: number; width: number; height: number; word: number; line: number; chorus: number };
  spots: Spot[];
  hooray: [number, number];
  intro: Layout["intro"];
  final: Layout["final"];
};

const PORTRAIT_COLORS: ColorsLayout = {
  base: PORTRAIT,
  sun: [930, 905],
  rainbow: { cx: 540, cy: 1330, r: 520, band: 44 },
  card: { top: 510, left: 50, width: 980, height: 280, word: 140, line: 60, chorus: 52 },
  spots: [
    { x: 200, y: 1330, size: 0.9 },
    { x: 540, y: 1330, size: 0.9 },
    { x: 880, y: 1330, size: 1.2 },
    { x: 200, y: 1770, size: 1.3 },
    { x: 540, y: 1770, size: 1.2 },
    { x: 880, y: 1770, size: 0.9 },
  ],
  hooray: [540, 660],
  intro: { lines: ["Rainbow", "Colors!"], size: 165, topFrom: 760, topTo: 170, scaleFrom: 1.2, scaleTo: 0.95 },
  final: { lines: ["Sing the", "Rainbow!"], size: 150, top: 160 },
};

const LANDSCAPE_COLORS: ColorsLayout = {
  base: LANDSCAPE,
  sun: [1750, 215],
  rainbow: { cx: 960, cy: 1010, r: 740, band: 44 },
  card: { top: 225, left: 360, width: 1200, height: 240, word: 120, line: 54, chorus: 62 },
  spots: [
    { x: 210, y: 1010, size: 0.75 },
    { x: 510, y: 1010, size: 0.75 },
    { x: 810, y: 1010, size: 1.0 },
    { x: 1110, y: 1010, size: 1.1 },
    { x: 1410, y: 1010, size: 1.0 },
    { x: 1710, y: 1010, size: 0.75 },
  ],
  hooray: [960, 380],
  intro: { lines: ["Rainbow Colors!"], size: 170, topFrom: 380, topTo: 30, scaleFrom: 1.2, scaleTo: 0.9 },
  final: { lines: ["Sing the Rainbow!"], size: 140, top: 30 },
};

const LAYOUTS = { portrait: PORTRAIT_COLORS, landscape: LANDSCAPE_COLORS };

/* ---------- pieces ---------- */

const RAINBOW_ORDER = ["#ff3b3b", "#ff8a1f", "#ffd60a", "#3ec43e", "#2fa8ff", "#8e5bff"];

/** Rainbow that gains one band each time a new color is sung. */
const RainbowBuild: React.FC<{ cfg: ColorsLayout["rainbow"] }> = ({ cfg }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {RAINBOW_ORDER.map((c, i) => {
        const p = interpolate(frame, [COLORS[i].from, COLORS[i].from + 22], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });
        if (p <= 0) return null;
        const r = cfg.r - i * cfg.band;
        const glow = frame >= COLORS[i].from && frame < COLORS[i].to ? 1 : 0;
        return (
          <path
            key={c}
            d={`M ${cfg.cx - r} ${cfg.cy} A ${r} ${r} 0 0 1 ${cfg.cx + r} ${cfg.cy}`}
            stroke={c}
            strokeWidth={cfg.band + 2 + glow * 6}
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - p}
          />
        );
      })}
    </svg>
  );
};

const OutlinedWord: React.FC<{ text: string; color: string; size: number }> = ({ text, color, size }) => (
  <span style={{ position: "relative", display: "inline-block", fontSize: size, lineHeight: 1 }}>
    <span style={{ position: "absolute", left: 0, top: 0, color: OUTLINE, WebkitTextStroke: `${size * 0.22}px ${OUTLINE}`, translate: "0px 8px" }}>
      {text}
    </span>
    <span style={{ position: "absolute", left: 0, top: 0, color: "#fff", WebkitTextStroke: `${size * 0.16}px #fff` }}>{text}</span>
    <span style={{ position: "relative", color }}>{text}</span>
  </span>
);

/** Big color word + lyric line for each verse line. */
const ColorCard: React.FC<{ cfg: ColorsLayout["card"] }> = ({ cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cur = COLORS.find((c) => frame >= c.from && frame < c.to);
  if (!cur) return null;
  const pop = spring({ frame: frame - cur.from, fps, config: { damping: 9, stiffness: 190 } });
  const out = interpolate(frame, [cur.to - 6, cur.to], [1, 0], clamp);
  const wobble = Math.sin(frame * 0.2) * 3;
  return (
    <div
      style={{
        position: "absolute",
        left: cfg.left,
        top: cfg.top,
        width: cfg.width,
        height: cfg.height,
        background: "#ffffff",
        border: `8px solid ${OUTLINE}`,
        borderRadius: 90,
        boxShadow: `0 14px 0 rgba(43,26,61,0.25), inset 0 -18px 0 ${cur.color}33`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        scale: `${pop * out}`,
        fontFamily,
        fontWeight: 900,
      }}
    >
      <div style={{ rotate: `${wobble}deg` }}>
        <OutlinedWord text={cur.word} color={cur.color} size={cfg.word} />
      </div>
      <div style={{ fontSize: cfg.line, color: OUTLINE, lineHeight: 1.1 }}>{cur.line}</div>
    </div>
  );
};

const ChorusCard: React.FC<{ cfg: ColorsLayout["card"] }> = ({ cfg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cur = CHORUS.find((c) => frame >= c.from && frame < c.to);
  if (!cur) return null;
  const pop = spring({ frame: frame - cur.from, fps, config: { damping: 9, stiffness: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: cfg.left,
        top: cfg.top + 20,
        width: cfg.width,
        minHeight: cfg.height - 40,
        background: "#ffffff",
        border: `8px solid ${OUTLINE}`,
        borderRadius: 90,
        boxShadow: "0 14px 0 rgba(43,26,61,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 40px",
        scale: `${pop}`,
        fontFamily,
        fontWeight: 900,
      }}
    >
      <div
        style={{
          fontSize: cfg.chorus,
          lineHeight: 1.15,
          textAlign: "center",
          whiteSpace: "pre-line",
          backgroundImage: "linear-gradient(90deg, #ff3b3b, #ff8a1f, #ffc300, #3ec43e, #2fa8ff, #8e5bff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: `3px ${OUTLINE}`,
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};

/** An animal that pops in, sings its line, nods to the beat, then dances in the chorus. */
const Critter: React.FC<{ c: ColorLine; spot: Spot }> = ({ c, spot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterAt = c.from - 12;
  if (frame < enterAt) return null;
  const { C, height } = ANIMALS[c.kind];
  const local = frame - enterAt;
  const t = frame + c.phase * 17;

  const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 140, mass: 0.7 } });
  const hop = local < 20 ? -Math.sin((local / 20) * Math.PI) * 140 : 0;
  const wTalk = Math.min(
    interpolate(frame, [c.from, c.from + 6], [0, 1], clamp),
    interpolate(frame, [c.to - 6, c.to], [1, 0], clamp),
  );
  const wDance = interpolate(frame, [DANCE_AT, DANCE_AT + 8], [0, 1], clamp);
  const beat = ((frame - DANCE_AT) * Math.PI) / 15;
  const air = Math.abs(Math.sin(beat));
  const heyT = (frame - HOORAY_AT) / 24;
  const wHey = heyT > 0 && heyT < 1 ? Math.sin(heyT * Math.PI) : 0;
  const nod = (1 - wDance) * Math.abs(Math.sin((frame * Math.PI) / 15)) * 10;
  const jump = (wDance * -air * 80 * (1 - wHey) - wHey * 220 - nod) * spot.size;
  const ground = wDance * Math.pow(1 - air, 6);
  const breathe = Math.sin(t * 0.15);
  const sy = (1 + breathe * 0.025) * (1 - 0.13 * ground) * (1 + wTalk * 0.06 * Math.abs(Math.sin(frame * 0.45)));
  const sx = (1 - breathe * 0.02) * (1 + 0.11 * ground);
  const rot =
    (1 - wDance) * (Math.sin(t * 0.07) * 3 + wTalk * Math.sin(frame * 0.22) * 6) + wDance * Math.sin(beat) * 10;

  const baseR = -22 + Math.sin(t * 0.1) * 8;
  const baseL = 22 - Math.sin(t * 0.1 + 1) * 8;
  const armR = mix(mix(mix(baseR, -150 + Math.sin(frame * 0.5) * 28, wTalk), -145 + Math.sin(beat * 2) * 25, wDance), -172, wHey);
  const armL = mix(mix(mix(baseL, 38, wTalk), 145 + Math.sin(beat * 2) * 25, wDance), 172, wHey);
  const mouth = mix(
    mix(0.15, 0.2 + 0.8 * Math.abs(Math.sin(frame * 0.45)), wTalk),
    0.45 + 0.45 * Math.abs(Math.sin(frame * 0.4 + c.phase)),
    wDance,
  );
  const cyc = (frame + c.phase * 29) % 90;
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

/* ---------- composition ---------- */

export const ColorsCartoon: React.FC<{ layout: "portrait" | "landscape" }> = ({ layout }) => {
  const L = LAYOUTS[layout];
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Audio src={staticFile("audio/rainbow-colors.mp3")} />
      <Sky />
      <Sun x={L.sun[0]} y={L.sun[1]} />
      <RainbowBuild cfg={L.rainbow} />
      <Clouds clouds={L.base.clouds} />
      <Hills back={L.base.backHill} front={L.base.frontHill} />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {COLORS.map((c, i) => (
          <React.Fragment key={c.kind}>
            <Shadow x={L.spots[i].x} y={L.spots[i].y} enterAt={c.from - 12} danceAt={DANCE_AT} phase={0} size={L.spots[i].size * 0.9} />
            <Critter c={c} spot={L.spots[i]} />
          </React.Fragment>
        ))}
      </svg>
      <Butterflies flies={L.base.butterflies} />
      <ColorCard cfg={L.card} />
      <Confetti startAt={DANCE_AT + 6} count={L.base.confetti} />
      <IntroTitle exitAt={CHORUS_AT - 10} cfg={L.intro} />
      <FinalTitle startAt={CHORUS_AT + 2} cfg={L.final} />
      <ChorusCard cfg={L.card} />
      <HeyBurst at={HOORAY_AT} x={L.hooray[0]} y={L.hooray[1]} text="HOORAY!" fontSize={108} />
    </AbsoluteFill>
  );
};
