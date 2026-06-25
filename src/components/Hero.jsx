import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/Button";
import { MagneticButton } from "./ui/MagneticButton";
import { WordReveal } from "./ui/TextReveal";
import { BackgroundPaths } from "./ui/BackgroundPaths";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <BackgroundPaths>
      <section
        ref={containerRef}
        id="inicio"
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      >
        {/* Local cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block opacity-60"
          style={{
            background: `radial-gradient(700px circle at calc(50% + ${mouse.x * 2}px) calc(50% + ${mouse.y * 2}px), rgba(110,135,183,0.12), transparent 40%)`,
          }}
        />

        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div
                key={`badge-${language}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-topo-blue/10 border border-topo-blue/20 text-topo-light text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-topo-blue animate-pulse" />
                {t.hero.badge}
              </motion.div>

              <WordReveal
                key={`title-${language}`}
                as="h1"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
                delay={0.2}
                stagger={0.08}
                duration={0.7}
              >
                {t.hero.title}
              </WordReveal>

              <motion.p
                key={`desc-${language}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 text-lg md:text-xl text-topo-light/85 max-w-xl leading-relaxed"
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                key={`ctas-${language}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <MagneticButton strength={0.25}>
                  <Button
                    variant="primary"
                    as="a"
                    href="#contacto"
                    className="text-base px-8 py-4"
                  >
                    {t.hero.primaryCta}
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button
                    variant="secondary"
                    as="a"
                    href="#servicios"
                    className="text-base px-8 py-4"
                  >
                    {t.hero.secondaryCta}
                    <ArrowDownRight size={18} className="ml-2" />
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div
                key={`social-${language}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-12 flex items-center gap-6 text-sm text-topo-gray"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="w-8 h-8 rounded-full border-2 border-topo-black bg-topo-surface flex items-center justify-center text-xs font-medium text-topo-light"
                    >
                      {i === 1 ? "RP" : i === 2 ? "MA" : "JL"}
                    </motion.div>
                  ))}
                </div>
                <p>{t.hero.socialProof}</p>
              </motion.div>
            </div>

            <motion.div
              key={`mockup-${language}`}
              initial={{ opacity: 0, x: 60, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
              style={{
                transform: `perspective(1200px) rotateY(${-mouse.x * 0.08}deg) rotateX(${mouse.y * 0.08}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-topo-border bg-topo-surface/90 backdrop-blur-sm shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-topo-border bg-topo-black/50">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  <span className="ml-4 text-xs text-topo-gray font-mono">
                    topocode-project.jsx
                  </span>
                </div>

                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-topo-gray">
                    <span className="text-topo-blue">const</span>{" "}
                    <span className="text-white">{t.hero.code.project}</span>{" "}
                    <span className="text-topo-blue">=</span>{" "}
                    <span className="text-topo-blue">{"{"}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pl-4 text-topo-light"
                  >
                    nombre: <span className="text-green-400/90">&apos;{t.hero.code.name}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.95 }}
                    className="pl-4 text-topo-light"
                  >
                    tipo: <span className="text-green-400/90">&apos;{t.hero.code.type}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="pl-4 text-topo-light"
                  >
                    estado: <span className="text-yellow-400/90">&apos;{t.hero.code.status}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.25 }}
                    className="pl-4 text-topo-light"
                  >
                    listo: <span className="text-topo-blue">{t.hero.code.ready}</span>
                  </motion.div>
                  <div className="text-topo-blue">{"}"}</div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-2 inline-block w-2 h-4 bg-topo-blue"
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-topo-surface border border-topo-border rounded-xl px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="text-xs text-topo-gray uppercase tracking-wider">{t.hero.stack}</div>
                <div className="text-sm font-semibold text-topo-light">{t.hero.stackValue}</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-8 bg-topo-surface border border-topo-border rounded-xl px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="text-xs text-topo-gray uppercase tracking-wider">{t.hero.delivery}</div>
                <div className="text-sm font-semibold text-topo-light">{t.hero.deliveryValue}</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-topo-border to-transparent origin-center"
        />
      </section>
    </BackgroundPaths>
  );
}
