import { motion } from "framer-motion";
import { Briefcase, Award, ExternalLink } from "lucide-react";
import { EXPERIENCES, CERTIFICATIONS } from "./data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-24 px-4 sm:px-6 bg-brand-bg text-brand-dark border-t-3 border-brand-dark flex items-center justify-center"
    >
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-brand-dark text-brand-bg px-4 py-2.5 sm:px-8 sm:py-3 border-3 border-brand-dark neo-shadow sm:neo-shadow-lg"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
              Experience
            </h2>
          </motion.div>
        </div>

        {/* Work Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={20} strokeWidth={2.5} />
            <h3 className="font-display font-extrabold text-xl uppercase tracking-wider">Work</h3>
          </div>

          <div className="space-y-6 border-l-3 border-brand-dark pl-6 ml-2">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative border-3 border-brand-dark bg-brand-bg neo-shadow-sm p-5"
              >
                <span className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-brand-red border-2 border-brand-dark" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display font-extrabold text-lg">{exp.role}</h4>
                  <span className="font-mono text-xs sm:text-sm font-bold text-brand-dark/70">{exp.duration}</span>
                </div>
                <div className="text-sm font-bold text-brand-red mb-2">
                  {exp.company} · {exp.location}
                </div>
                <p className="text-sm text-brand-dark/80 font-medium">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications — only rendered if experience.js has entries */}
        {CERTIFICATIONS.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award size={20} strokeWidth={2.5} />
            <h3 className="font-display font-extrabold text-xl uppercase tracking-wider">Certifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-3 border-brand-dark bg-brand-bg neo-shadow-sm p-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_var(--color-brand-dark)] transition-all duration-150"
              >
                <h4 className="font-display font-extrabold text-sm uppercase mb-2">{cert.title}</h4>
                <p className="text-xs text-brand-dark/70 font-bold mb-3">{cert.skills}</p>
                {cert.links.length > 0 && (
                  <a
                    href={cert.links[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase px-2.5 py-1.5 bg-brand-muddy text-brand-bg border-2 border-brand-dark hover:bg-brand-red transition-colors"
                  >
                    View <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
