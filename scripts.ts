// app/scripts.ts
import type { ScriptProps } from "next/script";

export type CustomScript = ScriptProps & {
  [key: string]: any; // allow data-* or other custom attributes
};

export const scripts: CustomScript[] = [
  {
    src: "https://fpyf8.com/88/tag.min.js",
    async: true,
    strategy: "afterInteractive",
    "data-zone": "177457",
    "data-cfasync": "false",
  },
];
