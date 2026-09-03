"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BotanicalCanvas from "@/components/BotanicalCanvas";
import Tilt from "@/components/Tilt";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const MARQUEE = [
  "Web Experiences",
  "Mobile Apps",
  "Cloud & Infra",
  "AI Assistance",
  "Design Systems",
  "MVP Sprints",
  "Brand Identity",
  "Long-term Care",
];

const NAV = [
  { label: "Works", href: "#selected-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Philosophy", href: "#ethos" },
  { label: "Process", href: "#process" },
  { label: "Connect", href: "#contact-studio" },
];

const METRICS = [
  { icon: "schedule", bg: "bg-amber-50 border-amber-200/60 text-amber-700", title: "3x Faster", sub: "Time-to-market without cutting corners" },
  { icon: "verified_user", bg: "bg-emerald-50 border-emerald-200/60 text-emerald-800", title: "99.9%", sub: "Production reliability and calm scale" },
  { icon: "handshake", bg: "bg-stone-100 border-stone-200 text-stone-800", title: "100%", sub: "Direct partnership with lead artisans" },
];

const CAPABILITIES = [
  {
    icon: "tab",
    chip: "Fluid & Immersive",
    title: "Web Experiences",
    desc: "Editorial-grade digital spaces with rich micro-motion, lightning response, and effortless typography.",
    img: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hover: "group-hover:text-amber-700",
    iconBg: "bg-amber-50 border-amber-200/60 text-amber-700",
  },
  {
    icon: "smartphone",
    chip: "Tactile Touch",
    title: "Mobile Applications",
    desc: "Native iOS and Android products designed with thumb-driven organic rhythms, haptic warmth, and offline resilience.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&auto=format&fit=crop",
    hover: "group-hover:text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200/60 text-emerald-700",
  },
  {
    icon: "hub",
    chip: "Calm Scale",
    title: "Cloud & Infrastructure",
    desc: "Distributed systems engineered like stone foundations: quiet, self-healing, and effortlessly scalable to millions.",
    img: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hover: "group-hover:text-stone-900",
    iconBg: "bg-stone-100 border-stone-200 text-stone-800",
  },
  {
    icon: "auto_fix_high",
    chip: "Harmonic Utility",
    title: "Intelligent Assistance",
    desc: "Practical ambient intelligence woven softly into workflows, eliminating repetitive friction without sterile gimmickry.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80&auto=format&fit=crop",
    hover: "group-hover:text-amber-700",
    iconBg: "bg-amber-50 border-amber-200/60 text-amber-700",
  },
];

