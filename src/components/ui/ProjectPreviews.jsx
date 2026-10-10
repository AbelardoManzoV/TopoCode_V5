import { useLayoutEffect, useRef, useState } from "react";

/*
 * Mockups ilustrativos de cada sistema, dibujados en HTML/CSS con la paleta y
 * la estructura de pantallas de cada proyecto (sus configs y documentación).
 * Los datos son de ejemplo. Se diseñan a 640x400 y se escalan al ancho de la
 * tarjeta; siempre en tema claro, como una captura.
 */
const W = 640;
const H = 400;

function PreviewFrame({ children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const el = ref.current;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-xl border border-topo-border bg-white select-none"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="absolute top-0 left-0 overflow-hidden text-left"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ───────────── 1. Sitio web (Fashion Pink Care) ───────────── */
function PinkSite() {
  const cells = [
    ["col-span-1 row-span-2", "#f48fb8"],
    ["col-span-2 row-span-1", "#e6308f"],
    ["col-span-1 row-span-1", "#fbcfe4"],
    ["col-span-1 row-span-2", "#c2185b"],
    ["col-span-1 row-span-1", "#f9a8cf"],
    ["col-span-2 row-span-1", "#9c1d5b"],
  ];
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#fdf3f8" }}>
      <div className="h-8 flex items-center gap-2 px-3 border-b" style={{ background: "#f3f4f6", borderColor: "#e5e7eb" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-white text-[10px] leading-5 px-3 text-gray-500">
          sitio-pi.vercel.app
        </div>
      </div>
      <div className="flex items-center justify-between px-8 h-11 text-[11px] font-medium" style={{ color: "#7a1746" }}>
        <span className="font-bold tracking-wide">Fashion Pink Care</span>
        <span className="flex gap-5 opacity-80">
          <span>Misión</span><span>Ediciones</span><span>Galería</span><span>Contacto</span>
        </span>
      </div>
      <div className="flex-1 grid grid-cols-[1.05fr_1fr] gap-8 px-8 pb-6 items-center">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#c2185b" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#e6308f" }} />
            3.ª edición · Puerto Vallarta, Jalisco
          </p>
          <p className="mt-3 text-3xl italic" style={{ color: "#e6308f", fontFamily: "Georgia, serif" }}>Proyecto</p>
          <p className="text-[44px] leading-[1] font-extrabold tracking-tight" style={{ color: "#7a1746" }}>
            Fashion<br />Pink Care
          </p>
          <p className="mt-3 text-xs max-w-[220px]" style={{ color: "#9c1d5b" }}>
            Una pasarela con causa que transforma la moda en apoyo real.
          </p>
          <div className="mt-5 inline-flex px-5 py-2 rounded-full text-[11px] font-semibold text-white" style={{ background: "#e6308f" }}>
            Conoce la causa
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[250px]">
          {cells.map(([cls, bg], i) => (
            <div
              key={i}
              className={`${cls} rounded-xl`}
              style={{ background: `linear-gradient(135deg, ${bg}, ${bg}cc)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── 2. Vitrina: catálogo + pedido a WhatsApp ───────────── */
function CatalogOrders() {
  const products = [
    ["#cfe3ea", "Tenis urbanos", "$1,890"],
    ["#d9dee3", "Reloj clásico", "$2,450"],
    ["#e4ebee", "Sudadera", "$890"],
    ["#c4dde4", "Gorra", "$420"],
  ];
  return (
    <div className="w-full h-full flex items-center justify-center gap-10" style={{ background: "linear-gradient(135deg,#EDF1F3,#dbe6ea)" }}>
      {/* Teléfono */}
      <div className="relative w-[196px] h-[372px] rounded-[30px] p-[6px] shadow-2xl" style={{ background: "#0F1518" }}>
        <div className="w-full h-full rounded-[24px] overflow-hidden flex flex-col" style={{ background: "#EDF1F3" }}>
          <div className="flex items-center justify-between px-3 pt-4 pb-2">
            <span className="text-sm font-extrabold tracking-tight" style={{ color: "#0F1518" }}>Tu Marca</span>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold" style={{ background: "#0E8FA8" }}>2</span>
          </div>
          <div className="flex gap-1 px-3 pb-2">
            {["Todo", "Tenis", "Ropa", "Relojes"].map((c, i) => (
              <span
                key={c}
                className="px-1.5 py-0.5 rounded-full text-[7px] font-semibold"
                style={i === 0 ? { background: "#0F1518", color: "#fff" } : { background: "#fff", color: "#0F1518" }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 px-3 flex-1 content-start">
            {products.map(([bg, name, price]) => (
              <div key={name} className="rounded-xl bg-white overflow-hidden">
                <div className="h-[62px]" style={{ background: bg }} />
                <div className="p-1.5">
                  <p className="text-[8px] font-semibold" style={{ color: "#0F1518" }}>{name}</p>
                  <p className="text-[8px] font-bold" style={{ color: "#0A6E82" }}>{price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="m-3 py-2 rounded-full text-center text-[9px] font-bold text-white" style={{ background: "#0E8FA8" }}>
            Ver pedido · 2 artículos
          </div>
        </div>
      </div>

      {/* Mensaje de WhatsApp */}
      <div className="w-[230px] rounded-2xl overflow-hidden shadow-xl bg-white">
        <div className="flex items-center gap-2 px-3 py-2.5 text-white text-[11px] font-semibold" style={{ background: "#128C7E" }}>
          <span className="w-6 h-6 rounded-full bg-white/25" />
          Tienda · WhatsApp
        </div>
        <div className="p-3" style={{ background: "#ECE5DD" }}>
          <div className="rounded-xl rounded-tr-sm px-3 py-2 text-[10px] leading-snug shadow-sm" style={{ background: "#DCF8C6", color: "#111" }}>
            <p className="font-semibold">Hola, quiero hacer este pedido:</p>
            <p className="mt-1">1× Tenis urbanos · $1,890</p>
            <p>1× Gorra · $420</p>
            <p className="mt-1 font-bold">Total: $2,310 MXN</p>
          </div>
          <p className="mt-2 text-[9px] text-right text-gray-500">Pedido guardado ✓</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── 3. Paletería: inventario, costos y punto de venta ───────────── */
function IceCreamSystem() {
  const nav = ["Inicio", "Punto de venta", "Inventario", "Recetas", "Producción", "Compras", "Corte de caja", "Asistente"];
  const items = [
    ["#f4a6b8", "Fresa", "$18"],
    ["#f6c177", "Mango con chile", "$20"],
    ["#c9e4a0", "Limón", "$16"],
    ["#f3ecdf", "Coco", "$20"],
    ["#8a5a44", "Chocolate", "$22"],
    ["#f5b942", "Mamey", "$22"],
  ];
  const ink = "#242454";
  return (
    <div className="w-full h-full flex" style={{ background: "#fbfaf7", color: ink }}>
      <div className="w-[150px] border-r py-4 px-3 flex flex-col gap-1" style={{ borderColor: "#ece7ef" }}>
        <p className="text-sm font-extrabold px-2 mb-3">Paletería</p>
        {nav.map((n, i) => (
          <p
            key={n}
            className="text-[11px] px-2.5 py-1.5 rounded-lg font-medium"
            style={i === 1 ? { background: "#f3ecf3", fontWeight: 700 } : { opacity: 0.75 }}
          >
            {n}
          </p>
        ))}
      </div>
      <div className="flex-1 p-5 flex gap-4">
        <div className="flex-1">
          <p className="text-base font-bold">Punto de venta</p>
          <div className="mt-2 h-7 rounded-lg bg-white border text-[10px] px-3 leading-7 opacity-70" style={{ borderColor: "#ece7ef" }}>
            Buscar sabor o código…
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {items.map(([c, n, p]) => (
              <div key={n} className="rounded-xl bg-white border p-2.5" style={{ borderColor: "#ece7ef" }}>
                <div className="w-9 h-9 rounded-full mb-2" style={{ background: c }} />
                <p className="text-[10px] font-semibold leading-tight">{n}</p>
                <p className="text-[10px] font-bold" style={{ color: "#8f5a8f" }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[160px] rounded-xl bg-white border p-3 flex flex-col" style={{ borderColor: "#ece7ef" }}>
          <p className="text-[11px] font-bold">Ticket</p>
          <div className="mt-2 flex-1 text-[10px] space-y-1.5">
            {[["2× Fresa", "$36"], ["1× Mamey", "$22"], ["3× Limón", "$48"]].map(([a, b]) => (
              <div key={a} className="flex justify-between"><span>{a}</span><span>{b}</span></div>
            ))}
          </div>
          <p className="text-[9px] px-2 py-1 rounded-md mb-2" style={{ background: "#f3ecf3" }}>
            Utilidad estimada · $61
          </p>
          <div className="flex justify-between text-xs font-bold mb-2"><span>Total</span><span>$106</span></div>
          <div className="py-1.5 rounded-lg text-center text-[11px] font-semibold" style={{ background: ink, color: "#fbfaf7" }}>
            Cobrar
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── 4. Consultorio: evaluación con semáforo ───────────── */
function ClinicSystem() {
  const reqs = [
    ["Edad mínima (automático)", "Cumple", "#10b981"],
    ["Consentimiento informado firmado", "Cumple", "#10b981"],
    ["Historial de alergias capturado", "Pendiente", "#f59e0b"],
    ["Valoración previa", "Cumple", "#10b981"],
  ];
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: "#f4f1ff", color: "#1a1430" }}>
      <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full blur-3xl opacity-60" style={{ background: "#bda6ff" }} />
      <div className="absolute -bottom-24 right-0 w-72 h-72 rounded-full blur-3xl opacity-50" style={{ background: "#ff9fe0" }} />
      <div className="relative h-full flex">
        <div className="w-[120px] py-5 px-3 flex flex-col gap-1.5 text-[10px] font-medium">
          <p className="text-sm font-extrabold mb-2" style={{ color: "#7c22f5" }}>Odonto</p>
          {["Tablero", "Pacientes", "Agenda", "Tratamientos", "Evaluación"].map((n, i) => (
            <p key={n} className="px-2 py-1.5 rounded-lg" style={i === 4 ? { background: "#7c22f5", color: "#fff" } : { opacity: 0.7 }}>{n}</p>
          ))}
        </div>
        <div className="flex-1 py-5 pr-6">
          <p className="text-lg font-bold">Evaluación de tratamiento</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["Paciente: Ana López", "Tratamiento: Endodoncia"].map((s) => (
              <div key={s} className="h-8 rounded-xl bg-white/80 border text-[11px] px-3 leading-8" style={{ borderColor: "#d9ceff" }}>{s}</div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-white/85 border p-4 flex gap-4" style={{ borderColor: "#d9ceff" }}>
            <div className="w-10 rounded-full p-1.5 flex flex-col gap-1.5 self-start" style={{ background: "#1a1430" }}>
              <span className="w-7 h-7 rounded-full" style={{ background: "#f43f5e", opacity: 0.25 }} />
              <span className="w-7 h-7 rounded-full" style={{ background: "#f59e0b", boxShadow: "0 0 14px #f59e0b" }} />
              <span className="w-7 h-7 rounded-full" style={{ background: "#10b981", opacity: 0.25 }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "#b45309" }}>Le falta información</p>
              <div className="mt-2 space-y-1.5">
                {reqs.map(([n, s, c]) => (
                  <div key={n} className="flex items-center justify-between text-[10px]">
                    <span>{n}</span>
                    <span className="px-2 py-0.5 rounded-full font-semibold text-white" style={{ background: c }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── 5. Trazabilidad agrícola ───────────── */
function QrCode() {
  const size = 21;
  const inFinder = (r, c) =>
    [[0, 0], [0, size - 7], [size - 7, 0]].some(([fr, fc]) => r >= fr && r < fr + 7 && c >= fc && c < fc + 7);
  const finderOn = (r, c) => {
    const fr = r < 7 ? r : r - (size - 7);
    const fc = c < 7 ? c : c - (size - 7);
    const edge = fr === 0 || fr === 6 || fc === 0 || fc === 6;
    const core = fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4;
    return edge || core;
  };
  const cells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let on;
      if (inFinder(r, c)) on = finderOn(r, c);
      else if (r === 7 || c === 7 || r === size - 8 || c === size - 8) on = false;
      else on = ((r * 73856093) ^ (c * 19349663) ^ (r * c * 83492791)) % 5 < 2;
      cells.push(<span key={`${r}-${c}`} style={{ background: on ? "#1f1b18" : "transparent" }} />);
    }
  }
  return (
    <div className="grid w-[100px] h-[100px]" style={{ gridTemplateColumns: `repeat(${size},1fr)` }}>
      {cells}
    </div>
  );
}

function TraceabilitySystem() {
  const steps = [["Cosechado", "04 mar"], ["Empacado", "05 mar"], ["Embarcado", "07 mar"]];
  const ink = "#1f1b18";
  return (
    <div className="w-full h-full p-6 flex gap-6 items-center" style={{ background: "#f8f5ee", color: ink }}>
      <div className="w-[150px] shrink-0 flex flex-col items-center gap-3">
        <div className="bg-white rounded-xl p-3 border" style={{ borderColor: "#e7e0d2" }}><QrCode /></div>
        <p className="text-[10px] font-mono opacity-70">Lote L-2026-014</p>
        <p className="text-[9px] text-center opacity-60 leading-snug">Escanea para verificar el origen de este lote</p>
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest opacity-60">Trazabilidad del lote</p>
        <p className="text-2xl font-bold mt-0.5">Aguacate Hass</p>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
          {[["Origen", "Michoacán"], ["Municipio", "Uruapan"], ["Fecha de cosecha", "04 mar 2026"], ["Estado", "Embarcado"]].map(([k, v]) => (
            <div key={k}>
              <p className="opacity-55">{k}</p>
              <p className="font-semibold text-xs">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] opacity-55">Línea de tiempo</p>
        <div className="mt-2 flex items-start">
          {steps.map(([n, d], i) => (
            <div key={n} className="flex-1 flex flex-col items-start">
              <div className="flex items-center w-full">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ink }} />
                {i < steps.length - 1 && <span className="flex-1 h-px" style={{ background: ink, opacity: 0.35 }} />}
              </div>
              <p className="mt-1.5 text-[10px] font-semibold">{n}</p>
              <p className="text-[9px] opacity-55">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {["Certificación orgánica", "Buenas prácticas"].map((c) => (
            <span key={c} className="px-2.5 py-1 rounded-full text-[9px] font-medium border bg-white" style={{ borderColor: "#e7e0d2" }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── 6. PuntoPro POS: dashboard ───────────── */
function PosDashboard() {
  const nav = ["Inicio", "Cobrar", "Caja", "Inventario", "Clientes", "Reportes", "Usuarios"];
  const bars = [46, 62, 54, 78, 66, 90, 72];
  return (
    <div className="w-full h-full flex" style={{ background: "#f1f4f9", color: "#0f172a" }}>
      <div className="w-[130px] py-4 px-3 flex flex-col gap-1" style={{ background: "#0f172a" }}>
        <div className="flex items-center gap-2 px-1.5 mb-3">
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-extrabold text-white" style={{ background: "#2563eb" }}>P</span>
          <span className="text-[12px] font-bold text-white">PuntoPro</span>
        </div>
        {nav.map((n, i) => (
          <p
            key={n}
            className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium"
            style={i === 0 ? { background: "#243352", color: "#fff" } : { color: "#cbd5e1" }}
          >
            {n}
          </p>
        ))}
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold">Dashboard</p>
          <span className="text-[9px] px-2.5 py-1 rounded-full bg-white border" style={{ borderColor: "#e2e8f0", color: "#64748b" }}>Caja abierta</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {[["Venta del día", "$12,480", "#0f172a"], ["Tickets", "86", "#0f172a"], ["Ticket promedio", "$145", "#0f172a"], ["Stock crítico", "7", "#ea580c"]].map(([k, v, c]) => (
            <div key={k} className="rounded-xl bg-white border p-2.5" style={{ borderColor: "#e2e8f0" }}>
              <p className="text-[8px]" style={{ color: "#64748b" }}>{k}</p>
              <p className="text-base font-bold mt-0.5" style={{ color: c }}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-2.5">
          <div className="rounded-xl bg-white border p-3" style={{ borderColor: "#e2e8f0" }}>
            <p className="text-[10px] font-semibold">Ventas · últimos 7 días</p>
            <div className="mt-3 h-[150px] flex items-end gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? "#2563eb" : "#bfdbfe" }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white border p-3" style={{ borderColor: "#e2e8f0" }}>
            <p className="text-[10px] font-semibold">Métodos de pago</p>
            <div className="mt-2 flex items-center gap-3">
              <div
                className="w-[84px] h-[84px] rounded-full shrink-0"
                style={{ background: "conic-gradient(#2563eb 0 55%, #10b981 55% 85%, #f59e0b 85% 100%)", WebkitMask: "radial-gradient(circle 26px at center, transparent 98%, #000 100%)", mask: "radial-gradient(circle 26px at center, transparent 98%, #000 100%)" }}
              />
              <div className="text-[8px] space-y-1" style={{ color: "#334155" }}>
                <p><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#2563eb" }} />Efectivo</p>
                <p><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#10b981" }} />Tarjeta</p>
                <p><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#f59e0b" }} />Crédito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mismo orden que `t.portfolio.projects`.
const previews = [PinkSite, CatalogOrders, IceCreamSystem, ClinicSystem, TraceabilitySystem, PosDashboard];

export function ProjectPreview({ index }) {
  const Preview = previews[index];
  if (!Preview) return null;
  return (
    <PreviewFrame>
      <Preview />
    </PreviewFrame>
  );
}
