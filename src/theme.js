// ============================================================
// theme.js — DO NOT hardcode colors anywhere else in JS.
//
// The one real source of truth for color is the `@theme` block
// at the top of `src/style.css` (Tailwind v4 reads it to generate
// bg-brand-*, text-brand-*, border-brand-* etc. utility classes).
//
// Some things (the p5.js canvas in Hero.jsx, dynamic inline
// styles in Skills.jsx/Projects.jsx) can't use Tailwind classes,
// so this file reads the *same* CSS variables at runtime instead
// of duplicating hex values. Change a color once in style.css and
// everything — Tailwind classes AND canvas/JS — updates together.
// ============================================================

const FALLBACK = {
  bg: "#FBFAF7",
  dark: "#182125",
  red: "#EB4E63",
  gray: "#969898",
  muddy: "#908571",
  rose: "#E0A0A1",
};

/** Read one brand color (e.g. themeColor("red")) as a hex string. */
export function themeColor(name) {
  if (typeof window === "undefined") return FALLBACK[name] ?? "#000000";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-brand-${name}`)
    .trim();
  return value || FALLBACK[name] || "#000000";
}

/** All brand colors at once, read live from style.css. */
export function themePalette() {
  return {
    bg: themeColor("bg"),
    dark: themeColor("dark"),
    red: themeColor("red"),
    gray: themeColor("gray"),
    muddy: themeColor("muddy"),
    rose: themeColor("rose"),
  };
}

/** "#RRGGBB" -> [r, g, b] — handy for p5.js's s.fill()/s.stroke() with alpha. */
export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
