import React from "react";
import { starPath } from "../cartoon/shared";
import { Cheeks, Eye, Mouth } from "../characters/Animals";
import { Face, FurArm, Legs, O, Pose, StickArm, fill } from "./kit";

export const ChristmasTree: React.FC<Pose> = (p) => {
  const ornaments: [number, number, string][] = [
    [-90, -110, "#ff3b3b"], [70, -120, "#2fa8ff"], [-60, -215, "#ffd60a"], [55, -225, "#ff4f9a"],
    [-35, -320, "#8e5bff"], [40, -330, "#ff8a1f"], [110, -105, "#ffd60a"], [-115, -100, "#2fa8ff"],
  ];
  return (
    <g>
      <Legs dx={30} top={-40} shoe="#ff3b3b" />
      <rect x={-26} y={-100} width={52} height={62} rx={8} {...fill("#8a5a2b")} />
      <path d="M -145 -88 L 0 -262 L 145 -88 Z" {...fill("#2fae4a")} />
      <path d="M -118 -190 L 0 -345 L 118 -190 Z" {...fill("#3ec43e")} />
      <path d="M -88 -292 L 0 -420 L 88 -292 Z" {...fill("#46c33a")} />
      <path d="M -120 -110 Q 0 -60 120 -112" stroke="#ffd60a" strokeWidth={8} fill="none" strokeDasharray="2 14" strokeLinecap="round" />
      <path d="M -95 -212 Q 0 -168 95 -214" stroke="#ff4f9a" strokeWidth={8} fill="none" strokeDasharray="2 14" strokeLinecap="round" />
      {ornaments.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r={13} fill={c} stroke={O} strokeWidth={4} opacity={0.6 + 0.4 * Math.abs(Math.sin(p.t * 0.15 + i))} />
      ))}
      <g transform={`rotate(${Math.sin(p.t * 0.1) * 12} 0 -440)`}>
        <path d={starPath(0, -440, 36, 16)} {...fill("#ffd60a")} />
      </g>
      <StickArm x={-112} y={-150} angle={p.armL} side={-1} />
      <StickArm x={112} y={-150} angle={p.armR} side={1} />
      <Face p={p} y={-172} dx={32} r={16} mouthY={-132} />
    </g>
  );
};

export const Penguin: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} shoe="#ff8a1f" />
    <FurArm x={-78} y={-160} angle={p.armL} color="#2b3a67" len={78} w={30} />
    <FurArm x={78} y={-160} angle={p.armR} color="#2b3a67" len={78} w={30} />
    <ellipse cx={0} cy={-130} rx={86} ry={118} {...fill("#2b3a67")} />
    <ellipse cx={0} cy={-112} rx={60} ry={90} fill="#ffffff" />
    <path d="M -62 -222 C -60 -280 60 -280 62 -222 Z" {...fill("#ff3b3b")} />
    <rect x={-66} y={-230} width={132} height={20} rx={10} {...fill("#ffffff")} />
    <circle cx={0} cy={-268} r={16} {...fill("#ffffff")} />
    <Cheeks y={-152} dx={46} r={13} />
    <Eye x={-24} y={-180} r={14} blink={p.blink} />
    <Eye x={24} y={-180} r={14} blink={p.blink} />
    <g transform="translate(0 -158)">
      <path d="M -16 0 L 16 0 L 0 -12 Z" {...fill("#ffb703")} strokeWidth={4} />
      <path d={`M -14 2 L 14 2 L 0 ${8 + 18 * p.mouth} Z`} {...fill("#ffb703")} strokeWidth={4} />
    </g>
  </g>
);

