import { useEffect, useId, useRef, useState } from "react";
import { nav } from "../data/content.js";
import {
  bookingHref,
  bookingIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";

const brandName = "Creative Crew";

// Match the exact filename shown in public/images (capital N).
const logoBase = import.meta.env.BASE_URL || "/";
const brandImage = `${logoBase.endsWith("/") ? logoBase : `${logoBase}/`}images/${encodeURIComponent("Neeraj.12.webp")}`;

const headerStyles = `
  .premium-header,
  .premium-header *,
  .premium-header *::before,
  .premium-header *::after {
    box-sizing: border-box;
  }

  .premium-header {
    --header-height: 80px;
    --scroll-progress: 0;
    position: sticky;
    top: 0;
    z-index: 50;
    isolation: isolate;
    border-bottom: 1px solid rgba(75,38,106,.06);
    background:
      radial-gradient(ellipse at 0% 0%, rgba(255,222,133,.16), transparent 45%),
      radial-gradient(ellipse at 100% 0%, rgba(196,158,224,.14), transparent 45%),
      rgba(255,250,245,.78);
    -webkit-backdrop-filter: blur(22px) saturate(1.4);
    backdrop-filter: blur(22px) saturate(1.4);
    transition:
      background-color .35s ease,
      border-color .35s ease,
      box-shadow .35s ease;
  }
  .premium-header.is-scrolled,
  .premium-header.is-open {
    background:
      radial-gradient(ellipse at 0% 0%, rgba(255,222,133,.14), transparent 45%),
      radial-gradient(ellipse at 100% 0%, rgba(196,158,224,.12), transparent 45%),
      rgba(255,250,245,.94);
    border-bottom-color: rgba(75,38,106,.12);
    box-shadow: 0 10px 34px rgba(75,38,106,.09), 0 1px 0 rgba(255,255,255,.9) inset;
  }

  /* Scroll progress line */
  .premium-header .header-progress {
    position: absolute;
    right: 0;
    bottom: -1px;
    left: 0;
    z-index: 4;
    height: 3px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity .3s ease;
  }
  .premium-header.is-scrolled .header-progress { opacity: 1; }
  .premium-header .header-progress::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 0 4px 4px 0;
    background: linear-gradient(90deg, #4b266a, #744494 45%, #ef896b 80%, #ffd45b);
    transform: scaleX(var(--scroll-progress));
    transform-origin: left;
    will-change: transform;
    box-shadow: 0 0 10px rgba(239,137,107,.55);
  }

  .premium-header .header-row {
    position: relative;
    z-index: 3;
    display: flex;
    height: var(--header-height);
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .premium-header .header-brand {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    text-decoration: none;
    border-radius: 14px;
    -webkit-tap-highlight-color: transparent;
  }

  /* 3D brand mark */
  .brand-mark-icon {
    position: relative;
    display: grid;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 14px;
    background: linear-gradient(145deg, #754792, #4b266a 70%);
    box-shadow:
      0 4px 0 #341947,
      0 9px 18px rgba(75,38,106,.2),
      inset 0 1px 1px rgba(255,255,255,.35);
    transition:
      transform .3s ease,
      box-shadow .3s ease;
  }
  .brand-mark-icon::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      transparent 20%,
      rgba(255,255,255,.2) 48%,
      transparent 75%
    );
    transform: translateX(-120%);
    transition: transform .65s ease;
  }
  .brand-mark-icon svg {
    position: relative;
    transition: transform .3s ease;
  }

  .premium-header .header-desktop {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
  }

  /* Desktop links */
  .premium-header .header-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;
    border-radius: 13px;
    color: #30203f;
    font-size: 14px;
    font-weight: 650;
    white-space: nowrap;
    text-decoration: none;
    transition: color .25s ease, background-color .25s ease, transform .25s ease;
  }
  .premium-header .header-link::after {
    content: "";
    position: absolute;
    right: 15px;
    bottom: 6px;
    left: 15px;
    height: 2px;
    border-radius: 10px;
    background: linear-gradient(90deg, #4b266a, #ef896b);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s cubic-bezier(.22,1,.36,1);
  }
  .premium-header .header-link.is-active {
    color: #4b266a;
    background: linear-gradient(145deg, rgba(255,255,255,.9), rgba(244,234,250,.8));
    box-shadow: 0 3px 0 rgba(75,38,106,.08), inset 0 1px 0 #fff;
  }
  .premium-header .header-link.is-active::after { transform: scaleX(1); }

  /* CTA */
  .premium-header .header-booking { margin-left: 12px; position: relative; }
  .premium-header .header-booking::before {
    content: "";
    position: absolute;
    inset: 6px 4px -4px;
    z-index: -1;
    border-radius: 16px;
    background: rgba(239,137,107,.38);
    filter: blur(14px);
    opacity: .55;
    animation: phGlow 3.2s ease-in-out infinite;
    pointer-events: none;
  }
  .premium-header .header-booking a,
  .premium-header .header-booking button {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    box-shadow:
      0 3px 0 rgba(52,25,71,.9),
      0 9px 20px rgba(75,38,106,.15);
    transition: transform .25s ease, box-shadow .25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .premium-header .header-booking a::after,
  .premium-header .header-booking button::after {
    content: "";
    position: absolute;
    top: -40%;
    bottom: -40%;
    left: -35%;
    z-index: -1;
    width: 26%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.42), transparent);
    transform: translateX(-130%) skewX(-18deg);
    animation: phShine 4.8s ease-in-out 1.4s infinite;
    pointer-events: none;
  }
  .premium-header .header-booking a:active,
  .premium-header .header-booking button:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 rgba(52,25,71,.9), 0 4px 10px rgba(75,38,106,.15);
  }

  /* Mobile toggle */
  .premium-header .header-toggle {
    position: relative;
    display: none;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(75,38,106,.14);
    border-radius: 14px;
    background: linear-gradient(145deg, #fff, #f7f0fb);
    color: #4b266a;
    cursor: pointer;
    box-shadow:
      0 3px 0 rgba(75,38,106,.1),
      0 8px 16px rgba(75,38,106,.08),
      inset 0 1px 0 #fff;
    transition: background-color .25s ease, transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .premium-header.is-open .header-toggle {
    border-color: rgba(239,137,107,.45);
    background: linear-gradient(145deg, #fff, #fff1e8);
    box-shadow: 0 3px 0 rgba(239,137,107,.25), 0 8px 16px rgba(239,137,107,.14), inset 0 1px 0 #fff;
  }
  .premium-header .toggle-lines {
    position: relative;
    display: block;
    width: 20px;
    height: 16px;
  }
  .premium-header .toggle-line {
    position: absolute;
    left: 0;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 5px;
    background: currentColor;
    transition:
      top .3s ease,
      width .3s ease,
      opacity .2s ease,
      transform .3s ease;
  }
  .premium-header .toggle-line:nth-child(1) { top: 0; }
  .premium-header .toggle-line:nth-child(2) { top: 7px; width: 14px; }
  .premium-header .toggle-line:nth-child(3) { top: 14px; }
  .premium-header.is-open .toggle-line:nth-child(1) {
    top: 7px;
    transform: rotate(45deg);
  }
  .premium-header.is-open .toggle-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(.3);
  }
  .premium-header.is-open .toggle-line:nth-child(3) {
    top: 7px;
    transform: rotate(-45deg);
  }

  /* Animated mobile panel */
  .premium-header .header-mobile {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 2;
    display: none;
    grid-template-rows: 0fr;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition:
      grid-template-rows .4s cubic-bezier(.22,1,.36,1),
      opacity .25s ease,
      visibility .4s;
  }
  .premium-header.is-open .header-mobile {
    grid-template-rows: 1fr;
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  .premium-header .mobile-clip {
    min-height: 0;
    overflow: hidden;
  }
  .premium-header .mobile-surface {
    border-top: 1px solid rgba(75,38,106,.08);
    border-bottom: 1px solid rgba(75,38,106,.12);
    border-radius: 0 0 26px 26px;
    background:
      radial-gradient(ellipse at top right, rgba(255,222,133,.2), transparent 62%),
      radial-gradient(ellipse at bottom left, rgba(196,158,224,.16), transparent 62%),
      #fffaf5;
    box-shadow: 0 24px 40px rgba(75,38,106,.14);
  }
  .premium-header .mobile-nav {
    display: flex;
    max-height: calc(100dvh - var(--header-height) - 16px);
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding-top: 16px;
    padding-bottom: max(22px, env(safe-area-inset-bottom));
  }
  .premium-header .mobile-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid rgba(75,38,106,.07);
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(255,255,255,.95), rgba(250,243,252,.8));
    color: #30203f;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 3px 0 rgba(75,38,106,.05), inset 0 1px 0 #fff;
    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity .4s ease,
      transform .45s cubic-bezier(.22,1,.36,1),
      background-color .25s ease,
      border-color .25s ease,
      box-shadow .25s ease;
    transition-delay: 0s;
    -webkit-tap-highlight-color: transparent;
  }
  .premium-header.is-open .mobile-link {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--i, 0) * 55ms + 90ms);
  }
  .premium-header .mobile-link:active {
    transform: scale(.985);
    transition-delay: 0s;
  }
  .premium-header .mobile-link .mobile-index {
    display: grid;
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid #f1d0bc;
    border-radius: 10px;
    background: linear-gradient(145deg, #fff, #ffe2d0);
    color: #ce6b47;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .02em;
    box-shadow: 0 2px 0 #deb099, inset 0 1px 0 #fff;
  }
  .premium-header .mobile-link .mobile-label { flex: 1 1 auto; min-width: 0; overflow-wrap: anywhere; }
  .premium-header .mobile-link svg {
    flex-shrink: 0;
    color: #8c709d;
    transition: transform .3s ease, color .3s ease;
  }
  .premium-header .mobile-link.is-active {
    border-color: rgba(75,38,106,.18);
    background: linear-gradient(145deg, #fff, #f4eafa);
    color: #4b266a;
    box-shadow: 0 3px 0 rgba(75,38,106,.1), inset 0 1px 0 #fff;
  }
  .premium-header .mobile-link.is-active svg { color: #ef896b; transform: translateX(3px); }

  .premium-header .mobile-booking {
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid rgba(75,38,106,.1);
    opacity: 0;
    transform: translateY(14px);
    transition: opacity .4s ease, transform .45s cubic-bezier(.22,1,.36,1);
  }
  .premium-header.is-open .mobile-booking {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--count, 4) * 55ms + 140ms);
  }
  .premium-header .mobile-booking a,
  .premium-header .mobile-booking button {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    width: 100%;
    min-height: 54px;
    white-space: normal;
    text-align: center;
    box-shadow: 0 4px 0 rgba(52,25,71,.9), 0 12px 24px rgba(75,38,106,.18);
    -webkit-tap-highlight-color: transparent;
  }
  .premium-header .mobile-booking a::after,
  .premium-header .mobile-booking button::after {
    content: "";
    position: absolute;
    top: -40%;
    bottom: -40%;
    left: -35%;
    z-index: -1;
    width: 22%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent);
    transform: translateX(-130%) skewX(-18deg);
    animation: phShine 4.8s ease-in-out 1.4s infinite;
    pointer-events: none;
  }

  .premium-header .header-backdrop {
    position: fixed;
    top: var(--header-height);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    border: 0;
    padding: 0;
    background: rgba(43,25,54,.28);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity .35s ease, visibility .35s;
  }
  .premium-header.is-open .header-backdrop {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .premium-header a:focus-visible,
  .premium-header button:focus-visible {
    outline: 3px solid #d8b8e9;
    outline-offset: 4px;
  }

  @keyframes phShine {
    0%, 55% { transform: translateX(-130%) skewX(-18deg); }
    100% { transform: translateX(760%) skewX(-18deg); }
  }
  @keyframes phGlow {
    0%, 100% { opacity: .35; }
    50% { opacity: .7; }
  }
  @keyframes phRing {
    0% { transform: scale(1); opacity: .5; }
    80%, 100% { transform: scale(1.35); opacity: 0; }
  }
  @keyframes phDrop {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .premium-header .header-brand,
  .premium-header .header-desktop,
  .premium-header .header-toggle {
    animation: phDrop .7s cubic-bezier(.22,1,.36,1) both;
  }
  .premium-header .header-desktop { animation-delay: .08s; }
  .premium-header .header-toggle { animation-delay: .08s; }

  @media (hover: hover) and (pointer: fine) {
    .premium-header .header-brand:hover .brand-mark-icon {
      transform: translateY(-2px) rotate(-3deg);
      box-shadow:
        0 6px 0 #341947,
        0 12px 22px rgba(75,38,106,.23);
    }
    .premium-header .header-brand:hover .brand-mark-icon::before {
      transform: translateX(120%);
    }
    .premium-header .header-brand:hover .brand-mark-icon svg {
      transform: translate(1px,-1px);
    }
    .premium-header .header-link:hover {
      background: rgba(75,38,106,.05);
      color: #754792;
      transform: translateY(-1px);
    }
    .premium-header .header-link:hover::after {
      transform: scaleX(1);
    }
    .premium-header .header-booking a:hover,
    .premium-header .header-booking button:hover {
      transform: translateY(-2px);
      box-shadow:
        0 5px 0 rgba(52,25,71,.9),
        0 14px 26px rgba(75,38,106,.22);
    }
    .premium-header .header-toggle:hover { transform: translateY(-1px); }
    .premium-header .mobile-link:hover {
      border-color: rgba(75,38,106,.14);
      background: linear-gradient(145deg, #fff, #f7eefb);
    }
    .premium-header .mobile-link:hover svg { transform: translateX(3px); color: #ef896b; }
  }
  .premium-header .header-toggle:active {
    transform: translateY(2px);
  }

  @media (max-width: 1023px) {
    .premium-header {
      --header-height: 72px;
    }
    .premium-header .header-desktop {
      display: none;
    }
    .premium-header .header-toggle {
      display: inline-flex;
    }
    .premium-header .header-mobile {
      display: grid;
    }
    .premium-header .header-backdrop {
      display: block;
    }
  }
  @media (max-width: 480px) {
    .premium-header {
      --header-height: 68px;
    }
    .premium-header .header-row {
      gap: 12px;
    }
    .premium-header .header-brand .brand-mark-icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
    }
    .premium-header .header-brand .brand-name {
      font-size: 15px;
      line-height: 1.25;
    }
    .premium-header .header-brand .brand-mark {
      gap: 10px;
    }
    .premium-header .header-toggle {
      width: 42px;
      height: 42px;
      border-radius: 13px;
    }
    .premium-header .mobile-link { padding: 12px 14px; font-size: 15px; border-radius: 15px; }
    .premium-header .mobile-surface { border-radius: 0 0 22px 22px; }
  }

  /* Dark violet backing keeps the transparent logo visible. */
  .brand-mark-icon.brand-mark-photo,
  .premium-header .header-brand .brand-mark-icon.brand-mark-photo {
    padding: 6px;
    border: 0;
    border-radius: 12px;
    background: #341947;
    box-shadow: 0 4px 12px rgba(52,25,71,.16);
    overflow: visible;
  }
  .brand-mark-icon.brand-mark-photo::before { content: none; }
  .brand-mark-icon.brand-mark-photo::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid rgba(239,137,107,.6);
    animation: phRing 3.4s ease-out infinite;
    pointer-events: none;
  }
  .brand-logo-image { display: block; width: 100%; height: 100%; object-fit: contain; background: transparent; border: 0; border-radius: 0; box-shadow: none; }
  .premium-header .header-brand { flex-shrink: 1; }
  .premium-header .brand-mark { min-width: 0; }
  .premium-header .brand-name { overflow-wrap: anywhere; }
  .premium-header .container-x { width: min(100%, 1200px); margin-inline: auto; padding-inline: clamp(16px, 4vw, 40px); }
  @media (hover: hover) and (pointer: fine) {
    .premium-header .header-brand:hover .brand-mark-icon.brand-mark-photo { transform: translateY(-2px) rotate(-3deg); background: #341947; box-shadow: 0 6px 0 #25103a, 0 12px 22px rgba(52,25,71,.25); }
  }
  @media (max-width: 359px) {
    .premium-header .header-row { gap: 10px; }
    .premium-header .brand-name { font-size: 14px; }
    .premium-header .header-brand .brand-mark { gap: 8px; }
    .premium-header .mobile-link .mobile-index { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .premium-header *,
    .premium-header *::before,
    .premium-header *::after {
      animation: none !important;
      transition: none !important;
    }
    .premium-header .mobile-link,
    .premium-header .mobile-booking { opacity: 1; transform: none; }
    .premium-header .header-brand:hover .brand-mark-icon,
    .premium-header .header-brand:hover .brand-mark-icon svg,
    .premium-header .header-brand:hover .brand-mark-photo,
    .premium-header .header-booking a:hover,
    .premium-header .header-booking button:hover {
      transform: none;
    }
    .premium-header .header-booking::before,
    .premium-header .header-booking a::after,
    .premium-header .header-booking button::after,
    .premium-header .mobile-booking a::after,
    .premium-header .mobile-booking button::after,
    .brand-mark-icon.brand-mark-photo::after { display: none; }
  }
`;

export function BrandMark({ light = false }) {
  return (
    <span className="brand-mark inline-flex min-w-0 items-center gap-3">
      <span className="brand-mark-icon brand-mark-photo" aria-hidden="true">
        <img
          src={brandImage}
          alt=""
          width={44}
          height={44}
          decoding="async"
          className="brand-logo-image"
        />
      </span>
      <span
        className={`brand-name min-w-0 break-words font-display text-lg font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {brandName}
      </span>
    </span>
  );
}

function MenuArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const menuId = useId();

  const closeMenu = () => setOpen(false);

  // Scrolled state + scroll progress line (no re-render per frame).
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      headerRef.current?.style.setProperty("--scroll-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const targets = nav
      .map((item) => {
        if (!item.href || !item.href.startsWith("#") || item.href.length < 2) return null;
        const el = document.getElementById(item.href.slice(1));
        return el ? { href: item.href, el } : null;
      })
      .filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((target) => target.el === entry.target);
          if (match) setActiveHref(match.href);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target.el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = (event) => {
      if (event.matches) setOpen(false);
    };
    desktopQuery.addEventListener("change", onBreakpointChange);
    return () => {
      desktopQuery.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    // Close the disclosure when keyboard focus leaves the header.
    const onFocusIn = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`premium-header ${
        scrolled ? "is-scrolled" : ""
      } ${open ? "is-open" : ""}`}
      style={{ "--count": nav.length }}
    >
      <style>{headerStyles}</style>

      <div className="container-x header-row">
        {/* Logo */}
        <a
          href="#top"
          className="header-brand"
          aria-label={`${brandName} home`}
          onClick={closeMenu}
        >
          <BrandMark />
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="header-desktop"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`header-link ${activeHref === item.href ? "is-active" : ""}`}
              aria-current={activeHref === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}

          <div className="header-booking">
            <Button
              href={bookingHref}
              external={bookingIsExternal}
              className="!min-h-[46px] !rounded-[14px] !px-5 !py-2.5 !text-sm"
            >
              Book a Strategy Call
            </Button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          type="button"
          className="header-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" className="toggle-lines">
            <span className="toggle-line" />
            <span className="toggle-line" />
            <span className="toggle-line" />
          </span>
        </button>
      </div>

      {/* Scroll progress */}
      <span aria-hidden="true" className="header-progress" />

      {/* Tap outside to close */}
      <div
        aria-hidden="true"
        className="header-backdrop"
        onClick={closeMenu}
      />

      {/* Mobile navigation */}
      <div
        id={menuId}
        className="header-mobile"
        aria-hidden={!open}
        inert={!open ? "" : undefined}
      >
        <div className="mobile-clip">
          <div className="mobile-surface">
            <nav
              aria-label="Mobile navigation"
              className="container-x mobile-nav"
            >
              {nav.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`mobile-link ${activeHref === item.href ? "is-active" : ""}`}
                  style={{ "--i": index }}
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                >
                  <span className="mobile-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mobile-label">{item.label}</span>
                  <MenuArrow />
                </a>
              ))}

              <div
                className="mobile-booking"
                onClickCapture={(event) => {
                  if (event.target.closest("a, button")) {
                    closeMenu();
                  }
                }}
              >
                <Button
                  href={bookingHref}
                  external={bookingIsExternal}
                  className="!rounded-[14px] !text-sm"
                  onClick={closeMenu}
                >
                  Book a Strategy Call
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}