"use client";

import { useEffect, useRef } from "react";

// Rainstorm — clearly visible diagonal rain over a real body of blue
// water. Long fast drops at a hard cross angle, splash ticks and ripple
// rings where they strike the water surface, and a slowly breathing
// water mass filling the bottom of the screen. Full cold-blue mood.
// The cursor is an umbrella: drops part around it.

type Drop = {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
};

type Ripple = {
  x: number;
  y: number;
  r: number;
  alpha: number;
};

type Splash = {
  x: number;
  y: number;
  life: number;
};

const SLANT = 0.38; // hard cross angle — wind-driven rain
const LEVEL = 0.86; // still-water line as a fraction of height

export default function RainStormCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
    let seed = 63;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    let drops: Drop[] = [];
    let ripples: Ripple[] = [];
    let splashes: Splash[] = [];

    const spawnDrop = (d: Drop, anywhere: boolean) => {
      d.x = rnd() * (width + 200) - 100;
      d.y = anywhere ? rnd() * height * LEVEL : -40 - rnd() * 120;
      d.len = 20 + rnd() * 14;
      d.speed = 9 + rnd() * 5;
      d.alpha = 0.22 + rnd() * 0.18;
    };

    const build = () => {
      const n = width < 768 ? 85 : 175;
      drops = Array.from({ length: n }, () => {
        const d = {} as Drop;
        spawnDrop(d, true);
        return d;
      });
      ripples = [];
      splashes = [];
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      build();
      if (reduced) drawFrame(0);
    };

    const surfaceY = (x: number, time: number) =>
      height * LEVEL +
      5 * Math.sin((x / width) * Math.PI * 4 + time * 0.0011) +
      3 * Math.sin((x / width) * Math.PI * 9 - time * 0.0007);

    const drawFrame = (time: number) => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      // water mass — breathing fill below the surface
      ctx.beginPath();
      ctx.moveTo(-20, height + 20);
      const step = 14;
      for (let x = -20; x <= width + 20; x += step) {
        ctx.lineTo(x, surfaceY(x, time));
      }
      ctx.lineTo(width + 20, height + 20);
      ctx.closePath();
      ctx.fillStyle = "rgba(47,74,99,0.24)";
      ctx.fill();
      // deeper band for depth
      ctx.beginPath();
      ctx.moveTo(-20, height + 20);
      for (let x = -20; x <= width + 20; x += step) {
        ctx.lineTo(x, surfaceY(x, time) + 26);
      }
      ctx.lineTo(width + 20, height + 20);
      ctx.closePath();
      ctx.fillStyle = "rgba(32,54,78,0.22)";
      ctx.fill();
      // bright surface line
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += step) {
        const y = surfaceY(x, time);
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(140,170,195,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // drops — long, fast, clearly visible
      ctx.lineWidth = 1.25;
      for (const d of drops) {
        d.y += d.speed;
        d.x += d.speed * SLANT;
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0.01) {
          const f = (1 - dist / 130) * 3.5;
          d.x += (dx / dist) * f;
        }
        const sy = surfaceY(d.x, time);
        if (d.y > sy || d.x > width + 60) {
          if (d.y > sy && d.y < sy + d.speed + 2) {
            if (ripples.length < 30) {
              ripples.push({ x: d.x, y: sy, r: 2, alpha: 0.4 });
            }
            if (splashes.length < 40 && rnd() < 0.5) {
              splashes.push({ x: d.x, y: sy, life: 1 });
            }
          }
          spawnDrop(d, false);
          continue;
        }
        ctx.strokeStyle = `rgba(70,100,135,${d.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(d.x - SLANT * d.len, d.y - d.len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }

      // ripples on the water
      ripples = ripples.filter((r) => r.alpha > 0.01);
      for (const r of ripples) {
        r.r += 0.9;
        r.alpha *= 0.95;
        ctx.strokeStyle = `rgba(150,180,205,${r.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.36, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // splash ticks — tiny vertical kicks where drops strike
      splashes = splashes.filter((s) => s.life > 0);
      for (const s of splashes) {
        s.life -= 0.09;
        s.y -= 1.6;
        ctx.strokeStyle = `rgba(150,180,205,${(s.life * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - 5);
        ctx.stroke();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let running = false;
    const loop = (time: number) => {
      drawFrame(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    let startTimer: number | undefined;
    if (reduced) {
      drawFrame(0);
    } else {
      startTimer = window.setTimeout(start, 900);
    }

    return () => {
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
