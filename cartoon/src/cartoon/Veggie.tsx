import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { OUTLINE, SW, clamp, mix, starPath } from "./shared";

export type VeggieKind = "carrot" | "tomato" | "broccoli" | "cucumber";

type Spec = {
  shoulder: [number, number];
  hip: [number, number];
  eyeY: number;
  eyeDx: number;
  eyeR: number;
  mouthY: number;
  mouthScale: number;
  shoe: string;
  height: number;
};

export const SPECS: Record<VeggieKind, Spec> = {
  carrot: {
    shoulder: [72, -245],
    hip: [20, -85],
    eyeY: -282,
    eyeDx: 32,
    eyeR: 21,
    mouthY: -228,
    mouthScale: 1,
    shoe: "#7c4dff",
    height: 470,
  },
  tomato: {
    shoulder: [128, -200],
    hip: [50, -82],
    eyeY: -228,
    eyeDx: 42,
    eyeR: 25,
    mouthY: -168,
    mouthScale: 1.25,
    shoe: "#ffd60a",
    height: 395,
  },
  broccoli: {
    shoulder: [66, -160],
    hip: [32, -72],
    eyeY: -182,
    eyeDx: 29,
    eyeR: 19,
    mouthY: -128,
    mouthScale: 0.9,
    shoe: "#ff4f9a",
    height: 450,
  },
  cucumber: {
    shoulder: [76, -215],
    hip: [35, -72],
    eyeY: -300,
    eyeDx: 32,
    eyeR: 22,
    mouthY: -245,
    mouthScale: 1,
    shoe: "#ff6b2c",
    height: 420,
  },
};

/* ---------- bodies ---------- */