const WORKS = [
  {
    tags: [
      { label: "Workflow Studio", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Enterprise SaaS", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Lumina — Intelligent Creative Orchestration",
    desc: "Replaced 4 disconnected legacy tools with a single calm workspace for global design teams. Resulted in 42% reduced cycle times and zero training required for new team members.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    linkHover: "hover:text-amber-700",
    reverse: false,
  },
  {
    tags: [
      { label: "Health & Wellness", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
      { label: "Cross-Platform", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Haven Health — Compassionate Care Coordination",
    desc: "A patient-first platform designed to replace clinical anxiety with clarity. Built with HIPAA compliance, biometrics, and real-time practitioner consultations.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop",
    linkHover: "hover:text-emerald-700",
    reverse: true,
  },
  {
    tags: [
      { label: "Fintech & Commerce", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Global Scale", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Solis Pay — Effortless Borderless Commerce",
    desc: "Empowering 18,000+ independent artisans and digital goods sellers across 34 currencies with a frictionless 1-click checkout experience.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
    linkHover: "hover:text-amber-700",
    reverse: false,
  },
];

const STEPS = [
  { n: "1", icon: "potted_plant", title: "Seed", sub: "Discover & Listen", subCls: "text-amber-700", desc: "We uncover your strategic essence, customer behavior, and product objectives before drafting a single pixel.", numBg: "bg-amber-50 border-amber-200 text-amber-700", hoverBorder: "hover:border-amber-400", iconHover: "group-hover:text-amber-700", foot: "text-amber-700", footIcon: "arrow_forward" },
  { n: "2", icon: "polyline", title: "Shape", sub: "Design & Prototype", subCls: "text-emerald-800", desc: "Interactive high-fidelity prototypes you can touch, test, and feel in your hand early in the process.", numBg: "bg-emerald-50 border-emerald-200 text-emerald-800", hoverBorder: "hover:border-emerald-500", iconHover: "group-hover:text-emerald-700", foot: "text-emerald-800", footIcon: "arrow_forward" },
  { n: "3", icon: "construction", title: "Build", sub: "Craft & Test", subCls: "text-stone-700", desc: "Clean architectural code built to endure. Thorough unit tests, performance audits, and human-tested ergonomics.", numBg: "bg-stone-100 border-stone-200 text-stone-800", hoverBorder: "hover:border-stone-400", iconHover: "group-hover:text-stone-800", foot: "text-stone-700", footIcon: "arrow_forward" },
  { n: "4", icon: "eco", title: "Flourish", sub: "Launch & Scale", subCls: "text-amber-700", desc: "Smooth deployment, clear handover docs, and ongoing observation to guide continuous market growth.", numBg: "bg-amber-50 border-amber-200 text-amber-700", hoverBorder: "hover:border-amber-400", iconHover: "group-hover:text-amber-700", foot: "text-amber-700", footIcon: "check_circle" },
];

const VALUES = [
  { icon: "groups", color: "text-amber-700", title: "Direct Access", desc: "Talk directly with the artisans building your product. No account managers acting as games of telephone." },
  { icon: "translate", color: "text-emerald-800", title: "Human Clarity", desc: "No bewildering acronyms or smoke-and-mirrors jargon. We explain trade-offs plainly so you can decide with confidence." },
  { icon: "calendar_today", color: "text-stone-800", title: "Transparent Milestones", desc: "Every stage has a documented heartbeat and delivery schedule. You know exactly what is blooming each week." },
  { icon: "favorite", color: "text-amber-700", title: "Long-term Care", desc: "We stand by what we construct. Post-launch support and architectural mentorship ensure your software thrives." },
];

function LogoImage({
  src,
  alt,
  size,
  priority = false,
}: {
  src: string;
  alt: string;
  size: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={128}
      height={128}
      priority={priority}
      className={`${size} object-contain`}
    />
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@yantramstudio.com");
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF9F6] font-[Space_Grotesk,Plus_Jakarta_Sans,sans-serif] text-[15px] leading-6 text-[#161412] antialiased">
      <BotanicalCanvas />

      <div className="animate-float fixed bottom-6 right-6 z-40 flex select-none items-center gap-2.5 rounded-full border border-stone-300/80 bg-white/90 px-3.5 py-1.5 text-[#4F4A43] shadow-[0_8px_24px_rgba(22,20,18,0.06)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">Botanical Flux: Active</span>
        <span className="text-[10px] text-stone-400">|</span>
        <span className="material-symbols-outlined text-[15px] text-stone-600">eco</span>
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-stone-200/80 bg-[#FBF9F6]/85 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-14">
          <a href="#" className="group flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <LogoImage src="/apple-touch-icon.png" alt="Yantram Studio logo" size="h-7 w-7" priority />
            </div>
            <span className="font-display text-[20px] font-bold uppercase tracking-wider text-[#161412]">Yantram</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#selected-works" className="border-b-2 border-[#161412] pb-0.5 text-[14px] font-bold text-[#161412]">Works</a>
            {NAV.slice(1).map((l) => (
              <a key={l.label} href={l.href} className="text-[14px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#contact-studio" className="hidden items-center gap-2 rounded-full bg-[#161412] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(22,20,18,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_6px_24px_rgba(22,20,18,0.2)] sm:inline-flex">
              <span>Start a Project</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-[#161412] shadow-sm">
              <span className="material-symbols-outlined text-[19px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full pt-20">
        <div className="bg-atelier-mesh flex w-full flex-col">
          {/* HERO */}
          <div className="relative w-full overflow-hidden border-b border-stone-200/60">
            <div className="animate-glow pointer-events-none absolute left-1/2 top-12 -z-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-amber-100/40 blur-[140px]" />
            <div className="animate-glow pointer-events-none absolute right-12 top-48 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-100/35 blur-[120px]" />
            <div className="pointer-events-none absolute left-8 top-72 -z-10 h-[400px] w-[400px] rounded-full bg-stone-200/50 blur-[130px]" />
            <section className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-12 pt-12 text-center md:px-14 md:pb-16 md:pt-24">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.21, 0.65, 0.16, 1] }}
                className="group relative mb-6"
              >
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-amber-200/40 via-stone-200/50 to-emerald-200/40 opacity-80 blur-lg transition-opacity duration-700 group-hover:opacity-100" />
                <div className="animate-float relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-2 shadow-[0_12px_32px_rgba(22,20,18,0.06)] transition-transform duration-500 hover:scale-105 md:h-28 md:w-28">
                  <LogoImage src="/android-chrome-512x512.png" alt="Yantram Studio Monogram" size="h-20 w-20 md:h-24 md:w-24" priority />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-stone-800 shadow-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-600" />
                <span>Bespoke Digital Product Studio</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="font-display mx-auto mb-4 max-w-4xl text-[36px] font-bold leading-[44px] tracking-tight text-[#161412] md:text-[56px] md:leading-[64px]"
              >
                BUILD STEADY. <span className="italic font-serif text-amber-700">RISE FAST.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="mx-auto mb-8 max-w-2xl text-[18px] leading-7 text-[#4F4A43]"
              >
                We design and craft digital products that feel natural, work flawlessly, and help ambitious companies grow with architectural calm and tactile elegance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                className="mb-12 flex flex-wrap items-center justify-center gap-4"
              >
                <a href="#contact-studio" className="inline-flex items-center gap-2 rounded-full bg-[#161412] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(22,20,18,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_10px_30px_rgba(22,20,18,0.22)] active:translate-y-0 active:scale-[0.98]">
                  <span>Start a Project</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </a>
                <a href="#selected-works" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-3 text-[14px] font-semibold text-[#161412] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-stone-50 active:translate-y-0 active:scale-[0.98]">
                  <span>Explore Works</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
              </motion.div>
              <Stagger className="grid w-full max-w-4xl grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
                {METRICS.map((m) => (
                  <StaggerItem key={m.title}>
                    <div className="flex items-center gap-4 rounded-xl border border-stone-200/80 bg-white p-6 text-left shadow-[0_4px_16px_rgba(22,20,18,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${m.bg}`}>
                        <span className="material-symbols-outlined text-2xl">{m.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-[20px] font-semibold leading-7 text-[#161412]">{m.title}</span>
                        <span className="text-[13px] leading-5 text-[#4F4A43]">{m.sub}</span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>

          {/* MARQUEE */}
          <div className="overflow-hidden border-b border-stone-200/60 bg-white/60 py-4 backdrop-blur">
            <div className="animate-marquee flex w-max items-center gap-8 pr-8">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span key={`${t}-${i}`} className="flex items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600/70" />
                </span>
              ))}
            </div>
          </div>

          {/* CAPABILITIES */}
          <section id="capabilities" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-12 md:px-14">
            <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="flex max-w-xl flex-col gap-1">
                <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">Disciplines &amp; Craft</span>
                <h2 className="font-display text-[28px] font-semibold leading-9 tracking-tight text-[#161412] md:text-[36px] md:leading-[44px]">
                  Instruments built for natural clarity and lasting impact.
                </h2>
              </div>
              <p className="max-w-md text-[15px] text-[#4F4A43]">
                Every system we sculpt pairs organic human touch with robust, production-grade engineering.
              </p>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <StaggerItem key={c.title}>
                <Tilt max={7}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-8 shadow-[0_4px_20px_rgba(22,20,18,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(22,20,18,0.07)]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${c.iconBg}`}>
                      <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                    </div>
                    <span className="rounded-full border border-stone-200/70 bg-stone-100 px-3 py-1 text-[11px] font-semibold tracking-wide text-stone-700">{c.chip}</span>
                  </div>
                  <div className="mb-6">
                    <h3 className={`font-display mb-2 text-[24px] font-semibold leading-8 text-[#161412] transition-colors ${c.hover}`}>{c.title}</h3>
                    <p className="text-[15px] text-[#4F4A43]">{c.desc}</p>
                  </div>
                  <div className="zoom-img relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                    {c.img ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={c.title} src={c.img} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      </>
                    ) : (
                      <svg className="h-full w-full p-6 text-stone-400 transition-colors duration-500 group-hover:text-amber-700" fill="none" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
                        <path className="opacity-60" d="M40 70C40 47.9 57.9 30 80 30C97.7 30 112.6 41.4 117.9 57.3C121.8 54.5 126.5 52.9 131.6 52.9C144.4 52.9 154.8 62.7 155.8 75.2C158.4 74.4 161.1 74 164 74C177.3 74 188 84.7 188 98C188 111.3 177.3 122 164 122H70C53.4 122 40 108.6 40 92V70Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <circle className="text-amber-600" cx="240" cy="50" r="24" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />
                        <circle className="text-emerald-700" cx="270" cy="95" r="16" stroke="currentColor" strokeWidth="2" />
                        <path d="M188 90C205 90 220 70 240 65" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                        <path d="M175 110C210 110 240 105 254 98" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                </div>
                </Tilt>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* ETHOS */}
          <section id="ethos" className="relative my-8 w-full scroll-mt-24 overflow-hidden border-y border-stone-200/90 bg-[#F5F2EC] py-24">
            <Reveal className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-14">
              <div className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-emerald-800">
                <span className="material-symbols-outlined text-[18px]">spa</span>
                <span>Atelier Ethos</span>
              </div>
              <h2 className="font-display mb-6 text-[28px] font-bold tracking-tight text-[#161412] md:text-[40px] md:leading-[48px]">
                &ldquo;Nature&rsquo;s discipline. Digital craft.&rdquo;
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-[18px] leading-7 text-[#4F4A43]">
                True technology shouldn&rsquo;t scream for attention with icy neon or frantic telemetry. It should feel as composed as carved walnut and as purposeful as an ancient orchard — quietly supporting human lives and enterprise growth.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-[14px] font-semibold text-stone-700">
                <div className="flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-600" /><span className="font-medium">Zero Fluff</span></div>
                <div className="flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-700" /><span className="font-medium">Honest Craftsmanship</span></div>
                <div className="flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5"><span className="h-2.5 w-2.5 rounded-full bg-stone-900" /><span className="font-medium">Enduring Quality</span></div>
              </div>
            </Reveal>
          </section>

          {/* WORKS */}
          <section id="selected-works" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-12 md:px-14">
            <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">Selected Work</span>
                <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">Products built for founders who value detail.</h2>
              </div>
              <a href="#contact-studio" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors hover:text-amber-700">
                <span>Request Case Archive</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">east</span>
              </a>
            </Reveal>
            <div className="flex flex-col gap-12">
              {WORKS.map((w) => (
                <Reveal key={w.title}>
                <div className="group flex flex-col items-center gap-8 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_6px_24px_rgba(22,20,18,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(22,20,18,0.08)] md:p-12 lg:flex-row">
                  <div className={`zoom-img relative h-72 w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 md:h-96 lg:w-1/2 ${w.reverse ? "lg:order-2" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={w.title} src={w.img} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className={`flex w-full flex-col justify-center text-left lg:w-1/2 ${w.reverse ? "lg:order-1" : ""}`}>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {w.tags.map((t) => (
                        <span key={t.label} className={`rounded-full border px-3 py-1 text-[11px] font-medium ${t.cls}`}>{t.label}</span>
                      ))}
                    </div>
                    <h3 className="font-display mb-3 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">{w.title}</h3>
                    <p className="mb-6 text-[15px] text-[#4F4A43]">{w.desc}</p>
                    <a href="#contact-studio" className={`group inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors ${w.linkHover}`}>
                      <span>View Case Study</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">north_east</span>
                    </a>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* PROCESS */}
          <section id="process" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-12 md:px-14">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">The Path Forward</span>
              <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">How We Grow Together</h2>
              <p className="mt-2 text-[15px] text-[#4F4A43]">No mysterious handoffs or convoluted bureaucracy. Just four purposeful stages from initial seedling to thriving scale.</p>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <StaggerItem key={s.title}>
                <Tilt max={10}>
                <div className={`group flex h-full flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${s.hoverBorder}`}>
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-[20px] font-bold ${s.numBg}`}>{s.n}</span>
                      <span className={`material-symbols-outlined text-stone-400 transition-colors ${s.iconHover}`}>{s.icon}</span>
                    </div>
                    <h3 className="font-display mb-1 text-[20px] font-semibold leading-7 text-[#161412]">{s.title}</h3>
                    <p className={`mb-3 text-[14px] font-semibold ${s.subCls}`}>{s.sub}</p>
                    <p className="text-[13px] leading-5 text-[#4F4A43]">{s.desc}</p>
                  </div>
                  <div className={`flex items-center justify-end pt-4 ${s.foot}`}>
                    <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">{s.footIcon}</span>
                  </div>
                </div>
                </Tilt>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* PARTNERSHIP */}
          <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-14">
            <Reveal>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-[#F5F2EC] p-8 md:p-16"
            >
              <div className="mb-12 max-w-2xl">
                <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">The Partnership</span>
                <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">Why founders and product leaders trust Yantram.</h2>
                <p className="mt-2 text-[15px] text-[#4F4A43]">Software shouldn&rsquo;t feel like a high-stress puzzle. We keep communications transparent, expectations grounded, and craftsmanship uncompromised.</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {VALUES.map((v) => (
                  <div key={v.title} className="group flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1">
                    <div className={`mb-1 flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${v.color}`}>
                      <span className="material-symbols-outlined text-xl">{v.icon}</span>
                    </div>
                    <h4 className="font-display text-[20px] font-semibold leading-7 text-[#161412]">{v.title}</h4>
                    <p className="text-[13px] leading-5 text-[#4F4A43]">{v.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            </Reveal>
          </section>

          {/* CTA */}
          <section id="contact-studio" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 md:px-14">
            <Reveal>
            <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-8 text-center shadow-[0_16px_48px_rgba(22,20,18,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_64px_rgba(22,20,18,0.10)] md:p-24">
              <div className="animate-glow pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl" />
              <div className="animate-glow pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-[#F5F2EC] text-[#161412] shadow-sm">
                <span className="material-symbols-outlined text-3xl">mark_email_read</span>
              </div>
              <span className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-amber-700">Ready When You Are</span>
              <h2 className="font-display mb-4 max-w-2xl text-[28px] font-bold leading-9 text-[#161412] md:text-[40px] md:leading-[48px]">
                Let&rsquo;s create something timeless together.
              </h2>
              <p className="mb-8 max-w-xl text-[18px] leading-7 text-[#4F4A43]">
                Whether you are shaping an ambitious new venture from zero or revitalizing an essential product, we would love to listen.
              </p>
              <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
                <motion.a
                  href="mailto:hello@yantramstudio.com"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#161412] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-stone-800"
                >
                  <span>Start a Conversation</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </motion.a>
                <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-6 py-3 text-[12px] font-semibold text-[#161412] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-200 active:translate-y-0 active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>{copied ? "Copied to Clipboard!" : "Copy Email Address"}</span>
                </button>
              </div>
              <p className="text-[13px] text-stone-500">
                Direct studio desk: <span className="font-medium text-[#161412]">hello@yantramstudio.com</span> • Typical response within 24 hours
              </p>
            </div>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className="relative z-10 mt-auto w-full border-t border-stone-200/90 bg-[#F5F2EC] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center md:flex-row md:px-14 md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
              <LogoImage src="/favicon-32x32.png" alt="Yantram Studio logo" size="h-7 w-7" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-[20px] font-bold tracking-tight text-[#161412]">Yantram Studio</span>
              <p className="max-w-sm text-[13px] text-[#4F4A43]">A warm sanctuary shaping digital artifacts with architectural patience and intentional craft.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="#contact-studio" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Contact Us</a>
            <a href="#ethos" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Atelier Ethos</a>
            <a href="#" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Privacy &amp; Terms</a>
          </div>
          <div className="text-[13px] text-stone-500">© 2024 Yantram Studio. Rooted in natural precision.</div>
        </div>
      </footer>
    </div>
  );
}
