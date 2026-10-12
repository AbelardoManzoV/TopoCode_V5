import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WordReveal } from "./ui/TextReveal";
import { useLanguage } from "../hooks/useLanguage";
import { AnimatedSection } from "./ui/AnimatedSection";
import { ScrollTextReveal } from "./gsap/ScrollTextReveal";

function Counter({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div className="text-left">
      <span ref={ref} className="text-4xl md:text-6xl font-bold text-topo-light tabular-nums">
        {count}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-topo-gray">{label}</p>
    </div>
  );
}

export function About() {
  const { t, language } = useLanguage();

  return (
    <section id="nosotros" className="py-28 md:py-40 bg-topo-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedSection key={`about-text-${language}`} variant="fadeInRight">
            <WordReveal
              key={`about-title-${language}`}
              as="h2"
              className="text-4xl md:text-6xl font-bold tracking-tight text-topo-text leading-[1.05]"
              stagger={0.05}
              duration={0.6}
            >
              {t.about.title}
            </WordReveal>
            <ScrollTextReveal
              key={`about-p1-${language}`}
              className="mt-6 text-lg text-topo-gray leading-relaxed"
              start="top 85%"
              end="top 55%"
            >
              {t.about.paragraph1}
            </ScrollTextReveal>
            <ScrollTextReveal
              key={`about-p2-${language}`}
              className="mt-4 text-lg text-topo-gray leading-relaxed"
              start="top 85%"
              end="top 55%"
            >
              {t.about.paragraph2}
            </ScrollTextReveal>

            <motion.div
              key={`about-stats-${language}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-14 grid grid-cols-2 gap-6 pt-10 border-t border-topo-border"
            >
              {t.about.stats.map((stat) => (
                <Counter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
