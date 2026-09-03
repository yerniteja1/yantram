"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Zero-dependency scroll reveal — pure CSS transition, triggered once
 * by IntersectionObserver. No animation library, no per-frame JS.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className ?? ""} reveal${visible ? " reveal-visible" : ""}`}
      style={
        {
          "--reveal-y": `${y}px`,
          transitionDelay: `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

// NOTE: stagger delays must be deterministic (computed from the map index
// at the call site) — never from a mutable ref during render, or server and
// client HTML will differ and React will throw a hydration mismatch.
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay} y={26}>
      {children}
    </Reveal>
  );
}
