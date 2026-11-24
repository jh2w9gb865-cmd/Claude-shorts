import type { SongSpec } from "../engine/SongVideo";
import christmasTree from "./christmas-tree.json";
import snowmanDance from "./snowman-dance.json";
import santaHelpers from "./santa-helpers.json";
import brushTeeth from "./brush-teeth.json";
import washHands from "./wash-hands.json";
import bathTime from "./bath-time.json";
import goodnightStars from "./goodnight-stars.json";
import cleanUp from "./clean-up.json";
import countToTen from "./count-to-ten.json";
import shapes from "./shapes.json";
import daysOfWeek from "./days-of-week.json";
import weather from "./weather.json";
import headTummy from "./head-tummy.json";
import farmAnimals from "./farm-animals.json";
import dinoStomp from "./dino-stomp.json";
import oceanFriends from "./ocean-friends.json";
import fruitSquad from "./fruit-squad.json";

/** Every song made with the engine. Add new specs here. */
export const SONGS: SongSpec[] = [
  christmasTree as SongSpec,
  snowmanDance as SongSpec,
  santaHelpers as SongSpec,
  brushTeeth as SongSpec,
  washHands as SongSpec,
  bathTime as SongSpec,
  goodnightStars as SongSpec,
  cleanUp as SongSpec,
  countToTen as SongSpec,
  shapes as SongSpec,
  daysOfWeek as SongSpec,
  weather as SongSpec,
  headTummy as SongSpec,
  farmAnimals as SongSpec,
  dinoStomp as SongSpec,
  oceanFriends as SongSpec,
  fruitSquad as SongSpec,
];
