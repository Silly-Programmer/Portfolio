import { motion } from "framer-motion";
import { Mail, Link as LinkIcon } from "lucide-react";
import {
  FaInstagram, FaYoutube, FaDiscord, FaBehance, FaTwitter,
  FaLinkedin, FaTiktok, FaFacebook, FaPinterest, FaGithub,
  FaDribbble, FaThreads, FaTwitch, FaSnapchat,
} from "react-icons/fa6";
import { PROFILE } from "./data/profile";

// Known platforms get a matching icon/label/color automatically.
// Add a brand-new platform key to PROFILE.socials in profile.js and, if it's
// not listed here, it still renders fine with a generic link icon + its key
// as the label — you only need to add a row here if you want a custom icon.
const SOCIAL_META = {
  instagram: { icon: FaInstagram, label: "Instagram", bg: "bg-brand-rose" },
  youtube:   { icon: FaYoutube,   label: "YouTube",   bg: "bg-brand-dark", text: "text-brand-bg" },
  discord:   { icon: FaDiscord,   label: "Discord",   bg: "bg-brand-bg" },
  behance:   { icon: FaBehance,   label: "Behance",   bg: "bg-brand-muddy", text: "text-brand-bg" },
  twitter:   { icon: FaTwitter,   label: "Twitter",   bg: "bg-brand-bg" },
  x:         { icon: FaTwitter,   label: "X",         bg: "bg-brand-dark", text: "text-brand-bg" },
  linkedin:  { icon: FaLinkedin,  label: "LinkedIn",  bg: "bg-brand-rose" },
  tiktok:    { icon: FaTiktok,    label: "TikTok",    bg: "bg-brand-dark", text: "text-brand-bg" },
  facebook:  { icon: FaFacebook,  label: "Facebook",  bg: "bg-brand-rose" },
  pinterest: { icon: FaPinterest, label: "Pinterest", bg: "bg-brand-muddy", text: "text-brand-bg" },
  github:    { icon: FaGithub,    label: "GitHub",    bg: "bg-brand-dark", text: "text-brand-bg" },
  dribbble:  { icon: FaDribbble,  label: "Dribbble",  bg: "bg-brand-rose" },
  threads:   { icon: FaThreads,   label: "Threads",   bg: "bg-brand-bg" },
  twitch:    { icon: FaTwitch,    label: "Twitch",    bg: "bg-brand-muddy", text: "text-brand-bg" },
  snapchat:  { icon: FaSnapchat,  label: "Snapchat",  bg: "bg-brand-rose" },
};

function buildTiles() {
  const tiles = [
    { key: "email", name: "Email", icon: Mail, href: `mailto:${PROFILE.email}`, sub: PROFILE.email, bg: "bg-brand-red" },
  ];

  Object.entries(PROFILE.socials || {}).forEach(([key, url]) => {
    if (!url) return; // empty value = skip, no tile
    const meta = SOCIAL_META[key.toLowerCase()] || {
      icon: LinkIcon,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      bg: "bg-brand-bg",
    };
    tiles.push({ key, name: meta.label, icon: meta.icon, href: url, sub: url.replace(/^https?:\/\//, ""), bg: meta.bg, text: meta.text });
  });

  return tiles;
}

export default function Contact() {
  const tiles = buildTiles();

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 sm:px-6 bg-brand-bg text-brand-dark border-t-3 border-brand-dark flex items-center justify-center"
    >
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-brand-red text-brand-bg px-4 py-2.5 sm:px-8 sm:py-3 border-3 border-brand-dark neo-shadow sm:neo-shadow-lg mb-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
            Let&apos;s Work Together
          </h2>
        </motion.div>

        <p className="max-w-xl mx-auto font-bold text-brand-dark/80 mb-12">
          Got footage to cut or shots to retouch? Send it over — I&apos;ll reply with turnaround and pricing.
        </p>

        {/* flex-wrap + justify-center instead of a fixed grid, so tiles always
            stay centered no matter how many socials you add or remove. */}
        <div className="flex flex-wrap justify-center gap-4">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.key}
              href={tile.href}
              target={tile.key === "email" ? undefined : "_blank"}
              rel={tile.key === "email" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`w-40 sm:w-44 flex flex-col items-center gap-3 p-6 border-3 border-brand-dark neo-shadow ${tile.bg} ${tile.text || "text-brand-dark"} hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_var(--color-brand-dark)] transition-all duration-150`}
            >
              <tile.icon size={30} />
              <span className="font-display font-extrabold text-sm uppercase tracking-wider">{tile.name}</span>
              <span className="text-xs opacity-80 font-bold text-center break-all">{tile.sub}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
