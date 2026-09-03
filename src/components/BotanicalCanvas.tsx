"use client";

import { useEffect, useRef } from "react";

class RootBranch {
  x: number;
  y: number;
  angle: number;
  depth: number;
  maxDepth: number;
  color: string;
  length = 0;
  maxLength: number;
  speed: number;
  children: RootBranch[] = [];
  hasSpawned = false;
  buds: { dist: number; size: number; hue: string }[] = [];
  curlOffset: number;

  constructor(
    startX: number,
    startY: number,
    angle: number,
    depth: number,
    maxDepth: number,
    color: string
  ) {
    this.x = startX;
    this.y = startY;
    this.angle = angle;
    this.depth = depth;
    this.maxDepth = maxDepth;
    this.color = color;
    this.maxLength = 50 + Math.random() * 90;
    this.speed = 0.5 + Math.random() * 0.8;
    this.curlOffset = Math.random() * 100;
  }

  update() {
    if (this.length < this.maxLength) {
      this.length += this.speed;
      if (Math.random() < 0.04 && this.buds.length < 3) {
        this.buds.push({
          dist: this.length,
          size: 1.5 + Math.random() * 2.5,
          hue: Math.random() > 0.5 ? "#2C5E43" : "#B8860B",
        });
      }
    } else if (!this.hasSpawned && this.depth < this.maxDepth) {
      this.hasSpawned = true;
      const endX = this.x + Math.cos(this.angle) * this.maxLength;
      const endY = this.y + Math.sin(this.angle) * this.maxLength;
      const branchCount = Math.random() > 0.35 ? 2 : 1;
      for (let i = 0; i < branchCount; i++) {
        const spread = (i === 0 ? -1 : 1) * (0.25 + Math.random() * 0.45);
        this.children.push(
          new RootBranch(endX, endY, this.angle + spread, this.depth + 1, this.maxDepth, this.color)
        );
      }
    }
    for (const child of this.children) child.update();
  }