const Carrot: React.FC<{ t: number }> = ({ t }) => {
  const sway = Math.sin(t * 0.12) * 8;
  return (
    <g>
      <g transform={`rotate(${sway} 0 -335)`}>
        {[
          "M 0 -335 C -30 -380 -75 -385 -85 -430 C -40 -432 -12 -395 0 -340 Z",
          "M 0 -335 C 30 -380 75 -385 85 -430 C 40 -432 12 -395 0 -340 Z",
          "M 0 -335 C -18 -390 -10 -440 8 -478 C 34 -440 22 -390 0 -340 Z",
        ].map((d) => (
          <path
            key={d}
            d={d}
            fill="#3ec43e"
            stroke={OUTLINE}
            strokeWidth={SW}
            strokeLinejoin="round"
          />
        ))}
      </g>
      <path
        d="M -88 -318 C -92 -362 92 -362 88 -318 C 82 -230 40 -110 0 -52 C -40 -110 -82 -230 -88 -318 Z"
        fill="#ff8a1f"
        stroke={OUTLINE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M -62 -322 Q -72 -262 -54 -205"
        stroke="#ffc58a"
        strokeWidth={12}
        strokeLinecap="round"
        fill="none"
      />
      {[
        "M 52 -300 Q 64 -296 74 -302",
        "M -70 -170 Q -56 -166 -46 -172",
        "M 30 -150 Q 42 -146 52 -152",
        "M -24 -98 Q -14 -95 -6 -100",
      ].map((d) => (
        <path
          key={d}
          d={d}
          stroke="#d95f0b"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </g>
  );
};

const Tomato: React.FC<{ t: number }> = ({ t }) => {
  const sway = Math.sin(t * 0.1) * 5;
  return (
    <g>
      <circle
        cx={0}
        cy={-205}
        r={135}
        fill="#ff3b3b"
        stroke={OUTLINE}
        strokeWidth={SW}
      />
      <ellipse
        cx={-68}
        cy={-262}
        rx={22}
        ry={40}
        transform="rotate(35 -68 -262)"
        fill="#ffffff"
        opacity={0.55}
      />
      <ellipse cx={-38} cy={-300} rx={9} ry={9} fill="#ffffff" opacity={0.6} />
      <g transform={`rotate(${sway} 0 -335)`}>
        <rect
          x={-8}
          y={-392}
          width={16}
          height={56}
          rx={8}
          fill="#2e9e3e"
          stroke={OUTLINE}
          strokeWidth={6}
        />
        <path
          d={starPath(0, -335, 70, 24, 5)}
          fill="#3ec43e"
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinejoin="round"
          transform="translate(0 -335) scale(1 0.55) translate(0 335)"
        />
      </g>
    </g>
  );
};

const FLORETS: [number, number, number][] = [
  [-98, -262, 56],
  [98, -262, 56],
  [-62, -335, 62],
  [62, -335, 62],
  [0, -388, 62],
  [0, -295, 72],
];

const Broccoli: React.FC<{ t: number }> = () => {
  return (
    <g>
      <path
        d="M -70 -240 L 70 -240 L 62 -75 Q 0 -55 -62 -75 Z"
        fill="#b8e65a"
        stroke={OUTLINE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M -50 -225 L -46 -95"
        stroke="#d9f59a"
        strokeWidth={10}
        strokeLinecap="round"
      />
      {FLORETS.map(([x, y, r]) => (
        <circle key={`o${x}${y}`} cx={x} cy={y} r={r + SW / 2} fill={OUTLINE} />
      ))}
      {FLORETS.map(([x, y, r]) => (
        <circle key={`f${x}${y}`} cx={x} cy={y} r={r - SW / 2} fill="#2fae4a" />
      ))}
      {FLORETS.map(([x, y, r]) => (
        <circle
          key={`h${x}${y}`}
          cx={x - r * 0.35}
          cy={y - r * 0.35}
          r={r * 0.28}
          fill="#5fd36f"
        />
      ))}
      {[
        [-110, -240],
        [40, -360],
        [-20, -410],
        [110, -280],
        [-70, -310],
        [20, -270],
      ].map(([x, y]) => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r={7} fill="#1e8236" />
      ))}
    </g>
  );
};

const Cucumber: React.FC<{ t: number }> = () => {
  return (
    <g>
      <rect
        x={-10}
        y={-418}
        width={20}
        height={30}
        rx={8}
        fill="#7a5a2b"
        stroke={OUTLINE}
        strokeWidth={6}
      />
      <rect
        x={-80}
        y={-405}
        width={160}
        height={345}
        rx={80}
        fill="#2fb34a"
        stroke={OUTLINE}
        strokeWidth={SW}
      />
      <ellipse cx={0} cy={-205} rx={50} ry={115} fill="#8fe37a" opacity={0.55} />
      <path
        d="M -55 -360 Q -66 -300 -60 -250"
        stroke="#a6f08d"
        strokeWidth={12}
        strokeLinecap="round"
        fill="none"
      />
      {[
        [55, -360],
        [62, -300],
        [-62, -200],
        [58, -150],
        [-50, -120],
        [60, -235],
      ].map(([x, y]) => (
        <ellipse
          key={`${x}${y}`}
          cx={x}
          cy={y}
          rx={5}
          ry={8}
          fill="#1d7d32"
        />
      ))}
    </g>
  );
};

const BODIES: Record<VeggieKind, React.FC<{ t: number }>> = {
  carrot: Carrot,
  tomato: Tomato,
  broccoli: Broccoli,
  cucumber: Cucumber,
};

/* ---------- face & limbs ---------- */

const Face: React.FC<{
  spec: Spec;
  blink: number;
  mouth: number;
  pupilX: number;
  pupilY: number;
  brow: number;
}> = ({ spec, blink, mouth, pupilX, pupilY, brow }) => {
  const { eyeY, eyeDx, eyeR, mouthY, mouthScale } = spec;
  return (
    <g>
      {[-1, 1].map((side) => (
        <ellipse
          key={`c${side}`}
          cx={side * (eyeDx + eyeR + 6)}
          cy={eyeY + eyeR + 22}
          rx={eyeR * 0.9}
          ry={eyeR * 0.55}
          fill="#ff6fa5"
          opacity={0.75}
        />
      ))}
      {[-1, 1].map((side) => (
        <g
          key={`e${side}`}
          transform={`translate(${side * eyeDx} ${eyeY}) scale(1 ${blink})`}
        >
          <ellipse
            rx={eyeR}
            ry={eyeR * 1.18}
            fill="#ffffff"
            stroke={OUTLINE}
            strokeWidth={5}
          />
          <circle cx={pupilX} cy={pupilY + 3} r={eyeR * 0.58} fill={OUTLINE} />
          <circle
            cx={pupilX - eyeR * 0.22}
            cy={pupilY - eyeR * 0.18}
            r={eyeR * 0.22}
            fill="#ffffff"
          />
        </g>
      ))}
      {[-1, 1].map((side) => (
        <path
          key={`b${side}`}
          d={`M ${side * eyeDx - 13} ${eyeY - eyeR * 1.6 - brow} Q ${side * eyeDx} ${eyeY - eyeR * 1.6 - brow - 9} ${side * eyeDx + 13} ${eyeY - eyeR * 1.6 - brow}`}
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <g transform={`translate(0 ${mouthY}) scale(${mouthScale})`}>
        <path
          d={`M -30 0 Q 0 7 30 0 Q 0 ${12 + 44 * mouth} -30 0 Z`}
          fill="#8b1e3f"
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        {mouth > 0.3 ? (
          <ellipse
            cx={0}
            cy={4 + 16 * mouth}
            rx={11}
            ry={2 + 5 * mouth}
            fill="#ff6f91"
          />
        ) : null}
      </g>
    </g>
  );
};

const Arm: React.FC<{ x: number; y: number; angle: number; side: 1 | -1 }> = ({
  x,
  y,
  angle,
  side,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path
      d={`M 0 0 Q ${side * 16} 46 0 92`}
      stroke={OUTLINE}
      strokeWidth={11}
      strokeLinecap="round"
      fill="none"
    />
    <circle cx={0} cy={102} r={19} fill="#ffffff" stroke={OUTLINE} strokeWidth={5} />
    <circle
      cx={side * 15}
      cy={92}
      r={8}
      fill="#ffffff"
      stroke={OUTLINE}
      strokeWidth={4}
    />
  </g>
);

const Legs: React.FC<{ spec: Spec; spread: number }> = ({ spec, spread }) => {
  const [hx, hy] = spec.hip;
  return (
    <g>
      {[-1, 1].map((side) => {
        const fx = side * (hx + 10 + spread);
        return (
          <g key={side}>
            <path
              d={`M ${side * hx} ${hy} L ${fx} -14`}
              stroke={OUTLINE}
              strokeWidth={11}
              strokeLinecap="round"
            />
            <ellipse
              cx={fx + side * 10}
              cy={-10}
              rx={28}
              ry={15}
              fill={spec.shoe}
              stroke={OUTLINE}
              strokeWidth={5}
            />
          </g>
        );
      })}
    </g>
  );
};

/* ---------- entrance sparkle burst ---------- */

const Burst: React.FC<{ x: number; y: number; local: number }> = ({
  x,
  y,
  local,
}) => {
  if (local < 0 || local > 26) return null;
  const p = local / 26;
  const colors = ["#ffd60a", "#ff4f9a", "#3ec4ff", "#ffffff", "#7c4dff", "#ff8a1f"];
  return (
    <g opacity={1 - p}>
      {colors.concat(colors).map((c, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 60 + p * 230;
        return (
          <path
            key={i}
            d={starPath(x + Math.cos(a) * r, y + Math.sin(a) * r, 22, 9)}
            fill={c}
            stroke={OUTLINE}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
};

/* ---------- character ---------- */

export const Veggie: React.FC<{
  kind: VeggieKind;
  x: number;
  y: number;
  enterAt: number;
  talkFrom: number;
  talkTo: number;
  danceAt: number;
  heyAt: number;
  phase: number;
}> = ({ kind, x, y, enterAt, talkFrom, talkTo, danceAt, heyAt, phase }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < enterAt) return null;

  const spec = SPECS[kind];
  const Body = BODIES[kind];
  const local = frame - enterAt;
  const t = frame + phase * 17;

  const pop = spring({
    frame: local,
    fps,
    config: { damping: 9, stiffness: 140, mass: 0.7 },
  });
  const hop = local < 20 ? -Math.sin((local / 20) * Math.PI) * 150 : 0;

  const wTalk = Math.min(
    interpolate(frame, [talkFrom, talkFrom + 6], [0, 1], clamp),
    interpolate(frame, [talkTo - 6, talkTo], [1, 0], clamp),
  );
  const wDance = interpolate(frame, [danceAt, danceAt + 8], [0, 1], clamp);

  const beat = ((frame - danceAt) * Math.PI) / 15;
  const air = Math.abs(Math.sin(beat));
  // "Hey!" - one big jump with both arms straight up
  const heyT = (frame - heyAt) / 24;
  const wHey = heyT > 0 && heyT < 1 ? Math.sin(heyT * Math.PI) : 0;
  // Before the chorus, nod to the beat
  const nod = (1 - wDance) * Math.abs(Math.sin((frame * Math.PI) / 15)) * 10;
  const jump = wDance * -air * 85 * (1 - wHey) - wHey * 230 - nod;
  const ground = wDance * Math.pow(1 - air, 6);
  const breathe = Math.sin(t * 0.15);
  const sy = (1 + breathe * 0.025) * (1 - 0.13 * ground);
  const sx = (1 - breathe * 0.02) * (1 + 0.11 * ground);

  const rot =
    (1 - wDance) * (Math.sin(t * 0.07) * 3 + wTalk * Math.sin(frame * 0.22) * 5) +
    wDance * Math.sin(beat) * 10;

  const baseR = -22 + Math.sin(t * 0.1) * 8;
  const baseL = 22 - Math.sin(t * 0.1 + 1) * 8;
  const aR = mix(mix(mix(baseR, -150 + Math.sin(frame * 0.5) * 28, wTalk), -145 + Math.sin(beat * 2) * 25, wDance), -172, wHey);
  const aL = mix(mix(mix(baseL, 38, wTalk), 145 + Math.sin(beat * 2) * 25, wDance), 172, wHey);

  const mouth = mix(
    mix(0.18, 0.2 + 0.8 * Math.abs(Math.sin(frame * 0.45)), wTalk),
    0.45 + 0.45 * Math.abs(Math.sin(frame * 0.4 + phase)),
    wDance,
  );
  const cyc = (frame + phase * 29) % 90;
  const blink = cyc < 6 ? interpolate(cyc, [0, 3, 6], [1, 0.08, 1]) : 1;
  const brow = wTalk * 7 + wDance * 9;
  const pupilX = Math.sin(t * 0.05) * 4;
  const pupilY = -wDance * 3;

  const [shx, shy] = spec.shoulder;

  return (
    <>
      <g
        transform={`translate(${x} ${y + hop + jump}) rotate(${rot}) scale(${sx * pop} ${sy * pop})`}
      >
        <ellipse cx={0} cy={-4} rx={90} ry={16} fill="#000" opacity={0} />
        <Legs spec={spec} spread={wDance * air * 14} />
        <Body t={t} />
        <Face
          spec={spec}
          blink={blink}
          mouth={mouth}
          pupilX={pupilX}
          pupilY={pupilY}
          brow={brow}
        />
        <Arm x={shx} y={shy} angle={aR} side={1} />
        <Arm x={-shx} y={shy} angle={aL} side={-1} />
      </g>
      <Burst x={x} y={y - spec.height / 2} local={local - 4} />
    </>
  );
};

export const Shadow: React.FC<{ x: number; y: number; enterAt: number; danceAt: number; phase: number }> = ({
  x,
  y,
  enterAt,
  danceAt,
  phase,
}) => {
  const frame = useCurrentFrame();
  if (frame < enterAt) return null;
  const beat = ((frame - danceAt) * Math.PI) / 15 + phase * 0;
  const wDance = interpolate(frame, [danceAt, danceAt + 8], [0, 1], clamp);
  const air = wDance * Math.abs(Math.sin(beat));
  const appear = interpolate(frame, [enterAt, enterAt + 12], [0, 1], clamp);
  return (
    <ellipse
      cx={x}
      cy={y - 4}
      rx={95 * (1 - air * 0.3) * appear}
      ry={18 * (1 - air * 0.3) * appear}
      fill="#1d6b1f"
      opacity={0.3}
    />
  );
};
