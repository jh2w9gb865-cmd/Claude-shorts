import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Nunito Black (OFL), bundled locally so renders don't depend on the network.
export const fontFamily = "Nunito";

loadFont({
  family: fontFamily,
  url: staticFile("fonts/nunito-900-cyrillic.woff2"),
  weight: "900",
  unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
});

loadFont({
  family: fontFamily,
  url: staticFile("fonts/nunito-900-latin.woff2"),
  weight: "900",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
});
