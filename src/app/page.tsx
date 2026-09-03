import Image from "next/image";
import BotanicalCanvas from "@/components/BotanicalCanvas";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import InquiryForm, { CopyEmailButton } from "@/components/InquiryForm";
import LogoImage from "@/components/LogoImage";
import SiteHeader from "@/components/SiteHeader";
import WorksRow from "@/components/WorksRow";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/site";

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

const METRICS = [
  { icon: "clock", bg: "bg-amber-50 border-amber-200/60 text-amber-700", value: 3, decimals: 0, suffix: "x Faster", sub: "Time-to-market without cutting corners" },
  { icon: "shield-check", bg: "bg-emerald-50 border-emerald-200/60 text-emerald-800", value: 99.9, decimals: 1, suffix: "%", sub: "Production reliability and calm scale" },
  { icon: "users", bg: "bg-stone-100 border-stone-200 text-stone-800", value: 100, decimals: 0, suffix: "%", sub: "Direct partnership with lead artisans" },
] as const;

const CAPABILITIES = [
  {
    icon: "monitor",
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
    icon: "network",
    chip: "Calm Scale",
    title: "Cloud & Infrastructure",
    desc: "Distributed systems engineered like stone foundations: quiet, self-healing, and effortlessly scalable to millions.",
    img: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hover: "group-hover:text-stone-900",
    iconBg: "bg-stone-100 border-stone-200 text-stone-800",
  },
  {
    icon: "sparkles",
    chip: "Harmonic Utility",
    title: "Intelligent Assistance",
    desc: "Practical ambient intelligence woven softly into workflows, eliminating repetitive friction without sterile gimmickry.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80&auto=format&fit=crop",
    hover: "group-hover:text-amber-700",
    iconBg: "bg-amber-50 border-amber-200/60 text-amber-700",
  },
] as const;

const STEPS = [
  { n: "1", icon: "seedling", title: "Seed", sub: "Discover & Listen", subCls: "text-amber-700", desc: "We uncover your strategic essence, customer behavior, and product objectives before drafting a single pixel.", numBg: "bg-amber-50 border-amber-200 text-amber-700", hoverBorder: "hover:border-amber-400", iconHover: "group-hover:text-amber-700", foot: "text-amber-700", footIcon: "arrow-right" },
  { n: "2", icon: "spline", title: "Shape", sub: "Design & Prototype", subCls: "text-emerald-800", desc: "Interactive high-fidelity prototypes you can touch, test, and feel in your hand early in the process.", numBg: "bg-emerald-50 border-emerald-200 text-emerald-800", hoverBorder: "hover:border-emerald-500", iconHover: "group-hover:text-emerald-700", foot: "text-emerald-800", footIcon: "arrow-right" },
  { n: "3", icon: "code", title: "Build", sub: "Craft & Test", subCls: "text-stone-700", desc: "Clean architectural code built to endure. Thorough unit tests, performance audits, and human-tested ergonomics.", numBg: "bg-stone-100 border-stone-200 text-stone-800", hoverBorder: "hover:border-stone-400", iconHover: "group-hover:text-stone-800", foot: "text-stone-700", footIcon: "arrow-right" },
  { n: "4", icon: "leaf", title: "Flourish", sub: "Launch & Scale", subCls: "text-amber-700", desc: "Smooth deployment, clear handover docs, and ongoing observation to guide continuous market growth.", numBg: "bg-amber-50 border-amber-200 text-amber-700", hoverBorder: "hover:border-amber-400", iconHover: "group-hover:text-amber-700", foot: "text-amber-700", footIcon: "check-circle" },
] as const;

