import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "./data/skills";
import { themePalette } from "./theme";

export default function Skills() {
  const categories = Object.keys(SKILLS);
  const [activeTab, setActiveTab] = useState(categories[0]);

  // Read the theme once, client-side, instead of hardcoding hex here.
  const palette = useMemo(() => themePalette(), []);
  const tabAccents = [palette.red, palette.rose, palette.muddy];
  const cardAccents = [palette.rose, palette.muddy, palette.bg];

  return (
    <section
      id="skills"
      className="relative w-full py-24 px-4 sm:px-6 bg-brand-bg text-brand-dark border-t-3 border-brand-dark flex items-center justify-center"
    >
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <div className="flex justify-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-brand-muddy text-brand-bg px-4 py-2.5 sm:px-8 sm:py-3 border-3 border-brand-dark neo-shadow sm:neo-shadow-lg"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
              Skills &amp; Tools
            </h2>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, i) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={isActive ? { backgroundColor: tabAccents[i % tabAccents.length] } : undefined}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 font-display font-extrabold text-sm sm:text-base uppercase tracking-wider border-3 border-brand-dark transition-all duration-150 ${
                  isActive
                    ? "text-brand-dark neo-shadow-sm translate-x-[-2px] translate-y-[-2px]"
                    : "bg-brand-bg text-brand-dark hover:bg-brand-rose"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {SKILLS[activeTab].map((tool, i) => (
              <div
                key={tool.name}
                className="flex flex-col items-center justify-center gap-3 p-5 bg-brand-bg border-3 border-t-4 border-brand-dark neo-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--color-brand-dark)] transition-all duration-150"
                style={{ borderTopColor: cardAccents[i % (cardAccents.length - 1)] }}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : tool.icon ? (
                    <tool.icon size={32} strokeWidth={1.8} className="text-brand-dark" />
                  ) : null}
                </div>
                <span className="font-bold text-xs sm:text-sm text-center">{tool.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
