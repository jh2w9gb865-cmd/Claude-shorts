import { Composition } from "remotion";
import { VeggieCartoon } from "./cartoon/VeggieCartoon";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VeggieCartoon"
        component={VeggieCartoon}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
