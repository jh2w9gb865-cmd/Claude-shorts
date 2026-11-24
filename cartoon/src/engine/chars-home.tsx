import React from "react";
import { starPath } from "../cartoon/shared";
import { Wing } from "../characters/Animals";
import { Face, Legs, O, Pose, Puff, SW, StickArm, fill } from "./kit";

const Arms: React.FC<{ p: Pose; x: number; y: number; len?: number }> = ({ p, x, y, len }) => (
  <>
    <StickArm x={-x} y={y} angle={p.armL} side={-1} len={len} />
    <StickArm x={x} y={y} angle={p.armR} side={1} len={len} />
  </>
);

const Shine: React.FC<{ d: string }> = ({ d }) => (
  <path d={d} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.7} />
);

/* ---------- bathroom ---------- */

export const Tooth: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={40} shoe="#2fa8ff" />
    <Arms p={p} x={92} y={-210} />
    <path
      d="M -98 -240 C -98 -312 -42 -312 0 -290 C 42 -312 98 -312 98 -240 C 98 -160 82 -100 64 -42 C 54 -12 32 -12 26 -50 L 16 -112 C 10 -128 -10 -128 -16 -112 L -26 -50 C -32 -12 -54 -12 -64 -42 C -82 -100 -98 -160 -98 -240 Z"
      {...fill("#ffffff")}
    />
    <path d="M 60 -270 C 80 -250 82 -200 74 -170" stroke="#cfeaff" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={starPath(-70, -300, 16, 6, 4)} fill="#ffd60a" opacity={0.5 + 0.5 * Math.abs(Math.sin(p.t * 0.2))} />
    <Face p={p} y={-232} dx={32} r={17} mouthY={-180} w={24} />
  </g>
);

export const Toothbrush: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={22} top={-40} shoe="#ff4f9a" />
    <Arms p={p} x={42} y={-220} />
    <rect x={-42} y={-340} width={84} height={300} rx={40} {...fill("#2fa8ff")} />
    <Shine d="M -22 -310 L -22 -120" />
    <rect x={-48} y={-400} width={96} height={64} rx={12} {...fill("#ffffff")} />
    {[-30, -10, 10, 30].map((x) => (
      <path key={x} d={`M ${x} -398 L ${x} -470`} stroke="#7fdcff" strokeWidth={14} strokeLinecap="round" />
    ))}
    <path d="M -46 -470 Q 0 -500 46 -470" stroke={O} strokeWidth={0} fill="none" />
    <Face p={p} y={-268} dx={20} r={13} mouthY={-226} w={16} cheeks={false} />
  </g>
);

export const Toothpaste: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={26} top={-60} shoe="#2fa8ff" />
    <Arms p={p} x={74} y={-220} />
    <path d="M -74 -350 Q -74 -380 -40 -382 L 40 -382 Q 74 -380 74 -350 L 82 -90 L -82 -90 Z" {...fill("#ffffff")} />
    <rect x={-86} y={-96} width={172} height={36} rx={8} {...fill("#e7f4ff")} />
    {[-60, -30, 0, 30, 60].map((x) => (
      <path key={x} d={`M ${x} -94 L ${x} -64`} stroke={O} strokeWidth={4} />
    ))}
    <path d="M -76 -300 L 76 -300 M -78 -150 L 78 -150" stroke="#ff3b3b" strokeWidth={14} />
    <path d="M -77 -280 L 77 -280 M -79 -170 L 79 -170" stroke="#2fa8ff" strokeWidth={8} />
    <rect x={-34} y={-430} width={68} height={52} rx={10} {...fill("#2fa8ff")} />
    <path
      d={`M -20 -432 C -26 -470 20 -480 14 -500 C 34 -480 30 -450 18 -432 Z`}
      {...fill("#ffffff")}
      transform={`rotate(${Math.sin(p.t * 0.12) * 8} 0 -432)`}
    />
    <Face p={p} y={-246} dx={26} r={15} mouthY={-200} w={20} />
  </g>
);

