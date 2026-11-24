import React from "react";
import { Cheeks, Eye, Mouth, Wing } from "../characters/Animals";
import { Face, FurArm, Legs, O, Pose, Puff, SW, StickArm, fill } from "./kit";

const Arms: React.FC<{ p: Pose; x: number; y: number; len?: number }> = ({ p, x, y, len }) => (
  <>
    <StickArm x={-x} y={y} angle={p.armL} side={-1} len={len} />
    <StickArm x={x} y={y} angle={p.armR} side={1} len={len} />
  </>
);
const Hooves: React.FC<{ dx: number; color: string; hoof?: string }> = ({ dx, color, hoof = "#5a3216" }) => (
  <>
    {[-1, 1].map((s) => (
      <g key={s}>
        <rect x={s * dx - 20} y={-80} width={40} height={74} rx={18} {...fill(color)} />
        <rect x={s * dx - 22} y={-28} width={44} height={26} rx={10} {...fill(hoof)} strokeWidth={5} />
      </g>
    ))}
  </>
);

/* ---------- farm ---------- */

export const Cow: React.FC<Pose> = (p) => (
  <g>
    <Hooves dx={36} color="#ffffff" />
    <FurArm x={-70} y={-160} angle={p.armL} color="#ffffff" tip="#5a3216" />
    <FurArm x={70} y={-160} angle={p.armR} color="#ffffff" tip="#5a3216" />
    <ellipse cx={0} cy={-130} rx={82} ry={90} {...fill("#ffffff")} />
    <path d="M -60 -170 q 30 -20 40 10 q -10 30 -40 10 Z M 30 -110 q 30 -10 34 20 q -20 24 -40 4 Z" fill={O} />
    {[-1, 1].map((s) => (
      <g key={s}>
        <path d={`M ${s * 40} -330 Q ${s * 70} -370 ${s * 60} -390`} stroke="#f2d2a6" strokeWidth={16} fill="none" strokeLinecap="round" />
        <ellipse cx={s * 98} cy={-290} rx={34} ry={16} transform={`rotate(${s * 20} ${s * 98} -290)`} {...fill("#ffffff")} />
      </g>
    ))}
    <ellipse cx={0} cy={-280} rx={86} ry={74} {...fill("#ffffff")} />
    <path d="M 20 -340 q 40 0 46 36 q -30 20 -50 -10 Z" fill={O} />
    <ellipse cx={0} cy={-236} rx={66} ry={42} {...fill("#ffb3c7")} />
    {[-1, 1].map((s) => (
      <ellipse key={`n${s}`} cx={s * 22} cy={-244} rx={9} ry={12} fill="#c25a7c" />
    ))}
    <Eye x={-32} y={-300} r={14} blink={p.blink} />
    <Eye x={32} y={-300} r={14} blink={p.blink} />
    <Mouth y={-216} w={20} open={p.mouth} />
  </g>
);

export const Pig: React.FC<Pose> = (p) => (
  <g>
    <Hooves dx={34} color="#ff9ec0" hoof="#c25a7c" />
    <path d={`M 80 -110 q 30 -10 24 -36 q -10 -16 -20 0 q -6 16 12 20`} stroke={O} strokeWidth={6} fill="none" transform={`rotate(${Math.sin(p.t * 0.2) * 10} 80 -110)`} />
    <FurArm x={-80} y={-150} angle={p.armL} color="#ff9ec0" len={64} />
    <FurArm x={80} y={-150} angle={p.armR} color="#ff9ec0" len={64} />
    <ellipse cx={0} cy={-130} rx={94} ry={86} {...fill("#ff9ec0")} />
    {[-1, 1].map((s) => (
      <path key={s} d={`M ${s * 40} -300 L ${s * 86} -330 L ${s * 80} -268 Z`} {...fill("#ff9ec0")} />
    ))}
    <circle cx={0} cy={-236} r={84} {...fill("#ff9ec0")} />
    <ellipse cx={0} cy={-214} rx={36} ry={26} {...fill("#ff7aa8")} />
    {[-1, 1].map((s) => (
      <ellipse key={`n${s}`} cx={s * 12} cy={-214} rx={7} ry={10} fill="#c25a7c" />
    ))}
    <Cheeks y={-210} dx={58} />
    <Eye x={-32} y={-258} r={14} blink={p.blink} />
    <Eye x={32} y={-258} r={14} blink={p.blink} />
    <Mouth y={-180} w={18} open={p.mouth} />
  </g>
);

