# TopoCode — Descripción general de la landing

Documento de contexto para el proyecto de Claude Chat. Resume qué es TopoCode, qué comunica la landing, cómo está organizada y qué reglas de marca/contenido seguir.

## 1. Qué es TopoCode

Estudio de desarrollo digital ("Dev Studio") mexicano, joven y enfocado en **negocios locales** que quieren dar el salto digital. Desarrolla páginas web, tiendas en línea, apps web/móviles, sistemas administrativos y da mantenimiento y soporte.

- **Eslogan del hero:** "Tu negocio, en código."
- **Tagline (footer):** "Dev Studio · Web, apps y soluciones digitales para negocios locales."
- **Propuesta de valor:** soluciones a la medida (sin plantillas genéricas), comunicación clara, tecnología escalable y soporte después de la entrega.
- **Tono:** cercano, claro, profesional, sin tecnicismos innecesarios. Habla de "tu negocio", no de tecnologías.
- **Dominio:** topocode.dev
- **Contacto:** contacto@topocode.dev · WhatsApp +52 322 156 5064 · México

## 2. La landing en una frase

Página única (SPA, sin router ni backend), bilingüe (español/inglés), con tema claro/oscuro y muchas animaciones de scroll. Su objetivo es que un dueño de negocio entienda qué hacemos, vea trabajos reales y nos contacte (cotizar proyecto).

## 3. Secciones (en orden)

1. **Navbar** — logo, enlaces (Inicio, Servicios, Proceso, Nosotros, Contacto), selector de idioma, selector de tema y botón "Cotizar proyecto". En móvil, menú de 3 rayitas.
2. **Hero** — insignia "Estudio de desarrollo digital", título "Tu negocio, en código.", descripción breve, botones "Cotizar proyecto" y "Ver servicios". Fondo animado de líneas (BackgroundPaths) y tarjeta de código decorativa.
3. **Marquee de tecnologías** — cinta con las tecnologías que usamos.
4. **Servicios** — "Soluciones digitales para cada etapa de tu negocio": Landing Pages, Tiendas en línea, Aplicaciones Web, Apps Móviles / PWA, Sistemas Administrativos, Mantenimiento y Soporte.
5. **Por qué nosotros** — "Más que código, creamos confianza digital": diseño moderno y responsive, soluciones a la medida, comunicación clara, enfoque en negocios locales, tecnología escalable, soporte después de la entrega.
6. **Proceso** — "De tu idea a la realidad en 4 pasos" (scroll horizontal con pin): 1) Escuchamos tu idea, 2) Diseñamos la solución, 3) Desarrollamos y probamos, 4) Publicamos y damos soporte.
7. **Portafolio** — "Trabajos que hablan por nosotros": 6 proyectos reales, cada uno con un mockup en código (ver sección 5).
8. **Nosotros** — "Un estudio joven con enfoque local", estadísticas (100 % clientes locales, soporte 24/7) y estado "Disponibles para proyectos".
9. **CTA** — "¿Listo para llevar tu negocio al mundo digital?" con botones "Contactar a TopoCode" y "Ver servicios".
10. **Contacto** — formulario (nombre, correo, teléfono opcional, tipo de proyecto, mensaje) + tarjetas de Email, WhatsApp (abre wa.me) y Ubicación. Promesa: respuesta en menos de 24 horas.
11. **Footer** — tagline, Política de privacidad y Términos de uso (modales), derechos reservados.

## 4. Stack técnico

- React 19 + Vite 8 (rolldown), JavaScript (JSX), sin TypeScript.
- Tailwind v4 (`@tailwindcss/vite`, tokens en `@theme` de `src/index.css`).
- framer-motion + GSAP/ScrollTrigger + Lenis (scroll suave) + lucide-react.
- Tema claro/oscuro con clase `dark`/`light` en `<html>` (se guarda en localStorage `topocode-theme`, por defecto `prefers-color-scheme`). Colores con variables `--topo-*`.
- Textos en `src/translations/index.js` (`es` y `en`), una sección por archivo en `src/components/`.
- Formulario de contacto: `fetch` a FormSubmit (`formsubmit.co/ajax/contacto@topocode.dev`), con honeypot y sin backend propio.
- Respeta `prefers-reduced-motion`. Optimizaciones específicas para Safari/iOS (clase `ios` en `<html>`).

## 5. Portafolio (6 proyectos reales)

Se muestran **sin tecnologías visibles y sin nombres de clientes** (solo el sitio público lleva enlace). Cada tarjeta tiene un mockup en código con datos de ejemplo.

1. **Sitio web corporativo** (Landing page) — una sola página con galería en mosaico adaptable.
2. **Plataforma de catálogo y pedidos** (Tienda en línea) — catálogo para tiendas que venden por redes; el pedido llega listo al WhatsApp de la tienda; panel de productos.
3. **Sistema de inventario, costos y punto de venta** (Sistema administrativo) — inventario, recetas con costo real por pieza, caja con corte, compras y asistente de IA en lenguaje natural.
4. **Sistema de gestión clínica** (Aplicación web) — pacientes, ficha clínica, agenda y semáforo de requisitos de tratamiento.
5. **Plataforma de trazabilidad agrícola** (Aplicación web) — sitio bilingüe para exportadores, registro de lotes, historial inmutable y QR por lote.
6. **Sistema de punto de venta multiplataforma** (Punto de venta · Web e iOS) — roles y permisos, web y app nativa iPhone con los mismos datos.

## 6. Reglas de contenido y marca

- Hablar de beneficios para el negocio del cliente, no de tecnología.
- Nunca nombrar clientes ni mostrar tecnologías en el portafolio.
- Textos siempre en ambos idiomas (es/en) con el mismo significado.
- Los CTA principales llevan a Contacto ("Cotizar proyecto").
- Cualquier animación nueva debe respetar `prefers-reduced-motion`.
- Paleta con azul de marca (`topo-blue`) sobre fondos claros u oscuros; el logo tiene versión clara y oscura.

## 7. Estado actual

- Sitio en `topocode.dev` (canónico), con `robots.txt`, `sitemap.xml` y `og-image`.
- Incluye política de privacidad y términos de uso.
- Menú móvil: los enlaces usan scroll por JS (Lenis) y no modifican la URL con `#sección`.
- Pendiente por verificar: fluidez del scroll y animaciones en Safari/iPhone.
- Si se envía el formulario desde un dominio nuevo, FormSubmit manda un correo de activación a contacto@topocode.dev que hay que confirmar.