export const Reindeer: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={32} top={-70} shoe="#5a3216" />
    <FurArm x={-62} y={-145} angle={p.armL} color="#a8692f" tip="#5a3216" />
    <FurArm x={62} y={-145} angle={p.armR} color="#a8692f" tip="#5a3216" />
    <ellipse cx={0} cy={-115} rx={68} ry={78} {...fill("#b9773a")} />
    <ellipse cx={0} cy={-105} rx={40} ry={52} fill="#f2d2a6" />
    {[-1, 1].map((s) => (
      <g key={s}>
        <path d={`M ${s * 30} -300 Q ${s * 50} -370 ${s * 40} -410 M ${s * 44} -360 Q ${s * 80} -370 ${s * 95} -400 M ${s * 46} -385 Q ${s * 20} -400 ${s * 14} -420`} stroke="#6b3e1a" strokeWidth={13} fill="none" strokeLinecap="round" />
        <ellipse cx={s * 82} cy={-268} rx={30} ry={14} transform={`rotate(${s * 25} ${s * 82} -268)`} {...fill("#b9773a")} />
      </g>
    ))}
    <circle cx={0} cy={-250} r={78} {...fill("#b9773a")} />
    <ellipse cx={0} cy={-212} rx={44} ry={34} {...fill("#f2d2a6")} />
    <circle cx={0} cy={-232} r={17} fill="#ff2d2d" stroke={O} strokeWidth={5} />
    <circle cx={-5} cy={-237} r={5} fill="#fff" />
    <Eye x={-30} y={-270} r={14} blink={p.blink} />
    <Eye x={30} y={-270} r={14} blink={p.blink} />
    <Cheeks y={-224} dx={56} r={13} />
    <Mouth y={-202} w={16} open={p.mouth} />
  </g>
);

export const Gingerbread: React.FC<Pose> = (p) => (
  <g>
    {[-1, 1].map((s) => (
      <rect key={s} x={s * 38 - 24} y={-80} width={48} height={78} rx={24} {...fill("#c8783a")} />
    ))}
    <FurArm x={-66} y={-170} angle={p.armL} color="#c8783a" len={70} w={36} />
    <FurArm x={66} y={-170} angle={p.armR} color="#c8783a" len={70} w={36} />
    <rect x={-72} y={-200} width={144} height={150} rx={52} {...fill("#c8783a")} />
    <circle cx={0} cy={-258} r={70} {...fill("#c8783a")} />
    <path d="M -50 -200 l 12 10 l 12 -10 l 12 10 l 12 -10 l 12 10 l 12 -10 l 12 10 l 12 -10" stroke="#fff" strokeWidth={6} fill="none" strokeLinejoin="round" />
    {[-150, -110].map((y, i) => (
      <circle key={y} cx={0} cy={y} r={11} fill={i ? "#3ec43e" : "#ff3b3b"} stroke={O} strokeWidth={4} />
    ))}
    {[-1, 1].map((s) => (
      <path key={`l${s}`} d={`M ${s * 26} -12 q ${s * 10} -8 ${s * 20} 0 q ${s * 10} 8 ${s * 20} 0`} stroke="#fff" strokeWidth={5} fill="none" />
    ))}
    <Face p={p} y={-270} dx={25} r={13} mouthY={-236} w={18} />
  </g>
);

export const Bunny: React.FC<Pose> = (p) => (
  <g>
    {[-1, 1].map((s) => (
      <g key={s} transform={`rotate(${s * 12 + Math.sin(p.t * 0.12 + s) * 4} ${s * 30} -290)`}>
        <ellipse cx={s * 30} cy={-345} rx={24} ry={72} {...fill("#f6f2ff")} />
        <ellipse cx={s * 30} cy={-340} rx={11} ry={50} fill="#ffb3cf" />
      </g>
    ))}
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 38} cy={-12} rx={34} ry={18} {...fill("#f6f2ff")} />
    ))}
    <FurArm x={-58} y={-140} angle={p.armL} color="#f6f2ff" />
    <FurArm x={58} y={-140} angle={p.armR} color="#f6f2ff" />
    <ellipse cx={0} cy={-100} rx={72} ry={82} {...fill("#f6f2ff")} />
    <ellipse cx={0} cy={-90} rx={42} ry={52} fill="#ffe1ec" />
    <circle cx={0} cy={-230} r={78} {...fill("#f6f2ff")} />
    <path d="M -9 -218 L 9 -218 L 0 -207 Z" fill="#ff6fa5" stroke={O} strokeWidth={4} strokeLinejoin="round" />
    <Face p={p} y={-242} dx={28} r={14} mouthY={-198} w={18} />
  </g>
);

