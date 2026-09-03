"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import LogoImage from "@/components/LogoImage";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#selected-works");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy — highlight the nav link for the section in view
  useEffect(() => {
    const sections = NAV.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-[#161412] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lg ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="material-symbols-outlined text-xl">arrow_upward</span>
      </button>

      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-stone-200 bg-[#FBF9F6]/95 shadow-[0_4px_20px_rgba(22,20,18,0.06)]"
            : "border-stone-200/80 bg-[#FBF9F6]/85"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-14">
          <a href="#" className="group flex items-center gap-4" onClick={() => setMenuOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <LogoImage src="/apple-touch-icon.png" alt="Yantram Studio logo" size="h-7 w-7" priority />
            </div>
            <span className="font-display text-[20px] font-bold uppercase tracking-wider text-[#161412]">Yantram</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`pb-0.5 text-[14px] transition-colors duration-200 ${
                  active === l.href
                    ? "border-b-2 border-[#161412] font-bold text-[#161412]"
                    : "font-semibold text-[#4F4A43] hover:text-[#161412]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact-studio" className="hidden items-center gap-2 rounded-full bg-[#161412] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(22,20,18,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_6px_24px_rgba(22,20,18,0.2)] sm:inline-flex">
              <span>Start a Project</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-[#161412] shadow-sm transition-colors hover:border-stone-300 lg:hidden"
            >
              <span className="material-symbols-outlined text-[22px]">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
        {/* mobile menu */}
        {menuOpen && (
          <nav
            className="border-t border-stone-200/80 bg-[#FBF9F6]/95 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between border-b border-stone-200/60 py-3.5 text-[15px] transition-colors ${
                  active === l.href ? "font-bold text-[#161412]" : "font-medium text-[#4F4A43]"
                }`}
              >
                <span>{l.label}</span>
                <span className="material-symbols-outlined text-[18px] text-stone-400">arrow_forward</span>
              </a>
            ))}
            <a
              href="#contact-studio"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#161412] px-6 py-3 text-[14px] font-semibold text-white sm:hidden"
            >
              <span>Start a Project</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
