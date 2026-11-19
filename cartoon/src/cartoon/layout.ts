import type { VeggieKind } from "./Veggie";

type Cloud = { x0: number; y: number; s: number; v: number };
type Butterfly = { x0: number; y0: number; v: number; color: string; ph: number };
type Flower = { x: number; y: number; color: string; s?: number };

export type Layout = {
  width: number;
  height: number;
  sun: [number, number];
  clouds: Cloud[];
  rainbow: { cx: number; cy: number; r: number };
  backHill: { path: string; shine: string; flowers: Flower[] };
  frontHill: { path: string; shine: string; flowers: Flower[]; grass: [number, number][] };
  butterflies: Butterfly[];
  intro: { lines: string[]; size: number; topFrom: number; topTo: number; scaleFrom: number; scaleTo: number };
  final: { lines: string[]; size: number; top: number };
  banner: { top: number; left: number; width: number };
  hey: [number, number];
  cast: Record<VeggieKind, { x: number; y: number; size: number }>;
  confetti: number;
};

/** 9:16 — YouTube Shorts / TikTok / Reels. */
export const PORTRAIT: Layout = {
  width: 1080,
  height: 1920,
  sun: [880, 620],
  clouds: [
    { x0: 120, y: 560, s: 1.1, v: 0.9 },
    { x0: 760, y: 430, s: 0.85, v: 0.6 },
    { x0: 420, y: 1010, s: 0.75, v: 0.75 },
  ],
  rainbow: { cx: 540, cy: 1460, r: 700 },
  backHill: {
    path: "M -20 1250 Q 270 1110 560 1215 T 1100 1190 L 1100 1940 L -20 1940 Z",
    shine: "M 40 1250 Q 270 1150 480 1220",
    flowers: [
      { x: 70, y: 1300, color: "#ff4f9a" },
      { x: 160, y: 1265, color: "#7c4dff", s: 0.8 },
      { x: 530, y: 1290, color: "#ff8a1f" },
      { x: 985, y: 1290, color: "#ff3b3b", s: 0.9 },
      { x: 1050, y: 1250, color: "#2fa8ff", s: 0.75 },
    ],
  },
  frontHill: {
    path: "M -20 1560 Q 300 1470 610 1540 T 1100 1520 L 1100 1940 L -20 1940 Z",
    shine: "M 30 1560 Q 300 1495 560 1545",
    flowers: [
      { x: 540, y: 1610, color: "#ffd60a", s: 0.9 },
      { x: 40, y: 1650, color: "#ff4f9a" },
      { x: 1040, y: 1640, color: "#7c4dff" },
      { x: 560, y: 1860, color: "#2fa8ff", s: 1.1 },
    ],
    grass: [
      [80, 1700],
      [540, 1650],
      [480, 1830],
      [1010, 1680],
      [640, 1880],
      [120, 1880],
    ],
  },
  butterflies: [
    { x0: -100, y0: 820, v: 3.2, color: "#ff4f9a", ph: 0 },
    { x0: 1180, y0: 1080, v: -2.6, color: "#ffd60a", ph: 2 },
  ],
  intro: { lines: ["Veggie", "Squad!"], size: 165, topFrom: 760, topTo: 190, scaleFrom: 1.2, scaleTo: 0.95 },
  final: { lines: ["Eat Your", "Veggies!"], size: 150, top: 170 },
  banner: { top: 530, left: 50, width: 980 },
  hey: [540, 640],
  cast: {
    tomato: { x: 790, y: 1780, size: 1 },
    broccoli: { x: 290, y: 1780, size: 1 },
    carrot: { x: 290, y: 1330, size: 1 },
    cucumber: { x: 790, y: 1330, size: 1 },
  },
  confetti: 90,
};

/** 16:9 — regular YouTube video. */
export const LANDSCAPE: Layout = {
  width: 1920,
  height: 1080,
  sun: [1750, 215],
  clouds: [
    { x0: 200, y: 150, s: 0.9, v: 0.9 },
    { x0: 1100, y: 270, s: 0.75, v: 0.6 },
    { x0: 700, y: 430, s: 0.6, v: 0.75 },
  ],
  rainbow: { cx: 960, cy: 1080, r: 860 },
  backHill: {
    path: "M -20 720 Q 480 580 960 680 T 1940 660 L 1940 1100 L -20 1100 Z",
    shine: "M 60 710 Q 400 610 760 660",
    flowers: [
      { x: 80, y: 740, color: "#ff4f9a" },
      { x: 190, y: 715, color: "#7c4dff", s: 0.8 },
      { x: 520, y: 690, color: "#ff8a1f" },
      { x: 1400, y: 690, color: "#ff3b3b", s: 0.9 },
      { x: 1500, y: 680, color: "#2fa8ff", s: 0.75 },
      { x: 1860, y: 690, color: "#ffd60a" },
    ],
  },
  frontHill: {
    path: "M -20 890 Q 500 820 1000 875 T 1940 860 L 1940 1100 L -20 1100 Z",
    shine: "M 40 885 Q 400 830 820 860",
    flowers: [
      { x: 520, y: 970, color: "#ffd60a", s: 0.85 },
      { x: 960, y: 1060, color: "#ff4f9a", s: 0.9 },
      { x: 1400, y: 975, color: "#7c4dff", s: 0.85 },
      { x: 1860, y: 1000, color: "#2fa8ff" },
      { x: 70, y: 1040, color: "#ff3b3b" },
    ],
    grass: [
      [140, 950],
      [600, 1050],
      [1000, 940],
      [1330, 1060],
      [1780, 930],
    ],
  },
  butterflies: [
    { x0: -100, y0: 430, v: 4, color: "#ff4f9a", ph: 0 },
    { x0: 2020, y0: 580, v: -3.2, color: "#ffd60a", ph: 2 },
  ],
  intro: { lines: ["Veggie Squad!"], size: 170, topFrom: 380, topTo: 40, scaleFrom: 1.2, scaleTo: 0.9 },
  final: { lines: ["Eat Your Veggies!"], size: 140, top: 30 },
  banner: { top: 225, left: 310, width: 1300 },
  hey: [960, 420],
  cast: {
    carrot: { x: 300, y: 1010, size: 0.85 },
    tomato: { x: 740, y: 1010, size: 0.85 },
    broccoli: { x: 1180, y: 1010, size: 0.85 },
    cucumber: { x: 1620, y: 1010, size: 0.85 },
  },
  confetti: 120,
};

export const LAYOUTS = { portrait: PORTRAIT, landscape: LANDSCAPE };
export type LayoutName = keyof typeof LAYOUTS;
