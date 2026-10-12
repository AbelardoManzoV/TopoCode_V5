import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { legal } from "../translations/legal";

const HASHES = { "#privacidad": "privacy", "#terminos": "terms" };

function readDoc() {
  return HASHES[window.location.hash] ?? null;
}

export function LegalModal() {
  const { language } = useLanguage();
  const [doc, setDoc] = useState(readDoc);

  useEffect(() => {
    const onHash = () => setDoc(readDoc());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!doc) return;
    const close = () => {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      setDoc(null);
    };
    const onKey = (e) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [doc]);

  const close = () => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setDoc(null);
  };

  const content = legal[language] ?? legal.es;
  const data = doc ? content[doc] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="legal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 sm:p-6"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={data.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92svh] sm:max-h-[85vh] flex flex-col bg-topo-bg border border-topo-border rounded-t-3xl sm:rounded-3xl shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 px-6 sm:px-10 pt-8 pb-5 border-b border-topo-border">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-topo-text">
                  {data.title}
                </h2>
                <p className="mt-1 text-xs text-topo-gray">{content.updated}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={content.close}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-topo-border text-topo-gray hover:text-topo-text hover:bg-topo-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="overflow-y-auto overscroll-contain px-6 sm:px-10 py-6 space-y-6 text-topo-gray leading-relaxed"
            >
              <p>{data.intro}</p>
              {data.sections.map((s) => (
                <section key={s.title}>
                  <h3 className="text-lg font-semibold text-topo-text">{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p} className="mt-2">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
