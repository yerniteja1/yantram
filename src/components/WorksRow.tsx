"use client";

import { useRef } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

// Live client-ready demos built by Yantram — each card links to the
// deployed demo site.
const WORKS = [
  {
    tags: [
      { label: "Auto Services", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "TORQ — Auto Care Website",
    what: "A mobile-first website for an auto service garage: services, pricing, reviews, and location.",
    built: "What Yantram built: service catalog, WhatsApp booking flow, and admin-editable content.",
    highlights: "Highlights: responsive design, instant WhatsApp enquiries. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80&auto=format&fit=crop",
    href: "https://torq.yerni.online",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Fitness", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "FORGE — Gym & Fitness Website",
    what: "A high-energy site for a gym: membership plans, trainers, gallery, and class schedules.",
    built: "What Yantram built: membership tiers, trainer profiles, and WhatsApp trial booking.",
    highlights: "Highlights: bold mobile-first design, plan comparison. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
    href: "https://forgegym.yerni.online",
    linkHover: "hover:text-emerald-700",
  },
  {
    tags: [
      { label: "Salon & Spa", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "GLOW — Salon Booking Website",
    what: "An elegant site for a beauty salon: services with pricing, stylists, gallery, and reviews.",
    built: "What Yantram built: service menu, appointment booking over WhatsApp, and offer banners.",
    highlights: "Highlights: category tabs, search, instant booking. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
    href: "https://glowsalon.yerni.online",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Restaurant", cls: "bg-amber-50 border-amber-200/60 text-amber-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "KORA — Restaurant Website",
    what: "An appetizing site for a restaurant: full menu with prices, gallery, reviews, and table booking.",
    built: "What Yantram built: menu with categories, table reservation flow, and location with maps.",
    highlights: "Highlights: menu-first mobile UX, one-tap table booking. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
    href: "https://kora.yerni.online",
    linkHover: "hover:text-emerald-700",
  },
  {
    tags: [
      { label: "Events & Venues", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "VAIBHAV — Banquet Hall Website",
    what: "A grand site for an event venue: halls, packages with starting prices, gallery, and date planner.",
    built: "What Yantram built: hall listings, package cards, and event enquiry over WhatsApp.",
    highlights: "Highlights: package comparison, event-date planner. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&auto=format&fit=crop",
    href: "https://vaibhav.yerni.online",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Hotel & Hospitality", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "THE BAY — Hotel Website",
    what: "A premium site for a hotel: rooms with nightly rates, amenities, gallery, and booking enquiries.",
    built: "What Yantram built: room listings, amenity highlights, and WhatsApp reservation flow.",
    highlights: "Highlights: room showcase, date-wise enquiry. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop",
    href: "https://bayhotel.yerni.online",
    linkHover: "hover:text-emerald-700",
  },
  {
    tags: [
      { label: "Healthcare", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "SMILECRAFT — Dental Clinic Website",
    what: "A trustworthy site for a dental clinic: treatments with starting prices, doctors, and appointment booking.",
    built: "What Yantram built: treatment catalog, doctor profiles, and WhatsApp appointment flow.",
    highlights: "Highlights: treatment guides, patient reviews. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80&auto=format&fit=crop",
    href: "https://smilecraft.yerni.online",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Pet Care + Shop", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "PAWSOME — Pet Care & Shop",
    what: "A friendly site for pet care: services, adoptable pets, product shop with search, and order over WhatsApp.",
    built: "What Yantram built: service bookings, pet listings, and a mini shop with category tabs.",
    highlights: "Highlights: shop with search and filters, WhatsApp ordering. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80&auto=format&fit=crop",
    href: "https://pawsomepet.yerni.online",
    linkHover: "hover:text-emerald-700",
  },
  {
    tags: [
      { label: "Real Estate", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "NEST — Realty Listings Website",
    what: "A clean site for a realtor: property listings with prices, filters, gallery, and site-visit booking.",
    built: "What Yantram built: searchable listings, price filters, and WhatsApp site-visit scheduling.",
    highlights: "Highlights: buy/rent filters, price sorting. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop",
    href: "https://nestreality.yerni.online",
    linkHover: "hover:text-amber-700",
  },
  {
    tags: [
      { label: "Jobs & Hiring", cls: "bg-stone-100 border-stone-200/80 text-stone-800" },
      { label: "Live Demo", cls: "bg-emerald-50 border-emerald-200/60 text-emerald-800" },
    ],
    title: "RIGHTJOB — Job Consultancy Website",
    what: "A professional site for a job consultancy: openings with salary ranges, candidate stories, and applications.",
    built: "What Yantram built: job listings, application flow over WhatsApp, and trust-building reviews.",
    highlights: "Highlights: salary-first listings, one-tap apply. Concept demo, not a client engagement.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop",
    href: "https://jobconsultancy.yerni.online",
    linkHover: "hover:text-emerald-700",
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
          <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#4F4A43]">Live demos of real small-business websites we build — open one, then ask us for the same for your business.</p>
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
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-[14px] font-semibold text-[#161412] transition-colors ${w.linkHover}`}
                  >
                      <span>View live demo</span>
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
