import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CHARACTERS } from "./registry";

/** Dev-only contact sheet of every character (used to review drawings). */
export const CharacterSheet: React.FC = () => {
  const frame = useCurrentFrame();
  const keys = Object.keys(CHARACTERS);
  const cols = 9;
  return (
    <AbsoluteFill style={{ background: "#bfe9ff" }}>
      <svg width={2700} height={1800}>
        {keys.map((k, i) => {
          const { C, height } = CHARACTERS[k];
          const s = 230 / height;
          const x = 150 + (i % cols) * 300;
          const y = 290 + Math.floor(i / cols) * 300;
          return (
            <g key={k}>
              <g transform={`translate(${x} ${y}) scale(${s})`}>
                <C blink={1} mouth={0.5} armL={22} armR={-150} t={frame} />
              </g>
              <text x={x} y={y + 28} textAnchor="middle" fontSize={26} fontFamily="sans-serif" fill="#2b1a3d">{k}</text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