export const Sheep: React.FC<Pose> = (p) => (
  <g>
    <Hooves dx={34} color="#3a2650" hoof="#2b1a3d" />
    <FurArm x={-84} y={-150} angle={p.armL} color="#3a2650" len={64} w={24} />
    <FurArm x={84} y={-150} angle={p.armR} color="#3a2650" len={64} w={24} />
    <Puff color="#ffffff" circles={[[-70, -110, 50], [0, -90, 56], [70, -110, 50], [-60, -170, 54], [60, -170, 54], [0, -180, 60]]} />
    {[-1, 1].map((s) => (
      <ellipse key={s} cx={s * 66} cy={-268} rx={30} ry={14} transform={`rotate(${s * 25} ${s * 66} -268)`} {...fill("#3a2650")} />
    ))}
    <ellipse cx={0} cy={-250} rx={56} ry={66} {...fill("#3a2650")} />
    <Puff color="#ffffff" circles={[[-28, -310, 26], [0, -322, 28], [28, -310, 26]]} />
    <Cheeks y={-218} dx={36} r={12} />
    <Eye x={-22} y={-262} r={13} blink={p.blink} />
    <Eye x={22} y={-262} r={13} blink={p.blink} />
    <Mouth y={-212} w={14} open={p.mouth} />
  </g>
);

export const Horse: React.FC<Pose> = (p) => (
  <g>
    <Hooves dx={34} color="#b9773a" hoof="#3a2650" />
    <FurArm x={-64} y={-170} angle={p.armL} color="#b9773a" tip="#3a2650" />
    <FurArm x={64} y={-170} angle={p.armR} color="#b9773a" tip="#3a2650" />
    <ellipse cx={0} cy={-140} rx={72} ry={90} {...fill("#b9773a")} />
    <path d={`M -20 -400 Q ${-70 + Math.sin(p.t * 0.15) * 6} -330 -60 -230 L -20 -240 Z`} {...fill("#5a3216")} />
    <ellipse cx={0} cy={-300} rx={66} ry={86} {...fill("#b9773a")} />
    {[-1, 1].map((s) => (
      <path key={s} d={`M ${s * 26} -370 L ${s * 46} -420 L ${s * 54} -364 Z`} {...fill("#b9773a")} />
    ))}
    <path d="M -10 -392 Q 20 -410 40 -380 Q 10 -380 -10 -360 Z" {...fill("#5a3216")} />
    <ellipse cx={0} cy={-248} rx={54} ry={40} {...fill("#f2d2a6")} />
    {[-1, 1].map((s) => (
      <ellipse key={`n${s}`} cx={s * 18} cy={-256} rx={6} ry={9} fill="#5a3216" />
    ))}
    <Eye x={-30} y={-318} r={14} blink={p.blink} />
    <Eye x={30} y={-318} r={14} blink={p.blink} />
    <Mouth y={-232} w={18} open={p.mouth} />
  </g>
);

/* ---------- dinosaurs ---------- */

const makeDino = (skin: string, belly: string, extra: (p: Pose) => React.ReactNode, overHead?: (p: Pose) => React.ReactNode): React.FC<Pose> => (p) => (
  <g>
    <path d={`M 50 -90 Q 150 -80 ${190 + Math.sin(p.t * 0.12) * 10} -30 Q 130 -40 50 -40 Z`} {...fill(skin)} />
    {extra(p)}
    <Hooves dx={36} color={skin} hoof={belly} />
    <ellipse cx={0} cy={-140} rx={84} ry={100} {...fill(skin)} />
    <ellipse cx={0} cy={-125} rx={52} ry={70} fill={belly} />
    {[-110, -140, -170].map((y) => (
      <path key={y} d={`M -36 ${y} Q 0 ${y + 8} 36 ${y}`} stroke={skin} strokeWidth={4} fill="none" opacity={0.6} />
    ))}
    <FurArm x={-66} y={-170} angle={p.armL} color={skin} len={52} w={24} />
    <FurArm x={66} y={-170} angle={p.armR} color={skin} len={52} w={24} />
    <ellipse cx={0} cy={-290} rx={90} ry={76} {...fill(skin)} />
    {overHead ? overHead(p) : null}
    <Cheeks y={-262} dx={60} />
    <Eye x={-32} y={-310} r={15} blink={p.blink} />
    <Eye x={32} y={-310} r={15} blink={p.blink} />
    {[-1, 1].map((s) => (
      <circle key={s} cx={s * 14} cy={-278} r={4} fill={O} />
    ))}
    <Mouth y={-252} w={34} open={p.mouth} />
  </g>
);

