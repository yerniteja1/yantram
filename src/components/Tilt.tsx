"use client";

import { ReactNode, useRef, useState } from "react";

/** Mouse-driven 3D tilt wrapper. Wrap any card to get rotateX/rotateY + glare. */
export default function Tilt({
  children,
  className,
  max = 8,
  scale = 1.015,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ tx: 0, ty: 0, gx: 50, gy: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      tx: (0.5 - py) * max * 2 * 0.5,
      ty: (px - 0.5) * max * 2 * 0.5,
      gx: px * 100,
      gy: py * 100,
    });
  };

  return (
    <div style={{ perspective: "1200px" }} className={className}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setStyle({ tx: 0, ty: 0, gx: 50, gy: 50 })}
        className="relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${style.tx}deg) rotateY(${style.ty}deg) scale(${style.tx === 0 && style.ty === 0 ? 1 : scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {/* moving glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: style.tx === 0 && style.ty === 0 ? 0 : 1,
            background: `radial-gradient(circle at ${style.gx}% ${style.gy}%, rgba(197,155,39,0.10), transparent 55%)`,
          }}
        />
      </div>
    </div>
  );
}
