// Complete replacement for src/components/Sections2.jsx.
// Keep your existing content.js, ui.jsx, site.js and Tailwind theme.
// Same palette (plum / coral / sun). New: cursor spotlight, animated gradient
// borders, floating glow orbs, shimmer headings, ken-burns images, sheen sweeps.
import { useEffect, useRef, useState } from "react";
import {
  audiences,
  processDetails,
  reportMeasures,
  testimonials,
  featuredCampaign,
} from "../data/content.js";
import { Reveal, SectionHead, SectionCta } from "./ui.jsx";
import { bookingHref, bookingIsExternal } from "../config/site.js";

const sectionStyles = `
  .edu-sections {
    --edu-plum: #4b2467;
    --edu-coral: #ff7c53;
    --edu-sun: #f8cc62;
    --edu-ink: #30223e;
    --edu-muted: #776982;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding-block: clamp(52px, 7vw, 104px);
    color: var(--edu-ink);
    scroll-margin-top: 90px;
  }
  .edu-sections, .edu-sections *, .edu-sections *::before, .edu-sections *::after { box-sizing: border-box; }
  .edu-sections .container-x {
    position: relative;
    z-index: 1;
    width: min(100%, 1180px);
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 36px);
    min-width: 0;
  }

  /* ---------- Ambient background: aurora, orbs, dots ---------- */
  .edu-sections::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background:
      radial-gradient(560px 360px at 0% 0%, rgba(255,222,133,.38), transparent 70%),
      radial-gradient(620px 420px at 100% 100%, rgba(196,158,224,.36), transparent 70%),
      radial-gradient(420px 280px at 100% 0%, rgba(255,124,83,.12), transparent 70%);
  }
  .edu-sections::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: .5;
    background-image: radial-gradient(rgba(75,36,103,.11) 1px, transparent 1.4px);
    background-size: 26px 26px;
    -webkit-mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
    mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
  }
  .edu-orb {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    will-change: transform;
  }
  .edu-orb--a { top: 6%; left: -90px; width: 280px; height: 280px; background: rgba(255,124,83,.22); animation: eduFloat 14s ease-in-out infinite; }
  .edu-orb--b { bottom: 4%; right: -100px; width: 320px; height: 320px; background: rgba(120,70,160,.22); animation: eduFloat 17s ease-in-out -6s infinite reverse; }
  @keyframes eduFloat {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(40px,-36px,0) scale(1.12); }
  }

  /* ---------- Typography ---------- */
  .edu-sections h2 {
    font-size: clamp(27px, 3.5vw, 46px);
    line-height: 1.16;
    letter-spacing: -.028em;
    font-weight: 800;
    text-wrap: balance;
    background: linear-gradient(110deg, #30223e 0%, #4b2467 38%, #c75d37 52%, #4b2467 66%, #30223e 100%);
    background-size: 240% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: eduHeadShimmer 9s ease-in-out infinite;
  }
  @keyframes eduHeadShimmer { 0%, 100% { background-position: 100% 0; } 50% { background-position: 0 0; } }
  .edu-sections h3 { line-height: 1.35; text-wrap: balance; color: var(--edu-ink); font-weight: 800; }
  .edu-sections p, .edu-sections dd, .edu-sections blockquote { line-height: 1.75; overflow-wrap: anywhere; }
  .edu-sections p, .edu-sections dd { color: var(--edu-muted); }
  .edu-sections h2, .edu-sections h3, .edu-sections dt { overflow-wrap: anywhere; }
  .edu-sections .grid > *, .edu-sections figure, .edu-sections blockquote, .edu-sections dl { min-width: 0; }
  .edu-sections figure, .edu-sections blockquote, .edu-sections dd { margin-inline: 0; }
  .edu-sections img { max-width: 100%; }
  .edu-sections a { max-width: 100%; white-space: normal; overflow-wrap: anywhere; text-align: center; }
  .edu-sections a:focus-visible { outline: 3px solid #ff7c53; outline-offset: 5px; }

  .edu-sections .edu-audience-promise {
    max-width: 780px;
    margin: clamp(22px, 3vw, 32px) auto 0;
    color: #4b266a;
    font-size: clamp(16px, 2.1vw, 25px);
    font-weight: 750;
    line-height: 1.5;
    letter-spacing: -.015em;
    text-align: center;
    text-wrap: balance;
  }
  @media (max-width: 767px) { .edu-sections .edu-audience-promise { font-size: clamp(15px, 3.7vw, 19px); } }

  /* ---------- Premium card: 3D edge + gradient border + spotlight ---------- */
  .edu-sections .card, .edu-sections .edu-audience-card {
    --mx: 50%;
    --my: 0%;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-width: 0;
    height: 100%;
    padding: clamp(22px, 2.6vw, 32px);
    border: 1px solid #e3cdee;
    border-radius: 26px;
    background: linear-gradient(145deg, #fff, #fcf8ff);
    box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(222,200,235,.55), 0 22px 44px -26px rgba(75,36,103,.4);
    transition: transform .45s cubic-bezier(.22,1,.36,1), border-color .3s ease, box-shadow .4s ease;
  }
  .edu-sections .edu-audience-card { padding: 0; border-radius: 28px; display: flex; flex-direction: column; }
  /* spotlight that follows the cursor */
  .edu-sections .card::before, .edu-sections .edu-audience-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(360px circle at var(--mx) var(--my), rgba(255,124,83,.16), rgba(196,158,224,.14) 40%, transparent 70%);
    transition: opacity .35s ease;
  }
  /* top accent line that fills on hover */
  .edu-sections .card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 4px;
    background: linear-gradient(90deg, #4b2467, #ff7c53 65%, #f8cc62);
    transform: scaleX(.22);
    transform-origin: left;
    transition: transform .6s cubic-bezier(.22,1,.36,1);
    pointer-events: none;
  }
  .edu-sections .card > *, .edu-sections .edu-audience-card > * { position: relative; z-index: 1; }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .card:hover, .edu-sections .edu-audience-card:hover {
      transform: translateY(-8px);
      border-color: #c9a5dc;
      box-shadow: inset 0 1px 0 #fff, 0 8px 0 rgba(222,200,235,.6), 0 34px 56px -24px rgba(75,36,103,.5);
    }
    .edu-sections .card:hover::before, .edu-sections .edu-audience-card:hover::before { opacity: 1; }
    .edu-sections .card:hover::after { transform: scaleX(1); }
  }
  @media (hover: none) { .edu-sections .card::after { transform: scaleX(1); } }

  /* ---------- CTA ---------- */
  .edu-sections .edu-cta { position: relative; display: flex; justify-content: center; margin-top: clamp(36px, 4.5vw, 60px); }
  .edu-sections .edu-cta > * { margin-top: 0 !important; max-width: 100%; }
  .edu-sections .edu-cta a {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    min-height: 62px;
    padding: 18px 34px;
    border-radius: 18px;
    font-weight: 800;
    box-shadow: 0 5px 0 #3f2059, 0 18px 34px rgba(116,68,148,.3);
    transition: transform .3s ease, box-shadow .3s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .edu-sections .edu-cta a::after {
    content: "";
    position: absolute;
    top: -40%;
    bottom: -40%;
    left: -30%;
    z-index: -1;
    width: 22%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
    transform: translateX(-130%) skewX(-18deg);
    animation: eduShine 4.2s ease-in-out 1s infinite;
    pointer-events: none;
  }
  .edu-sections .edu-cta::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
    width: min(440px, 80%);
    height: 64px;
    transform: translate(-50%, -50%);
    border-radius: 22px;
    background: rgba(255,124,83,.4);
    filter: blur(26px);
    animation: eduGlow 3.2s ease-in-out infinite;
    pointer-events: none;
  }
  .edu-sections .edu-cta a:active { transform: translateY(3px); box-shadow: 0 2px 0 #3f2059, 0 8px 16px rgba(116,68,148,.25); }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-cta a:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 9px 0 #3f2059, 0 26px 42px rgba(116,68,148,.36); }
  }
  @keyframes eduShine { 0%, 55% { transform: translateX(-130%) skewX(-18deg); } 100% { transform: translateX(760%) skewX(-18deg); } }
  @keyframes eduGlow { 0%, 100% { opacity: .45; } 50% { opacity: .95; } }

  /* ---------- Audience ---------- */
  .edu-sections .edu-audience-grid { margin-top: clamp(30px, 4vw, 48px); gap: clamp(20px, 2.4vw, 30px); }
  .edu-sections .edu-audience-media { position: relative; isolation: isolate; }
  .edu-sections .edu-audience-media::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      linear-gradient(115deg, transparent 38%, rgba(255,255,255,.38) 50%, transparent 62%) no-repeat -160% 0 / 220% 100%,
      linear-gradient(180deg, rgba(75,36,103,0) 45%, rgba(48,25,71,.6));
    transition: background-position .9s ease;
  }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-audience-card:hover .edu-audience-media::after { background-position: 160% 0, 0 0; }
  }
  .edu-sections .edu-audience-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    display: inline-grid;
    place-items: center;
    min-width: 42px;
    height: 42px;
    padding-inline: 10px;
    border: 1px solid rgba(255,255,255,.75);
    border-radius: 14px;
    background: rgba(255,255,255,.8);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: #4b2467;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: .02em;
    box-shadow: 0 4px 0 rgba(75,36,103,.12), 0 10px 20px rgba(48,25,71,.2);
  }
  .edu-sections .edu-audience-copy { position: relative; padding: clamp(22px, 2.6vw, 30px); }
  .edu-sections .edu-audience-copy::before {
    content: "";
    position: absolute;
    top: 0;
    left: clamp(22px, 2.6vw, 30px);
    width: 56px;
    height: 4px;
    border-radius: 0 0 6px 6px;
    background: linear-gradient(90deg, #4b2467, #ff7c53, #f8cc62);
    transition: width .55s cubic-bezier(.22,1,.36,1);
  }
  .edu-sections .edu-audience-copy h3 { font-size: clamp(19px, 1.8vw, 22px); }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-audience-card:hover .edu-audience-copy::before { width: calc(100% - clamp(44px, 5.2vw, 60px)); }
  }
  .edu-image-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
    text-align: center;
    color: #4b2467;
    background: radial-gradient(circle at 25% 25%, #eadbf3, transparent 65%), linear-gradient(135deg, #faf3fb, #fff4df);
  }
  .edu-image-placeholder svg { width: 44px; height: 44px; opacity: .7; }

  /* ---------- Results ---------- */
  .edu-sections .edu-result-card { max-width: 900px; margin-inline: auto; padding: clamp(22px, 4vw, 42px) !important; border-radius: 32px; }
  .edu-sections .edu-result-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
  .edu-sections .edu-result-head h3 { margin: 0; font-size: clamp(20px, 2.4vw, 27px); }
  .edu-sections .edu-result-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 999px;
    background: linear-gradient(120deg, #351d4e, #4b2467);
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    box-shadow: 0 4px 0 #2a1540, 0 10px 18px rgba(75,36,103,.22);
  }
  .edu-sections .edu-result-pill i { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #f8cc62; }
  .edu-sections .edu-result-pill i::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #f8cc62; animation: eduPing 1.8s cubic-bezier(0,0,.2,1) infinite; }
  @keyframes eduPing { 0% { transform: scale(1); opacity: .8; } 80%, 100% { transform: scale(2.8); opacity: 0; } }
  .edu-sections .edu-result-card dl { gap: 14px; margin-top: 26px; }
  .edu-sections .edu-result-item {
    position: relative;
    overflow: hidden;
    min-width: 0;
    padding: clamp(16px, 2vw, 22px);
    border-radius: 20px;
    box-shadow: inset 0 1px 0 #fff, 0 4px 0 rgba(222,200,235,.5);
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }
  .edu-sections .edu-result-item dt { letter-spacing: .01em; }
  .edu-sections .edu-result-key {
    border-color: transparent;
    background: linear-gradient(145deg, #65417f, #4b2467 70%) !important;
    box-shadow: 0 5px 0 #341947, 0 18px 30px -16px rgba(75,36,103,.55);
  }
  .edu-sections .edu-result-key::before {
    content: "";
    position: absolute;
    top: -45%;
    right: -20%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,222,133,.4), transparent 70%);
    animation: eduGlow 4s ease-in-out infinite;
    pointer-events: none;
  }
  .edu-sections .edu-result-key::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,.16) 50%, transparent 65%);
    transform: translateX(-120%);
    animation: eduSweep 5.5s ease-in-out 1.2s infinite;
    pointer-events: none;
  }
  @keyframes eduSweep { 0%, 60% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
  .edu-sections .edu-result-key dt { color: #f8cc62 !important; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; }
  .edu-sections .edu-result-key dd { position: relative; color: #fff !important; font-size: clamp(25px, 3vw, 33px); font-weight: 800; line-height: 1.2; letter-spacing: -.02em; }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-result-item:hover { transform: translateY(-4px); border-color: #d6bde4; box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(222,200,235,.55), 0 18px 30px -16px rgba(75,36,103,.32); }
    .edu-sections .edu-result-key:hover { border-color: transparent; box-shadow: 0 7px 0 #341947, 0 26px 40px -16px rgba(75,36,103,.6); }
  }

  /* ---------- Testimonials ---------- */
  .edu-sections .edu-testimonial { display: flex; flex-direction: column; padding-top: clamp(26px, 3vw, 38px); }
  .edu-sections .edu-quote-icon {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    border: 1px solid #f1d0bc;
    border-radius: 16px;
    background: linear-gradient(145deg, #fff, #ffe2d0);
    color: #ce6b47;
    box-shadow: 0 5px 0 #deb099, inset 0 1px 0 #fff;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }
  .edu-sections .edu-quote-icon svg { width: 22px; height: 22px; }
  .edu-sections .edu-testimonial blockquote { position: relative; color: var(--edu-ink); font-size: clamp(17px, 2vw, 21px); font-weight: 500; }
  .edu-sections .edu-testimonial figcaption { display: flex; align-items: center; gap: 14px; margin-top: auto; padding-top: 22px; color: var(--edu-muted); }
  .edu-sections .edu-testimonial figcaption strong { color: var(--edu-ink); }
  .edu-sections .edu-testimonial .edu-avatar {
    display: grid;
    flex: 0 0 46px;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 15px;
    background: linear-gradient(145deg, #65417f, #4b2467);
    color: #fff;
    font-size: 17px;
    font-weight: 800;
    box-shadow: 0 4px 0 #341947, inset 0 1px 0 rgba(255,255,255,.3);
  }
  .edu-sections .edu-bigquote {
    position: absolute;
    top: -6px;
    right: 22px;
    z-index: 0;
    color: rgba(75,36,103,.08);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 150px;
    line-height: 1;
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-testimonial:hover .edu-quote-icon { transform: rotate(-9deg) scale(1.1); }
  }

  /* ---------- Why choose ---------- */
  .edu-sections .edu-why-grid { margin-top: clamp(30px, 4vw, 48px); gap: clamp(18px, 2.4vw, 26px); counter-reset: why; }
  .edu-sections .edu-why-card { counter-increment: why; padding-top: clamp(26px, 3vw, 36px); }
  .edu-sections .edu-why-card .edu-why-num {
    position: absolute;
    top: 8px;
    right: 22px;
    z-index: 0;
    color: rgba(75,36,103,.08);
    font-size: clamp(56px, 6vw, 80px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -.05em;
    pointer-events: none;
    transition: color .4s ease, transform .5s cubic-bezier(.22,1,.36,1);
  }
  .edu-sections .edu-why-icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    margin-bottom: 20px;
    border: 1px solid #fff;
    border-radius: 18px;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }
  .edu-sections .edu-why-icon svg { width: 26px; height: 26px; }
  .edu-sections .edu-why-icon--plum { color: #4b2467; background: linear-gradient(145deg, #fff, #eadaf5); box-shadow: 0 5px 0 #d9c3e6, inset 0 1px 0 #fff; }
  .edu-sections .edu-why-icon--coral { color: #c75d37; background: linear-gradient(145deg, #fff, #ffe2d0); box-shadow: 0 5px 0 #deb099, inset 0 1px 0 #fff; }
  .edu-sections .edu-why-icon--sun { color: #8a6a1c; background: linear-gradient(145deg, #fff, #ffecb4); box-shadow: 0 5px 0 #d7bf76, inset 0 1px 0 #fff; }
  .edu-sections .edu-why-card h3 { font-size: clamp(18px, 1.8vw, 21px); }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .edu-why-card:hover .edu-why-icon { transform: rotate(-9deg) scale(1.1); }
    .edu-sections .edu-why-card:hover .edu-why-num { color: rgba(255,124,83,.22); transform: translateY(-4px) scale(1.06); }
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 767px) {
    .edu-sections::after { background-size: 22px 22px; opacity: .4; }
    .edu-orb { opacity: .6; }
    .edu-sections .card { border-radius: 22px; }
    .edu-sections .edu-audience-card { border-radius: 24px; }
    .edu-sections .edu-result-card { border-radius: 24px; }
  }
  @media (max-width: 639px) {
    .edu-sections .edu-cta { margin-top: 30px; }
    .edu-sections .edu-cta a { width: 100%; min-height: 56px; padding: 16px 20px; font-size: 16px; }
    .edu-sections .edu-result-head { align-items: flex-start; }
    .edu-sections .edu-testimonial .edu-avatar { flex-basis: 42px; width: 42px; height: 42px; border-radius: 13px; font-size: 15px; }
    .edu-sections .edu-bigquote { font-size: 100px; right: 14px; }
    .edu-sections .edu-quote-icon, .edu-sections .edu-why-icon { width: 46px; height: 46px; border-radius: 15px; margin-bottom: 16px; }
  }
  @media (max-width: 379px) {
    .edu-sections .container-x { padding-inline: 14px; }
    .edu-sections .card { padding: 20px; border-radius: 20px; }
    .edu-sections .edu-audience-badge { top: 10px; left: 10px; min-width: 36px; height: 36px; font-size: 12px; border-radius: 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .edu-sections *, .edu-sections *::before, .edu-sections *::after { animation: none !important; transition: none !important; }
    .edu-sections .group:hover img, .edu-sections .card:hover, .edu-sections .edu-audience-card:hover { transform: none !important; }
    .edu-sections h2 { background: none; -webkit-text-fill-color: currentColor; color: var(--edu-ink); }
  }
`;

