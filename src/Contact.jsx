import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { PROFILE } from "./data/profile";

const TILES = [
  { name: "Email", icon: Mail, href: `mailto:${PROFILE.email}`, sub: PROFILE.email, bg: "bg-brand-red" },
  { name: "Instagram", icon: FaInstagram, href: PROFILE.socials.instagram, sub: "@your.handle", bg: "bg-brand-rose" },
  { name: "YouTube", icon: FaYoutube, href: PROFILE.socials.youtube, sub: "Edited videos", bg: "bg-brand-dark", text: "text-brand-bg" },
];

export default function Contact() {
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TILES.map((tile, i) => (
            <motion.a
              key={tile.name}
              href={tile.href}
              target={tile.name === "Email" ? undefined : "_blank"}
              rel={tile.name === "Email" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col items-center gap-3 p-6 border-3 border-brand-dark neo-shadow ${tile.bg} ${tile.text || "text-brand-dark"} hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_var(--color-brand-dark)] transition-all duration-150`}
            >
              <tile.icon size={30} strokeWidth={2} />
              <span className="font-display font-extrabold text-sm uppercase tracking-wider">{tile.name}</span>
              <span className="text-xs opacity-80 font-bold text-center">{tile.sub}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
