import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Layout } from "./layout";
import { OUTLINE, SW, clamp } from "./shared";

export const SKIES = {
  day: "linear-gradient(180deg, #2fb8ff 0%, #6fd2ff 45%, #c4f1ff 75%, #e9fbff 100%)",
  sunset: "linear-gradient(180deg, #ff7eb3 0%, #ff9f6e 40%, #ffd27a 72%, #fff1c1 100%)",
  magic: "linear-gradient(180deg, #6a4cff 0%, #a66bff 40%, #ff9ad5 75%, #ffe3f3 100%)",
};
export type SkyTheme = keyof typeof SKIES;

/** Lets a compilation repaint the sky of a song without touching the song itself. */
export const SkyContext = React.createContext<SkyTheme>("day");

export const Sky: React.FC = () => {
  const theme = React.useContext(SkyContext);
  return <AbsoluteFill style={{ background: SKIES[theme] }} />;
};

export const Sun: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 10, stiffness: 90 } });
  const rays = Array.from({ length: 12 });
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <g transform={`translate(${x} ${y}) scale(${pop})`}>
        <circle r={160} fill="#fff6a8" opacity={0.35} />
        <g transform={`rotate(${frame * 0.8})`}>
          {rays.map((_, i) => (
            <path
              key={i}
              d="M -22 -118 L 0 -175 L 22 -118 Z"
              transform={`rotate(${i * 30})`}
              fill={i % 2 ? "#ffb703" : "#ffd60a"}
              stroke={OUTLINE}
              strokeWidth={5}
              strokeLinejoin="round"
            />
          ))}
        </g>
        <circle r={105} fill="#ffd60a" stroke={OUTLINE} strokeWidth={SW} />
        <circle cx={-38} cy={-40} r={22} fill="#fff3a0" opacity={0.8} />
        {[-1, 1].map((s) => (
          <path
            key={s}
            d={`M ${s * 34 - 14} -12 Q ${s * 34} -28 ${s * 34 + 14} -12`}
            stroke={OUTLINE}
            strokeWidth={7}
            strokeLinecap="round"
            fill="none"
          />
        ))}
        {[-1, 1].map((s) => (
          <ellipse
            key={`c${s}`}
            cx={s * 58}
            cy={18}
            rx={16}
            ry={10}
            fill="#ff8fab"
            opacity={0.8}
          />
        ))}
        <path
          d="M -30 22 Q 0 58 30 22 Z"
          fill="#8b1e3f"
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const CLOUD: [number, number, number][] = [
  [-70, 10, 48],
  [-20, -25, 62],
  [45, -15, 55],
  [85, 15, 42],
  [10, 20, 50],
];

const Cloud: React.FC<{ x: number; y: number; scale: number }> = ({
  x,
  y,
  scale,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {CLOUD.map(([cx, cy, r]) => (
      <circle key={`o${cx}`} cx={cx} cy={cy} r={r + 3} fill={OUTLINE} opacity={0.9} />
    ))}
    {CLOUD.map(([cx, cy, r]) => (
      <circle key={`f${cx}`} cx={cx} cy={cy} r={r - 3} fill="#ffffff" />
    ))}
    <ellipse cx={10} cy={40} rx={95} ry={14} fill="#dff3ff" />
  </g>
);

export const Clouds: React.FC<{ clouds: Layout["clouds"] }> = ({ clouds }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {clouds.map((c, i) => {
        const x = ((c.x0 + frame * c.v + 200) % (width + 400)) - 200;
        const bob = Math.sin(frame * 0.05 + i) * 6;
        return <Cloud key={i} x={x} y={c.y + bob} scale={c.s} />;
      })}
    </svg>
  );
};

const RAINBOW = ["#ff3b3b", "#ff8a1f", "#ffd60a", "#3ec43e", "#2fa8ff", "#7c4dff"];

export const Rainbow: React.FC<{ startAt: number } & Layout["rainbow"]> = ({ startAt, cx, cy, r: r0 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const p = interpolate(frame, [startAt, startAt + 36], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  if (p <= 0) return null;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {RAINBOW.map((c, i) => {
        const r = r0 - i * 44;
        return (
          <path
            key={c}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            stroke={c}
            strokeWidth={46}
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

const Flower: React.FC<{ x: number; y: number; color: string; i: number; s?: number }> = ({
  x,
  y,
  color,
  i,
  s = 1,
}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.1 + i * 1.7) * 9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sway})`}>
      <path d="M 0 0 Q 6 -40 0 -78" stroke="#1f8a2b" strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={14} cy={-34} rx={16} ry={8} fill="#3ec43e" stroke={OUTLINE} strokeWidth={4} transform="rotate(-30 14 -34)" />
      <g transform={`translate(0 -86) rotate(${frame * 1.2 + i * 40})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            cx={Math.cos((a * Math.PI) / 180) * 22}
            cy={Math.sin((a * Math.PI) / 180) * 22}
            r={18}
            fill={color}
            stroke={OUTLINE}
            strokeWidth={4}
          />
        ))}
        <circle r={15} fill="#ffd60a" stroke={OUTLINE} strokeWidth={4} />
      </g>
    </g>
  );
};

