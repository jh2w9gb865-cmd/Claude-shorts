import React from "react";
import { OUTLINE as O, SW } from "../cartoon/shared";
import { Cheeks, Eye, Mouth, Pose } from "../characters/Animals";

export type { Pose };
export { O, SW };

/** Thin arm with a white glove (for objects: tooth, soap, shapes, fruit...). 0 = hanging down. */
export const StickArm: React.FC<{ x: number; y: number; angle: number; side: 1 | -1; len?: number; color?: string; glove?: string }> = ({
  x,
  y,
  angle,
  side,
  len = 80,
  color = O,
  glove = "#fff",
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path d={`M 0 0 Q ${side * 14} ${len / 2} 0 ${len}`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={len + 10} r={17} fill={glove} stroke={O} strokeWidth={5} />
  </g>
);

/** Chunky furry/coloured limb. */
export const FurArm: React.FC<{ x: number; y: number; angle: number; color: string; len?: number; w?: number; tip?: string }> = ({
  x,
  y,
  angle,
  color,
  len = 72,
  w = 28,
  tip,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <rect x={-w / 2} y={-8} width={w} height={len} rx={w / 2} fill={color} stroke={O} strokeWidth={SW} />
    {tip ? <ellipse cx={0} cy={len - 10} rx={w / 2 + 2} ry={10} fill={tip} stroke={O} strokeWidth={4} /> : null}
  </g>
);

/** Two stick legs and shoes, or just feet when top is omitted. */
export const Legs: React.FC<{ dx: number; top?: number; shoe: string; leg?: string; legW?: number }> = ({ dx, top, shoe, leg = O, legW = 11 }) => (
  <>
    {[-1, 1].map((s) => (
      <g key={s}>
        {top !== undefined ? (
          <path d={`M ${s * (dx - 6)} ${top} L ${s * dx} -14`} stroke={leg} strokeWidth={legW} strokeLinecap="round" />
        ) : null}
        <ellipse cx={s * (dx + 8)} cy={-10} rx={27} ry={14} fill={shoe} stroke={O} strokeWidth={5} />
      </g>
    ))}
  </>
);

/** Eyes, cheeks and a talking mouth. */
export const Face: React.FC<{ p: Pose; y: number; dx: number; r: number; mouthY: number; w?: number; cheeks?: boolean }> = ({
  p,
  y,
  dx,
  r,
  mouthY,
  w = 22,
  cheeks = true,
}) => (
  <>
    {cheeks ? <Cheeks y={mouthY - 6} dx={dx + r + 4} r={r * 0.85} /> : null}
    <Eye x={-dx} y={y} r={r} blink={p.blink} />
    <Eye x={dx} y={y} r={r} blink={p.blink} />
    <Mouth y={mouthY} w={w} open={p.mouth} />
  </>
);

/** Sleepy closed eyes (for calm/bedtime moments). */
export const SleepyEyes: React.FC<{ y: number; dx: number; r: number }> = ({ y, dx, r }) => (
  <>
    {[-1, 1].map((s) => (
      <path key={s} d={`M ${s * dx - r} ${y} Q ${s * dx} ${y + r * 0.8} ${s * dx + r} ${y}`} stroke={O} strokeWidth={6} fill="none" strokeLinecap="round" />
    ))}
  </>
);

export const fill = (color: string) => ({ fill: color, stroke: O, strokeWidth: SW, strokeLinejoin: "round" as const });

/** Union of circles with a single outer outline (clouds, florets, fluffy wool). */
export const Puff: React.FC<{ circles: [number, number, number][]; color: string }> = ({ circles, color }) => (
  <>
    {circles.map(([x, y, r], i) => (
      <circle key={`o${i}`} cx={x} cy={y} r={r + SW / 2} fill={O} />
    ))}
    {circles.map(([x, y, r], i) => (
      <circle key={`f${i}`} cx={x} cy={y} r={r - SW / 2} fill={color} />
    ))}
  </>
);