const VALUES = [
  { icon: "users", color: "text-amber-700", title: "Direct Access", desc: "Talk directly with the artisans building your product. No account managers acting as games of telephone." },
  { icon: "languages", color: "text-emerald-800", title: "Human Clarity", desc: "No bewildering acronyms or smoke-and-mirrors jargon. We explain trade-offs plainly so you can decide with confidence." },
  { icon: "calendar", color: "text-stone-800", title: "Transparent Milestones", desc: "Every stage has a documented heartbeat and delivery schedule. You know exactly what is blooming each week." },
  { icon: "heart", color: "text-amber-700", title: "Long-term Care", desc: "We stand by what we construct. Post-launch support and architectural mentorship ensure your software thrives." },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FBF9F6] font-[Space_Grotesk,Plus_Jakarta_Sans,sans-serif] text-[15px] leading-6 text-[#161412] antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#161412] focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <BotanicalCanvas />

      <div className="animate-float fixed bottom-6 right-6 z-40 flex select-none items-center gap-2.5 rounded-full border border-stone-300/80 bg-white/90 px-3.5 py-1.5 text-[#4F4A43] shadow-[0_8px_24px_rgba(22,20,18,0.06)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">Botanical Flux: Active</span>
        <span className="text-[10px] text-stone-500">|</span>
        <Icon name="leaf" className="text-[15px] text-stone-600" />
      </div>

      <SiteHeader />

      <main id="main" className="relative z-10 w-full pt-20">
        <div className="bg-atelier-mesh flex w-full flex-col">
          {/* HERO */}
          <div className="relative w-full overflow-hidden border-b border-stone-200/60">
            <div className="animate-glow pointer-events-none absolute left-1/2 top-12 -z-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-amber-100/40 blur-[140px]" />
            <div className="animate-glow pointer-events-none absolute right-12 top-48 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-100/35 blur-[120px]" />
            <div className="pointer-events-none absolute left-8 top-72 -z-10 h-[400px] w-[400px] rounded-full bg-stone-200/50 blur-[130px]" />
            <section className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-12 pt-12 text-center md:px-14 md:pb-16 md:pt-24">
              <div className="hero-in group relative mb-6">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-amber-200/40 via-stone-200/50 to-emerald-200/40 opacity-80 blur-lg transition-opacity duration-700 group-hover:opacity-100" />
                <div className="animate-float relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-2 shadow-[0_12px_32px_rgba(22,20,18,0.06)] transition-transform duration-500 hover:scale-105 md:h-28 md:w-28">
                  <LogoImage src="/apple-touch-icon.png" alt="Yantram Studio Monogram" size="h-20 w-20 md:h-24 md:w-24" priority />
                </div>
              </div>
              <div
                style={{ animationDelay: "0.1s" }}
                className="hero-in mb-4 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-stone-800 shadow-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-600" />
                <span>Bespoke Digital Product Studio</span>
              </div>
              <h1
                style={{ animationDelay: "0.18s" }}
                className="hero-in font-display mx-auto mb-4 max-w-4xl text-[36px] font-bold leading-[44px] tracking-tight text-[#161412] md:text-[56px] md:leading-[64px]"
              >
                BUILD STEADY. <span className="italic font-serif text-amber-700">RISE FAST.</span>
              </h1>
              <p
                style={{ animationDelay: "0.28s" }}
                className="hero-in mx-auto mb-8 max-w-2xl text-[18px] leading-7 text-[#4F4A43]"
              >
                We design and craft digital products that feel natural, work flawlessly, and help ambitious companies grow with architectural calm and tactile elegance.
              </p>
              <div
                style={{ animationDelay: "0.36s" }}
                className="hero-in mb-12 flex flex-wrap items-center justify-center gap-4"
              >
                <a href="#contact-studio" className="inline-flex items-center gap-2 rounded-full bg-[#161412] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(22,20,18,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_10px_30px_rgba(22,20,18,0.22)] active:translate-y-0 active:scale-[0.98]">
                  <span>Start a Project</span>
                  <Icon name="arrow-up-right" className="text-[18px]" />
                </a>
                <a href="#selected-works" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-3 text-[14px] font-semibold text-[#161412] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-stone-50 active:translate-y-0 active:scale-[0.98]">
                  <span>Explore Works</span>
                  <Icon name="arrow-down" className="text-[18px]" />
                </a>
              </div>
              <Stagger className="grid w-full max-w-4xl grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
                {METRICS.map((m, idx) => (
                  <StaggerItem key={m.sub} delay={idx * 0.08}>
                    <div className="flex items-center gap-4 rounded-xl border border-stone-200/80 bg-white p-6 text-left shadow-[0_4px_16px_rgba(22,20,18,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 hover:scale-110 ${m.bg}`}>
                        <Icon name={m.icon} className="text-2xl" />
                      </div>
                      <div className="flex flex-col">
                        <CountUp
                          to={m.value}
                          decimals={m.decimals}
                          suffix={m.suffix}
                          className="font-display text-[20px] font-semibold leading-7 tabular-nums text-[#161412]"
                        />
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
                <span key={`${t}-${i}`} className="flex items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-stone-600">
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
              {CAPABILITIES.map((c, idx) => (
                <StaggerItem key={c.title} delay={idx * 0.08}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-8 shadow-[0_4px_20px_rgba(22,20,18,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(22,20,18,0.07)]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${c.iconBg}`}>
                      <Icon name={c.icon} className="text-2xl" />
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
                        <Image
                          alt={c.title}
                          src={c.img}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
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
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* ETHOS */}
          <section id="ethos" className="relative my-8 w-full scroll-mt-24 overflow-hidden border-y border-stone-200/90 bg-[#F5F2EC] py-24">
            <Reveal className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-14">
              <div className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-emerald-800">
                <Icon name="flower" className="text-[18px]" />
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
          <WorksRow />

          {/* PROCESS */}
          <section id="process" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-12 md:px-14">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">The Path Forward</span>
              <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">How We Grow Together</h2>
              <p className="mt-2 text-[15px] text-[#4F4A43]">No mysterious handoffs or convoluted bureaucracy. Just four purposeful stages from initial seedling to thriving scale.</p>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, idx) => (
                <StaggerItem key={s.title} delay={idx * 0.08}>
                <div className={`group flex h-full flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${s.hoverBorder}`}>
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-[20px] font-bold ${s.numBg}`}>{s.n}</span>
                      <Icon name={s.icon} className={`text-stone-400 transition-colors ${s.iconHover}`} />
                    </div>
                    <h3 className="font-display mb-1 text-[20px] font-semibold leading-7 text-[#161412]">{s.title}</h3>
                    <p className={`mb-3 text-[14px] font-semibold ${s.subCls}`}>{s.sub}</p>
                    <p className="text-[13px] leading-5 text-[#4F4A43]">{s.desc}</p>
                  </div>
                  <div className={`flex items-center justify-end pt-4 ${s.foot}`}>
                    <Icon name={s.footIcon} className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          {/* PARTNERSHIP */}
          <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-14">
            <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-[#F5F2EC] p-8 md:p-16">
              <div className="mb-12 max-w-2xl">
                <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">The Partnership</span>
                <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">Why founders and product leaders trust Yantram.</h2>
                <p className="mt-2 text-[15px] text-[#4F4A43]">Software shouldn&rsquo;t feel like a high-stress puzzle. We keep communications transparent, expectations grounded, and craftsmanship uncompromised.</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {VALUES.map((v) => (
                  <div key={v.title} className="group flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1">
                    <div className={`mb-1 flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 ${v.color}`}>
                      <Icon name={v.icon} className="text-xl" />
                    </div>
                    <h3 className="font-display text-[20px] font-semibold leading-7 text-[#161412]">{v.title}</h3>
                    <p className="text-[13px] leading-5 text-[#4F4A43]">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section id="contact-studio" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 md:px-14">
            <Reveal>
            <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-8 text-center shadow-[0_16px_48px_rgba(22,20,18,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_64px_rgba(22,20,18,0.10)] md:p-24">
              <div className="animate-glow pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl" />
              <div className="animate-glow pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-[#F5F2EC] text-[#161412] shadow-sm">
                <Icon name="mail" className="text-3xl" />
              </div>
              <span className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-amber-700">Ready When You Are</span>
              <h2 className="font-display mb-4 max-w-2xl text-[28px] font-bold leading-9 text-[#161412] md:text-[40px] md:leading-[48px]">
                Let&rsquo;s create something timeless together.
              </h2>
              <p className="mb-8 max-w-xl text-[18px] leading-7 text-[#4F4A43]">
                Whether you are shaping an ambitious new venture from zero or revitalizing an essential product, we would love to listen.
              </p>
              <InquiryForm />
              <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
                <CopyEmailButton />
              </div>
              <p className="text-[13px] text-stone-600">
                Direct:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[#161412] underline-offset-4 hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                •{" "}
                <a href={CONTACT_PHONE_HREF} className="font-medium text-[#161412] underline-offset-4 hover:underline">
                  {CONTACT_PHONE_DISPLAY}
                </a>{" "}
                • Typical response within 24 hours
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
              <p className="text-[13px] text-[#4F4A43]">
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline-offset-4 hover:text-[#161412] hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                •{" "}
                <a href={CONTACT_PHONE_HREF} className="underline-offset-4 hover:text-[#161412] hover:underline">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="#contact-studio" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Contact Us</a>
            <a href="#ethos" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Atelier Ethos</a>
            <a href="#" className="text-[12px] font-semibold text-[#4F4A43] transition-colors duration-200 hover:text-[#161412]">Privacy &amp; Terms</a>
          </div>
          <div className="text-[13px] text-stone-600">© 2024 Yantram Studio. Rooted in natural precision.</div>
        </div>
      </footer>
    </div>
  );
}