  draw(ctx: CanvasRenderingContext2D, time: number, mouse: { x: number; y: number }) {
    if (this.length <= 0) return;
    const endX = this.x + Math.cos(this.angle) * this.length;
    const endY = this.y + Math.sin(this.angle) * this.length;
    const dx = mouse.x - endX;
    const dy = mouse.y - endY;
    const distToMouse = Math.sqrt(dx * dx + dy * dy) || 1;
    let bendX = 0;
    let bendY = 0;
    if (distToMouse < 220) {
      const influence = (1 - distToMouse / 220) * 12;
      bendX = (dx / distToMouse) * influence;
      bendY = (dy / distToMouse) * influence;
    }
    const midX = (this.x + endX) / 2 + Math.sin(time * 0.002 + this.curlOffset) * 6 + bendX;
    const midY = (this.y + endY) / 2 + Math.cos(time * 0.002 + this.curlOffset) * 6 + bendY;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(midX, midY, endX, endY);
    ctx.lineWidth = Math.max(0.6, (this.maxDepth - this.depth) * 0.7);
    ctx.strokeStyle = this.color;
    ctx.lineCap = "round";
    ctx.stroke();

    for (const b of this.buds) {
      if (b.dist <= this.length) {
        const ratio = b.dist / this.maxLength;
        const bx = this.x + (endX - this.x) * ratio;
        const by = this.y + (endY - this.y) * ratio;
        ctx.beginPath();
        ctx.arc(bx, by, b.size, 0, Math.PI * 2);
        ctx.fillStyle = b.hue;
        ctx.globalAlpha = 0.45;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
    for (const child of this.children) child.draw(ctx, time, mouse);
  }
}

class BotanicalLeaf {
  x = 0;
  y = 0;
  size = 14;
  speedY = 0.5;
  speedX = 0;
  oscillationSpeed = 0.02;
  angle = 0;
  rotationSpeed = 0.01;
  wobble = 0;
  flip = 0;
  flipSpeed = 0.015;
  opacity = 0.3;
  baseHue = "rgba(56, 112, 82, ";
  isSpore = false;

  constructor(private width: () => number, private height: () => number) {
    this.reset(true);
  }

  reset(initial = false) {
    const w = this.width();
    const h = this.height();
    this.x = Math.random() * w;
    this.y = initial ? Math.random() * h : -30;
    this.size = 10 + Math.random() * 16;
    this.speedY = 0.4 + Math.random() * 0.7;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.oscillationSpeed = 0.015 + Math.random() * 0.02;
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.025;
    this.wobble = Math.random() * 100;
    this.flip = Math.random() * Math.PI;
    this.flipSpeed = 0.01 + Math.random() * 0.02;
    this.opacity = 0.22 + Math.random() * 0.28;
    const hues = [
      "rgba(56, 112, 82, ",
      "rgba(184, 134, 11, ",
      "rgba(44, 94, 67, ",
      "rgba(158, 113, 20, ",
    ];
    this.baseHue = hues[Math.floor(Math.random() * hues.length)];
    this.isSpore = Math.random() > 0.65;
  }

  update(time: number, mouse: { x: number; y: number }) {
    const w = this.width();
    const h = this.height();
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(time * this.oscillationSpeed + this.wobble) * 0.6;
    this.angle += this.rotationSpeed;
    this.flip += this.flipSpeed;
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 140 && dist > 0.01) {
      const force = (1 - dist / 140) * 3.5;
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }
    if (this.y > h + 40 || this.x < -40 || this.x > w + 40) this.reset(false);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (this.isSpore) {
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = this.baseHue + this.opacity + ")";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = this.baseHue + this.opacity * 0.3 + ")";
      ctx.fill();
    } else {
      ctx.scale(1, Math.sin(this.flip));
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(this.size * 0.6, 0, 0, this.size);
      ctx.quadraticCurveTo(-this.size * 0.6, 0, 0, -this.size);
      ctx.closePath();
      ctx.fillStyle = this.baseHue + this.opacity + ")";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.85);
      ctx.lineTo(0, this.size * 0.85);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    ctx.restore();
  }
}

export default function BotanicalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let time = 0;
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initRoots();
    };

    let roots: RootBranch[] = [];
    const initRoots = () => {
      roots = [
        new RootBranch(0, height * 0.18, 0.22, 0, 4, "rgba(44, 94, 67, 0.16)"),
        new RootBranch(0, height * 0.52, 0.15, 0, 4, "rgba(184, 134, 11, 0.15)"),
        new RootBranch(0, height * 0.85, -0.2, 0, 4, "rgba(44, 94, 67, 0.14)"),
        new RootBranch(width, height * 0.32, Math.PI - 0.25, 0, 4, "rgba(44, 94, 67, 0.15)"),
        new RootBranch(width, height * 0.68, Math.PI + 0.18, 0, 4, "rgba(184, 134, 11, 0.14)"),
      ];
    };

    const getW = () => width;
    const getH = () => height;
    const leaves: BotanicalLeaf[] = [];

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initRoots();
    // fewer particles on small screens — cheaper on mobile GPUs
    const leafCount = window.innerWidth < 768 ? 18 : 38;
    for (let i = 0; i < leafCount; i++) leaves.push(new BotanicalLeaf(getW, getH));

    const onMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const drawFrame = () => {
      time++;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      ctx.clearRect(0, 0, width, height);
      for (const root of roots) {
        root.update();
        root.draw(ctx, time, mouse);
      }
      for (const leaf of leaves) {
        leaf.update(time, mouse);
        leaf.draw(ctx);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let running = false;
    const loop = () => {
      drawFrame();
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

    // pause the loop when the tab is hidden — no wasted CPU/battery
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibility);

    let startTimer: number | undefined;
    if (reduced) {
      // static single frame — zero ongoing CPU cost
      drawFrame();
    } else {
      // defer ambient animation until after first paint so it never
      // competes with LCP / initial load on the main thread
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85"
      aria-hidden
    />
  );
}
