# TopoCode V5 — Landing page

Landing de agencia de desarrollo (es/en, tema claro/oscuro). SPA de una sola página, sin router ni backend.

## Stack
React 19 + Vite 8 (rolldown) + Tailwind v4 (`@tailwindcss/vite`, tokens en `@theme` de `src/index.css`) + framer-motion + GSAP/ScrollTrigger + Lenis + lucide-react. JS (JSX), sin TypeScript.
Comandos: `npm run dev | build | lint | preview`. Vite pide Node >= 20.19 (el entorno tiene 20.18) y rolldown puede faltar su binding nativo en Windows: si el build falla, borrar `node_modules` + `package-lock.json` y `npm i`.

## Estructura (`src/`)
- `main.jsx`: LanguageProvider > ThemeProvider > SmoothScroll > App.
- `App.jsx`: Navbar, Hero, TechMarquee, Services, WhyUs, Process, Portfolio, About, CTA, Contact, Footer.
- `components/*.jsx`: una sección por archivo. Textos en `translations/index.js` (`t.<seccion>`), accesibles con `useLanguage()`.
- `components/gsap/`: HorizontalScroll (pin, usado en Process), ScrollTextReveal, ImageReveal (usados), StackingCards (sin usar).
- `components/ui/`: Button, MagneticButton, SpotlightCard, AnimatedSection (+Stagger*), TextReveal (WordReveal), BackgroundPaths (fondo Hero), Marquee, Input, toggles. Sin usar: AuroraBackground, CursorSpotlight, ParallaxImage, Card.
- Tema: clase `dark`/`light` en `<html>` puesta por un script inline en `index.html` (localStorage `topocode-theme`, si no hay, `prefers-color-scheme`). Colores vía variables `--topo-*` y utilidades `bg-topo-*`, `text-topo-*`.
- `dist/` está versionado/compilado; no editarlo a mano.

## Convenciones
- Componentes con export nombrado, Tailwind inline, `cn()` de `lib/utils`.
- Las secciones con `key={...-${language}}` se remontan al cambiar idioma (así se reinician las animaciones).
- Respetar `prefers-reduced-motion` en animaciones nuevas.

## Rendimiento en Safari/iOS (decisiones vigentes)
- El usuario quiere TODAS las animaciones; solo se recorta lo mínimo en iOS. Clase `ios` en `<html>` (script de `index.html`) y variante Tailwind `ios:`.
- Hero: mouse con motion values (sin setState); fondo `BackgroundPaths` animado por CSS (`.path-flow`, `.paths-pulse` en `index.css`), 36 paths/capa (18 en iOS).
- iOS: sin `rotateX` en WordReveal, `backdrop-blur-md` en Navbar. Resto igual.
- HorizontalScroll (Process) con pin en todos los dispositivos, alto `100svh`; Lenis activo siempre; `ScrollTrigger.config({ignoreMobileResize:true})`.
- Contraste Hero/CTA por tema (`text-topo-text dark:text-white`, `--hero-vignette`); CTA con radial-gradient en vez de blur gigante.
- Dev: si Vite falla por rolldown, `npm i --no-save --no-package-lock @rolldown/binding-win32-x64-msvc@<versión de rolldown>`.
- Por verificar en iPhone: fluidez del scroll y animaciones en Safari. Si falla, pedir síntoma exacto.

## Portafolio
- 6 proyectos reales en `translations/index.js` (`t.portfolio.projects`, mismo orden que `previews` en `components/ui/ProjectPreviews.jsx`). Sin tecnologías visibles y sin nombres de clientes (salvo el sitio público con link).
- Cada tarjeta lleva un mockup en código (640x400 escalado) con la paleta/pantalla del sistema real; datos de ejemplo.

## Formulario de contacto
- `Contact.jsx` envía por fetch a FormSubmit (`https://formsubmit.co/ajax/contacto@topocode.dev`), sin backend. Honeypot `_honey`, `_captcha=false`, plantilla `table`.
- La primera vez que se envía desde un dominio, FormSubmit manda un correo de activación a ese buzón: hay que confirmarlo o no llegan los mensajes.
