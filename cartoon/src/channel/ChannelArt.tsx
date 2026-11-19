import React from "react";
import { AbsoluteFill } from "remotion";
import { fontFamily } from "../cartoon/font";
import { Clouds, Hills, Rainbow, Sky } from "../cartoon/Scenery";
import { BouncyTitle } from "../cartoon/Text";
import { OUTLINE, SW } from "../cartoon/shared";

/* ---------- shared bits ---------- */

const Eye: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={r} ry={r * 1.18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <circle cx={1} cy={3} r={r * 0.6} fill={OUTLINE} />
    <circle cx={-r * 0.22} cy={-r * 0.2} r={r * 0.24} fill="#fff" />
  </g>
);

const Cheeks: React.FC<{ y: number; dx: number; r?: number }> = ({ y, dx, r = 16 }) => (
  <>
    {[-1, 1].map((s) => (
      <ellipse key={s} cx={s * dx} cy={y} rx={r} ry={r * 0.6} fill="#ff6fa5" opacity={0.75} />
    ))}
  </>
);

const Smile: React.FC<{ y: number; w?: number; open?: number }> = ({ y, w = 26, open = 0.5 }) => (
  <g transform={`translate(0 ${y})`}>
    <path
      d={`M ${-w} 0 Q 0 6 ${w} 0 Q 0 ${12 + 40 * open} ${-w} 0 Z`}
      fill="#8b1e3f"
      stroke={OUTLINE}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    <ellipse cx={0} cy={4 + 12 * open} rx={w * 0.4} ry={3 + 4 * open} fill="#ff6f91" />
  </g>
);

const Arm: React.FC<{ x: number; y: number; angle: number; color: string; len?: number }> = ({
  x,
  y,
  angle,
  color,
  len = 70,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <rect x={-15} y={-6} width={30} height={len} rx={15} fill={color} stroke={OUTLINE} strokeWidth={SW} />
  </g>
);

/* ---------- animals (feet at 0,0) ---------- */

const Bunny: React.FC = () => (
  <g>
    {[-1, 1].map((s) => (
      <g key={s} transform={`rotate(${s * 12} ${s * 30} -290)`}>
        <ellipse cx={s * 30} cy={-345} rx={24} ry={72} fill="#f6f2ff" stroke={OUTLINE} strokeWidth={SW} />
        <ellipse cx={s * 30} cy={-340} rx={11} ry={50} fill="#ffb3cf" />
      </g>
    ))}
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 38} cy={-12} rx={34} ry={18} fill="#f6f2ff" stroke={OUTLINE} strokeWidth={SW} />
    ))}
    <ellipse cx={0} cy={-100} rx={72} ry={82} fill="#f6f2ff" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-90} rx={42} ry={52} fill="#ffe1ec" />
    <Arm x={-60} y={-130} angle={30} color="#f6f2ff" />
    <Arm x={62} y={-140} angle={-150} color="#f6f2ff" />
    <circle cx={0} cy={-230} r={78} fill="#f6f2ff" stroke={OUTLINE} strokeWidth={SW} />
    <Cheeks y={-205} dx={48} />
    <Eye x={-28} y={-242} r={14} />
    <Eye x={28} y={-242} r={14} />
    <path d="M -9 -218 L 9 -218 L 0 -207 Z" fill="#ff6fa5" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <Smile y={-200} w={20} open={0.4} />
  </g>
);

const Bear: React.FC = () => (
  <g>
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 42} cy={-12} rx={36} ry={20} fill="#a8692f" stroke={OUTLINE} strokeWidth={SW} />
    ))}
    <ellipse cx={0} cy={-105} rx={86} ry={90} fill="#b9773a" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-95} rx={52} ry={58} fill="#eabd84" />
    <Arm x={-74} y={-140} angle={150} color="#b9773a" len={78} />
    <Arm x={70} y={-130} angle={-30} color="#b9773a" len={78} />
    {[-1, 1].map((s) => (
      <g key={`e${s}`}>
        <circle cx={s * 62} cy={-305} r={30} fill="#b9773a" stroke={OUTLINE} strokeWidth={SW} />
        <circle cx={s * 62} cy={-305} r={15} fill="#eabd84" />
      </g>
    ))}
    <circle cx={0} cy={-240} r={86} fill="#b9773a" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-208} rx={42} ry={32} fill="#f2d2a6" stroke={OUTLINE} strokeWidth={5} />
    <ellipse cx={0} cy={-224} rx={14} ry={10} fill={OUTLINE} />
    <Cheeks y={-215} dx={58} />
    <Eye x={-32} y={-258} r={14} />
    <Eye x={32} y={-258} r={14} />
    <Smile y={-206} w={18} open={0.45} />
  </g>
);

