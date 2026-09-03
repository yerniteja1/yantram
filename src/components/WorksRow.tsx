"use client";

import { useRef } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

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
  },
];

export default function WorksRow() {
  const worksRef = useRef<HTMLDivElement>(null);
  const scrollWorks = (dir: 1 | -1) => {
    const el = worksRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section id="selected-works" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-12 md:px-14">
      <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-widest text-amber-700">Selected Work</span>
          <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">Products built for founders who value detail.</h2>
        </div>
        <a href="#contact-studio" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors hover:text-amber-700">
          <span>Request Case Archive</span>
                <Icon name="arrow-right" className="text-[18px] transition-transform group-hover:translate-x-1" />
        </a>
      </Reveal>
      <Reveal>
        <div className="relative">
          <div
            ref={worksRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WORKS.map((w) => (
              <article
                key={w.title}
                className="group w-[86vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_6px_24px_rgba(22,20,18,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(22,20,18,0.08)] sm:w-[58vw] lg:w-[calc(50%-12px)]"
              >
                <div className="zoom-img relative h-60 w-full overflow-hidden bg-stone-100 sm:h-72">
                  <Image
                    alt={w.title}
                    src={w.img}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {w.tags.map((t) => (
                      <span key={t.label} className={`rounded-full border px-3 py-1 text-[11px] font-medium ${t.cls}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display mb-2 text-[22px] font-semibold leading-8 text-[#161412] md:text-[26px] md:leading-9">
                    {w.title}
                  </h3>
                  <p className="mb-4 text-[14px] leading-6 text-[#4F4A43]">{w.desc}</p>
                  <a
                    href="#contact-studio"
                    className={`inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors ${w.linkHover}`}
                  >
                      <span>View Case Study</span>
                      <Icon name="arrow-up-right" className="text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-4">
            <button
              onClick={() => scrollWorks(-1)}
              aria-label="Scroll works left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-[#161412] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md active:translate-y-0 active:scale-95"
            >
              <Icon name="arrow-left" className="text-xl" />
            </button>
            <button
              onClick={() => scrollWorks(1)}
              aria-label="Scroll works right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-[#161412] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md active:translate-y-0 active:scale-95"
            >
              <Icon name="arrow-right" className="text-xl" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