// Each export mounts independently. Cursor position feeds a spotlight glow on cards.
function SectionFrame({ className = "", children, ...props }) {
  const handleMove = (event) => {
    if (event.pointerType === "touch") return;
    const card = event.target.closest?.(".card, .edu-audience-card");
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <section {...props} className={`edu-sections ${className}`} onPointerMove={handleMove}>
      <style>{sectionStyles}</style>
      <span className="edu-orb edu-orb--a" aria-hidden="true" />
      <span className="edu-orb edu-orb--b" aria-hidden="true" />
      {children}
    </section>
  );
}

const steps = [
  {
    title: "Strategy Setup",
    text: "We understand your courses, ideal students, target locations and admission goals before building your campaign plan.",
  },
  {
    title: "Admission Funnel & Campaign Setup",
    text: "We create your student enquiry system and launch course-specific Meta Ads designed to attract interested learners.",
  },
  {
    title: "Lead Collection System",
    text: "Students submit their details through a clear enquiry form with qualification questions relevant to your institute.",
  },
  {
    title: "Daily Lead Delivery",
    text: "New enquiries are delivered directly to your team for quick calls, counselling and follow-up.",
  },
  {
    title: "Batch Filling Support",
    text: "We review campaign performance and feedback from your admissions team to refine the system and support your batch-filling goals.",
  },
];