export const Soap: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={44} top={-62} shoe="#2fa8ff" />
    <Arms p={p} x={110} y={-150} />
    {[[-60, -258, 22], [-10, -280, 30], [45, -262, 20], [80, -290, 14]].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y - Math.abs(Math.sin(p.t * 0.08 + i)) * 10} r={r} fill="#dff6ff" stroke="#7fdcff" strokeWidth={5} opacity={0.9} />
    ))}
    <rect x={-112} y={-236} width={224} height={176} rx={56} {...fill("#ff9ad5")} />
    <Shine d="M -80 -210 Q -40 -224 10 -220" />
    <Face p={p} y={-172} dx={36} r={17} mouthY={-118} w={22} />
  </g>
);

export const BubbleBuddy: React.FC<Pose> = (p) => {
  const bob = Math.sin(p.t * 0.1) * 12;
  return (
    <g transform={`translate(0 ${bob - 30})`}>
      <Arms p={p} x={104} y={-150} len={70} />
      <circle cx={0} cy={-150} r={112} fill="#c9eeff" stroke={O} strokeWidth={SW} opacity={0.92} />
      <path d="M -70 -220 A 90 90 0 0 1 10 -250" stroke="#ffffff" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M 60 -80 A 90 90 0 0 0 95 -120" stroke="#ff9ad5" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M 40 -64 A 92 92 0 0 0 80 -95" stroke="#b18cff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} />
      <Face p={p} y={-160} dx={34} r={17} mouthY={-108} w={22} />
    </g>
  );
};

export const Germ: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} top={-50} shoe="#8e5bff" />
    <Arms p={p} x={82} y={-140} len={66} />
    {Array.from({ length: 10 }).map((_, i) => {
      const a = (i / 10) * Math.PI * 2 + p.t * 0.02;
      return <circle key={i} cx={Math.cos(a) * 92} cy={-140 + Math.sin(a) * 92} r={16} {...fill("#8bd450")} strokeWidth={5} />;
    })}
    <circle cx={0} cy={-140} r={86} {...fill("#8bd450")} />
    {[[-40, -90, 10], [45, -95, 8], [30, -200, 9]].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#5fa82e" />
    ))}
    <Face p={p} y={-150} dx={30} r={16} mouthY={-104} w={20} />
  </g>
);

export const RubberDuck: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} shoe="#ff8a1f" />
    <Wing x={-84} y={-110} angle={p.armL} side={-1} color="#ffc300" />
    <Wing x={84} y={-110} angle={p.armR} side={1} color="#ffc300" />
    <ellipse cx={0} cy={-95} rx={112} ry={78} {...fill("#ffd60a")} />
    <path d="M 100 -120 Q 140 -150 130 -100 Q 120 -80 104 -84" {...fill("#ffd60a")} />
    <circle cx={0} cy={-210} r={72} {...fill("#ffd60a")} />
    <path d="M -10 -280 Q 0 -310 14 -284" stroke={O} strokeWidth={5} fill="#ffd60a" />
    <Face p={p} y={-226} dx={26} r={14} mouthY={-176} w={0} />
    <g transform="translate(0 -188)">
      <path d="M -34 0 Q 0 -18 34 0 Q 0 10 -34 0 Z" {...fill("#ff8a1f")} strokeWidth={5} />
      <path d={`M -30 4 Q 0 ${16 + 20 * p.mouth} 30 4 Z`} {...fill("#ff8a1f")} strokeWidth={5} />
    </g>
  </g>
);

export const ToyBoat: React.FC<Pose> = (p) => (
  <g transform={`rotate(${Math.sin(p.t * 0.08) * 4} 0 -60)`}>
    <Arms p={p} x={120} y={-90} len={66} />
    <path d="M 0 -380 L 0 -140" stroke="#8a5a2b" strokeWidth={12} strokeLinecap="round" />
    <path d="M 8 -370 L 110 -170 L 8 -170 Z" {...fill("#ffffff")} />
    <path d="M -8 -330 L -90 -170 L -8 -170 Z" {...fill("#2fa8ff")} />
    <path d={`M 8 -392 L ${50 + Math.sin(p.t * 0.2) * 6} -378 L 8 -364 Z`} {...fill("#ff3b3b")} strokeWidth={4} />
    <path d="M -140 -140 L 140 -140 L 100 -20 Q 0 0 -100 -20 Z" {...fill("#ff3b3b")} />
    <path d="M -130 -118 L 130 -118" stroke="#ffd60a" strokeWidth={10} />
    <Face p={p} y={-84} dx={40} r={16} mouthY={-44} w={22} />
  </g>
);

