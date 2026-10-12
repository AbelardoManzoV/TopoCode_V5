import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "./ui/Button";
import { MagneticButton } from "./ui/MagneticButton";
import { WordReveal } from "./ui/TextReveal";
import { BackgroundPaths } from "./ui/BackgroundPaths";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  // El mouse vive en motion values: no re-renderiza el Hero en cada movimiento.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useTransform(mouseX, (v) => v * 2);
  const spotY = useTransform(mouseY, (v) => v * 2);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at calc(50% + ${spotX}px) calc(50% + ${spotY}px), rgba(110,135,183,0.12), transparent 40%)`;
  const tiltY = useSpring(useTransform(mouseX, (v) => -v * 0.08), { stiffness: 200, damping: 25 });
  const tiltX = useSpring(useTransform(mouseY, (v) => v * 0.08), { stiffness: 200, damping: 25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
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
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block opacity-60"
          style={{ background: spotlight }}
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
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-topo-text dark:text-white leading-[1.05]"
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
            </div>

            <motion.div
              key={`mockup-${language}`}
              initial={{ opacity: 0, x: 60, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              <motion.div
                style={{ rotateY: tiltY, rotateX: tiltX, transformPerspective: 1200 }}
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
                    <span className="text-topo-text dark:text-white">{t.hero.code.project}</span>{" "}
                    <span className="text-topo-blue">=</span>{" "}
                    <span className="text-topo-blue">{"{"}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pl-4 text-topo-light"
                  >
                    {t.hero.codeKeys.name}: <span className="text-green-400/90">&apos;{t.hero.code.name}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.95 }}
                    className="pl-4 text-topo-light"
                  >
                    {t.hero.codeKeys.type}: <span className="text-green-400/90">&apos;{t.hero.code.type}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="pl-4 text-topo-light"
                  >
                    {t.hero.codeKeys.status}: <span className="text-yellow-400/90">&apos;{t.hero.code.status}&apos;</span>,
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.25 }}
                    className="pl-4 text-topo-light"
                  >
                    {t.hero.codeKeys.ready}: <span className="text-topo-blue">{t.hero.code.ready}</span>
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
