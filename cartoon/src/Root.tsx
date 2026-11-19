import { Composition, Folder } from "remotion";
import { VeggieCartoon } from "./cartoon/VeggieCartoon";
import { ChannelAvatar, ChannelBanner } from "./channel/ChannelArt";
import { ColorsCartoon } from "./colors/ColorsCartoon";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <VeggieRoot />
      <ColorsRoot />
      <ChannelRoot />
    </>
  );
};

const VeggieRoot: React.FC = () => {
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

export const ChannelRoot: React.FC = () => {
  return (
    <Folder name="Channel-Art">
      {/* Render frame 80 so the title letters have finished popping in */}
      <Composition id="ChannelAvatar" component={ChannelAvatar} durationInFrames={90} fps={30} width={800} height={800} />
      <Composition id="ChannelBanner" component={ChannelBanner} durationInFrames={90} fps={30} width={2560} height={1440} />
    </Folder>
  );
};

const ColorsRoot: React.FC = () => {
  return (
    <Folder name="Rainbow-Colors">
      <Composition
        id="ColorsCartoon"
        component={ColorsCartoon}
        durationInFrames={1322}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ layout: "portrait" as const }}
      />
      <Composition
        id="ColorsCartoonWide"
        component={ColorsCartoon}
        durationInFrames={1322}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ layout: "landscape" as const }}
      />
    </Folder>
  );
};