export const TRex = makeDino("#46c33a", "#c8f59a", () => null, () => (
  <path d="M -70 -350 l 14 -22 l 14 20 l 14 -24 l 14 22 l 14 -24 l 14 22 l 14 -22 l 14 22" stroke={O} strokeWidth={5} fill="#2fae4a" />
));
export const Stego = makeDino("#ff8a1f", "#ffe0b0", () => (
  <>
    {[[-60, -230], [-90, -170], [-80, -100], [60, -230], [90, -170], [80, -100]].map(([x, y], i) => (
      <path key={i} d={`M ${x} ${y} l ${x > 0 ? 40 : -40} -30 l ${x > 0 ? -10 : 10} 50 Z`} {...fill("#ffd60a")} />
    ))}
  </>
));
export const Tricera = makeDino("#2fa8ff", "#cfeaff", () => null, () => (
  <>
    <path d="M -130 -300 Q -120 -400 0 -410 Q 120 -400 130 -300 Q 80 -340 0 -345 Q -80 -340 -130 -300 Z" {...fill("#8e5bff")} />
    {[-1, 1].map((s) => (
      <path key={s} d={`M ${s * 40} -350 L ${s * 54} -410 L ${s * 64} -346 Z`} {...fill("#fff4e6")} />
    ))}
    <path d="M -8 -300 L 0 -330 L 8 -300 Z" {...fill("#fff4e6")} strokeWidth={4} />
  </>
));
export const Bronto: React.FC<Pose> = (p) => (
  <g>
    <path d={`M 60 -90 Q 150 -70 ${200 + Math.sin(p.t * 0.12) * 10} -30 Q 130 -40 60 -40 Z`} {...fill("#b18cff")} />
    <Hooves dx={40} color="#b18cff" hoof="#e5d9ff" />
    <ellipse cx={0} cy={-120} rx={100} ry={86} {...fill("#b18cff")} />
    <ellipse cx={0} cy={-105} rx={64} ry={56} fill="#e5d9ff" />
    <FurArm x={-80} y={-150} angle={p.armL} color="#b18cff" len={56} w={26} />
    <FurArm x={80} y={-150} angle={p.armR} color="#b18cff" len={56} w={26} />
    <path d={`M -36 -180 Q ${-40 + Math.sin(p.t * 0.06) * 10} -320 ${10 + Math.sin(p.t * 0.06) * 14} -380 L ${60 + Math.sin(p.t * 0.06) * 14} -360 Q 20 -300 36 -180 Z`} {...fill("#b18cff")} />
    <g transform={`translate(${30 + Math.sin(p.t * 0.06) * 14} -410)`}>
      <ellipse cx={0} cy={0} rx={66} ry={50} {...fill("#b18cff")} />
      <Cheeks y={20} dx={44} r={12} />
      <Eye x={-22} y={-10} r={13} blink={p.blink} />
      <Eye x={22} y={-10} r={13} blink={p.blink} />
      <Mouth y={22} w={18} open={p.mouth} />
    </g>
  </g>
);

/* ---------- ocean ---------- */

export const Fish: React.FC<Pose> = (p) => (
  <g transform={`translate(0 ${Math.sin(p.t * 0.1) * 12 - 40})`}>
    <path d={`M 90 -150 L ${170 + Math.sin(p.t * 0.3) * 8} -210 L ${170 + Math.sin(p.t * 0.3) * 8} -90 Z`} {...fill("#ff8a1f")} />
    <Wing x={-40} y={-130} angle={p.armL} side={-1} color="#ffd60a" />
    <Wing x={40} y={-130} angle={p.armR} side={1} color="#ffd60a" />
    <ellipse cx={0} cy={-150} rx={118} ry={92} {...fill("#ff8a1f")} />
    <path d="M -30 -240 Q 10 -290 60 -236" {...fill("#ffd60a")} />
    {[-10, 30, 70].map((x) => (
      <path key={x} d={`M ${x} -220 Q ${x + 20} -150 ${x} -80`} stroke="#ffd60a" strokeWidth={10} fill="none" />
    ))}
    <Face p={p} y={-168} dx={34} r={17} mouthY={-118} w={20} />
  </g>
);

