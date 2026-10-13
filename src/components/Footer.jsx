import { motion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { useLanguage } from "../hooks/useLanguage";
import topoCodeLogoLight from "../assets/topocode-logo.png";
import topoCodeLogoDark from "../assets/topocode-logo-dark.png";

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.23-.41 1.27.06 1.65.07 4.85.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.44.71-2.1 1.37C1.38 2.66.97 3.32.67 4.1.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.78.71 1.44 1.37 2.1.66.66 1.32 1.07 2.1 1.37.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.78-.3 1.44-.71 2.1-1.37.66-.66 1.07-1.32 1.37-2.1.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.78-.71-1.44-1.37-2.1C21.34 1.38 20.68.97 19.9.67c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
  },
];

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

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <MagneticButton key={social.label} strength={0.4}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-topo-border bg-white/5 text-topo-gray hover:bg-topo-blue hover:text-white hover:border-topo-blue transition-all"
                >
                  {social.svg}
                </a>
              </MagneticButton>
            ))}
          </div>
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
