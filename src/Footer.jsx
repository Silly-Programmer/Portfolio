import { PROFILE } from "./data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-brand-dark text-brand-bg border-t-3 border-brand-dark py-8 overflow-hidden select-none">
      {/* Marquee Banner */}
      <div className="flex border-b-2 border-brand-bg/20 pb-6 mb-6">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-display font-black text-lg md:text-xl uppercase tracking-widest text-brand-bg">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span> {PROFILE.name} </span>
              <span className="text-brand-red"> ✦ </span>
              <span> {PROFILE.tagline} </span>
              <span className="text-brand-rose"> ✦ </span>
              <span> Visual Storyteller </span>
              <span className="text-brand-muddy"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* Copyright Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-bg/70">
        <p>&copy; {year} {PROFILE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