export const Octopus: React.FC<Pose> = (p) => (
  <g>
    {[-75, -45, -15, 15, 45, 75].map((x, i) => (
      <path key={x} d={`M ${x} -120 Q ${x + Math.sin(p.t * 0.15 + i) * 30} -60 ${x * 1.4} -10 q ${x > 0 ? 20 : -20} 10 ${x > 0 ? 26 : -26} -8`} stroke={O} strokeWidth={34} fill="none" strokeLinecap="round" />
    ))}
    {[-75, -45, -15, 15, 45, 75].map((x, i) => (
      <path key={`i${x}`} d={`M ${x} -120 Q ${x + Math.sin(p.t * 0.15 + i) * 30} -60 ${x * 1.4} -10 q ${x > 0 ? 20 : -20} 10 ${x > 0 ? 26 : -26} -8`} stroke="#b18cff" strokeWidth={22} fill="none" strokeLinecap="round" />
    ))}
    <g transform={`translate(-100 -150) rotate(${p.armL})`}>
      <path d="M 0 0 Q 20 50 0 90" stroke={O} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M 0 0 Q 20 50 0 90" stroke="#b18cff" strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>
    <g transform={`translate(100 -150) rotate(${p.armR})`}>
      <path d="M 0 0 Q -20 50 0 90" stroke={O} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M 0 0 Q -20 50 0 90" stroke="#b18cff" strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>
    <path d="M -110 -130 C -120 -330 120 -330 110 -130 Q 0 -100 -110 -130 Z" {...fill("#b18cff")} />
    {[[-50, -270, 12], [60, -250, 9], [30, -290, 7]].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#8e5bff" />
    ))}
    <Face p={p} y={-200} dx={36} r={18} mouthY={-148} w={22} />
  </g>
);

export const Turtle: React.FC<Pose> = (p) => (
  <g>
    <Hooves dx={40} color="#7ad35a" hoof="#5fa82e" />
    <FurArm x={-96} y={-150} angle={p.armL} color="#7ad35a" len={62} />
    <FurArm x={96} y={-150} angle={p.armR} color="#7ad35a" len={62} />
    <ellipse cx={0} cy={-140} rx={110} ry={98} {...fill("#2fae4a")} />
    {[[0, -140], [-55, -110], [55, -110], [-45, -185], [45, -185]].map(([x, y], i) => (
      <path key={i} d={`M ${x - 22} ${y} l 11 -20 l 22 0 l 11 20 l -11 20 l -22 0 Z`} fill="#8bd450" stroke={O} strokeWidth={4} />
    ))}
    <ellipse cx={0} cy={-280} rx={70} ry={64} {...fill("#7ad35a")} />
    <Face p={p} y={-292} dx={26} r={14} mouthY={-250} w={18} />
  </g>
);

