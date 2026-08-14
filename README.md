# Photoshop & Premiere Pro Editor Portfolio

A fast, interactive neo-brutalist portfolio site for a photo/video editor — built with **React**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and an interactive **p5.js** canvas background.

Every piece of content and every color on the site is driven by a handful of plain data files, so you can re-brand or update it without touching component code.

## Features

- Interactive magnetic-cursor canvas background (p5.js) on the Hero section
- Fully centralized theme — one CSS file controls every color across the whole site, including the canvas
- Tabbed, data-driven **Skills** and **Projects** sections — add a category, get a new tab, automatically
- Sections hide themselves gracefully when their data is empty (no blank headings or dead nav links)
- GitHub stats card, resume download, and social links, all sourced from one profile file
- Fully responsive, with a mobile nav menu

## Tech Stack

| | |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Animation | Framer Motion |
| Canvas | p5.js |
| Icons | lucide-react, react-icons |

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint      # run eslint
```

## Project Structure

```
src/
├── style.css          # THEME — all colors + fonts (@theme block at the top)
├── theme.js            # lets p5.js / inline styles read the same theme colors at runtime
├── data/
│   ├── profile.js       # name, tagline, bio, resume, email, socials
│   ├── skills.js         # skills tabs + tools
│   ├── projects.js        # project categories + cards
│   └── experience.js       # work history + certifications
├── Navbar.jsx, Hero.jsx, Aboutme.jsx, Skills.jsx,
│   Projects.jsx, Experience.jsx, Contact.jsx, Footer.jsx   # rendering only — read from data/ above
public/
└── Resume.pdf          # replace with your own file of the same name
```

## Customization

You should only ever need to edit the files in `src/data/` and `src/style.css` — not the component `.jsx` files.

### Theme — `src/style.css`

```css
@theme {
  --color-brand-bg: #FBFAF7;
  --color-brand-dark: #182125;
  --color-brand-red: #EB4E63;
  --color-brand-gray: #969898;
  --color-brand-muddy: #908571;
  --color-brand-rose: #E0A0A1;

  --font-display: "Syne", sans-serif;
  --font-sans: "Space Grotesk", sans-serif;
}
```

Change a hex value here and it updates everywhere — Tailwind utility classes, card shadows, and the p5.js canvas colors all read from this single source. If you swap fonts, also update the Google Fonts `<link>` in `index.html`.

### Identity — `src/data/profile.js`

Name, tagline, bio paragraphs (any array length), location, resume URL, email, GitHub username (set `github: ""` to hide the GitHub stats card), and social links. Used by the Navbar, Hero, About, Footer, and Contact sections.

### Skills — `src/data/skills.js`

```js
export const SKILLS = {
  "Photo Editing": [
    { name: "Photoshop", logo: devicon("photoshop") },
    { name: "Camera Raw", icon: Aperture }, // or a lucide-react icon instead of a logo
  ],
  "Video Editing": [ /* ... */ ],
};
```

Object keys become tabs automatically — rename a key or add a new one and the Skills section updates with no other changes needed. Each tool needs either `logo` (image URL) or `icon` (a `lucide-react` component), never both.

### Projects — `src/data/projects.js`

```js
export const PROJECTS = {
  Photoshop: [ { title, desc, tags: [...], links: [...] } ],
  "Premiere Pro": [ /* ... */ ],
};
```

- Add a new category key (e.g. `Figma: [...]`) and a new tab appears on its own.
- Empty a category (`Photoshop: []`) and its tab disappears; if only one category has projects left, the tab bar hides entirely.
- Empty every category and the whole Projects section *and* its navbar link disappear.
- Each project's `links` array supports `type: "youtube" | "vimeo" | "drive" | "file" | "link"` — `"file"` renders as a direct-download button.

### Experience — `src/data/experience.js`

`EXPERIENCES` and `CERTIFICATIONS` are both plain arrays — add, remove, or reorder freely. Leave `CERTIFICATIONS` as `[]` to hide that whole subsection; it reappears automatically once you add an entry.

### Resume — `src/data/profile.js`

Replace url file with your google link — the "Get My Resume" button points at the link provided, or use VITE_RESUME_FILE_ID in .env then use the file id in the link in env to let seurely download resume, without commiting in git history.

`https://drive.google.com/uc?export=download&id=${import.meta.env.VITE_RESUME_FILE_ID}`

## Deployment

This is a static Vite build — deploy the `dist/` folder to Netlify, Vercel, GitHub Pages, or any static host.

```bash
npm run build
```

## License

Personal portfolio project — feel free to fork and adapt for your own use.