const Chick: React.FC = () => (
  <g>
    {[-1, 1].map((s) => (
      <path
        key={s}
        d={`M ${s * 28} -8 l ${s * 14} 10 l ${-s * 30} 0 Z`}
        fill="#ff8a1f"
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    ))}
    <ellipse cx={-92} cy={-120} rx={34} ry={20} transform="rotate(-35 -92 -120)" fill="#ffc300" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={92} cy={-120} rx={34} ry={20} transform="rotate(35 92 -120)" fill="#ffc300" stroke={OUTLINE} strokeWidth={SW} />
    <circle cx={0} cy={-100} r={90} fill="#ffd60a" stroke={OUTLINE} strokeWidth={SW} />
    <path d="M -6 -186 Q -24 -228 -2 -232 Q 2 -210 10 -232 Q 30 -226 8 -186" fill="#ffd60a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <Cheeks y={-95} dx={52} r={15} />
    <Eye x={-30} y={-125} r={15} />
    <Eye x={30} y={-125} r={15} />
    <path d="M -18 -102 L 18 -102 L 0 -82 Z" fill="#ff8a1f" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

const Frog: React.FC = () => (
  <g>
    {[-1, 1].map((s) => (
      <ellipse key={`f${s}`} cx={s * 60} cy={-14} rx={42} ry={18} fill="#2fae4a" stroke={OUTLINE} strokeWidth={SW} />
    ))}
    <Arm x={-82} y={-110} angle={155} color="#46c33a" />
    <Arm x={82} y={-110} angle={-155} color="#46c33a" />
    <ellipse cx={0} cy={-100} rx={100} ry={85} fill="#46c33a" stroke={OUTLINE} strokeWidth={SW} />
    <ellipse cx={0} cy={-75} rx={62} ry={48} fill="#b8f08a" />
    {[-1, 1].map((s) => (
      <g key={`e${s}`}>
        <circle cx={s * 46} cy={-172} r={38} fill="#46c33a" stroke={OUTLINE} strokeWidth={SW} />
        <Eye x={s * 46} y={-172} r={22} />
      </g>
    ))}
    <Cheeks y={-118} dx={68} />
    <path d="M -50 -125 Q 0 -80 50 -125" stroke={OUTLINE} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
);

/* ---------- the mascot: a smiling sun with a sprout ---------- */

const SunnySprout: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => {
  const k = r / 105;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle r={175} fill="#fff6a8" opacity={0.45} />
      {Array.from({ length: 12 }).map((_, i) => i === 0 || i === 11 ? null : (
        <path
          key={i}
          d="M -24 -118 L 0 -178 L 24 -118 Z"
          transform={`rotate(${i * 30 + 15})`}
          fill={i % 2 ? "#ffb703" : "#ffd60a"}
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      ))}
      {/* sprout */}
      <path d="M 0 -100 Q -4 -140 2 -168" stroke="#2a9a2a" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 2 -160 C -30 -200 -78 -190 -84 -160 C -50 -140 -18 -146 2 -160 Z" fill="#46c33a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 2 -165 C 30 -215 82 -210 88 -178 C 54 -152 22 -156 2 -165 Z" fill="#6fd65a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <circle r={108} fill="#ffd60a" stroke={OUTLINE} strokeWidth={SW} />
      <circle cx={-40} cy={-44} r={24} fill="#fff3a0" opacity={0.85} />
      <Cheeks y={22} dx={62} r={18} />
      <Eye x={-36} y={-18} r={17} />
      <Eye x={36} y={-18} r={17} />
      <Smile y={26} w={32} open={0.7} />
    </g>
  );
};

