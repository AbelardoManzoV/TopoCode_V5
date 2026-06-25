import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";
import { MagneticButton } from "./ui/MagneticButton";
import { WordReveal } from "./ui/TextReveal";
import { useLanguage } from "../hooks/useLanguage";
import { AnimatedSection } from "./ui/AnimatedSection";
import { ImageReveal } from "./gsap/ImageReveal";
import { ScrollTextReveal } from "./gsap/ScrollTextReveal";

export function Portfolio() {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 bg-topo-surface border-y border-topo-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection key={`portfolio-header-${language}`} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <WordReveal
              key={`portfolio-title-${language}`}
              as="h2"
              className="text-4xl md:text-6xl font-bold tracking-tight text-topo-text leading-[1.05]"
              stagger={0.05}
              duration={0.6}
            >
              {t.portfolio.title}
            </WordReveal>
          </div>
          <ScrollTextReveal
            key={`portfolio-desc-${language}`}
            className="text-lg text-topo-gray max-w-md md:text-right"
            start="top 85%"
            end="top 60%"
          >
            {t.portfolio.description}
          </ScrollTextReveal>
        </AnimatedSection>

        <AnimatedSection key={`portfolio-card-${language}`} variant="fadeInScale">
          <div className="group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-topo-border bg-topo-surface shadow-[0_40px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
            <ImageReveal
              src="https://picsum.photos/seed/cafe-digital-mexico/1200/900"
              alt={t.portfolio.projectTitle}
              className="relative aspect-[4/3] lg:aspect-auto"
              direction="left"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-topo-text/80 via-topo-text/20 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute bottom-8 left-8 right-8 lg:right-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-topo-blue/20 border border-topo-blue/30 text-topo-white text-xs font-medium mb-3">
                  {t.portfolio.featured}
                </span>
                <p className="text-topo-white font-semibold text-xl">
                  {t.portfolio.category}
                </p>
                <p className="text-topo-gray text-sm">{t.portfolio.client}</p>
              </div>
            </ImageReveal>

            <motion.div
              style={{ y: contentY }}
              className="p-8 md:p-14 flex flex-col justify-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-topo-text mb-6 leading-tight">
                {t.portfolio.projectTitle}
              </h3>
              <p className="text-lg text-topo-gray mb-10 leading-relaxed">
                {t.portfolio.projectDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {t.portfolio.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="bg-topo-surface text-topo-light px-4 py-1.5 rounded-full text-sm font-medium border border-topo-border hover:border-topo-blue/50 hover:text-topo-blue transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton strength={0.25}>
                  <Button variant="primary" as="a" href="#contacto" className="group/btn">
                    {t.portfolio.primaryCta}
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button
                    variant="ghost"
                    as="a"
                    href="#"
                    className="text-topo-gray hover:text-white"
                  >
                    {t.portfolio.secondaryCta}
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
