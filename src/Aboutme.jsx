import { motion } from "framer-motion";
import { Clapperboard, MapPin, Sparkles, Github } from "lucide-react";
import { PROFILE } from "./data/profile";

// Retro Window Component
function NeoWindow({ title, icon: Icon, children, headerBg = "bg-brand-dark", textCol = "text-brand-bg", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="border-3 border-brand-dark bg-brand-bg neo-shadow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--color-brand-dark)] cursor-pointer"
    >
      {/* Title Bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b-3 border-brand-dark ${headerBg} ${textCol}`}>
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} strokeWidth={2.5} />}
          <span className="font-display font-extrabold text-sm uppercase tracking-wider">{title}</span>
        </div>
        {/* Mock Window Controls */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 border-brand-dark bg-brand-red"></span>
          <span className="w-3 h-3 rounded-full border-2 border-brand-dark bg-brand-rose"></span>
          <span className="w-3 h-3 rounded-full border-2 border-brand-dark bg-brand-muddy"></span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}

const WHAT_I_DO = [
  "Photo Retouching",
  "Compositing & Manipulation",
  "Color Grading",
  "Narrative Video Editing",
  "Sound Design",
  "Motion Titles",
  "Beat-sync Editing",
  "Batch Delivery",
];

export default function AboutMe() {
  const statCardBase = `https://awesome-github-stats.azurewebsites.net`;

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 bg-brand-bg text-brand-dark border-t-3 border-brand-dark bg-grid-pattern flex items-center justify-center"
    >
      <div className="max-w-6xl w-full z-10">

        {/* Section Heading Card */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-brand-red text-brand-bg px-4 py-2.5 sm:px-8 sm:py-3 border-3 border-brand-dark neo-shadow sm:neo-shadow-lg"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
              About Me
            </h2>
          </motion.div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left Column: Bio & Info */}
          <div className="space-y-8">

            {/* Bio Card */}
            <NeoWindow title="Editor Bio" icon={Clapperboard} headerBg="bg-brand-muddy" textCol="text-brand-bg">
              <p className="text-base md:text-lg leading-relaxed font-bold text-brand-dark">
                Hello, I&apos;m{" "}
                <span className="px-1.5 py-0.5 bg-brand-rose border-2 border-brand-dark inline-block rotate-[-1deg] text-brand-dark">
                  {PROFILE.name}
                </span>{" "}
                — a{" "}
                <span className="underline decoration-brand-red decoration-3">
                  {PROFILE.tagline}
                </span>.
              </p>
              {PROFILE.bio.slice(1).map((para, i) => (
                <p key={i} className="mt-4 text-base md:text-lg leading-relaxed text-brand-dark/80">
                  {para}
                </p>
              ))}
            </NeoWindow>

            {/* Focus & Availability Card */}
            <NeoWindow title="Focus & Availability" icon={MapPin} headerBg="bg-brand-rose" textCol="text-brand-dark">
              <div className="font-bold text-brand-dark">
                <span className="text-xl font-display font-black uppercase block">
                  {PROFILE.available ? "Open for freelance work" : "Currently booked"}
                </span>
                <span className="text-brand-red text-lg block mt-1">
                  Photoshop &amp; Premiere Pro
                </span>
                <div className="mt-3 p-3 bg-brand-bg border-2 border-brand-dark neo-shadow-sm flex flex-col gap-1 text-sm md:text-base">
                  <span>Based in {PROFILE.location}</span>
                  <span>Remote-friendly, works with clients worldwide</span>
                  <span>Turnaround discussed per project</span>
                </div>
              </div>
            </NeoWindow>

            {/* What I Do Card */}
            <NeoWindow title="What I Do" icon={Sparkles} headerBg="bg-brand-dark" textCol="text-brand-bg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_I_DO.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 bg-brand-bg border-2 border-brand-dark text-xs md:text-sm font-bold shadow-[2px_2px_0px_0px_var(--color-brand-dark)] hover:bg-brand-rose transition-colors duration-100"
                  >
                    <span className="w-2.5 h-2.5 bg-brand-red border border-brand-dark shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </NeoWindow>
          </div>

          {/* Right Column: Showcase Platforms */}
          <div className="space-y-8">

            {/* GitHub Stats Panel — optional, only if PROFILE.github is set */}
            {PROFILE.github && (
              <NeoWindow
                title="GitHub Activity"
                icon={Github}
                headerBg="bg-brand-muddy"
                textCol="text-brand-bg"
                onClick={() => window.open(`https://github.com/${PROFILE.github}`, "_blank")}
              >
                <div className="border-2 border-brand-dark p-2 bg-brand-dark neo-shadow-sm overflow-hidden hover:scale-[1.01] transition-transform duration-150">
                  <img
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    alt={`GitHub stats card for ${PROFILE.github}`}
                    src={`${statCardBase}/user-stats/${PROFILE.github}?cardType=github&theme=dark&fontFamily=Mandali&preferLogin=false&Border=000000`}
                  />
                </div>
                <div className="mt-3 text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-black bg-brand-rose px-2.5 py-1 border border-brand-dark">
                    Click to visit GitHub
                  </span>
                </div>
              </NeoWindow>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
