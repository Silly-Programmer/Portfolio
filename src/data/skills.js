// ============================================================
// skills.js — edit THIS file to change the Skills section tabs
// and tools. Each tool needs EITHER a `logo` (image URL) OR an
// `icon` (a lucide-react component) — never both.
// ============================================================

import { Aperture, Film, AudioWaveform, Palette } from "lucide-react";

const devicon = (slug, variant = "plain") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

export const SKILLS = {
  "Photo Editing": [
    { name: "Photoshop", logo: devicon("photoshop") },
    { name: "Illustrator", logo: devicon("illustrator") },
    { name: "Camera Raw", icon: Aperture },
  ],
  "Video Editing": [
    { name: "Premiere Pro", logo: devicon("premierepro") },
    { name: "After Effects", logo: devicon("aftereffects") },
    // { name: "DaVinci Resolve", icon: Film },
    { name: "Audacity", icon: AudioWaveform },
  ],
  // "Other Tools": [
  //   { name: "Canva", icon: Palette },
  // ],
};