export const makeBear = (fur: string, belly: string): React.FC<Pose> => (p) => (
  <g>
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 42} cy={-12} rx={36} ry={20} {...fill(fur)} />
    ))}
    <FurArm x={-72} y={-140} angle={p.armL} color={fur} len={78} w={32} />
    <FurArm x={72} y={-140} angle={p.armR} color={fur} len={78} w={32} />
    <ellipse cx={0} cy={-105} rx={86} ry={90} {...fill(fur)} />
    <ellipse cx={0} cy={-95} rx={52} ry={58} fill={belly} />
    {[-1, 1].map((s) => (
      <g key={`e${s}`}>
        <circle cx={s * 62} cy={-305} r={30} {...fill(fur)} />
        <circle cx={s * 62} cy={-305} r={15} fill={belly} />
      </g>
    ))}
    <circle cx={0} cy={-240} r={86} {...fill(fur)} />
    <ellipse cx={0} cy={-208} rx={42} ry={32} {...fill(belly)} strokeWidth={5} />
    <ellipse cx={0} cy={-224} rx={14} ry={10} fill={O} />
    <Cheeks y={-215} dx={58} />
    <Eye x={-32} y={-258} r={14} blink={p.blink} />
    <Eye x={32} y={-258} r={14} blink={p.blink} />
    <Mouth y={-200} w={18} open={p.mouth} />
  </g>
);
export const Bear = makeBear("#b9773a", "#eabd84");
export const PolarBear = makeBear("#f4f8ff", "#dfe9f7");

export const Snowman: React.FC<Pose> = (p) => (
  <g>
    <circle cx={0} cy={-95} r={95} {...fill("#ffffff")} />
    <g transform={`translate(-62 -240) rotate(${p.armL})`}>
      <path d="M 0 0 L 0 88 M 0 50 L -18 70" stroke="#7a4a1f" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={96} r={17} {...fill("#ff3b3b")} strokeWidth={5} />
    </g>
    <g transform={`translate(62 -240) rotate(${p.armR})`}>
      <path d="M 0 0 L 0 88 M 0 50 L 18 70" stroke="#7a4a1f" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={96} r={17} {...fill("#ff3b3b")} strokeWidth={5} />
    </g>
    <circle cx={0} cy={-232} r={70} {...fill("#ffffff")} />
    {[-255, -220, -185].map((y) => (
      <circle key={y} cx={0} cy={y} r={8} fill={O} />
    ))}
    <circle cx={0} cy={-350} r={60} {...fill("#ffffff")} />
    <path d="M -62 -300 Q 0 -278 62 -300 L 60 -282 Q 0 -260 -60 -282 Z" {...fill("#ff3b3b")} />
    <rect x={18} y={-292} width={24} height={64} rx={10} transform="rotate(-10 30 -292)" {...fill("#ff3b3b")} />
    <rect x={-62} y={-405} width={124} height={16} rx={6} {...fill("#2b1a3d")} />
    <rect x={-40} y={-470} width={80} height={70} rx={8} {...fill("#2b1a3d")} />
    <rect x={-40} y={-425} width={80} height={14} fill="#ff3b3b" />
    <Cheeks y={-334} dx={42} r={12} />
    <Eye x={-22} y={-362} r={12} blink={p.blink} />
    <Eye x={22} y={-362} r={12} blink={p.blink} />
    <path d="M 0 -345 L 38 -336 L 0 -330 Z" {...fill("#ff8a1f")} strokeWidth={4} />
    <Mouth y={-318} w={18} open={p.mouth} />
  </g>
);

