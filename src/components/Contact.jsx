import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { MagneticButton } from "./ui/MagneticButton";
import { Input, Textarea, Select } from "./ui/Input";
import { WordReveal } from "./ui/TextReveal";
import { useLanguage } from "../hooks/useLanguage";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./ui/AnimatedSection";
import { ScrollTextReveal } from "./gsap/ScrollTextReveal";

const icons = [Mail, Phone, MapPin];

// FormSubmit: envía el formulario por correo sin backend propio.
const CONTACT_EMAIL = "contacto@topocode.dev";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function Contact() {
  const { t, language } = useLanguage();
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");

  const contactInfo = t.contact.contactInfo.map((item, index) => ({
    ...item,
    icon: icons[index],
    href:
      index === 0
        ? `mailto:${item.value}`
        : index === 1
          ? `https://wa.me/${item.value.replace(/\D/g, "")}`
          : undefined,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const projectType =
      projectTypes.find((type) => type.key === data.projectType)?.label ?? data.projectType;
    setStatus("sending");

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          projectType,
          language,
          _subject: `Nuevo contacto desde topocode.dev: ${data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || String(result.success) !== "true") throw new Error("formsubmit");
      form.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const projectTypes = [
    { key: "landing", label: t.contact.form.projectTypes.landing },
    { key: "store", label: t.contact.form.projectTypes.store },
    { key: "webApp", label: t.contact.form.projectTypes.webApp },
    { key: "mobileApp", label: t.contact.form.projectTypes.mobileApp },
    { key: "admin", label: t.contact.form.projectTypes.admin },
    { key: "other", label: t.contact.form.projectTypes.other },
  ];

  return (
    <section id="contacto" className="py-28 md:py-40 bg-topo-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection key={`contact-header-${language}`} className="max-w-3xl mb-16">
          <WordReveal
            key={`contact-title-${language}`}
            as="h2"
            className="text-4xl md:text-6xl font-bold tracking-tight text-topo-text leading-[1.05]"
            stagger={0.05}
            duration={0.6}
          >
            {t.contact.title}
          </WordReveal>
          <ScrollTextReveal
            key={`contact-desc-${language}`}
            className="mt-6 text-lg text-topo-gray leading-relaxed"
            start="top 85%"
            end="top 55%"
          >
            {t.contact.description}
          </ScrollTextReveal>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12">
          <AnimatedSection key={`contact-form-${language}`} className="lg:col-span-3">
            <StaggerContainer key={`contact-form-stagger-${language}`} className="rounded-3xl border border-topo-border bg-topo-surface p-6 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Honeypot anti-bots: las personas no lo ven ni lo rellenan */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <StaggerItem>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input label={t.contact.form.name} name="name" autoComplete="name" maxLength={100} type="text" placeholder={t.contact.form.namePlaceholder} required />
                    <Input label={t.contact.form.email} name="email" autoComplete="email" maxLength={200} type="email" placeholder={t.contact.form.emailPlaceholder} required />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input label={t.contact.form.phone} name="phone" autoComplete="tel" maxLength={40} type="tel" placeholder={t.contact.form.phonePlaceholder} />
                    <Select label={t.contact.form.projectType} name="projectType" required>
                      <option value="">{t.contact.form.projectTypePlaceholder}</option>
                      {projectTypes.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <Textarea
                    label={t.contact.form.message}
                    name="message"
                    maxLength={4000}
                    rows={4}
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                  />
                </StaggerItem>
                <StaggerItem>
                  <MagneticButton strength={0.15} className="w-full">
                    <Button
                      variant="form"
                      type="submit"
                      disabled={status === "sending"}
                      className="flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          {t.contact.form.sending}
                        </>
                      ) : status === "success" ? (
                        <>
                          <CheckCircle size={18} />
                          {t.contact.form.submitted}
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          {t.contact.form.submit}
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                  <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-center text-red-500">
                    {status === "error" ? t.contact.form.error : ""}
                  </p>
                </StaggerItem>
              </form>
            </StaggerContainer>
          </AnimatedSection>

          <AnimatedSection key={`contact-info-${language}`} className="lg:col-span-2" delay={0.2}>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href?.startsWith("https") ? "_blank" : undefined}
                  rel={item.href?.startsWith("https") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-topo-border bg-topo-surface/50 hover:border-topo-blue/50 hover:bg-topo-surface transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-topo-blue/10 text-topo-light shrink-0 group-hover:bg-topo-blue/20 group-hover:text-topo-blue transition-colors">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-topo-gray">{item.label}</p>
                    <p className="text-lg font-semibold text-topo-text group-hover:text-topo-light transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              <div className="rounded-2xl p-6 border border-topo-blue/20 bg-topo-blue/5">
                <h4 className="text-lg font-semibold text-topo-text mb-2">
                  {t.contact.response.title}
                </h4>
                <p className="text-sm text-topo-gray leading-relaxed">
                  {t.contact.response.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
