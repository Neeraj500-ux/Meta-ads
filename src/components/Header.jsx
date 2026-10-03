import { useEffect, useId, useRef, useState } from "react";
import { nav } from "../data/content.js";
import {
  site,
  bookingHref,
  bookingIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";

const headerStyles = `
  .premium-header,
  .premium-header *,
  .premium-header *::before,
  .premium-header *::after {
    box-sizing: border-box;
  }

  .premium-header {
    --header-height: 80px;
    position: sticky;
    top: 0;
    z-index: 50;
    isolation: isolate;
    border-bottom: 1px solid rgba(75,38,106,.06);
    background: rgba(255,250,245,.82);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transition:
      background-color .35s ease,
      border-color .35s ease,
      box-shadow .35s ease;
  }

  .premium-header.is-scrolled,
  .premium-header.is-open {
    background: rgba(255,250,245,.95);
    border-bottom-color: rgba(75,38,106,.12);
    box-shadow: 0 8px 28px rgba(75,38,106,.07);
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
    gap: 8px;
  }

  .premium-header .header-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 14px;
    border-radius: 12px;
    color: #30203f;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    text-decoration: none;
    transition: color .25s ease, background-color .25s ease;
  }

  .premium-header .header-link::after {
    content: "";
    position: absolute;
    right: 14px;
    bottom: 6px;
    left: 14px;
    height: 2px;
    border-radius: 10px;
    background: linear-gradient(90deg, #4b266a, #ef896b);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .3s cubic-bezier(.22,1,.36,1);
  }

  .premium-header .header-booking {
    margin-left: 12px;
  }

  .premium-header .header-booking a,
  .premium-header .header-booking button {
    box-shadow:
      0 3px 0 rgba(52,25,71,.9),
      0 9px 20px rgba(75,38,106,.15);
    transition: transform .25s ease, box-shadow .25s ease;
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
      0 3px 0 rgba(75,38,106,.08),
      inset 0 1px 0 #fff;
    transition: background-color .25s ease, transform .25s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
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
      opacity .2s ease,
      transform .3s ease;
  }

  .premium-header .toggle-line:nth-child(1) { top: 0; }
  .premium-header .toggle-line:nth-child(2) { top: 7px; }
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
      grid-template-rows .35s cubic-bezier(.22,1,.36,1),
      opacity .25s ease,
      visibility .35s;
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
    background:
      radial-gradient(ellipse at top right, rgba(255,222,133,.16), transparent 65%),
      #fffaf5;
    box-shadow: 0 20px 35px rgba(75,38,106,.1);
  }

  .premium-header .mobile-nav {
    display: flex;
    max-height: calc(100dvh - var(--header-height) - 16px);
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-top: 16px;
    padding-bottom: max(22px, env(safe-area-inset-bottom));
  }

  .premium-header .mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 15px 16px;
    border: 1px solid transparent;
    border-radius: 14px;
    color: #30203f;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color .25s ease, border-color .25s ease;
  }

  .premium-header .mobile-link svg {
    flex-shrink: 0;
    color: #8c709d;
  }

  .premium-header .mobile-booking {
    margin-top: 10px;
    padding-top: 16px;
    border-top: 1px solid rgba(75,38,106,.1);
  }

  .premium-header .mobile-booking a,
  .premium-header .mobile-booking button {
    width: 100%;
    min-height: 54px;
    white-space: normal;
    text-align: center;
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
    background: rgba(43,25,54,.2);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity .3s ease, visibility .3s;
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
      background: rgba(75,38,106,.04);
      color: #754792;
    }

    .premium-header .header-link:hover::after {
      transform: scaleX(1);
    }

    .premium-header .header-booking a:hover,
    .premium-header .header-booking button:hover {
      transform: translateY(-2px);
      box-shadow:
        0 5px 0 rgba(52,25,71,.9),
        0 12px 24px rgba(75,38,106,.2);
    }

    .premium-header .mobile-link:hover {
      border-color: rgba(75,38,106,.08);
      background: rgba(75,38,106,.045);
    }
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
  }

  @media (prefers-reduced-motion: reduce) {
    .premium-header *,
    .premium-header *::before,
    .premium-header *::after {
      animation: none !important;
      transition: none !important;
    }

    .premium-header .header-brand:hover .brand-mark-icon,
    .premium-header .header-brand:hover .brand-mark-icon svg,
    .premium-header .header-booking a:hover,
    .premium-header .header-booking button:hover {
      transform: none;
    }
  }
`;

export function BrandMark({ light = false }) {
  return (
    <span className="brand-mark inline-flex min-w-0 items-center gap-3">
      <span className="brand-mark-icon">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-sun-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18 18 6M8 6h10v10" />
        </svg>
      </span>

      <span
        className={`brand-name min-w-0 break-words font-display text-lg font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {site.brandName}
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

  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const menuId = useId();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
    >
      <style>{headerStyles}</style>

      <div className="container-x header-row">
        {/* Logo */}
        <a
          href="#top"
          className="header-brand"
          aria-label={`${site.brandName} home`}
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
              className="header-link"
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
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-link"
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
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