/* ---------- night ---------- */

export const StarBuddy: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={34} top={-60} shoe="#8e5bff" />
    <g transform={`rotate(${Math.sin(p.t * 0.06) * 5} 0 -170)`}>
      <path d={starPath(0, -170, 150, 70)} {...fill("#ffd60a")} />
      <path d={starPath(0, -170, 112, 52)} fill="#ffe55c" />
      <Face p={p} y={-182} dx={28} r={15} mouthY={-138} w={20} />
    </g>
    <StickArm x={-80} y={-160} angle={p.armL} side={-1} len={60} />
    <StickArm x={80} y={-160} angle={p.armR} side={1} len={60} />
  </g>
);

/* ---------- toys ---------- */

export const Ball: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={34} top={-46} shoe="#ff3b3b" />
    <Arms p={p} x={110} y={-150} />
    <circle cx={0} cy={-160} r={118} {...fill("#ffffff")} />
    <path d="M 0 -278 C -70 -240 -70 -80 0 -42 C -120 -60 -120 -260 0 -278 Z" fill="#ff3b3b" />
    <path d="M 0 -278 C 70 -240 70 -80 0 -42 C 120 -60 120 -260 0 -278 Z" fill="#2fa8ff" />
    <circle cx={0} cy={-160} r={118} fill="none" stroke={O} strokeWidth={SW} />
    <circle cx={0} cy={-160} r={66} {...fill("#ffd60a")} strokeWidth={5} />
    <Face p={p} y={-170} dx={24} r={13} mouthY={-132} w={16} cheeks={false} />
  </g>
);

export const Block: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={44} top={-60} shoe="#3ec43e" />
    <Arms p={p} x={108} y={-160} />
    <path d="M -100 -280 L -60 -320 L 140 -320 L 100 -280 Z" {...fill("#ffd60a")} />
    <path d="M 100 -280 L 140 -320 L 140 -100 L 100 -60 Z" {...fill("#ff8a1f")} />
    <rect x={-100} y={-280} width={200} height={220} rx={14} {...fill("#ff3b3b")} />
    <rect x={-80} y={-260} width={160} height={180} rx={10} fill="none" stroke="#ffffff" strokeWidth={6} />
    <Face p={p} y={-188} dx={34} r={17} mouthY={-134} w={22} />
  </g>
);

/* ---------- shapes ---------- */

const shape = (body: (p: Pose) => React.ReactNode, face: { y: number; dx: number; r: number; m: number }, arm: { x: number; y: number }, legs: { dx: number; top: number; shoe: string }): React.FC<Pose> => (p) => (
  <g>
    <Legs dx={legs.dx} top={legs.top} shoe={legs.shoe} />
    <Arms p={p} x={arm.x} y={arm.y} />
    {body(p)}
    <Face p={p} y={face.y} dx={face.dx} r={face.r} mouthY={face.m} w={22} />
  </g>
);

export const CircleShape = shape(
  () => (
    <>
      <circle cx={0} cy={-170} r={120} {...fill("#ff3b3b")} />
      <path d="M -80 -230 A 100 100 0 0 1 -20 -270" stroke="#ff9a9a" strokeWidth={14} fill="none" strokeLinecap="round" />
    </>
  ),
  { y: -180, dx: 36, r: 18, m: -124 },
  { x: 116, y: -160 },
  { dx: 34, top: -54, shoe: "#2fa8ff" },
);

export const SquareShape = shape(
  () => (
    <>
      <rect x={-115} y={-300} width={230} height={230} rx={22} {...fill("#2fa8ff")} />
      <Shine d="M -90 -270 L -30 -270" />
    </>
  ),
  { y: -200, dx: 38, r: 18, m: -140 },
  { x: 112, y: -190 },
  { dx: 44, top: -72, shoe: "#ffd60a" },
);

