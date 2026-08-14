import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaVimeoV, FaGoogleDrive, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS } from "./data/projects";
import { themePalette } from "./theme";

const LINK_ICON = {
  youtube: FaYoutube,
  vimeo: FaVimeoV,
  drive: FaGoogleDrive,
  file: FaDownload,
  link: FaExternalLinkAlt,
};

export default function Projects() {
  const categories = Object.keys(PROJECTS).filter((cat) => PROJECTS[cat].length > 0);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const palette = useMemo(() => themePalette(), []);
  const coverAccents = [palette.rose, palette.muddy];

  // If a category empties out while it was the active tab, fall back to
  // whichever category still has projects instead of showing a blank grid.
  const currentTab = categories.includes(activeTab) ? activeTab : categories[0];

  // No projects anywhere yet (both Photoshop and Premiere Pro empty in
  // projects.js) — hide the whole section instead of showing an empty shell.
  if (categories.length === 0) return null;

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-4 sm:px-6 bg-brand-bg text-brand-dark border-t-3 border-brand-dark flex items-center justify-center"
    >
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <div className="flex justify-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-brand-rose text-brand-dark px-4 py-2.5 sm:px-8 sm:py-3 border-3 border-brand-dark neo-shadow sm:neo-shadow-lg"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
              Selected Work
            </h2>
          </motion.div>
        </div>

        {/* Tabs — only shown when there's more than one non-empty category */}
        {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = currentTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 font-display font-extrabold text-sm sm:text-base uppercase tracking-wider border-3 border-brand-dark transition-all duration-150 ${
                  isActive
                    ? "bg-brand-red text-brand-bg neo-shadow-sm translate-x-[-2px] translate-y-[-2px]"
                    : "bg-brand-bg text-brand-dark hover:bg-brand-rose"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        )}

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PROJECTS[currentTab].map((p, i) => (
              <div
                key={p.title}
                className="border-3 border-brand-dark bg-brand-bg neo-shadow flex flex-col overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_var(--color-brand-dark)] transition-all duration-150"
              >
                {/* Cover strip — swap for a real thumbnail by adding cover.src in projects.js */}
                <div
                  className="h-28 border-b-3 border-brand-dark flex items-center justify-center"
                  style={{ backgroundColor: coverAccents[i % coverAccents.length] }}
                >
                  <span className="font-display font-black uppercase tracking-widest text-xs text-brand-dark/70">
                    {currentTab}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-display font-extrabold text-lg uppercase">{p.title}</h3>
                  <p className="text-sm text-brand-dark/80 font-medium">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xxs sm:text-xs font-bold uppercase tracking-wide px-2 py-1 bg-brand-bg border-2 border-brand-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {p.links.map((link) => {
                      const Icon = LINK_ICON[link.type] || FaExternalLinkAlt;
                      const isFile = link.type === "file";
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          target={isFile ? undefined : "_blank"}
                          rel={isFile ? undefined : "noopener noreferrer"}
                          download={isFile || undefined}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-bold bg-brand-dark text-brand-bg border-2 border-brand-dark hover:bg-brand-red transition-colors duration-150"
                        >
                          <Icon size={13} />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
