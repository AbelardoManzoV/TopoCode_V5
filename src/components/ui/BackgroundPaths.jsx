import { memo, useMemo } from "react";

const isIOS =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("ios");
// Mismas curvas en todos lados; Safari/iOS dibuja menos por capa.
const PATH_COUNT = isIOS ? 18 : 36;

// La animación corre en CSS (stroke-dashoffset con pathLength normalizado), así
// no hay 72 motion values actualizando el DOM desde JS en cada frame.
const FloatingPaths = memo(function FloatingPaths({ position }) {
  const paths = useMemo(
    () =>
      Array.from({ length: PATH_COUNT }, (_, i) => {
        const k = isIOS ? i * 2 : i;
        return {
          id: i,
          d: `M-${380 - k * 5 * position} -${189 + k * 6}C-${
            380 - k * 5 * position
          } -${189 + k * 6} -${312 - k * 5 * position} ${216 - k * 6} ${
            152 - k * 5 * position
          } ${343 - k * 6}C${616 - k * 5 * position} ${470 - k * 6} ${
            684 - k * 5 * position
          } ${875 - k * 6} ${684 - k * 5 * position} ${875 - k * 6}`,
          width: 0.5 + k * 0.03,
          opacity: 0.03 + k * 0.015,
          duration: 22 + (k % 7) * 2,
        };
      }),
    [position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full paths-pulse"
        style={{ animationDuration: position === 1 ? "9s" : "12s" }}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            pathLength="1"
            stroke="#6E87B7"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            fill="none"
            className="path-flow"
            style={{
              animationDuration: `${path.duration}s`,
              animationDelay: `-${(path.id * 1.7) % path.duration}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
});

export function BackgroundPaths({ children }) {
  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-topo-bg">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Vignette to keep focus on content */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--hero-vignette) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
