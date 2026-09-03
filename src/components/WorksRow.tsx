"use client";

import { useRef } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

// NOTE: these are design & engineering concepts shown to illustrate
// capability — not client engagements. No metrics here are client results.
const WORKS = [
  {
    tags: [
      { label: "Web Application", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Demo Concept", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Lumina — Team Workspace Concept",
    what: "A calm workspace concept where design teams organize projects and collaborate.",
    built: "What Yantram built: dashboard UI, project workspaces, and frontend architecture.",
    highlights: "Highlights: responsive web app, clean component system, API-ready data layer.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Mobile App", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
      { label: "Demo Concept", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Haven Health — Care Coordination Concept",
    what: "A patient-friendly concept for appointments, practitioner messaging, and care plans.",
    built: "What Yantram built: cross-platform app flows, appointment and messaging UI.",
    highlights: "Highlights: accessible UX, maintainable mobile architecture, secure-by-design patterns.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop",
    linkHover: "hover:text-emerald-700",
  },
  {
    tags: [
      { label: "E-commerce", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Demo Concept", cls: "bg-stone-100 border-stone-200/80 text-stone-700" },
    ],
    title: "Solis Pay — Checkout Experience Concept",
    what: "A frictionless checkout concept for independent sellers and digital goods.",
    built: "What Yantram built: storefront UI with cart and checkout flows.",
    highlights: "Highlights: payments-ready integration patterns, catalog and order workflows.",
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
          <h2 className="font-display mt-1 text-[28px] font-semibold leading-9 text-[#161412] md:text-[36px] md:leading-[44px]">Digital products designed and engineered with care.</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#4F4A43]">Design and engineering concepts showing how we work — ask us about real client projects on a call.</p>
        </div>
        <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors hover:text-amber-700">
          <span>Start a similar project</span>
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
                  <p className="mb-1 text-[14px] leading-6 text-[#4F4A43]">{w.what}</p>
                  <p className="mb-1 text-[14px] leading-6 text-[#4F4A43]">{w.built}</p>
                  <p className="mb-4 text-[14px] leading-6 text-[#4F4A43]">{w.highlights}</p>
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors ${w.linkHover}`}
                  >
                      <span>Discuss a similar build</span>
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
