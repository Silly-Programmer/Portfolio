import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, FolderGit2, Briefcase, Mail } from "lucide-react";
import { PROFILE } from "./data/profile";
import { PROJECTS } from "./data/projects";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Same rule as Projects.jsx: only count as "having projects" if at least
  // one category (Photoshop, Premiere Pro, or any you add later) isn't empty.
  const hasProjects = Object.values(PROJECTS).some((arr) => arr.length > 0);

  const links = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Skills", icon: Code },
    ...(hasProjects ? [{ name: "Projects", icon: FolderGit2 }] : []),
    { name: "Experience", icon: Briefcase },
    { name: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-brand-bg text-brand-dark border-3 border-brand-dark neo-shadow px-3 sm:px-4 py-3 flex items-center justify-between" style={{ maxWidth: 'min(92vw, 72rem)' }}>
      {/* Brand Logo - Tilted Badge */}
      <a href="#home" className="inline-block">
        <div className="bg-brand-dark text-brand-bg px-2 py-1 font-display font-extrabold text-lg md:text-xl uppercase tracking-wide whitespace-nowrap rotate-[-1.5deg] border-2 border-brand-dark hover:rotate-[1.5deg] transition-transform duration-150">
          {PROFILE.name}
        </div>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-2">
        {links.map(({ name, icon: Icon }, i) => (
          <a
            key={i}
            href={`#${name.toLowerCase()}`}
            className="flex items-center gap-2 px-4 py-2 font-display font-extrabold text-sm border-2 border-transparent hover:bg-brand-rose hover:border-brand-dark hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_var(--color-brand-dark)] transition-all duration-150 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Icon size={16} strokeWidth={2.5} />
            <span>{name}</span>
          </a>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden flex items-center justify-center p-2 border-2 border-brand-dark bg-brand-rose neo-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-3 bg-brand-bg border-3 border-brand-dark neo-shadow p-4 md:hidden flex flex-col gap-2"
          >
            {links.map(({ name, icon: Icon }, i) => (
              <a
                key={i}
                href={`#${name.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 font-display font-extrabold text-base border-2 border-brand-dark bg-brand-bg hover:bg-brand-red hover:text-brand-bg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_var(--color-brand-dark)] transition-all duration-150"
              >
                <Icon size={18} strokeWidth={2.5} />
                <span>{name}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