export const TriangleShape = shape(
  () => (
    <>
      <path d="M 0 -350 L 130 -70 L -130 -70 Z" {...fill("#3ec43e")} strokeWidth={9} />
      <Shine d="M -20 -300 L -70 -190" />
    </>
  ),
  { y: -170, dx: 30, r: 16, m: -118 },
  { x: 92, y: -130 },
  { dx: 40, top: -72, shoe: "#ff4f9a" },
);

export const HeartShape = shape(
  () => (
    <>
      <path d="M 0 -60 C -170 -160 -150 -320 -60 -320 C -20 -320 0 -290 0 -270 C 0 -290 20 -320 60 -320 C 150 -320 170 -160 0 -60 Z" {...fill("#ff4f9a")} />
      <Shine d="M -100 -270 Q -110 -230 -90 -200" />
    </>
  ),
  { y: -220, dx: 32, r: 17, m: -164 },
  { x: 120, y: -220 },
  { dx: 30, top: -66, shoe: "#8e5bff" },
);

/* ---------- weather ---------- */

export const SunBuddy: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={34} top={-56} shoe="#ff8a1f" />
    <g transform={`translate(0 -190) rotate(${p.t * 0.8})`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d="M -20 -118 L 0 -168 L 20 -118 Z" transform={`rotate(${i * 30})`} {...fill(i % 2 ? "#ffb703" : "#ffd60a")} strokeWidth={5} />
      ))}
    </g>
    <Arms p={p} x={102} y={-170} />
    <circle cx={0} cy={-190} r={110} {...fill("#ffd60a")} />
    <circle cx={-40} cy={-232} r={22} fill="#fff3a0" opacity={0.85} />
    <Face p={p} y={-202} dx={36} r={17} mouthY={-150} w={24} />
  </g>
);

export const CloudBuddy: React.FC<Pose> = (p) => (
  <g transform={`translate(0 ${Math.sin(p.t * 0.08) * 8})`}>
    <Legs dx={40} top={-70} shoe="#2fa8ff" />
    <Arms p={p} x={128} y={-150} len={66} />
    <Puff color="#ffffff" circles={[[-90, -130, 62], [-40, -190, 78], [40, -200, 84], [100, -135, 60], [0, -120, 70]]} />
    <ellipse cx={0} cy={-90} rx={120} ry={16} fill="#dff3ff" />
    <Face p={p} y={-170} dx={34} r={16} mouthY={-122} w={20} />
  </g>
);

export const Raindrop: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} top={-50} shoe="#ffd60a" />
    <Arms p={p} x={92} y={-150} />
    <path d="M 0 -380 C 40 -310 112 -230 112 -160 C 112 -96 64 -54 0 -54 C -64 -54 -112 -96 -112 -160 C -112 -230 -40 -310 0 -380 Z" {...fill("#2fa8ff")} />
    <Shine d="M -60 -200 Q -66 -150 -40 -118" />
    <Face p={p} y={-176} dx={32} r={16} mouthY={-124} w={20} />
  </g>
);

export const Snowflake: React.FC<Pose> = (p) => (
  <g transform={`translate(0 ${Math.sin(p.t * 0.08) * 10 - 20})`}>
    <g transform={`rotate(${p.t * 0.6} 0 -170)`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 60} 0 -170)`}>
          <path d="M 0 -170 L 0 -310 M 0 -250 L -30 -282 M 0 -250 L 30 -282 M 0 -210 L -22 -232 M 0 -210 L 22 -232" stroke={O} strokeWidth={22} strokeLinecap="round" />
          <path d="M 0 -170 L 0 -310 M 0 -250 L -30 -282 M 0 -250 L 30 -282 M 0 -210 L -22 -232 M 0 -210 L 22 -232" stroke="#bfe8ff" strokeWidth={10} strokeLinecap="round" />
        </g>
      ))}
    </g>
    <circle cx={0} cy={-170} r={72} {...fill("#e8f7ff")} />
    <Face p={p} y={-180} dx={26} r={14} mouthY={-140} w={16} />
  </g>
);