export const Santa: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={36} top={-50} shoe="#2b1a3d" legW={16} />
    <FurArm x={-84} y={-170} angle={p.armL} color="#e8262b" len={80} w={34} tip="#ffffff" />
    <FurArm x={84} y={-170} angle={p.armR} color="#e8262b" len={80} w={34} tip="#ffffff" />
    <ellipse cx={0} cy={-135} rx={96} ry={108} {...fill("#e8262b")} />
    <rect x={-92} y={-118} width={184} height={26} fill={O} />
    <rect x={-20} y={-122} width={40} height={34} rx={6} fill="#ffd60a" stroke={O} strokeWidth={5} />
    <path d="M -80 -50 Q 0 -20 80 -50" stroke="#fff" strokeWidth={18} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-282} r={64} {...fill("#ffd9b8")} />
    <path d="M -64 -270 C -70 -200 -30 -180 0 -178 C 30 -180 70 -200 64 -270 C 40 -240 -40 -240 -64 -270 Z" {...fill("#ffffff")} />
    <path d="M -66 -310 C -50 -390 40 -400 70 -330 L 100 -360" stroke="none" fill="none" />
    <path d={`M -66 -310 C -40 -385 40 -390 66 -310 Z`} {...fill("#e8262b")} />
    <path d={`M 30 -372 Q 80 -380 ${96 + Math.sin(p.t * 0.12) * 6} -330`} stroke="#e8262b" strokeWidth={30} fill="none" strokeLinecap="round" />
    <circle cx={96 + Math.sin(p.t * 0.12) * 6} cy={-322} r={18} {...fill("#ffffff")} />
    <rect x={-72} y={-322} width={144} height={26} rx={13} {...fill("#ffffff")} />
    <Cheeks y={-262} dx={40} r={13} />
    <Eye x={-24} y={-282} r={12} blink={p.blink} />
    <Eye x={24} y={-282} r={12} blink={p.blink} />
    <ellipse cx={0} cy={-262} rx={12} ry={10} fill="#ffad8a" stroke={O} strokeWidth={4} />
    <Mouth y={-236} w={16} open={p.mouth} />
  </g>
);

export const makeElf = (suit: string, hat: string): React.FC<Pose> => (p) => (
  <g>
    {[-1, 1].map((s) => (
      <path key={s} d={`M ${s * 24} -60 L ${s * 26} -14 L ${s * 62} -16 Q ${s * 70} -30 ${s * 58} -34`} stroke={O} strokeWidth={5} fill={hat} strokeLinejoin="round" />
    ))}
    <FurArm x={-58} y={-160} angle={p.armL} color={suit} len={70} w={28} tip="#ffd9b8" />
    <FurArm x={58} y={-160} angle={p.armR} color={suit} len={70} w={28} tip="#ffd9b8" />
    <path d="M -64 -190 L 64 -190 L 80 -60 Q 0 -40 -80 -60 Z" {...fill(suit)} />
    <rect x={-70} y={-112} width={140} height={20} fill={O} />
    <rect x={-14} y={-116} width={28} height={28} rx={5} fill="#ffd60a" stroke={O} strokeWidth={4} />
    <path d="M -50 -60 l 12 14 l 12 -14 l 12 14 l 12 -14 l 12 14 l 12 -14 l 12 14 l 12 -14" stroke={hat} strokeWidth={8} fill="none" strokeLinejoin="round" />
    {[-1, 1].map((s) => (
      <path key={`ear${s}`} d={`M ${s * 58} -262 L ${s * 100} -290 L ${s * 64} -232 Z`} {...fill("#ffd9b8")} />
    ))}
    <circle cx={0} cy={-250} r={62} {...fill("#ffd9b8")} />
    <path d={`M -62 -268 C -40 -330 30 -330 62 -268 Z`} {...fill(hat)} />
    <path d={`M -30 -310 Q 40 -380 ${110 + Math.sin(p.t * 0.12) * 8} -330`} stroke={hat} strokeWidth={26} fill="none" strokeLinecap="round" />
    <circle cx={110 + Math.sin(p.t * 0.12) * 8} cy={-324} r={15} {...fill("#ffd60a")} />
    <rect x={-66} y={-282} width={132} height={22} rx={11} {...fill("#ffffff")} />
    <Face p={p} y={-238} dx={24} r={13} mouthY={-206} w={16} />
  </g>
);
export const ElfGreen = makeElf("#3ec43e", "#e8262b");
export const ElfRed = makeElf("#e8262b", "#3ec43e");
