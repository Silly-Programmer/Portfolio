// ============================================================
// profile.js — edit THIS file to update your identity across
// the whole site (Navbar, Hero, About, Footer, Contact all
// read from here — nothing else needs to change).
// ============================================================

export const PROFILE = {
  name: "Karan",                                  // shown in Navbar + Hero
  greeting: "Hey, welcome!",                      // small badge above your name in Hero
  tagline: "Photoshop & Premiere Pro Editor",      // shown under your name

  bio: [
    "Hi, I'm Karan — a Photoshop and Premiere Pro editor. I retouch, composite, cut and grade, so what you shoot ends up looking exactly like it felt.",
    "I work across two timelines — stills and motion. In Photoshop that means clean retouching, composites and manipulation that still look believable up close. In Premiere Pro that means narrative cuts, color and sound design that carry a story without getting in its way.",
  ],

  location: "India",
  available: true,          // toggles the "open for work" note

  resumeUrl: `https://drive.google.com/uc?export=download&id=${import.meta.env.VITE_RESUME_FILE_ID}`, // replace public/Ganesh_M.pdf with your own PDF named Resume.pdf
  email: "karanprajapati032006@gmail.com",

  // Used by the About section's stat widget. Leave github blank ("") to hide that card.
  github: "",

  socials: {
    instagram: "https://instagram.com/_karanp__",
    youtube: "https://youtube.com/",
    discord: "https://discordapp.com/users/1219625773456162836"
  },
};
