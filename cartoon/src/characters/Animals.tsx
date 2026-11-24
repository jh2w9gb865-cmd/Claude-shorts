import React from "react";
import { OUTLINE, SW } from "../cartoon/shared";

/** Pose shared by every animal: eyelids, mouth opening, arm angles (0 = hanging down). */
export type Pose = {
  blink: number;
  mouth: number;
  armL: number;
  armR: number;
  t: number;
};

/* ---------- face parts ---------- */

export const Eye: React.FC<{ x: number; y: number; r: number; blink: number }> = ({ x, y, r, blink }) => (
  <g transform={`translate(${x} ${y}) scale(1 ${blink})`}>
    <ellipse rx={r} ry={r * 1.18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <circle cx={1} cy={3} r={r * 0.6} fill={OUTLINE} />
    <circle cx={-r * 0.22} cy={-r * 0.2} r={r * 0.24} fill="#fff" />
  </g>
);

export const Cheeks: React.FC<{ y: number; dx: number; r?: number }> = ({ y, dx, r = 16 }) => (
  <>
    {[-1, 1].map((s) => (
      <ellipse key={s} cx={s * dx} cy={y} rx={r} ry={r * 0.6} fill="#ff6fa5" opacity={0.75} />
    ))}
  </>
);

export const Mouth: React.FC<{ y: number; w?: number; open: number }> = ({ y, w = 24, open }) => (
  <g transform={`translate(0 ${y})`}>
    <path
      d={`M ${-w} 0 Q 0 6 ${w} 0 Q 0 ${10 + 40 * open} ${-w} 0 Z`}
      fill="#8b1e3f"
      stroke={OUTLINE}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    {open > 0.3 ? <ellipse cx={0} cy={3 + 14 * open} rx={w * 0.42} ry={2 + 5 * open} fill="#ff6f91" /> : null}
  </g>
);

/** Arm as a rounded limb pivoting at the shoulder; angle 0 hangs straight down. */
export const Limb: React.FC<{ x: number; y: number; angle: number; color: string; len?: number; w?: number }> = ({
  x,
  y,
  angle,
  color,
  len = 70,
  w = 28,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <rect x={-w / 2} y={-8} width={w} height={len} rx={w / 2} fill={color} stroke={OUTLINE} strokeWidth={SW} />
  </g>
);

/** Bird wing pivoting at the shoulder. */
export const Wing: React.FC<{ x: number; y: number; angle: number; side: 1 | -1; color: string }> = ({
  x,
  y,
  angle,
  side,
  color,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path
      d={`M 0 -6 C ${side * 34} 6 ${side * 30} 62 ${side * 6} 74 C ${-side * 14} 56 ${-side * 14} 14 0 -6 Z`}
      fill={color}
      stroke={OUTLINE}
      strokeWidth={SW}
      strokeLinejoin="round"
    />
  </g>
);

export const Feet: React.FC<{ dx: number; color: string; legTop?: number }> = ({ dx, color, legTop }) => (
  <>
    {[-1, 1].map((s) => (
      <g key={s}>
        {legTop !== undefined ? (
          <path d={`M ${s * (dx - 6)} ${legTop} L ${s * dx} -14`} stroke={OUTLINE} strokeWidth={11} strokeLinecap="round" />
        ) : null}
        <ellipse cx={s * (dx + 8)} cy={-10} rx={28} ry={15} fill={color} stroke={OUTLINE} strokeWidth={5} />
      </g>
    ))}
  </>
);

/* ---------- animals (feet at 0,0) ---------- */

export const Ladybug: React.FC<Pose> = ({ blink, mouth, armL, armR, t }) => (
  <g>
    <Feet dx={34} color="#2b1a3d" legTop={-70} />
    <Limb x={-82} y={-150} angle={armL} color="#3a2650" len={66} w={22} />
    <Limb x={82} y={-150} angle={armR} color="#3a2650" len={66} w={22} />
    <circle cx={0} cy={-145} r={100} fill="#ff3b3b" stroke={OUTLINE} strokeWidth={SW} />
    <path d="M 0 -245 L 0 -48" stroke={OUTLINE} strokeWidth={6} />
    {[
      [-50, -180, 18],
      [52, -175, 20],
      [-58, -110, 16],
      [55, -105, 15],
      [-22, -75, 11],
      [24, -70, 11],
    ].map(([x, y, r]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={OUTLINE} />
    ))}
    <ellipse cx={-55} cy={-205} rx={18} ry={10} fill="#fff" opacity={0.5} transform="rotate(-35 -55 -205)" />
    {[-1, 1].map((s) => (
      <g key={`a${s}`} transform={`rotate(${Math.sin(t * 0.15 + s) * 6} ${s * 18} -300)`}>
        <path d={`M ${s * 16} -300 Q ${s * 30} -340 ${s * 48} -352`} stroke={OUTLINE} strokeWidth={6} fill="none" strokeLinecap="round" />
        <circle cx={s * 50} cy={-354} r={12} fill="#ff3b3b" stroke={OUTLINE} strokeWidth={5} />
      </g>
    ))}
    <circle cx={0} cy={-262} r={62} fill="#3a2650" stroke={OUTLINE} strokeWidth={SW} />
    <Cheeks y={-240} dx={40} r={13} />
    <Eye x={-22} y={-272} r={15} blink={blink} />
    <Eye x={22} y={-272} r={15} blink={blink} />
    <Mouth y={-236} w={18} open={mouth} />
  </g>
);

export const Fox: React.FC<Pose> = ({ blink, mouth, armL, armR, t }) => (
  <g>
    <g transform={`rotate(${Math.sin(t * 0.12) * 10} 60 -80)`}>
      <path
        d="M 60 -80 C 150 -90 175 -180 140 -240 C 120 -190 95 -140 55 -125 Z"
        fill="#ff8a1f"
        stroke={OUTLINE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M 140 -240 C 150 -215 152 -195 146 -180 C 132 -192 128 -210 140 -240 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    </g>
    <Feet dx={30} color="#5a3216" legTop={-70} />
    <Limb x={-58} y={-150} angle={armL} color="#ff8a1f" />
    <Limb x={58} y={-150} angle={armR} color="#ff8a1f" />
    <ellipse cx={0} cy={-115} rx={66} ry={78} fill="#ff8a1f" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-105} rx={38} ry={52} fill="#fff4e6" />
    {[-1, 1].map((s) => (
      <g key={s}>
        <path d={`M ${s * 30} -280 L ${s * 70} -362 L ${s * 86} -262 Z`} fill="#ff8a1f" stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="round" />
        <path d={`M ${s * 46} -284 L ${s * 68} -334 L ${s * 74} -276 Z`} fill="#3a2650" />
      </g>
    ))}
    <path
      d="M -92 -250 C -92 -300 92 -300 92 -250 C 92 -215 40 -175 0 -170 C -40 -175 -92 -215 -92 -250 Z"
      fill="#ff8a1f"
      stroke={OUTLINE}
      strokeWidth={SW}
      strokeLinejoin="round"
    />
    <path d="M -80 -232 C -55 -228 -20 -205 0 -172 C 20 -205 55 -228 80 -232 C 60 -200 30 -176 0 -172 C -30 -176 -60 -200 -80 -232 Z" fill="#fff4e6" />
    <ellipse cx={0} cy={-212} rx={11} ry={8} fill={OUTLINE} />
    <Cheeks y={-222} dx={50} r={13} />
    <Eye x={-30} y={-252} r={14} blink={blink} />
    <Eye x={30} y={-252} r={14} blink={blink} />
    <Mouth y={-196} w={16} open={mouth} />
  </g>
);

export const Chick: React.FC<Pose> = ({ blink, mouth, armL, armR }) => (
  <g>
    <Feet dx={26} color="#ff8a1f" />
    <Wing x={-80} y={-130} angle={armL} side={-1} color="#ffc300" />
    <Wing x={80} y={-130} angle={armR} side={1} color="#ffc300" />
    <circle cx={0} cy={-105} r={92} fill="#ffd60a" stroke={OUTLINE} strokeWidth={SW} />
    <path
      d="M -6 -192 Q -24 -236 -2 -240 Q 2 -218 10 -240 Q 30 -234 8 -192"
      fill="#ffd60a"
      stroke={OUTLINE}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    <circle cx={-38} cy={-150} r={14} fill="#fff6a8" />
    <Cheeks y={-98} dx={54} r={15} />
    <Eye x={-30} y={-130} r={15} blink={blink} />
    <Eye x={30} y={-130} r={15} blink={blink} />
    <g transform={`translate(0 -104)`}>
      <path d="M -20 0 L 20 0 L 0 -14 Z" fill="#ff8a1f" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -18 2 L 18 2 L 0 ${10 + 22 * mouth} Z`} fill="#ff8a1f" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    </g>
  </g>
);

export const Frog: React.FC<Pose> = ({ blink, mouth, armL, armR }) => (
  <g>
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 62} cy={-14} rx={42} ry={18} fill="#2fae4a" stroke={OUTLINE} strokeWidth={SW} />
    ))}
    <Limb x={-84} y={-112} angle={armL} color="#46c33a" />
    <Limb x={84} y={-112} angle={armR} color="#46c33a" />
    <ellipse cx={0} cy={-100} rx={102} ry={86} fill="#46c33a" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-76} rx={62} ry={48} fill="#b8f08a" />
    {[-1, 1].map((s) => (
      <g key={`e${s}`}>
        <circle cx={s * 46} cy={-174} r={38} fill="#46c33a" stroke={OUTLINE} strokeWidth={SW} />
        <Eye x={s * 46} y={-174} r={22} blink={blink} />
      </g>
    ))}
    <Cheeks y={-120} dx={70} />
    <g transform="translate(0 -124)">
      <path
        d={`M -52 0 Q 0 ${30 + 20 * mouth} 52 0 Q 0 ${8 + 30 * mouth} -52 0 Z`}
        fill="#8b1e3f"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
    </g>
  </g>
);

export const Bluebird: React.FC<Pose> = ({ blink, mouth, armL, armR, t }) => (
  <g>
    <Feet dx={24} color="#ff8a1f" legTop={-40} />
    <g transform={`rotate(${Math.sin(t * 0.2) * 8} -70 -90)`}>
      <path d="M -70 -90 L -128 -60 L -118 -100 L -136 -122 Z" fill="#1f86e0" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    </g>
    <Wing x={-78} y={-140} angle={armL} side={-1} color="#1f86e0" />
    <Wing x={78} y={-140} angle={armR} side={1} color="#1f86e0" />
    <circle cx={0} cy={-120} r={90} fill="#2fa8ff" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-88} rx={55} ry={50} fill="#d6efff" />
    <path d="M 0 -208 Q -10 -250 14 -252 Q 4 -232 18 -222" fill="#2fa8ff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <Cheeks y={-118} dx={56} r={14} />
    <Eye x={-30} y={-148} r={15} blink={blink} />
    <Eye x={30} y={-148} r={15} blink={blink} />
    <g transform="translate(0 -120)">
      <path d="M -18 0 L 18 0 L 0 -14 Z" fill="#ffb703" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -16 2 L 16 2 L 0 ${10 + 20 * mouth} Z`} fill="#ffb703" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    </g>
  </g>
);

const GRAPES: [number, number][] = [
  [-60, -270],
  [0, -280],
  [60, -270],
  [-85, -210],
  [85, -210],
  [-60, -150],
  [60, -150],
  [-30, -100],
  [30, -100],
  [0, -65],
];

export const Grapes: React.FC<Pose> = ({ blink, mouth, armL, armR, t }) => (
  <g>
    <Feet dx={28} color="#ff4f9a" legTop={-60} />
    <Limb x={-92} y={-180} angle={armL} color="#7c4dff" len={66} w={24} />
    <Limb x={92} y={-180} angle={armR} color="#7c4dff" len={66} w={24} />
    {GRAPES.map(([x, y]) => (
      <circle key={`o${x}${y}`} cx={x} cy={y} r={40 + SW / 2} fill={OUTLINE} />
    ))}
    {GRAPES.map(([x, y]) => (
      <circle key={`f${x}${y}`} cx={x} cy={y} r={40 - SW / 2} fill="#8e5bff" />
    ))}
    {GRAPES.map(([x, y]) => (
      <circle key={`h${x}${y}`} cx={x - 13} cy={y - 13} r={9} fill="#c4a6ff" />
    ))}
    <circle cx={0} cy={-185} r={78 + SW / 2} fill={OUTLINE} />
    <circle cx={0} cy={-185} r={78 - SW / 2} fill="#9a6bff" />
    <circle cx={-34} cy={-220} r={14} fill="#c4a6ff" />
    <g transform={`rotate(${Math.sin(t * 0.12) * 8} 0 -315)`}>
      <path d="M 0 -310 Q -4 -340 6 -360" stroke="#5a3216" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 4 -340 C 40 -380 90 -370 96 -340 C 60 -320 30 -322 4 -340 Z" fill="#46c33a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    </g>
    <Cheeks y={-162} dx={50} r={14} />
    <Eye x={-28} y={-196} r={16} blink={blink} />
    <Eye x={28} y={-196} r={16} blink={blink} />
    <Mouth y={-160} w={20} open={mouth} />
  </g>
);

export const ANIMALS = {
  ladybug: { C: Ladybug, height: 365 },
  fox: { C: Fox, height: 365 },
  chick: { C: Chick, height: 240 },
  frog: { C: Frog, height: 215 },
  bluebird: { C: Bluebird, height: 255 },
  grapes: { C: Grapes, height: 370 },
};
export type AnimalKind = keyof typeof ANIMALS;
