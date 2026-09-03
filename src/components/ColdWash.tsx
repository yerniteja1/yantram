"use client";

import { useEffect, useState } from "react";

// ColdWash — full cold-blue mood to match the rainstorm: neutral →
// steel blue → deep sea → pale ice, cross-faded by pure CSS. Stronger
// than the whisper washes, because the mood change is the point.
const TINTS = [
  "rgba(251,249,246,0)",
  "rgba(70,100,135,0.06)",
  "rgba(32,54,78,0.07)",
  "rgba(120,150,180,0.05)",
];

export default function ColdWash() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % TINTS.length), 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ backgroundColor: TINTS[i], transition: "background-color 9s ease" }}
    />
  );
}
