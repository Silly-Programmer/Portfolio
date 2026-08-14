import { useEffect, useRef } from "react";
import p5 from "p5";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "./data/profile";
import { themePalette, hexToRgb } from "./theme";

export default function Hero({
  name = PROFILE.name,
  greeting = PROFILE.greeting,
  tagline = PROFILE.tagline,
}) {
  const sketchParentRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    if (p5Ref.current) return;

    // Read the site's colors ONCE from the single theme source (style.css)
    // so the canvas always matches whatever the theme currently is.
    const c = themePalette();
    const rgb = {
      bg: hexToRgb(c.bg),
      dark: hexToRgb(c.dark),
      red: hexToRgb(c.red),
    };

    const sketch = (s) => {
      let shapes = [];
      const numShapes = 8;
      const palette = [c.red, c.muddy, c.rose, c.bg];

      let w = 0;
      let h = 0;

      const createShape = (x, y) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const spawnRadiusX = w * 0.5;
        const spawnRadiusY = h * 0.5;

        const baseX = x ?? centerX + s.random(-spawnRadiusX, spawnRadiusX);
        const baseY = y ?? centerY + s.random(-spawnRadiusY, spawnRadiusY);

        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          amplitude: s.random(15, 35),
          speed: s.random(0.0004, 0.001),
          phase: s.random(s.TAU),
          angle: s.random(s.TAU),
          rotationSpeed: s.random(-0.001, 0.001),
          size: s.random(25, 60),
          color: s.random(palette),
          type: s.random(["circle", "square", "triangle", "cross", "star"]),
        };
      };

      const drawShape = (ctx, type, size) => {
        switch (type) {
          case "circle":
            ctx.ellipse(0, 0, size, size);
            break;
          case "square":
            ctx.rect(0, 0, size, size);
            break;
          case "triangle":
            ctx.triangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2);
            break;
          case "cross":
            ctx.strokeWeight(3);
            ctx.line(-size / 2, 0, size / 2, 0);
            ctx.line(0, -size / 2, 0, size / 2);
            break;
          case "star":
            ctx.beginShape();
            for (let i = 0; i < 8; i++) {
              const angle = (i * s.TAU) / 8;
              const r = i % 2 === 0 ? size / 2 : size / 5;
              ctx.vertex(s.cos(angle) * r, s.sin(angle) * r);
            }
            ctx.endShape(s.CLOSE);
            break;
          default:
            break;
        }
      };

      s.setup = () => {
        w = s.windowWidth;
        h = s.windowHeight;
        const canvas = s.createCanvas(w, h);
        canvas.parent(sketchParentRef.current);
        s.rectMode(s.CENTER);
        s.ellipseMode(s.CENTER);
        for (let i = 0; i < numShapes; i++) shapes.push(createShape());
      };

      s.windowResized = () => {
        w = s.windowWidth;
        h = s.windowHeight;
        s.resizeCanvas(w, h);
      };

      s.draw = () => {
        s.background(rgb.bg[0], rgb.bg[1], rgb.bg[2]);

        const t = s.millis();

        // Grid
        const gridSize = 60;
        s.stroke(rgb.dark[0], rgb.dark[1], rgb.dark[2], 18);
        s.strokeWeight(1);
        for (let x = 0; x < w; x += gridSize) s.line(x, 0, x, h);
        for (let y = 0; y < h; y += gridSize) s.line(0, y, w, y);

        // Update positions
        shapes.forEach((p) => {
          const dx = s.mouseX - p.baseX;
          const dy = s.mouseY - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let magneticX = 0;
          let magneticY = 0;
          if (dist < 250 && dist > 0) {
            const force = ((250 - dist) / 250) * 10;
            magneticX = (dx / dist) * force;
            magneticY = (dy / dist) * force;
          }

          p.x = p.baseX + s.sin(t * p.speed + p.phase) * p.amplitude + magneticX;
          p.y = p.baseY + s.cos(t * p.speed * 0.8 + p.phase) * p.amplitude + magneticY;
          p.angle += p.rotationSpeed;
        });

        // Connections
        s.strokeWeight(1.5);
        for (let i = 0; i < shapes.length; i++) {
          for (let j = i + 1; j < shapes.length; j++) {
            const d = s.dist(shapes[i].x, shapes[i].y, shapes[j].x, shapes[j].y);
            if (d < 300) {
              const alpha = s.map(d, 0, 300, 90, 0);
              s.stroke(rgb.dark[0], rgb.dark[1], rgb.dark[2], alpha);
              s.line(shapes[i].x, shapes[i].y, shapes[j].x, shapes[j].y);
            }
          }
        }

        // Orbit dots
        shapes.forEach((p) => {
          const orbit = 10 + s.sin(s.frameCount * 0.03 + p.phase) * 3;
          s.noStroke();
          s.fill(rgb.dark[0], rgb.dark[1], rgb.dark[2], 90);
          s.circle(
            p.x + Math.cos(p.angle * 3) * orbit,
            p.y + Math.sin(p.angle * 3) * orbit,
            4
          );
        });

        // Cursor ripple
        const pulse = 40 + s.sin(s.frameCount * 0.08) * 10;
        s.noFill();
        s.stroke(rgb.red[0], rgb.red[1], rgb.red[2], 60);
        s.strokeWeight(2);
        s.circle(s.mouseX, s.mouseY, pulse);
        s.stroke(rgb.dark[0], rgb.dark[1], rgb.dark[2], 25);
        s.circle(s.mouseX, s.mouseY, pulse + 20);

        // Shapes
        shapes.forEach((p) => {
          const mouseDist = s.dist(p.x, p.y, s.mouseX, s.mouseY);
          let scale = 1;
          if (mouseDist < 180) scale = 1 + ((180 - mouseDist) / 180) * 0.15;

          s.push();
          s.translate(p.x, p.y);
          s.rotate(p.angle);
          s.scale(scale);

          // Shadow
          s.push();
          s.translate(5, 5);
          s.fill(c.dark);
          s.stroke(c.dark);
          s.strokeWeight(2);
          drawShape(s, p.type, p.size);
          s.pop();

          // Main shape
          s.fill(p.color);
          s.stroke(c.dark);
          s.strokeWeight(2);
          drawShape(s, p.type, p.size);
          s.pop();
        });
      };
    };

    p5Ref.current = new p5(sketch);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-brand-bg text-brand-dark flex flex-col justify-center items-center px-4 sm:px-6 pt-20"
      style={{ maxWidth: "100vw" }}
    >
      {/* Interactive Canvas Background */}
      <div ref={sketchParentRef} className="absolute inset-0 z-0 opacity-80" aria-hidden />

      {/* Hero Content Box */}
      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        {/* Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-dark bg-brand-rose font-display font-extrabold text-sm uppercase tracking-widest rotate-[-1deg] shadow-[2px_2px_0px_0px_var(--color-brand-dark)]"
        >
          {greeting}
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black leading-none uppercase tracking-tight text-brand-dark"
        >
          I am{" "}
          <span className="bg-brand-red text-brand-bg px-2 sm:px-4 py-1 inline-block rotate-[1.5deg] border-4 border-brand-dark shadow-[4px_4px_0px_0px_var(--color-brand-dark)] sm:shadow-[6px_6px_0px_0px_var(--color-brand-dark)] select-all">
            {name}
          </span>
        </motion.h1>

        {/* Tagline Description Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-2xl px-6 py-4 bg-brand-bg border-3 border-brand-dark neo-shadow font-sans font-bold text-base md:text-lg text-brand-dark"
        >
          {tagline}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center w-full"
        >
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 sm:px-8 py-3 sm:py-4 bg-brand-red text-brand-bg font-display font-extrabold text-base sm:text-lg border-3 border-brand-dark neo-shadow uppercase tracking-wider transition-all duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_var(--color-brand-dark)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full sm:w-auto text-center"
          >
            Get My Resume
          </a>

          <a
            href="#contact"
            className="inline-block px-5 sm:px-8 py-3 sm:py-4 bg-brand-muddy text-brand-bg font-display font-extrabold text-base sm:text-lg border-3 border-brand-dark neo-shadow uppercase tracking-wider transition-all duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_var(--color-brand-dark)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full sm:w-auto text-center"
          >
            Let&apos;s Talk!
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Chevron */}
      <motion.div
        className="absolute bottom-6 flex justify-center w-full z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" className="p-2 border-2 border-brand-dark bg-brand-bg hover:bg-brand-rose transition-colors">
          <ChevronDown size={24} strokeWidth={2.5} className="text-brand-dark" />
        </a>
      </motion.div>
    </section>
  );
}
