import React from "react";
import { AbsoluteFill } from "remotion";
import { Butterflies, Clouds, Confetti, Hills, Rainbow, Sky, Sun } from "./Scenery";
import { FinalTitle, IntroTitle, SpeechBubble } from "./Text";
import { SPECS, Shadow, Veggie, VeggieKind } from "./Veggie";

const DANCE_AT = 330;

type Cast = {
  kind: VeggieKind;
  x: number;
  y: number;
  enterAt: number;
  talkFrom: number;
  talkTo: number;
  phase: number;
  name: string;
  nameColor: string;
  line: string;
};

// Back row stands on the far hill, front row on the near meadow.
const CAST: Cast[] = [
  { kind: "tomato", x: 790, y: 1780, enterAt: 85, talkFrom: 95, talkTo: 150, phase: 1, name: "I'm Tomato!", nameColor: "#ff3b3b", line: "For a strong heart!" },
  { kind: "broccoli", x: 290, y: 1780, enterAt: 150, talkFrom: 160, talkTo: 212, phase: 2, name: "I'm Broccoli!", nameColor: "#2fae4a", line: "I make you strong!" },
  { kind: "carrot", x: 290, y: 1330, enterAt: 212, talkFrom: 222, talkTo: 272, phase: 3, name: "I'm Carrot!", nameColor: "#ff8a1f", line: "For super-sharp eyes!" },
  { kind: "cucumber", x: 790, y: 1330, enterAt: 272, talkFrom: 282, talkTo: DANCE_AT, phase: 4, name: "I'm Cucumber!", nameColor: "#2fb34a", line: "Crunch, crunch, yum!" },
];

// Draw back row first so the front row overlaps it.
const DRAW_ORDER = [...CAST].sort((a, b) => a.y - b.y);

export const VeggieCartoon: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Sky />
      <Sun x={880} y={620} />
      <Rainbow startAt={DANCE_AT} />
      <Clouds />
      <Hills />
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        {DRAW_ORDER.map((c) => (
          <React.Fragment key={c.kind}>
            <Shadow x={c.x} y={c.y} enterAt={c.enterAt} danceAt={DANCE_AT} phase={c.phase} />
            <Veggie
              kind={c.kind}
              x={c.x}
              y={c.y}
              enterAt={c.enterAt}
              talkFrom={c.talkFrom}
              talkTo={c.talkTo}
              danceAt={DANCE_AT}
              phase={c.phase}
            />
          </React.Fragment>
        ))}
      </svg>
      <Butterflies />
      {CAST.map((c) => (
        <SpeechBubble
          key={c.kind}
          from={c.talkFrom}
          to={c.talkTo}
          targetX={c.x}
          headY={c.y - SPECS[c.kind].height}
          name={c.name}
          nameColor={c.nameColor}
          line={c.line}
        />
      ))}
      <Confetti startAt={DANCE_AT + 6} />
      <IntroTitle exitAt={DANCE_AT - 8} />
      <FinalTitle startAt={DANCE_AT + 4} />
    </AbsoluteFill>
  );
};
