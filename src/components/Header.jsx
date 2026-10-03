import { useEffect, useState } from "react";
import { nav } from "../data/content.js";
import { site, bookingHref, bookingIsExternal } from "../config/site.js";
import { Button } from "./ui.jsx";

export function BrandMark({ light = false }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-plum-800 to-plum-600 shadow-[0_8px_18px_-8px_rgba(75,38,106,.8)] ring-1 ring-white/20">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-sun-400" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18 18 6M8 6h10v10" />
        </svg>
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>{site.brandName}</span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b transition duration-300 ${scrolled || open ? "border-plum-200/70 bg-cream/90 shadow-[0_10px_30px_-20px_rgba(75,38,106,.4)] backdrop-blur-xl" : "border-transparent bg-cream/70 backdrop-blur-md"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="#top" aria-label={`${site.brandName} home`} onClick={() => setOpen(false)}>
          <BrandMark />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="group relative py-2 text-sm font-semibold text-ink">
              {n.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-gradient-to-r from-plum-700 to-coral-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <Button href={bookingHref} external={bookingIsExternal} className="!min-h-[46px] !px-5 !py-2.5 !text-sm">Book a Strategy Call</Button>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-plum-200 bg-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-plum-700 transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-plum-700 transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-plum-200/70 bg-cream lg:hidden">
        <nav aria-label="Mobile navigation" className="container-x flex max-h-[calc(100dvh-72px)] flex-col gap-1 overflow-y-auto py-4">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3.5 text-base font-semibold text-ink hover:bg-plum-50">
              {n.label}
            </a>
          ))}
          <Button href={bookingHref} external={bookingIsExternal} className="mt-3" onClick={() => setOpen(false)}>Book a Strategy Call</Button>
        </nav>
      </div>
    </header>
  );
}