const whyChoose = [
  {
    title: "Specialized in Education Marketing",
    text: "We focus on student lead generation, with campaigns shaped around courses, admission cycles and the decisions learners make.",
  },
  {
    title: "Proven Lead Generation Framework",
    text: "Our framework combines relevant audiences, course-focused messaging and qualification questions to attract students interested in learning a skill.",
  },
  {
    title: "Consistent Lead Flow",
    text: "Keep your courses visible throughout the month, so enquiries do not depend only on referrals or admission season.",
  },
  {
    title: "Complete Done-For-You Service",
    text: "We handle strategy, creatives, campaign management, optimization and reporting, while your team focuses on counselling and admissions.",
  },
];

const audienceTint = [
  "bg-plum-100 text-plum-700",
  "bg-coral-100 text-coral-700",
  "bg-sun-200 text-sun-700",
];

const audienceImages = {
  fashion: {
    files: [
      "Collaborative Indian Fashion Design Studio.png",
      "Collaborative Indian Fashion Design Studio.png.png",
      "fashion-institute.png",
      "fashion-institute.png.png",
    ],
    alt: "Students working in a fashion design studio",
  },
  beauty: {
    files: ["beauty-institute.png.png", "beauty-institute.png"],
    alt: "Beauty and makeup training at an institute",
  },
  skills: {
    files: ["skills-institute.png.png", "skills-institute.png"],
    alt: "Students learning practical skills at an institute",
  },
};