export const Hills: React.FC<{ back: Layout["backHill"]; front: Layout["frontHill"] }> = ({ back, front }) => {
  const { width, height } = useVideoConfig();
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <path d={back.path} fill="#9be15d" stroke={OUTLINE} strokeWidth={SW} />
      <path d={back.shine} stroke="#c4f58a" strokeWidth={14} strokeLinecap="round" fill="none" />
      {back.flowers.map((f, i) => (
        <Flower key={`b${i}`} x={f.x} y={f.y} color={f.color} s={f.s} i={i} />
      ))}
      <path d={front.path} fill="#46c33a" stroke={OUTLINE} strokeWidth={SW} />
      <path d={front.shine} stroke="#7be06a" strokeWidth={14} strokeLinecap="round" fill="none" />
      {front.grass.map(([x, y], i) => (
        <g key={`grass${i}`} transform={`translate(${x} ${y})`}>
          {[-14, 0, 14].map((dx) => (
            <path
              key={dx}
              d={`M ${dx} 0 Q ${dx + 4} -18 ${dx * 1.6} -34`}
              stroke="#2a9a2a"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </g>
      ))}
      {front.flowers.map((f, i) => (
        <Flower key={`f${i}`} x={f.x} y={f.y} color={f.color} s={f.s} i={i + 5} />
      ))}
    </svg>
  );
};

export const Butterflies: React.FC<{ flies: Layout["butterflies"] }> = ({ flies }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {flies.map((b, i) => {
        const x = b.x0 + frame * b.v;
        const y = b.y0 + Math.sin(frame * 0.12 + b.ph) * 60;
        const flap = 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.7 + b.ph));
        const dir = b.v > 0 ? 1 : -1;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${dir} 1) rotate(15)`}>
            <g transform={`scale(${flap} 1)`}>
              {[-1, 1].map((s) => (
                <g key={s}>
                  <ellipse cx={s * 24} cy={-14} rx={24} ry={20} fill={b.color} stroke={OUTLINE} strokeWidth={4} />
                  <ellipse cx={s * 18} cy={14} rx={16} ry={14} fill={b.color} stroke={OUTLINE} strokeWidth={4} />
                  <circle cx={s * 24} cy={-14} r={7} fill="#ffffff" opacity={0.8} />
                </g>
              ))}
            </g>
            <ellipse rx={7} ry={24} fill={OUTLINE} />
            <path d="M -3 -22 Q -10 -38 -16 -40 M 3 -22 Q 10 -38 16 -40" stroke={OUTLINE} strokeWidth={3} fill="none" />
          </g>
        );
      })}
    </svg>
  );
};

const CONFETTI_COLORS = ["#ff3b3b", "#ff8a1f", "#ffd60a", "#3ec43e", "#2fa8ff", "#7c4dff", "#ff4f9a"];

export const Confetti: React.FC<{ startAt: number; count: number }> = ({ startAt, count }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - startAt;
  if (local < 0) return null;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const x0 = random(`x${i}`) * width;
        const y0 = -60 - random(`y${i}`) * 900;
        const v = 7 + random(`v${i}`) * 7;
        // first wave falls from above, then pieces keep looping for the whole chorus
        const travel = local * v;
        const y = travel < height + 140 - y0 ? y0 + travel : ((y0 + travel) % (height + 280)) - 140;
        const x = x0 + Math.sin(local * 0.1 + i) * 40;
        const rot = local * (4 + random(`r${i}`) * 8) + i * 30;
        const flip = Math.cos(local * 0.2 + i);
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const isStar = i % 5 === 0;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${isStar ? 1 : flip} 1)`}>
            {isStar ? (
              <path
                d="M 0 -20 L 6 -6 L 21 -6 L 9 4 L 13 19 L 0 10 L -13 19 L -9 4 L -21 -6 L -6 -6 Z"
                fill={color}
                stroke={OUTLINE}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            ) : (
              <rect x={-9} y={-15} width={18} height={30} rx={4} fill={color} />
            )}
          </g>
        );
      })}
    </svg>
  );
};
