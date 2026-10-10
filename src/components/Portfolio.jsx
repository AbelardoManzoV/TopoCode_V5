import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";
import { MagneticButton } from "./ui/MagneticButton";
import { SpotlightCard } from "./ui/SpotlightCard";
import { ProjectPreview } from "./ui/ProjectPreviews";
import { WordReveal } from "./ui/TextReveal";
import { useLanguage } from "../hooks/useLanguage";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { ScrollTextReveal } from "./gsap/ScrollTextReveal";

// Mismo orden que `t.portfolio.projects` (los previews viven en ProjectPreviews).
const projectLinks = ["https://sitio-pi.vercel.app"];

export function Portfolio() {
  const { t, language } = useLanguage();

  return (
    <section
      id="portafolio"
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

        <StaggerContainer
          key={`portfolio-grid-${language}`}
          staggerChildren={0.1}
          delayChildren={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {t.portfolio.projects.map((project, index) => {
            const href = projectLinks[index];
            return (
              <StaggerItem key={project.title}>
                <SpotlightCard className="h-full flex flex-col p-5">
                  <ProjectPreview index={index} />

                  <span className="mt-5 mb-3 self-start px-3 py-1 rounded-full bg-topo-blue/10 border border-topo-blue/20 text-topo-blue dark:text-topo-light text-xs font-medium">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-semibold text-topo-text mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-topo-gray leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-topo-blue hover:underline"
                      >
                        {t.portfolio.viewSite}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <motion.div
          key={`portfolio-cta-${language}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <MagneticButton strength={0.25}>
            <Button variant="primary" as="a" href="#contacto" className="group/btn">
              {t.portfolio.primaryCta}
              <ArrowRight
                size={18}
                className="ml-2 group-hover/btn:translate-x-1 transition-transform"
              />
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