export const Crab: React.FC<Pose> = (p) => (
  <g>
    {[-1, 1].map((s) => (
      <g key={s}>
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M ${s * (50 + k * 22)} -60 l ${s * 30} 30 l ${s * 6} 26`} stroke={O} strokeWidth={9} fill="none" strokeLinecap="round" />
        ))}
      </g>
    ))}
    {[-1, 1].map((s) => (
      <g key={`c${s}`} transform={`translate(${s * 120} -120) rotate(${s === -1 ? p.armL : p.armR})`}>
        <rect x={-12} y={-6} width={24} height={60} rx={12} {...fill("#ff3b3b")} />
        <path d={`M 0 60 C -40 70 -40 130 0 124 L 0 100 L 18 92 Z`} {...fill("#ff3b3b")} />
      </g>
    ))}
    <ellipse cx={0} cy={-110} rx={130} ry={72} {...fill("#ff3b3b")} />
    {[-1, 1].map((s) => (
      <g key={`e${s}`}>
        <path d={`M ${s * 30} -170 L ${s * 34} -220`} stroke={O} strokeWidth={9} strokeLinecap="round" />
        <Eye x={s * 34} y={-236} r={18} blink={p.blink} />
      </g>
    ))}
    <Cheeks y={-104} dx={70} />
    <Mouth y={-112} w={26} open={p.mouth} />
  </g>
);

/* ---------- fruit ---------- */

export const Apple: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={32} top={-60} shoe="#3ec43e" />
    <Arms p={p} x={110} y={-170} />
    <path d="M 0 -280 C 60 -310 130 -270 126 -180 C 122 -100 70 -56 30 -66 C 14 -70 -14 -70 -30 -66 C -70 -56 -122 -100 -126 -180 C -130 -270 -60 -310 0 -280 Z" {...fill("#ff3b3b")} />
    <path d="M 0 -280 Q -4 -310 8 -330" stroke="#5a3216" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M 8 -310 C 40 -350 90 -340 96 -312 C 60 -290 30 -294 8 -310 Z" {...fill("#3ec43e")} strokeWidth={5} />
    <path d="M -80 -240 Q -100 -200 -90 -160" stroke="#ff9a9a" strokeWidth={14} fill="none" strokeLinecap="round" />
    <Face p={p} y={-190} dx={36} r={17} mouthY={-136} w={22} />
  </g>
);

export const Banana: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} top={-70} shoe="#ff4f9a" />
    <Arms p={p} x={70} y={-210} />
    <path d="M -20 -420 C 70 -380 110 -260 90 -160 C 74 -90 30 -60 -20 -66 C 20 -100 40 -150 40 -220 C 40 -300 10 -370 -20 -420 Z" {...fill("#ffd60a")} />
    <path d="M -20 -420 C -40 -380 -70 -300 -70 -220 C -70 -140 -50 -90 -20 -66 C 20 -100 40 -150 40 -220 C 40 -300 10 -370 -20 -420 Z" {...fill("#ffe55c")} />
    <path d="M -26 -440 L -14 -410" stroke="#5a3216" strokeWidth={16} strokeLinecap="round" />
    <Face p={p} y={-250} dx={24} r={14} mouthY={-206} w={18} />
  </g>
);

export const Strawberry: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={30} top={-70} shoe="#3ec43e" />
    <Arms p={p} x={108} y={-210} />
    <path d="M 0 -60 C -80 -80 -130 -200 -120 -260 C -110 -310 -40 -320 0 -300 C 40 -320 110 -310 120 -260 C 130 -200 80 -80 0 -60 Z" {...fill("#ff3b5c")} />
    {[[-60, -230], [0, -250], [60, -230], [-80, -170], [-20, -190], [40, -180], [80, -160], [-40, -120], [20, -110]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={5} ry={8} fill="#ffe55c" />
    ))}
    {[-60, -20, 20, 60].map((x, i) => (
      <path key={x} d={`M 0 -300 L ${x} ${-330 + (i % 2) * 10} L ${x * 0.6} -298 Z`} {...fill("#3ec43e")} strokeWidth={5} />
    ))}
    <path d="M 0 -310 Q 4 -340 -4 -356" stroke="#2fae4a" strokeWidth={10} fill="none" strokeLinecap="round" />
    <Face p={p} y={-214} dx={34} r={16} mouthY={-160} w={20} />
  </g>
);

export const Orange: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={32} top={-50} shoe="#2fa8ff" />
    <Arms p={p} x={112} y={-160} />
    <circle cx={0} cy={-170} r={120} {...fill("#ff9f1c")} />
    {[[-60, -220], [50, -230], [-80, -140], [70, -120], [0, -260], [20, -90]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={4} fill="#e07a00" />
    ))}
    <path d="M -80 -240 Q -96 -200 -88 -170" stroke="#ffc46b" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M 0 -290 Q 4 -310 -2 -322" stroke="#5a3216" strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 0 -306 C 30 -340 80 -330 84 -300 C 50 -282 24 -288 0 -306 Z" {...fill("#3ec43e")} strokeWidth={5} />
    <Face p={p} y={-186} dx={36} r={17} mouthY={-130} w={22} />
  </g>
);

export const Watermelon: React.FC<Pose> = (p) => (
  <g>
    <Legs dx={34} top={-120} shoe="#ff4f9a" />
    <Arms p={p} x={128} y={-250} />
    <path d="M -150 -290 L 150 -290 A 150 160 0 0 1 -150 -290 Z" fill="#2fae4a" stroke={O} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M -132 -290 L 132 -290 A 132 142 0 0 1 -132 -290 Z" fill="#c8f59a" />
    <path d="M -120 -290 L 120 -290 A 120 130 0 0 1 -120 -290 Z" fill="#ff4f6d" />
    {[[-70, -250], [-20, -200], [40, -240], [80, -265], [0, -170], [-60, -195]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={6} ry={10} fill={O} />
    ))}
    <path d="M -150 -290 L 150 -290" stroke={O} strokeWidth={SW} strokeLinecap="round" />
    <Face p={p} y={-258} dx={30} r={15} mouthY={-212} w={20} />
  </g>
);
