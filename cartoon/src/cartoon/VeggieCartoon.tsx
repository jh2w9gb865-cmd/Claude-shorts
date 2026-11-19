import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile } from "remotion";
import { Butterflies, Clouds, Confetti, Hills, Rainbow, Sky, Sun } from "./Scenery";
import { FinalTitle, HeyBurst, IntroTitle, LyricBanner, LyricLine, SpeechBubble } from "./Text";
import { SPECS, Shadow, Veggie, VeggieKind } from "./Veggie";

// Timings (frames @ 30fps) measured from songs/veggie-squad-v1.mp3:
// 120 BPM = one beat every 15 frames, vocals start at 4.0s, chorus at ~15.5s, "Hey!" at ~25.3s.
const DANCE_AT = 465;
const HEY_AT = 760;

type Cast = {
  kind: VeggieKind;
  x: number;
  y: number;
  enterAt: number;
  phase: number;
  color: string;
  lines: LyricLine[];
};

// Back row stands on the far hill, front row on the near meadow.
const CAST: Cast[] = [
  {
    kind: "tomato", x: 790, y: 1780, enterAt: 108, phase: 1, color: "#ff3b3b",
    lines: [
      { from: 120, to: 180, text: "Red tomato, round and bright," },
      { from: 180, to: 238, text: "keeps your heart beating just right!" },
    ],
  },
  {
    kind: "broccoli", x: 290, y: 1780, enterAt: 228, phase: 2, color: "#2fae4a",
    lines: [{ from: 240, to: 298, text: "Broccoli makes you big and strong," }],
  },
  {
    kind: "carrot", x: 290, y: 1330, enterAt: 288, phase: 3, color: "#ff8a1f",
    lines: [{ from: 300, to: 358, text: "Carrot helps you see all day long!" }],
  },
  {
    kind: "cucumber", x: 790, y: 1330, enterAt: 348, phase: 4, color: "#2fb34a",
    lines: [{ from: 360, to: 440, text: "Cucumber goes crunch, crunch, crunch!" }],
  },
];

const CHORUS: LyricLine[] = [
  { from: DANCE_AT, to: 540, text: "Eat your veggies, yum, yum, yum!" },
  { from: 540, to: 600, text: "Veggie Squad is so much fun!" },
  { from: 600, to: 675, text: "Wave your hands and jump up high," },
  { from: 675, to: HEY_AT - 2, text: "Eat your veggies, reach the sky!" },
];

// Draw back row first so the front row overlaps it.
const DRAW_ORDER = [...CAST].sort((a, b) => a.y - b.y);

export const VeggieCartoon: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Audio src={staticFile("audio/veggie-squad.mp3")} />
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
              talkFrom={c.lines[0].from}
              talkTo={c.lines[c.lines.length - 1].to}
              danceAt={DANCE_AT}
              heyAt={HEY_AT}
              phase={c.phase}
            />
          </React.Fragment>
        ))}
      </svg>
      <Butterflies />
      {CAST.map((c) => (
        <SpeechBubble
          key={c.kind}
          lines={c.lines}
          targetX={c.x}
          headY={c.y - SPECS[c.kind].height}
          color={c.color}
        />
      ))}
      <Confetti startAt={DANCE_AT + 6} />
      <IntroTitle exitAt={DANCE_AT - 10} />
      <FinalTitle startAt={DANCE_AT + 2} />
      <LyricBanner lines={CHORUS} top={530} />
      <HeyBurst at={HEY_AT} x={540} y={640} />
    </AbsoluteFill>
  );
};