/* ---------- avatar 800x800 ---------- */

export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill>
    <Sky />
    <Rainbow startAt={-100} cx={400} cy={760} r={470} />
    <Hills
      back={{ path: "M -20 650 Q 200 590 400 630 T 820 610 L 820 820 L -20 820 Z", shine: "M 40 640 Q 180 600 300 620", flowers: [] }}
      front={{
        path: "M -20 720 Q 220 680 420 705 T 820 700 L 820 820 L -20 820 Z",
        shine: "M 60 715 Q 220 690 360 700",
        flowers: [],
        grass: [],
      }}
    />
    <svg width={800} height={800} style={{ position: "absolute", inset: 0 }}>
      <SunnySprout x={400} y={410} r={185} />
    </svg>
  </AbsoluteFill>
);

/* ---------- banner 2560x1440 (safe area: centre 1546x423, y 508-931) ---------- */

export const ChannelBanner: React.FC = () => (
  <AbsoluteFill>
    <Sky />
    <Rainbow startAt={-100} cx={1280} cy={1160} r={660} />
    <Clouds
      clouds={[
        { x0: 300, y: 330, s: 1.2, v: 0 },
        { x0: 2150, y: 380, s: 1.0, v: 0 },
        { x0: 880, y: 230, s: 0.8, v: 0 },
        { x0: 1750, y: 200, s: 0.9, v: 0 },
      ]}
    />
    <Hills
      back={{
        path: "M -20 900 Q 640 790 1280 870 T 2580 860 L 2580 1460 L -20 1460 Z",
        shine: "M 80 890 Q 500 810 900 845",
        flowers: [
          { x: 260, y: 900, color: "#ff4f9a" },
          { x: 820, y: 880, color: "#ffd60a", s: 0.8 },
          { x: 1720, y: 885, color: "#7c4dff", s: 0.8 },
          { x: 2320, y: 890, color: "#ff8a1f" },
        ],
      }}
      front={{
        path: "M -20 1010 Q 700 950 1320 990 T 2580 980 L 2580 1460 L -20 1460 Z",
        shine: "M 60 1005 Q 500 960 1000 975",
        flowers: [
          { x: 1100, y: 1100, color: "#2fa8ff" },
          { x: 1500, y: 1120, color: "#ff3b3b" },
          { x: 180, y: 1200, color: "#ffd60a", s: 1.2 },
          { x: 560, y: 1330, color: "#7c4dff", s: 1.1 },
          { x: 930, y: 1250, color: "#ff4f9a", s: 1.2 },
          { x: 1300, y: 1380, color: "#ff8a1f", s: 1.1 },
          { x: 1700, y: 1260, color: "#ffd60a", s: 1.2 },
          { x: 2050, y: 1350, color: "#2fa8ff", s: 1.1 },
          { x: 2400, y: 1200, color: "#ff4f9a", s: 1.2 },
        ],
        grass: [
          [700, 1080],
          [1900, 1090],
          [350, 1290],
          [1120, 1330],
          [1500, 1250],
          [2250, 1290],
        ],
      }}
    />
    <svg width={2560} height={1440} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <SunnySprout x={2330} y={250} r={120} />
      <g transform="translate(470 930) scale(0.95)">
        <Bunny />
      </g>
      <g transform="translate(675 935) scale(0.8)">
        <Chick />
      </g>
      <g transform="translate(1890 935) scale(0.85)">
        <Frog />
      </g>
      <g transform="translate(2095 930) scale(0.95)">
        <Bear />
      </g>
    </svg>
    <div style={{ position: "absolute", left: 0, width: 2560, top: 540, display: "flex", justifyContent: "center" }}>
      <BouncyTitle lines={["Sunny Sprouts"]} start={0} size={175} />
    </div>
    <div style={{ position: "absolute", left: 0, width: 2560, top: 770, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 62,
          color: OUTLINE,
          background: "#ffffff",
          border: `7px solid ${OUTLINE}`,
          borderRadius: 60,
          padding: "10px 48px",
          boxShadow: "0 10px 0 rgba(43,26,61,0.25)",
        }}
      >
        Happy songs for little ones!
      </div>
    </div>
  </AbsoluteFill>
);
