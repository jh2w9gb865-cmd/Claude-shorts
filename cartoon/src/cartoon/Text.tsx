import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "./font";
import type { Layout } from "./layout";
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

export const IntroTitle: React.FC<{ exitAt: number; cfg: Layout["intro"] }> = ({ exitAt, cfg }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const move = spring({ frame: frame - 62, fps, config: { damping: 14, stiffness: 90 } });
  const exit = interpolate(frame, [exitAt, exitAt + 12], [1, 0], clamp);
  if (exit <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width,
        top: interpolate(move, [0, 1], [cfg.topFrom, cfg.topTo]),
        display: "flex",
        justifyContent: "center",
        scale: `${interpolate(move, [0, 1], [cfg.scaleFrom, cfg.scaleTo]) * exit}`,
        transformOrigin: "50% 50%",
      }}
    >
      <BouncyTitle lines={cfg.lines} start={6} size={cfg.size} />
    </div>
  );
};

export const FinalTitle: React.FC<{ startAt: number; cfg: Layout["final"] }> = ({ startAt, cfg }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  if (frame < startAt - 2) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width,
        top: cfg.top,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BouncyTitle lines={cfg.lines} start={startAt} size={cfg.size} />
    </div>
  );
};

export type LyricLine = { from: number; to: number; text: string };

/** Speech bubble above a character that shows the lyric line they're singing. */
export const SpeechBubble: React.FC<{
  lines: LyricLine[];
  targetX: number;
  headY: number;
  color: string;
}> = ({ lines, targetX, headY, color }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const from = lines[0].from;
  const to = lines[lines.length - 1].to;
  if (frame < from || frame >= to) return null;
  const current = lines.find((l) => frame >= l.from && frame < l.to) ?? lines[lines.length - 1];
  const pop = spring({ frame: frame - from, fps, config: { damping: 10, stiffness: 170 } });
  // small "boing" each time the line changes
  const repop = spring({ frame: frame - current.from, fps, config: { damping: 8, stiffness: 220 } });
  const out = interpolate(frame, [to - 7, to], [1, 0], clamp);
  const W = 760;
  const H = 230;
  const cx = Math.min(Math.max(targetX, 40 + W / 2), width - 40 - W / 2);
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
          alignItems: "center",
          justifyContent: "center",
          padding: "0 46px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.08,
            color,
            WebkitTextStroke: `3px ${OUTLINE}`,
            textAlign: "center",
            textWrap: "balance",
            scale: `${interpolate(repop, [0, 1], [0.7, 1])}`,
          }}
        >
          {current.text}
        </div>
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

/** Sing-along banner for the chorus. */
export const LyricBanner: React.FC<{ lines: LyricLine[] } & Layout["banner"]> = ({ lines, top, left, width: bw }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const current = lines.find((l) => frame >= l.from && frame < l.to);
  if (!current) return null;
  const pop = spring({ frame: frame - current.from, fps, config: { damping: 9, stiffness: 200 } });
  const out = interpolate(frame, [current.to - 5, current.to], [1, 0.85], clamp);
  // gentle karaoke fill across the line
  const fill = interpolate(frame, [current.from, current.to - 8], [0, 100], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left,
        width: bw,
        top,
        height: 190,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        border: `8px solid ${OUTLINE}`,
        borderRadius: 95,
        boxShadow: "0 14px 0 rgba(43,26,61,0.25)",
        scale: `${pop * out}`,
        fontFamily,
        fontWeight: 900,
        padding: "0 40px",
      }}
    >
      <div
        style={{
          fontSize: 66,
          lineHeight: 1.08,
          textAlign: "center",
          textWrap: "balance",
          backgroundImage: `linear-gradient(90deg, #ff3b3b, #ff8a1f, #ffd60a, #3ec43e, #2fa8ff, #7c4dff)`,
          backgroundSize: "100% 100%",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: `3px ${OUTLINE}`,
          maskImage: `linear-gradient(90deg, #000 ${fill}%, rgba(0,0,0,0.45) ${fill + 8}%)`,
        }}
      >
        {current.text}
      </div>
    </div>
  );
};

/** Big "HEY!" starburst. */
export const HeyBurst: React.FC<{ at: number; x: number; y: number }> = ({ at, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - at;
  if (local < 0 || local > 50) return null;
  const pop = spring({ frame: local, fps, config: { damping: 7, stiffness: 200 } });
  const out = interpolate(local, [38, 50], [1, 0], clamp);
  const pts = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const r = i % 2 ? 150 : 230;
    return `${Math.cos(a) * r},${Math.sin(a) * r * 0.75}`;
  }).join(" ");
  return (
    <div
      style={{
        position: "absolute",
        left: x - 260,
        top: y - 200,
        width: 520,
        height: 400,
        scale: `${pop * out}`,
        rotate: `${Math.sin(local * 0.5) * 6}deg`,
      }}
    >
      <svg width={520} height={400} viewBox="-260 -200 520 400" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <polygon points={pts} fill="#ffd60a" stroke={OUTLINE} strokeWidth={8} strokeLinejoin="round" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontWeight: 900,
          fontSize: 150,
          color: "#ff3b3b",
          WebkitTextStroke: `6px ${OUTLINE}`,
        }}
      >
        HEY!
      </div>
    </div>
  );
};
