import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { LANDSCAPE, PORTRAIT } from "../cartoon/layout";
import { Butterflies, Clouds, Hills, HillColors, Rainbow, SKIES, SkyContext, Sun } from "../cartoon/Scenery";
import { OUTLINE as O, SW, starPath } from "../cartoon/shared";

export type SceneKind = "meadow" | "snow" | "night" | "ocean" | "farm" | "bathroom" | "playroom";

const useBase = () => {
  const { width, height } = useVideoConfig();
  return { width, height, L: width > height ? LANDSCAPE : PORTRAIT, wide: width > height };
};

const Full: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {children}
    </svg>
  );
};

/* ---------- particles ---------- */

export const Snowfall: React.FC<{ count?: number; seed?: string }> = ({ count = 70, seed = "s" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <Full>
      {Array.from({ length: count }).map((_, i) => {
        const v = 1.5 + random(`${seed}v${i}`) * 2.5;
        const r = 5 + random(`${seed}r${i}`) * 9;
        const y = ((random(`${seed}y${i}`) * (height + 100) + frame * v) % (height + 100)) - 50;
        const x = random(`${seed}x${i}`) * width + Math.sin(frame * 0.03 + i) * 30;
        return <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={0.9} />;
      })}
    </Full>
  );
};

export const Rain: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <Full>
      {Array.from({ length: 90 }).map((_, i) => {
        const v = 22 + random(`rv${i}`) * 12;
        const y = ((random(`ry${i}`) * (height + 200) + frame * v) % (height + 200)) - 100;
        const x = random(`rx${i}`) * width;
        return <path key={i} d={`M ${x} ${y} l -8 34`} stroke="#5cc2ff" strokeWidth={7} strokeLinecap="round" opacity={0.85} />;
      })}
    </Full>
  );
};

