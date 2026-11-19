import { Composition, Folder } from "remotion";
import { VeggieCartoon } from "./cartoon/VeggieCartoon";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Veggie-Squad">
      {/* 9:16 — YouTube Shorts, TikTok, Instagram Reels */}
      <Composition
        id="VeggieCartoon"
        component={VeggieCartoon}
        durationInFrames={842}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: "portrait" as const }}
      />
      {/* 16:9 — regular YouTube video */}
      <Composition
        id="VeggieCartoonWide"
        component={VeggieCartoon}
        durationInFrames={842}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: "landscape" as const }}
      />
    </Folder>
  );
};