function getImageUrl(filename) {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}images/${encodeURIComponent(filename)}`;
}

function AudienceImage({ image }) {
  const [fileIndex, setFileIndex] = useState(0);
  const filename = image.files[fileIndex];

  if (!filename) {
    return (
      <div className="edu-image-placeholder" role="img" aria-label={image.alt}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="m3 9 9-5 9 5-9 5-9-5Zm4 3v5c3 3 7 3 10 0v-5M21 9v7" />
        </svg>
        <span className="text-sm font-semibold">{image.alt}</span>
      </div>
    );
  }

  return (
    <img
      key={filename}
      src={getImageUrl(filename)}
      alt={image.alt}
      width={480}
      height={320}
      loading="lazy"
      decoding="async"
      onError={() => setFileIndex((current) => current + 1)}
      className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
    />
  );
}

export function Audience() {
  return (
    <SectionFrame className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title="Marketing that reflects the skills you teach." />

        <p className="mx-auto mb-8 max-w-2xl px-2 text-center text-[15px] leading-relaxed text-[#526176] sm:mb-10 sm:text-base">
          Connect with students who want to learn your skills and turn their
          interest into course enquiries.
        </p>

        <div className="edu-audience-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const audienceKey = String(audience.key).trim().toLowerCase();
            const image = audienceImages[audienceKey];

            return (
              <Reveal
                key={audience.key}
                delay={index * 90}
                className="edu-audience-card group min-w-0"
              >
                <div className="edu-audience-media relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-plum-50">
                  {image ? (
                    <AudienceImage key={audienceKey} image={image} />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-5 text-center text-sm font-semibold text-plum-700">
                      {audience.title}
                    </div>
                  )}
                  <span className="edu-audience-badge" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="edu-audience-copy flex flex-1 flex-col">
                  <span
                    className={`inline-block self-start rounded-lg px-2.5 py-1 text-xs font-bold ${
                      audienceTint[index % audienceTint.length]
                    }`}
                  >
                    {audience.label}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">{audience.title}</h3>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed">
                    {audience.text.map((text, textIndex) => (
                      <p key={`${audience.key}-${textIndex}`}>{text}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="edu-audience-promise">
          Get your courses in front of prospective students in the right
          locations, without relying on referrals, walk-ins or unpredictable
          enquiries.
        </Reveal>

        <div className="edu-cta">
          <SectionCta href={bookingHref} external={bookingIsExternal} data-enquiry-popup-trigger>
            Yes, I Want to Fill My Next Batch
          </SectionCta>
        </div>
      </div>
    </SectionFrame>
  );
}

const processStyles = `
  #process.edu-process {
    --ep-plum: #4b2467;
    --ep-coral: #ff7c53;
    --ep-sun: #f8cc62;
    --ep-ink: #30223e;
    --ep-muted: #776982;
    background: linear-gradient(155deg, #fff 0%, #fbf6fd 48%, #fffaf0 100%);
  }
  .ep-timeline {
    --ep-progress: 0;
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 1040px;
    margin: clamp(30px, 4vw, 46px) auto 0;
    padding: 8px 0;
    list-style: none;
  }
  .ep-rail {
    position: absolute;
    z-index: -1;
    top: 38px;
    bottom: 38px;
    left: 50%;
    width: 4px;
    transform: translateX(-50%);
    overflow: hidden;
    border-radius: 10px;
    background: #e8daef;
    pointer-events: none;
  }
  .ep-rail-fill {
    display: block;
    width: 100%;
    height: 100%;
    transform: scaleY(var(--ep-progress));
    transform-origin: top;
    background: linear-gradient(180deg, var(--ep-plum), var(--ep-coral) 65%, var(--ep-sun));
    box-shadow: 0 0 16px rgba(255,124,83,.55);
    transition: transform .25s linear;
  }
  .ep-row {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
    align-items: start;
    gap: 26px;
    min-width: 0;
    padding: 0 0 44px;
  }
  .ep-row:last-child { padding-bottom: 0; }
  .ep-node {
    position: relative;
    z-index: 2;
    grid-column: 2;
    grid-row: 1;
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid #dbc5e7;
    border-radius: 50%;
    background: #fff;
    color: var(--ep-plum);
    font-size: 18px;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 0 0 7px #fbf6fd, 0 8px 18px -10px rgba(75,36,103,.3);
    transition: background .35s ease, color .35s ease, border-color .35s ease, box-shadow .35s ease, transform .4s cubic-bezier(.22,1,.36,1);
  }
  .ep-row.is-reached .ep-node {
    border-color: #fff;
    background: linear-gradient(145deg, #65417f, var(--ep-plum));
    color: #fff;
    box-shadow: 0 0 0 5px #eee1f5, 0 8px 22px -7px rgba(75,36,103,.5);
  }
  .ep-row:nth-child(even).is-reached .ep-node {
    background: linear-gradient(145deg, #ff996e, var(--ep-coral));
    box-shadow: 0 0 0 5px #ffeadf, 0 8px 22px -7px rgba(255,124,83,.45);
  }
  .ep-row.is-current .ep-node { transform: scale(1.12); }
  .ep-row.is-current .ep-node::after {
    content: "";
    position: absolute;
    inset: -8px;
    border: 2px solid rgba(255,124,83,.35);
    border-radius: inherit;
    animation: ep-node-pulse 2.4s ease-out infinite;
    pointer-events: none;
  }
  .ep-card {
    --ep-enter-x: -22px;
    --mx: 50%;
    --my: 0%;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    padding: 26px;
    border: 1px solid #e7d6ef;
    border-radius: 24px;
    background: linear-gradient(145deg, rgba(255,255,255,.97), rgba(249,243,253,.92));
    box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(227,212,235,.45), 0 20px 38px -25px rgba(75,36,103,.38);
    transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .3s ease;
  }
  .ep-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(320px circle at var(--mx) var(--my), rgba(255,124,83,.15), rgba(196,158,224,.13) 45%, transparent 70%);
    transition: opacity .35s ease;
  }
  .ep-card > * { position: relative; z-index: 1; }
  .ep-row:nth-child(even) .ep-card {
    --ep-enter-x: 22px;
    grid-column: 3;
    background: linear-gradient(145deg, #fff, #fff8ee);
    border-color: #efddcc;
  }
  .ep-card .ep-bignum {
    position: absolute;
    top: 8px;
    right: 18px;
    z-index: 0;
    color: rgba(75,36,103,.07);
    font-size: 66px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -.05em;
    pointer-events: none;
  }
  .ep-card::after {
    content: "";
    position: absolute;
    top: 29px;
    right: -25px;
    width: 25px;
    height: 2px;
    background: #dac4e7;
    pointer-events: none;
  }
  .ep-row:nth-child(even) .ep-card::after { right: auto; left: -25px; background: #efcfb8; }
  .ep-card-header { display: flex; align-items: center; gap: 13px; }
  .ep-icon {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 1px solid #fff;
    border-radius: 16px;
    background: linear-gradient(145deg, #fff, #eadaf5);
    color: var(--ep-plum);
    box-shadow: inset 0 1px 0 #fff, 0 4px 0 #e3d4eb;
    transition: transform .4s cubic-bezier(.22,1,.36,1);
  }
  .ep-row:nth-child(even) .ep-icon { color: #c75d37; background: linear-gradient(145deg, #fff, #ffe5d1); box-shadow: inset 0 1px 0 #fff, 0 4px 0 #efdbc9; }
  .ep-row:last-child .ep-icon { color: var(--ep-plum); background: linear-gradient(145deg, #fff, #fff0b3); box-shadow: inset 0 1px 0 #fff, 0 4px 0 #e9dfb5; }
  .ep-icon svg { width: 24px; height: 24px; }
  .ep-step-label { display: block; margin-bottom: 5px; color: #8b719b; font-size: 10px; font-weight: 750; letter-spacing: .13em; text-transform: uppercase; }
  .ep-card h3 { margin: 0; color: var(--ep-ink); font-size: clamp(18px, 1.65vw, 22px); font-weight: 800; line-height: 1.35; overflow-wrap: break-word; }
  .ep-card p { margin: 16px 0 0; color: var(--ep-muted); font-size: 15px; line-height: 1.75; overflow-wrap: break-word; }
  .ep-timeline.is-enhanced .ep-row:not(.is-visible) .ep-card { opacity: 0; transform: translate(var(--ep-enter-x), 16px); }
  .ep-timeline.is-enhanced .ep-row.is-visible .ep-card { opacity: 1; transform: none; }
  .ep-details {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    max-width: 940px;
    margin: clamp(34px, 4vw, 50px) auto 0;
    padding: 26px;
    border: 1px solid #e7d6ef;
    border-radius: 24px;
    background: rgba(255,255,255,.85);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(227,212,235,.4), 0 18px 38px -25px rgba(75,36,103,.3);
  }
  .ep-details p { min-width: 0; margin: 0; color: var(--ep-muted); font-size: 14px; line-height: 1.7; }
  .ep-details strong { display: block; margin-bottom: 5px; color: #c75d37; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; }
  @media (hover: hover) and (pointer: fine) {
    .ep-timeline .ep-row.is-visible .ep-card:hover,
    .ep-timeline:not(.is-enhanced) .ep-card:hover {
      transform: translateY(-6px);
      border-color: #c8a5db;
      box-shadow: inset 0 1px 0 #fff, 0 8px 0 rgba(227,212,235,.5), 0 30px 46px -24px rgba(75,36,103,.42);
    }
    .ep-timeline .ep-card:hover::before { opacity: 1; }
    .ep-timeline .ep-card:hover .ep-icon { transform: rotate(-8deg) scale(1.1); }
  }
  @media (max-width: 900px) and (min-width: 768px) {
    .ep-row { gap: 18px; grid-template-columns: minmax(0,1fr) 56px minmax(0,1fr); }
    .ep-node { width: 52px; height: 52px; }
    .ep-card { padding: 20px; }
    .ep-card::after { width: 18px; right: -18px; top: 25px; }
    .ep-row:nth-child(even) .ep-card::after { left: -18px; }
    .ep-card-header { align-items: flex-start; gap: 10px; }
    .ep-icon { width: 40px; height: 40px; }
  }
  @media (max-width: 767px) {
    .ep-timeline { max-width: 560px; }
    .ep-rail { left: 24px; }
    .ep-row { grid-template-columns: 48px minmax(0, 1fr); gap: 17px; padding-bottom: 28px; }
    .ep-node { grid-column: 1; width: 48px; height: 48px; font-size: 15px; }
    .ep-card, .ep-row:nth-child(even) .ep-card { --ep-enter-x: 0px; grid-column: 2; padding: 20px; border-radius: 20px; }
    .ep-card .ep-bignum { font-size: 48px; top: 6px; right: 14px; }
    .ep-card::after, .ep-row:nth-child(even) .ep-card::after { top: 23px; left: -17px; right: auto; width: 17px; }
    .ep-icon { width: 40px; height: 40px; border-radius: 13px; }
    .ep-icon svg { width: 20px; height: 20px; }
    .ep-card-header { align-items: flex-start; gap: 11px; }
    .ep-card h3 { font-size: 18px; }
    .ep-card p { margin-top: 14px; font-size: 14px; line-height: 1.7; }
    .ep-details { grid-template-columns: 1fr; margin-top: 32px; padding: 21px; gap: 16px; }
    .ep-details p + p { padding-top: 16px; border-top: 1px solid #eee3f4; }
  }
  @media (max-width: 379px) {
    .ep-row { grid-template-columns: 40px minmax(0, 1fr); gap: 12px; }
    .ep-node { width: 40px; height: 40px; font-size: 13px; }
    .ep-rail { left: 20px; }
    .ep-card, .ep-row:nth-child(even) .ep-card { padding: 16px; }
    .ep-card .ep-bignum { display: none; }
    .ep-card::after, .ep-row:nth-child(even) .ep-card::after { top: 19px; left: -12px; width: 12px; }
    .ep-card-header { flex-wrap: wrap; align-items: flex-start; gap: 9px; }
    .ep-card-header > .min-w-0 { flex: 1 1 110px; }
    .ep-icon { width: 32px; height: 32px; border-radius: 10px; }
    .ep-icon svg { width: 18px; height: 18px; }
    .ep-card h3 { font-size: 16px; }
    .ep-card p { font-size: 13px; }
  }
  @keyframes ep-node-pulse { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.35); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .edu-process .ep-card, .edu-process .ep-node { transition: none; }
    .edu-process .ep-node::after { animation: none; }
    .edu-process .ep-timeline .ep-row .ep-card { opacity: 1; transform: none; }
  }
`;

function ProcessIcon({ index }) {
  const paths = [
    <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="m15 9 6-6M17 3h4v4" /></>,
    <><rect x="3" y="4" width="18" height="15" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01m-2 6 3 3 5-5" /></>,
    <><path d="M4 4h16l-6 7v6l-4 3v-9L4 4Z" /><path d="M8 7h8" /></>,
    <><path d="m3 11 18-8-8 18-3-8-7-2Zm7 2 11-10" /></>,
    <><path d="M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4M12 13v6m-4 2h8m-6-2h4" /></>,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[index % paths.length]}
    </svg>
  );
}

function useProcessTimeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const rows = Array.from(timeline.querySelectorAll(".ep-row"));
    const nodes = rows.map((row) => row.querySelector(".ep-node"));
    const rail = timeline.querySelector(".ep-rail");
    if (!nodes.length || !rail) return;

    let frame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      if (disposed) return;

      const bounds = timeline.getBoundingClientRect();
      const centres = nodes.map((node) => {
        const box = node.getBoundingClientRect();
        return box.top + box.height / 2;
      });
      const first = centres[0];
      const distance = Math.max(0, centres[centres.length - 1] - first);

      rail.style.top = `${first - bounds.top}px`;
      rail.style.height = `${distance}px`;
      rail.style.bottom = "auto";

      const trigger = window.innerHeight * 0.68;
      const progress = distance ? Math.max(0, Math.min(1, (trigger - first) / distance)) : 0;
      timeline.style.setProperty("--ep-progress", String(progress));

      let current = -1;
      centres.forEach((centre, index) => { if (centre <= trigger) current = index; });
      rows.forEach((row, index) => {
        row.classList.toggle("is-reached", index <= current);
        row.classList.toggle("is-current", index === current);
      });
    };

    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(update);
    };

    let observer;
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Content stays readable if enhancement is unavailable.
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

      rows.forEach((row) => {
        const box = row.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) row.classList.add("is-visible");
        observer.observe(row);
      });
      timeline.classList.add("is-enhanced");
    }

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(timeline);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    document.fonts?.ready.then(schedule);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      timeline.classList.remove("is-enhanced");
    };
  }, []);

  return timelineRef;
}

function trackPointer(event) {
  if (event.pointerType === "touch") return;
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - box.left}px`);
  card.style.setProperty("--my", `${event.clientY - box.top}px`);
}

export function Process() {
  const timelineRef = useProcessTimeline();

  return (
    <SectionFrame id="process" className="section-y edu-process">
      <style>{processStyles}</style>
      <div className="container-x">
        <SectionHead title="How Our System Works">
          <p>A simple process to reach the right students and help fill your upcoming batches.</p>
        </SectionHead>

        <div className="ep-timeline" ref={timelineRef}>
          <span className="ep-rail" aria-hidden="true"><span className="ep-rail-fill" /></span>
          <ol className="m-0 list-none p-0">
            {steps.map((step, index) => (
              <li className="ep-row" key={step.title}>
                <span className="ep-node" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <article className="ep-card" onPointerMove={trackPointer}>
                  <span className="ep-bignum" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className="ep-card-header">
                    <span className="ep-icon"><ProcessIcon index={index} /></span>
                    <div className="min-w-0">
                      <span className="ep-step-label">Step {String(index + 1).padStart(2, "0")}</span>
                      <h3>{step.title}</h3>
                    </div>
                  </div>
                  <p>{step.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="ep-details">
          {processDetails.map((detail) => (
            <p key={detail.label}><strong>{detail.label}</strong>{detail.text}</p>
          ))}
        </Reveal>

        <div className="edu-cta">
          <SectionCta href={bookingHref} external={bookingIsExternal} data-enquiry-popup-trigger>
            Yes, I Want to Fill My Next Batch
          </SectionCta>
        </div>
      </div>
    </SectionFrame>
  );
}

export function Results() {
  const campaign = featuredCampaign;
  const rows = campaign
    ? [
        ["Institute", campaign.institute],
        ["Course promoted", campaign.course],
        ["Location", campaign.location],
        ["Campaign period", campaign.period],
        ["Advertising spend", campaign.spend],
        ["Leads generated", campaign.leads],
        ["Lead definition", campaign.leadDefinition],
        ["Cost per lead", campaign.costPerLead],
        ["Counselling bookings", campaign.bookings],
        ["Admissions", campaign.admissions],
      ].filter(([, value]) => value !== undefined && value !== null && value !== "")
    : reportMeasures.map((measure) => [measure.term, measure.desc]);

  return (
    <SectionFrame
      id="results"
      className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]"
    >
      <div className="container-x">
        <SectionHead
          title={
            campaign
              ? "See what the campaign delivered, and what those enquiries led to."
              : "Track the Numbers That Matter to Your Admissions."
          }
        >
          <p>
            {campaign
              ? "Campaign results show the course promoted, the advertising investment and the response generated."
              : "Leads, counselling bookings and admissions are different things. Your reports keep them separate, so you can see what the campaign contributed."}
          </p>
        </SectionHead>

        <Reveal className="edu-result-card card mt-8 sm:mt-10">
          <div className="edu-result-head">
            <h3>{campaign ? "Featured campaign" : "What every campaign report covers"}</h3>
            <span className="edu-result-pill">
              <i aria-hidden="true" />
              {campaign ? "Campaign snapshot" : "Report overview"}
            </span>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {rows.map(([term, description], index) => (
              <div
                key={term}
                className={`edu-result-item border border-plum-100 ${
                  campaign && /^(leads generated|cost per lead|advertising spend)$/i.test(term)
                    ? "edu-result-key"
                    : index % 4 === 1 || index % 4 === 2
                    ? "bg-sun-50"
                    : "bg-white"
                }`}
              >
                <dt className="text-sm font-bold text-plum-700">{term}</dt>
                <dd className="mt-1 text-[15px]">{description}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs text-mute">
            {campaign
              ? "Figures are specific to this campaign and are not a promise of future results."
              : "Campaign reports bring together advertising performance and the admission feedback your team shares."}
          </p>
        </Reveal>
      </div>
    </SectionFrame>
  );
}

export function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <SectionFrame id="testimonials" className="section-y">
      <div className="container-x">
        <SectionHead title="Hear from the Institutes We’ve Worked With." />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              key={testimonial.name}
              delay={index * 80}
              className="edu-testimonial card"
            >
              <span className="edu-bigquote" aria-hidden="true">&ldquo;</span>
              <span className="edu-quote-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 17.5c0-4.4 1.8-7.6 5.4-9.6l.9 1.4C8.5 10.5 7.7 12 7.6 13.5H10V19H4v-1.5Zm10 0c0-4.4 1.8-7.6 5.4-9.6l.9 1.4c-1.8.9-2.6 2.4-2.7 3.9H20V19h-6v-1.5Z" /></svg>
              </span>
              <blockquote className="font-display text-xl leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-6 border-t border-plum-100 text-sm">
                <span className="edu-avatar" aria-hidden="true">
                  {String(testimonial.name || "?").trim().charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <strong>{testimonial.name}</strong>
                  <br />
                  {testimonial.role}, {testimonial.institute}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function WhyIcon({ index }) {
  const paths = [
    <><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V15c3 3 9 3 12 0v-4.5" /></>,
    <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    <><path d="M3 17 9 11l4 4 8-9" /><path d="M15 6h6v6" /></>,
    <><path d="m5 12 4.5 4.5L19 7" /><rect x="3" y="3" width="18" height="18" rx="5" /></>,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[index % paths.length]}
    </svg>
  );
}

export function WhyChoose() {
  const iconTones = ["plum", "coral", "sun"];

  return (
    <SectionFrame className="section-y">
      <div className="container-x">
        <SectionHead title="Why Institutes Choose Us" />

        <div className="edu-why-grid grid gap-5 md:grid-cols-2 lg:gap-6">
          {whyChoose.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 80}
              className="edu-why-card card"
            >
              <span className="edu-why-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={`edu-why-icon edu-why-icon--${iconTones[index % iconTones.length]}`}
              >
                <WhyIcon index={index} />
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-[15px]">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="edu-cta">
          <SectionCta href={bookingHref} external={bookingIsExternal} data-enquiry-popup-trigger>
            Yes, I Want to Fill My Next Batch
          </SectionCta>
        </div>
      </div>
    </SectionFrame>
  );
}