export const Leaves: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const colors = ["#ff8a1f", "#ffd60a", "#ff3b3b", "#3ec43e"];
  return (
    <Full>
      {Array.from({ length: 26 }).map((_, i) => {
        const v = 9 + random(`lv${i}`) * 8;
        const x = ((random(`lx${i}`) * (width + 300) + frame * v) % (width + 300)) - 150;
        const y = random(`ly${i}`) * height * 0.8 + Math.sin(frame * 0.08 + i) * 50;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${frame * 6 + i * 40})`}>
            <path d="M 0 -20 C 18 -10 18 10 0 20 C -18 10 -18 -10 0 -20 Z" fill={colors[i % 4]} stroke={O} strokeWidth={4} />
          </g>
        );
      })}
    </Full>
  );
};

export const Bubbles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <Full>
      {Array.from({ length: count }).map((_, i) => {
        const v = 2 + random(`bv${i}`) * 3;
        const r = 10 + random(`br${i}`) * 26;
        const y = height + 60 - ((random(`by${i}`) * (height + 120) + frame * v) % (height + 120));
        const x = random(`bx${i}`) * width + Math.sin(frame * 0.05 + i) * 20;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#e6f8ff" fillOpacity={0.35} stroke="#ffffff" strokeWidth={4} />
            <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#ffffff" />
          </g>
        );
      })}
    </Full>
  );
};

const Twinkles: React.FC<{ count?: number }> = ({ count = 40 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <Full>
      {Array.from({ length: count }).map((_, i) => {
        const x = random(`tx${i}`) * width;
        const y = random(`ty${i}`) * height * 0.55;
        const s = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.05 + i * 1.3));
        return <path key={i} d={starPath(x, y, 14 * s + 4, 6 * s + 2, 4)} fill="#fff6a8" opacity={0.5 + 0.5 * s} />;
      })}
    </Full>
  );
};

const Fireflies: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <Full>
      {Array.from({ length: 18 }).map((_, i) => {
        const x = random(`fx${i}`) * width + Math.sin(frame * 0.02 + i) * 60;
        const y = height * (0.55 + random(`fy${i}`) * 0.35) + Math.cos(frame * 0.03 + i) * 40;
        const g = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.06 + i));
        return <circle key={i} cx={x} cy={y} r={7} fill="#fff59d" opacity={g} style={{ filter: "drop-shadow(0 0 8px #fff59d)" }} />;
      })}
    </Full>
  );
};

/* ---------- scene props ---------- */

const Moon: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <Full>
      <g transform={`translate(${x} ${y}) rotate(${Math.sin(frame * 0.02) * 4})`}>
        <circle r={150} fill="#fff6c7" opacity={0.18} />
        <path d="M 30 -100 A 100 100 0 1 0 30 100 A 80 80 0 1 1 30 -100 Z" fill="#fff1a8" stroke={O} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M -40 -10 Q -30 0 -20 -10" stroke={O} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M -48 30 Q -30 44 -14 32" stroke={O} strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={-58} cy={14} rx={10} ry={6} fill="#ff9ec0" />
      </g>
    </Full>
  );
};

const PineTrees: React.FC<{ xs: number[]; y: number; s: number }> = ({ xs, y, s }) => (
  <Full>
    {xs.map((x, i) => (
      <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x={-14} y={-40} width={28} height={44} fill="#8a5a2b" stroke={O} strokeWidth={5} />
        <path d="M -90 -36 L 0 -170 L 90 -36 Z" fill="#2e9e5a" stroke={O} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -70 -110 L 0 -230 L 70 -110 Z" fill="#35b067" stroke={O} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -70 -110 Q 0 -90 70 -110 M -90 -36 Q 0 -16 90 -36" stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M -40 -190 L 0 -230 L 40 -190" stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ))}
  </Full>
);

const Seaweed: React.FC<{ xs: number[]; y: number }> = ({ xs, y }) => {
  const frame = useCurrentFrame();
  return (
    <Full>
      {xs.map((x, i) => {
        const sw = Math.sin(frame * 0.05 + i) * 24;
        return (
          <path
            key={i}
            d={`M ${x} ${y} C ${x + sw} ${y - 80} ${x - sw} ${y - 160} ${x + sw * 1.4} ${y - 260}`}
            stroke={i % 2 ? "#2fae4a" : "#46c33a"}
            strokeWidth={26}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
    </Full>
  );
};

const Barn: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <Full>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -150 0 L -150 -170 L 0 -270 L 150 -170 L 150 0 Z" fill="#e8262b" stroke={O} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -175 -160 L 0 -290 L 175 -160" stroke="#ffffff" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={-60} y={-130} width={120} height={130} fill="#ffffff" stroke={O} strokeWidth={6} />
      <path d="M -60 -130 L 60 0 M 60 -130 L -60 0" stroke="#e8262b" strokeWidth={10} />
      <circle cx={0} cy={-200} r={26} fill="#ffd60a" stroke={O} strokeWidth={6} />
    </g>
  </Full>
);

const Fence: React.FC<{ y: number }> = ({ y }) => {
  const { width } = useVideoConfig();
  const posts = Math.ceil(width / 90) + 1;
  return (
    <Full>
      <rect x={-10} y={y - 70} width={width + 20} height={16} fill="#fff4e6" stroke={O} strokeWidth={5} />
      <rect x={-10} y={y - 36} width={width + 20} height={16} fill="#fff4e6" stroke={O} strokeWidth={5} />
      {Array.from({ length: posts }).map((_, i) => (
        <path key={i} d={`M ${i * 90 + 20} ${y} L ${i * 90 + 20} ${y - 100} l 16 -16 l 16 16 L ${i * 90 + 52} ${y} Z`} fill="#fff4e6" stroke={O} strokeWidth={5} strokeLinejoin="round" />
      ))}
    </Full>
  );
};

/** Bathroom/playroom: tiled or striped wall, floor and a few props. */
const Indoor: React.FC<{ kind: "bathroom" | "playroom" }> = ({ kind }) => {
  const { width, height, wide } = useBase();
  const floorY = wide ? 640 : 1180;
  const tile = 120;
  const wall = kind === "bathroom" ? "#bfe9ff" : "#ffe8a3";
  const line = kind === "bathroom" ? "#9fd8f5" : "#ffd36b";
  return (
    <AbsoluteFill style={{ background: wall }}>
      <Full>
        {kind === "bathroom"
          ? Array.from({ length: Math.ceil(width / tile) + 1 }).map((_, i) => (
              <path key={`v${i}`} d={`M ${i * tile} 0 L ${i * tile} ${floorY}`} stroke={line} strokeWidth={5} />
            ))
          : Array.from({ length: Math.ceil(width / 80) + 1 }).map((_, i) => (
              <rect key={`s${i}`} x={i * 80} y={0} width={40} height={floorY} fill={line} opacity={0.6} />
            ))}
        {kind === "bathroom"
          ? Array.from({ length: Math.ceil(floorY / tile) }).map((_, i) => (
              <path key={`h${i}`} d={`M 0 ${i * tile} L ${width} ${i * tile}`} stroke={line} strokeWidth={5} />
            ))
          : null}
        <rect x={-10} y={floorY - 24} width={width + 20} height={30} fill="#ffffff" stroke={O} strokeWidth={6} />
        <rect x={-10} y={floorY} width={width + 20} height={height - floorY + 10} fill={kind === "bathroom" ? "#8fd3ff" : "#e9a86a"} stroke={O} strokeWidth={6} />
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`f${i}`} d={`M 0 ${floorY + (i + 1) * ((height - floorY) / 6)} L ${width} ${floorY + (i + 1) * ((height - floorY) / 6)}`} stroke={kind === "bathroom" ? "#6fc3f5" : "#d38f50"} strokeWidth={5} />
        ))}
        {kind === "bathroom" ? (
          <g transform={`translate(${wide ? 1680 : 860} ${wide ? 300 : 330})`}>
            <ellipse rx={120} ry={150} fill="#e9f8ff" stroke={O} strokeWidth={8} />
            <path d="M -60 -80 L -20 -110 M -70 -40 L 10 -100" stroke="#ffffff" strokeWidth={12} strokeLinecap="round" />
          </g>
        ) : (
          <g transform={`translate(${wide ? 1700 : 880} ${wide ? 330 : 380})`}>
            <rect x={-130} y={-120} width={260} height={240} rx={14} fill="#c8783a" stroke={O} strokeWidth={8} />
            <rect x={-110} y={-100} width={220} height={90} fill="#8a5a2b" />
            <rect x={-110} y={10} width={220} height={90} fill="#8a5a2b" />
            <circle cx={-60} cy={-40} r={28} fill="#ff3b3b" stroke={O} strokeWidth={5} />
            <rect x={10} y={-80} width={60} height={70} fill="#2fa8ff" stroke={O} strokeWidth={5} />
            <path d="M -80 100 L -40 30 L 0 100 Z" fill="#ffd60a" stroke={O} strokeWidth={5} />
            <rect x={30} y={40} width={60} height={60} fill="#3ec43e" stroke={O} strokeWidth={5} />
          </g>
        )}
      </Full>
    </AbsoluteFill>
  );
};

const NIGHT_HILLS: HillColors = { back: "#2e7d5b", backShine: "#3f9a72", front: "#1f6b4a", frontShine: "#2e8460" };
const SNOW_HILLS: HillColors = { back: "#f4fbff", backShine: "#ffffff", front: "#e3f2ff", frontShine: "#f7fcff" };
const SAND_HILLS: HillColors = { back: "#ffe08a", backShine: "#fff0bd", front: "#f5c95c", frontShine: "#ffe08a" };

/** Full background for a scene. `rainbowAt` reveals a rainbow (meadow/farm) from that frame on. */
export const SceneBack: React.FC<{ kind: SceneKind; rainbowAt?: number }> = ({ kind, rainbowAt }) => {
  const { L, wide, width, height } = useBase();
  const theme = React.useContext(SkyContext);
  const rainbow = wide ? { cx: 960, cy: 1010, r: 740 } : { cx: 540, cy: 1330, r: 520 };
  const sun: [number, number] = wide ? [1750, 215] : [920, 880];

  if (kind === "bathroom" || kind === "playroom") return <Indoor kind={kind} />;

  if (kind === "ocean") {
    return (
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #4fd2ff 0%, #1d9be8 45%, #0b6cc7 100%)" }}>
        <Full>
          {[0.15, 0.4, 0.65, 0.85].map((f, i) => (
            <path key={i} d={`M ${width * f - 60} 0 L ${width * f + 60} 0 L ${width * f + 200} ${height * 0.7} L ${width * f - 40} ${height * 0.7} Z`} fill="#ffffff" opacity={0.07} />
          ))}
        </Full>
        <Seaweed xs={wide ? [80, 420, 1500, 1850] : [60, 300, 800, 1020]} y={wide ? 760 : 1300} />
        <Hills back={L.backHill} front={L.frontHill} colors={SAND_HILLS} flowers={false} />
        <Bubbles />
      </AbsoluteFill>
    );
  }

  if (kind === "night") {
    return (
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #141a52 0%, #2c2a7a 50%, #5b3f9e 100%)" }}>
        <Twinkles />
        <Moon x={wide ? 1700 : 860} y={wide ? 200 : 880} />
        <Hills back={L.backHill} front={L.frontHill} colors={NIGHT_HILLS} flowers={false} />
        <Fireflies />
      </AbsoluteFill>
    );
  }

  if (kind === "snow") {
    return (
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #8fd3ff 0%, #c4ecff 55%, #effaff 100%)" }}>
        <Clouds clouds={L.clouds} />
        <PineTrees xs={wide ? [90, 260, 1660, 1830] : [90, 990]} y={wide ? 700 : 1240} s={wide ? 1 : 1.1} />
        <Hills back={L.backHill} front={L.frontHill} colors={SNOW_HILLS} flowers={false} />
        <Snowfall />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: SKIES[theme] }}>
      <Sun x={sun[0]} y={sun[1]} />
      {rainbowAt !== undefined ? <Rainbow startAt={rainbowAt} {...rainbow} /> : null}
      <Clouds clouds={L.clouds} />
      {kind === "farm" ? <Barn x={wide ? 1650 : 900} y={wide ? 700 : 1240} s={wide ? 0.9 : 0.8} /> : null}
      <Hills back={L.backHill} front={L.frontHill} />
      {kind === "farm" ? <Fence y={wide ? 760 : 1290} /> : null}
      <Butterflies flies={L.butterflies} />
    </AbsoluteFill>
  );
};
