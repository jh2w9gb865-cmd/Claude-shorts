export const OUTLINE = "#2b1a3d";
export const SW = 7;

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const mix = (a: number, b: number, w: number) => a + (b - a) * w;

export const starPath = (
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  points = 5,
) => {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"} ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} `;
  }
  return d + "Z";
};
