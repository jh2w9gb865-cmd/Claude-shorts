import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";
import { OUTLINE, clamp } from "./shared";

const LETTER_COLORS = ["#ff3b3b", "#ff8a1f", "#ffd60a", "#3ec43e", "#2fa8ff", "#7c4dff", "#ff4f9a"];

const Letter: React.FC<{ ch: string; index: number; start: number; size: number }> = ({
  ch,
  index,
  start,
  size,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - start - index * 2,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.6 },
  });
  if (ch === " ") {
    return <span style={{ display: "inline-block", width: size * 0.28 }} />;
  }
  const color = LETTER_COLORS[index % LETTER_COLORS.length];
  const wobble = Math.sin(frame * 0.15 + index * 0.8) * 5;
  const bob = Math.sin(frame * 0.12 + index * 0.6) * 6;
  const stroke = {
    position: "absolute" as const,
    left: 0,
    top: 0,
  };
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        scale: `${pop}`,
        translate: `0px ${(1 - pop) * 90 + bob}px`,
        rotate: `${wobble}deg`,
      }}
    >
      <span
        style={{
          ...stroke,
          color: OUTLINE,
          WebkitTextStroke: `${size * 0.26}px ${OUTLINE}`,
          translate: "0px 9px",
        }}
      >
        {ch}
      </span>
      <span
        style={{
          ...stroke,
          color: "#ffffff",
          WebkitTextStroke: `${size * 0.2}px #ffffff`,
        }}
      >
        {ch}
      </span>
      <span style={{ position: "relative", color }}>{ch}</span>
    </span>
  );
};

export const BouncyTitle: React.FC<{
  lines: string[];
  start: number;
  size: number;
}> = ({ lines, start, size }) => {
  let idx = 0;
  return (
    <div
      style={{
        fontFamily,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.12,
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {lines.map((line) => (
        <div key={line}>
          {line.split("").map((ch) => {
            const i = idx++;
            return <Letter key={i} ch={ch} index={i} start={start} size={size} />;
          })}
        </div>
      ))}
    </div>
  );
};

export const IntroTitle: React.FC<{ exitAt: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const move = spring({ frame: frame - 62, fps, config: { damping: 14, stiffness: 90 } });
  const exit = interpolate(frame, [exitAt, exitAt + 12], [1, 0], clamp);
  if (exit <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1080,
        top: interpolate(move, [0, 1], [760, 190]),
        display: "flex",
        justifyContent: "center",
        scale: `${interpolate(move, [0, 1], [1.2, 0.95]) * exit}`,
        transformOrigin: "50% 50%",
      }}
    >
      <BouncyTitle lines={["Овощная", "команда!"]} start={6} size={140} />
    </div>
  );
};

export const FinalTitle: React.FC<{ startAt: number }> = ({ startAt }) => {
  const frame = useCurrentFrame();
  if (frame < startAt - 2) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1080,
        top: 170,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BouncyTitle lines={["Ешь овощи —", "будь здоров!"]} start={startAt} size={118} />
    </div>
  );
};

export const SpeechBubble: React.FC<{
  from: number;
  to: number;
  targetX: number;
  headY: number;
  name: string;
  nameColor: string;
  line: string;
}> = ({ from, to, targetX, headY, name, nameColor, line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame >= to) return null;
  const pop = spring({ frame: frame - from, fps, config: { damping: 10, stiffness: 170 } });
  const out = interpolate(frame, [to - 7, to], [1, 0], clamp);
  const W = 740;
  const H = 230;
  const cx = Math.min(Math.max(targetX, 40 + W / 2), 1040 - W / 2);
  const left = cx - W / 2;
  const tailX = targetX - left;
  const top = headY - 60 - H;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: W,
        height: H,
        scale: `${pop * out}`,
        transformOrigin: `${tailX}px ${H + 55}px`,
        fontFamily,
        fontWeight: 900,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#ffffff",
          border: `8px solid ${OUTLINE}`,
          borderRadius: 80,
          boxShadow: `0 14px 0 rgba(43,26,61,0.25)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 78, color: nameColor, lineHeight: 1.05, WebkitTextStroke: `3px ${OUTLINE}` }}>
          {name}
        </div>
        <div style={{ fontSize: 54, color: OUTLINE, lineHeight: 1.15 }}>{line}</div>
      </div>
      <svg
        width={W}
        height={H + 70}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        <path
          d={`M ${tailX - 34 + (cx - targetX) * 0.15} ${H - 8} L ${tailX} ${H + 55} L ${tailX + 34 + (cx - targetX) * 0.15} ${H - 8}`}
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth={8}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
