// Static film-grain overlay — an feTurbulence tile at very low opacity.
// Zero per-frame cost: one fixed div above the background canvases,
// below the content. Gives the flat background a print-like texture.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        backgroundImage: `url("${GRAIN}")`,
        opacity: 0.05,
        mixBlendMode: "multiply",
      }}
    />
  );
}
