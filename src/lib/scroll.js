let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

// Scroll a un ancla usando Lenis (si está activo) o el scroll nativo.
export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenisInstance) lenisInstance.scrollTo(target, { offset: 0 });
  else target.scrollIntoView({ behavior: "smooth" });}
