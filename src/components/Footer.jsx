import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import topoCodeLogoLight from "../assets/topocode-logo.png";
import topoCodeLogoDark from "../assets/topocode-logo-dark.png";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t.nav.home, href: "#inicio" },
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.process, href: "#proceso" },
    { label: t.nav.about, href: "#nosotros" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  return (
    <footer className="bg-topo-surface-soft dark:bg-topo-black border-t border-topo-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 pb-10 border-b border-topo-border">
          <div>
            <motion.a
              href="#inicio"
              whileHover={{ scale: 1.05 }}
              className="inline-flex"
            >
              <img
                src={topoCodeLogoLight}
                alt="TopoCode"
                className="h-16 w-auto dark:hidden"
              />
              <img
                src={topoCodeLogoDark}
                alt="TopoCode"
                className="h-16 w-auto hidden dark:block"
              />
            </motion.a>
            <p className="mt-3 text-topo-gray text-sm max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-topo-gray hover:text-topo-text transition-colors text-sm"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-topo-gray/70">
          <p>© {new Date().getFullYear()} TopoCode. {t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#privacidad" className="hover:text-topo-light transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#terminos" className="hover:text-topo-light transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
