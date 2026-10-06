// Complete Hero.jsx replacement. Keep your existing Tailwind theme and imported components.
import { useEffect, useRef, useState } from "react";
import {
  bookingHref,
  bookingIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";
import HeroVisual from "./HeroVisual.jsx";

// Vite resolves this file from public/images/Neeraj.png, including subpath deployments.
const heroImageBase = import.meta.env.BASE_URL || "/";
const heroImage = `${heroImageBase.endsWith("/") ? heroImageBase : `${heroImageBase}/`}images/${encodeURIComponent("Neeraj.png")}`;

const journey = [
  {
    title: "Reach the Right Students",
    text: "Hyper-local, course-specific Meta Ads put your institute in front of relevant learners."
  },
  {
    title: "Capture Qualified Enquiries",
    text: "A focused admission funnel collects the details your counsellors need."
  },
  {
    title: "Follow Up and Fill Your Batches",
    text: "Fast lead delivery helps your team turn interest into admission conversations."
  }
];

const marquee = ["Hyper-Local Targeting", "Course-Specific Campaigns", "High-Intent Lead Filtering", "Instant Lead Delivery"];
const benefits = ["Guaranteed 500+ Quality Student Leads Every Month."];

const stats = [
  { value: "500+", count: 500, label: "Quality leads every month", icon: "target", tone: "coral" },
  { value: "50+", count: 50, label: "Happy clients", icon: "people", tone: "plum" },
  { value: "500+", count: 500, label: "Systems built", icon: "layers", tone: "sun" },
  { value: "20+", count: 20, label: "People in our in-house team", icon: "team", tone: "plum" },
];

const journeyTones = [
  "border-plum-200 bg-plum-100 text-plum-700",
  "border-coral-100 bg-coral-50 text-coral-700",
  "border-sun-200 bg-sun-50 text-sun-700",
];

function HeroIcon({ name, className = "" }) {
  const icons = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M21 21v-2a6 6 0 0 0-4-5" />
      </>
    ),
    layers: (
      <path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
    ),
    team: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M7 21v-3a5 5 0 0 1 10 0v3M4 8a2 2 0 1 0 0 4M20 8a2 2 0 1 1 0 4M2 21v-4a3 3 0 0 1 3-3M22 21v-4a3 3 0 0 0-3-3" />
      </>
    ),
    filter: <path d="M3 4h18l-7 8v6l-4 3v-9L3 4Z" />,
    growth: <path d="M3 17 9 11l4 4 8-10M15 5h6v6M3 21h18" />,
    spark: <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] || icons.spark}
    </svg>
  );
}

function GlassStatCard({ stat, index }) {
  const cardRef = useRef(null);
  const [count, setCount] = useState(stat.count);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !window.IntersectionObserver) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const startedAt = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(stat.count * eased));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.3 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.count]);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--glass-x", `${x * 100}%`);
    card.style.setProperty("--glass-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 6}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 6}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      ref={cardRef}
      className={`hero-stat-glass hero-stat-glass--${stat.tone}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{ "--icon-delay": `${index * -0.8}s` }}
    >
      <span className="hero-stat-shine" aria-hidden="true" />
      <span className={`hero-icon-3d hero-icon-3d--${stat.tone}`}>
        <HeroIcon name={stat.icon} />
      </span>
      <p className="hero-stat-value" aria-label={`${stat.value} ${stat.label}`}>
        <span aria-hidden="true">{count.toLocaleString("en-IN")}<span>+</span></span>
      </p>
      <p className="hero-stat-label" aria-hidden="true">{stat.label}</p>
    </div>
  );
}

const styles = `
  .institute-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 8% 10%, rgba(245,133,98,.14), transparent 38%),
      radial-gradient(ellipse at 95% 25%, rgba(116,68,148,.07), transparent 38%);
  }
  .institute-hero,
  .institute-hero *,
  .institute-hero *::before,
  .institute-hero *::after { box-sizing: border-box; }

  .institute-hero .hero-enter {
    animation: ihReveal .8s cubic-bezier(.22,1,.36,1) both;
    animation-delay: var(--delay, 0ms);
  }

  .institute-hero .hero-image-wrap {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 760px; min-width: 0; margin: 36px auto 0;
  }
  .institute-hero .hero-image-glow {
    position: absolute; inset: 16px 24px -12px; z-index: -1; border-radius: 32px; pointer-events: none;
    background: linear-gradient(
      115deg,
      rgba(116,68,148,.22),
      rgba(245,133,98,.26),
      rgba(255,160,110,.24)
    ); filter: blur(28px); animation: ihGlow 6s ease-in-out infinite;
  }
  .institute-hero .hero-image-shell {
    position: relative; width: 100%; padding: 6px; overflow: hidden; border: 1px solid rgba(75,38,106,.13); border-radius: 25px; background: linear-gradient(145deg, #fff, #faf4fc 55%, #fff5e9);
    box-shadow:
      0 20px 48px rgba(75,38,106,.1),
      0 5px 15px rgba(75,38,106,.04),
      inset 0 1px 0 #fff; transition: border-color .35s ease, box-shadow .35s ease;
  }
  .institute-hero .hero-image-screen { position: relative; width: 100%; min-width: 0; overflow: hidden; border-radius: 19px; background: transparent; }
  .institute-hero .hero-image-asset {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: inherit;
  }

  .institute-hero .hero-ticker {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, black 6%, black 94%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, black 6%, black 94%, transparent
    );
  }
  .institute-hero .hero-track {
    display: flex; width: max-content;
    animation: ihMarquee 36s linear infinite;
  }
  .institute-hero .hero-ticker:hover .hero-track { animation-play-state: paused; }

  .institute-hero .hero-actions a,
  .institute-hero .hero-actions button {
    max-width: 100%;
    white-space: normal;
    text-align: center;
  }

  @media (hover: hover) and (pointer: fine) {
    .institute-hero .hero-image-shell:hover {
      border-color: rgba(75,38,106,.25);
      box-shadow:
        0 24px 55px rgba(75,38,106,.14),
        0 6px 18px rgba(75,38,106,.05);
    }
  }

  @media (max-width: 767px) {
    .institute-hero .hero-image-wrap {
      max-width: 620px;
      margin-top: 28px;
    }
    .institute-hero .hero-image-shell {
      padding: 5px;
      border-radius: 21px;
    }
    .institute-hero .hero-image-screen { border-radius: 15px; }
    .institute-hero .hero-image-glow {
      inset: 12px 16px -8px;
      filter: blur(22px);
    }
  }
  @media (max-width: 480px) {
    .institute-hero .hero-image-wrap { margin-top: 25px; }
    .institute-hero .hero-image-shell {
      padding: 4px;
      border-radius: 17px;
      box-shadow: 0 12px 28px rgba(75,38,106,.09);
    }
    .institute-hero .hero-image-screen { border-radius: 12px; }
  }

  @keyframes ihReveal {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes ihGlow {
    0%, 100% { opacity: .45; }
    50% { opacity: .75; }
  }
  @keyframes ihMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .institute-hero *,
    .institute-hero *::before,
    .institute-hero *::after {
      animation: none !important;
      transition: none !important;
    }
    .institute-hero .hero-enter {
      opacity: 1;
      transform: none;
    }
    .institute-hero .hero-ticker {
      -webkit-mask-image: none;
      mask-image: none;
    }
    .institute-hero .hero-track { width: 100%; }
    .institute-hero .hero-copy {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 0;
    }
    .institute-hero .hero-duplicate { display: none; }
  }

  /* Liquid glass finish, layered surfaces and local SVG icons. */
  .institute-hero {
    background:
      radial-gradient(ellipse at 4% 3%, #ffeadd 0, transparent 42%),
      radial-gradient(ellipse at 96% 20%, #f1e6fa 0, transparent 44%),
      linear-gradient(180deg, #fffcf9, #fcf8fd 58%, #fffaf4);
  }
  .institute-hero h1 { text-shadow: 0 2px 0 rgba(255,255,255,.8); }
  .institute-hero .hero-image-shell {
    padding: 9px;
    border: 1px solid rgba(255,255,255,.95);
    border-radius: 30px;
    background: linear-gradient(135deg,#ffffffd9,#f4eafa9c,#fff5e4d9);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 25px 65px #4b266a18, 0 5px 0 #e8d9ef, inset 0 2px 0 #fff;
  }
  .institute-hero .hero-image-screen { border-radius: 23px; }
  .institute-hero .hero-image-glow { animation: ihGlow 6s ease-in-out infinite; }
  .institute-hero .hero-stats-grid {
    perspective: 1000px;
    gap: 20px;
  }
  .institute-hero .hero-stat-glass {
    --rotate-x: 0deg;
    --rotate-y: 0deg;
    --glass-x: 50%;
    --glass-y: 20%;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-width: 0;
    padding: 29px 20px 27px;
    border: 1px solid #e8d8ef;
    border-radius: 27px;
    background: linear-gradient(145deg,#ffffffed,#faf3fcbb);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    text-align: center;
    box-shadow: 0 18px 38px #4b266a0b, 0 4px 0 #ede2f2, inset 0 2px 0 #fff;
    transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
    transition: transform .25s ease, box-shadow .3s ease, border-color .3s ease;
  }
  .institute-hero .hero-stat-glass--coral {
    background: linear-gradient(145deg,#ffffffed,#fff2e8bb);
    border-color: #f1dacb;
  }
  .institute-hero .hero-stat-glass--sun {
    background: linear-gradient(145deg,#ffffffed,#fff8dfbb);
    border-color: #ebdfbf;
  }
  .institute-hero .hero-stat-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(circle at var(--glass-x) var(--glass-y),#ffffffdd,transparent 60%);
    pointer-events: none;
  }
  .institute-hero .hero-stat-shine {
    position: absolute;
    inset: -100% -60%;
    pointer-events: none;
    background: linear-gradient(110deg,transparent 43%,#ffffffa6 50%,transparent 57%);
    transform: translateX(-55%);
    opacity: 0;
  }
  .institute-hero .hero-icon-3d {
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    margin: 0 auto 23px;
    position: relative;
    border: 1px solid #ddc9eb;
    border-radius: 19px;
    background: linear-gradient(145deg,#fff,#efe1f7);
    color: #744494;
    box-shadow: 0 6px 0 #cbb0dc, 0 12px 20px #74449419, inset 0 2px 0 #fff;
    animation: ihIconFloat 5.5s ease-in-out infinite;
    animation-delay: var(--icon-delay,0s);
  }
  .institute-hero .hero-icon-3d--coral {
    color: #ce6b47;
    border-color: #f1d0bc;
    background: linear-gradient(145deg,#fff,#ffe2d0);
    box-shadow: 0 6px 0 #deb099, 0 12px 20px #f585621c, inset 0 2px 0 #fff;
  }
  .institute-hero .hero-icon-3d--sun {
    color: #a47e2c;
    border-color: #ebdca6;
    background: linear-gradient(145deg,#fff,#ffecb4);
    box-shadow: 0 6px 0 #d7bf76, 0 12px 20px #d4b04c1c, inset 0 2px 0 #fff;
  }
  .institute-hero .hero-icon-3d svg { width: 27px; height: 27px; }
  .institute-hero .hero-stat-value {
    margin: 0;
    color: #4b266a;
    font-size: clamp(36px,3.7vw,49px);
    line-height: 1.1;
    letter-spacing: -.04em;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  .institute-hero .hero-stat-value > span > span { color: #f58562; font-size: .75em; }
  .institute-hero .hero-stat-label { margin: 12px 0 0; color: #756181; font-size: 12px; font-weight: 600; line-height: 1.7; }
  .institute-hero .hero-target {
    border-color: #e7d7ed;
    background: radial-gradient(ellipse at 0 0,#f0e4f777,transparent 60%),linear-gradient(135deg,#ffffffd9,#fffaf3bf);
    box-shadow: 0 22px 55px #4b266a0b, 0 5px 0 #eee4f2, inset 0 2px 0 #fff;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
  .institute-hero .hero-step { border: 1px solid transparent; transition: background-color .3s ease, transform .3s ease; }
  .institute-hero .hero-step > span {
    box-shadow: 0 4px 0 #e1d0e8, inset 0 1px 0 #fff;
    animation: ihIconFloat 6s ease-in-out infinite;
  }
  .institute-hero .hero-step:nth-child(2) > span { animation-delay: -2s; }
  .institute-hero .hero-step:nth-child(3) > span { animation-delay: -4s; }
  .institute-hero .hero-step svg { width: 20px; height: 20px; }
  .institute-hero .hero-copy svg { width: 16px; height: 16px; }

  @media (hover:hover) and (pointer:fine) {
    .institute-hero .hero-stat-glass:hover { border-color: #c6a5d9; box-shadow: 0 24px 45px #4b266a13, 0 5px 0 #e6d6ed, inset 0 2px 0 #fff; }
    .institute-hero .hero-stat-glass:hover .hero-stat-shine { opacity: 1; animation: ihShine .85s ease both; }
    .institute-hero .hero-step:hover { border-color: #ecdfef; }
  }
  @media (max-width:767px) {
    .institute-hero .hero-stats-grid { gap: 16px; }
    .institute-hero .hero-stat-glass { padding: 25px 16px; border-radius: 23px; }
  }
  @media (max-width:480px) {
    .institute-hero .hero-stats-grid { gap: 13px; }
    .institute-hero .hero-stat-glass { padding: 22px 12px; border-radius: 21px; }
    .institute-hero .hero-icon-3d { width: 48px; height: 48px; margin-bottom: 20px; border-radius: 16px; }
    .institute-hero .hero-icon-3d svg { width: 23px; height: 23px; }
    .institute-hero .hero-stat-value { font-size: 36px; }
    .institute-hero .hero-stat-label { font-size: 11px; }
    .institute-hero .hero-image-shell { padding: 5px; border-radius: 22px; }
    .institute-hero .hero-image-screen { border-radius: 17px; }
    .institute-hero .hero-actions a { width: 100%; }
  }
  @keyframes ihIconFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes ihShine { from { transform: translateX(-55%); } to { transform: translateX(55%); } }
  @media (prefers-reduced-motion:reduce) {
    .institute-hero .hero-stat-glass { transform: none!important; }
    .institute-hero .hero-stat-shine { display: none; }
  }

  .institute-hero .hero-actions a:focus-visible {
    outline: 3px solid #f58562;
    outline-offset: 6px;
  }
  .institute-hero .hero-image-shell:focus-within {
    border-color: #b892cc;
    box-shadow: 0 25px 65px #4b266a18, 0 0 0 3px #ead9f1;
  }
  @supports not (backdrop-filter: blur(24px)) {
    .institute-hero .hero-stat-glass,
    .institute-hero .hero-target,
    .institute-hero .hero-image-shell { background-color: #fffcfe; }
  }
  @media (max-width:359px) {
    .institute-hero .hero-stat-glass { padding-inline: 10px; }
    .institute-hero .hero-stat-label {
      font-size: 10px;
      overflow-wrap: anywhere;
    }
  }

  /* Heading and layout: sizes are scoped to this hero. */
  .institute-hero { padding-block: clamp(26px, 4vw, 56px) clamp(44px, 6vw, 80px); }
  .institute-hero .container-x {
    width: min(100%, 1200px);
    padding-inline: clamp(16px, 4vw, 40px);
    margin-inline: auto;
    min-width: 0;
  }
  .institute-hero .hero-heading { width: 100%; max-width: 1080px; margin-inline: auto; text-align: center; }
  .institute-hero .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: 100%;
    margin: 0;
    padding: 11px 20px;
    border: 1px solid #ffffff40;
    border-radius: 999px;
    background: linear-gradient(120deg, #351d4e, #4b266a);
    color: #fff;
    font-size: clamp(11px, 1.2vw, 14px);
    font-weight: 650;
    line-height: 1.6;
    box-shadow: inset 0 1px 0 #ffffff20, 0 10px 24px #4b266a10;
  }
  .institute-hero .hero-eyebrow > span:last-child { min-width: 0; text-wrap: balance; }
  .institute-hero .hero-eyebrow-dot { width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%; background: #ffd45b; }
  .institute-hero .hero-title {
    max-width: 1060px;
    margin: clamp(23px, 3vw, 34px) auto 0;
    color: #30223e;
    font-size: clamp(28px, 4.8vw, 62px);
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -.035em;
    text-wrap: balance;
    overflow-wrap: normal;
    word-break: normal;
    hyphens: none;
  }
  .institute-hero .hero-title-accent { color: #f58562; }
  .institute-hero .hero-title-line { display: block; }
  .institute-hero .hero-title-guarantee { color: #f58562; font-size: 1.12em; }
  .institute-hero .hero-promise {
    max-width: 760px;
    margin: clamp(17px, 2.4vw, 25px) auto 0;
    color: #4b266a;
    font-size: clamp(16px, 2.2vw, 26px);
    font-weight: 750;
    line-height: 1.5;
    letter-spacing: -.015em;
    text-wrap: balance;
  }
  .institute-hero .hero-description, .institute-hero .hero-image-copy {
    max-width: 730px;
    margin: clamp(17px, 2.4vw, 26px) auto 0;
    color: #62536e;
    font-size: clamp(14px, 1.6vw, 18px);
    line-height: 1.8;
    text-align: center;
    text-wrap: pretty;
  }
  .institute-hero .hero-stats-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .institute-hero .hero-target { min-width: 0; }
  .institute-hero .hero-target-number { margin: 0; font-size: clamp(58px, 7vw, 96px); line-height: 1; letter-spacing: -.045em; }
  .institute-hero .hero-lead-quality {
    display: block;
    margin-top: 8px;
    color: #4b266a;
    font-size: clamp(32px, 16vw, 20px);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -.03em;
    text-wrap: balance;
  }
  .institute-hero .hero-lead-quality > span { color: #e96849; }
  .institute-hero .hero-visual-frame { min-width: 0; width: 100%; }
  .institute-hero .hero-visual-frame > * { width: 100%; max-width: 100%; min-width: 0; }
  .institute-hero .hero-actions { min-width: 0; }
  .institute-hero .hero-actions a { display: inline-flex; align-items: center; justify-content: center; gap: 10px; overflow-wrap: anywhere; }
  .institute-hero .hero-stat-label, .institute-hero .hero-step p { overflow-wrap: anywhere; }
  .institute-hero .hero-step > span { flex-shrink: 0; }
  .institute-hero .hero-ticker { width: 100%; max-width: 100%; }
  @media (min-width: 1024px) { .institute-hero .hero-stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  @media (max-width: 767px) {
    .institute-hero .hero-title { font-size: clamp(27px, 5.5vw, 40px); line-height: 1.19; letter-spacing: -.03em; }
    .institute-hero .hero-title-line { display: inline; }
    .institute-hero .hero-eyebrow { max-width: 560px; padding: 10px 16px; border-radius: 22px; }
    .institute-hero .hero-promise { padding-inline: 10px; margin-top: 16px; }
    .institute-hero .hero-image-wrap { margin-top: 26px; }
    .institute-hero .hero-target { grid-template-columns: minmax(0, 1fr); gap: 26px; }
    .institute-hero .hero-lead-quality {
      font-size: clamp(13.5px, 4.4vw, 20px);
      line-height: 1.3;
      white-space: nowrap;
      text-wrap: nowrap;
    }
    .institute-hero .hero-stat-value { font-size: clamp(32px, 6.5vw, 44px); }
  }
  @media (max-width: 479px) {
    .institute-hero .hero-title { font-size: clamp(26px, 7.1vw, 32px); margin-top: 23px; }
    .institute-hero .hero-eyebrow { font-size: 11px; gap: 9px; padding: 10px 14px; border-radius: 20px; }
    .institute-hero .hero-promise { padding-inline: 8px; font-size: 17px; margin-top: 15px; }
    .institute-hero .hero-description, .institute-hero .hero-image-copy { font-size: 14px; line-height: 1.8; }
    .institute-hero .hero-actions a { min-width: 0; width: 100%; }
    .institute-hero .hero-target { padding: 18px; border-radius: 24px; }
    .institute-hero .hero-visual-frame { padding: 8px; }
    .institute-hero .hero-stat-glass { padding: 21px 12px; }
    .institute-hero .hero-stat-label { font-size: 11px; line-height: 1.6; }
  }
  @media (max-width: 359px) {
    .institute-hero .container-x { padding-inline: 14px; }
    .institute-hero .hero-title { font-size: 26px; letter-spacing: -.03em; }
    .institute-hero .hero-target { padding: 15px; }
    .institute-hero .hero-step { padding: 10px 0; gap: 10px; }
    .institute-hero .hero-step h3 { font-size: 14px; }
    .institute-hero .hero-step p { font-size: 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .institute-hero .hero-copy > span { white-space: normal; text-align: center; justify-content: center; max-width: 100%; }
    .institute-hero .hero-copy { gap: 12px; padding: 0 16px; }
    .institute-hero .hero-icon-3d { transform: none; }
  }

  /* Clear typography with no background, pill, border or shadow. */
  .institute-hero .hero-guarantee-ticker {
    padding-block: 12px;
    border: 0;
    background: transparent;
    box-shadow: none;
  }
  .institute-hero .hero-guarantee-item {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    padding: 5px 16px;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: #4b266a;
    font-size: clamp(15px, 1.8vw, 21px);
    font-weight: 750;
    line-height: 1.5;
    letter-spacing: -.015em;
    white-space: nowrap;
  }
  .institute-hero .hero-guarantee-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 22px;
    color: #f58562;
    background: transparent;
  }
  .institute-hero .hero-guarantee-icon svg { width: 22px; height: 22px; }
  .institute-hero .hero-guarantee-number { color: #f58562; font-weight: 850; }
  .institute-hero .hero-image-copy { color: #000; }
  @media (max-width: 479px) {
    .institute-hero .hero-guarantee-item { padding-inline: 10px; gap: 9px; font-size: 15px; }
    .institute-hero .hero-guarantee-icon { flex-basis: 18px; }
    .institute-hero .hero-guarantee-icon svg { width: 18px; height: 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .institute-hero .hero-guarantee-item { white-space: normal; }
    .institute-hero .hero-guarantee-item > span:last-child { min-width: 0; }
  }

  /* Restore the course badge and keep the guarantee close to the video. */
  .institute-hero .hero-eyebrow {
    padding: 10px 20px;
    border: 1px solid rgba(255,255,255,.3);
    border-radius: 999px;
    background: linear-gradient(120deg, #351d4e, #4b266a);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 8px 20px rgba(75,38,106,.09);
    color: #fff;
    font-weight: 700;
  }
  .institute-hero .hero-eyebrow-dot { background: #ffd45b; }
  .institute-hero .hero-guarantee-wrap { margin-top: 16px; }
  .institute-hero .hero-guarantee-ticker { padding-block: 4px; }
  .institute-hero .hero-guarantee-item { padding-block: 3px; }
  .institute-hero .hero-image-wrap { margin-top: 16px; }
  @media (max-width: 767px) {
    .institute-hero .hero-eyebrow { padding: 10px 16px; border-radius: 22px; }
    .institute-hero .hero-guarantee-wrap { margin-top: 12px; }
    .institute-hero .hero-image-wrap { margin-top: 12px; }
  }
  @media (max-width: 479px) {
    .institute-hero .hero-eyebrow { padding: 9px 14px; font-size: 12px; line-height: 1.65; border-radius: 20px; }
    .institute-hero .hero-guarantee-ticker { padding-block: 3px; }
  }

  /* Wide image with its original proportions on every screen. */
  .institute-hero .hero-image-wrap {
    max-width: 960px;
    margin-inline: auto;
    margin-bottom: 0;
  }
  .institute-hero .hero-image-shell {
    padding: 8px;
    border-radius: 28px;
    background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(244,234,250,.8));
    box-shadow: inset 0 1px 0 #fff, 0 5px 0 #e8d9ef, 0 20px 50px rgba(75,38,106,.12);
  }
  .institute-hero .hero-image-screen {
    border-radius: 21px;
    background: #f5ecfa;
    aspect-ratio: 1672 / 941;
  }
  .institute-hero .hero-image-asset { height: auto; aspect-ratio: 1672 / 941; }
  @media (max-width: 767px) {
    .institute-hero .hero-image-shell { padding: 5px; border-radius: 21px; }
    .institute-hero .hero-image-screen { border-radius: 16px; }
  }
  @media (max-width: 479px) {
    .institute-hero .hero-image-shell { padding: 4px; border-radius: 18px; }
    .institute-hero .hero-image-screen { border-radius: 13px; }
  }

  /* Soft, blurred orange glow replaces the yellow background light. */
  .institute-hero {
    background:
      radial-gradient(ellipse at 0% 12%, rgba(245,133,98,.2), transparent 52%),
      radial-gradient(ellipse at 100% 20%, rgba(196,158,224,.23), transparent 52%),
      linear-gradient(180deg, #fffcf9, #fcf8fd 58%, #fffaf4);
    padding-top: clamp(28px, 4vw, 56px);
    padding-bottom: 28px;
  }
  .institute-hero::before {
    content: "";
    position: absolute;
    inset: -60px;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 46% 34% at 14% 6%, rgba(245,133,98,.30), transparent 70%),
      radial-gradient(ellipse 34% 26% at 50% 100%, rgba(255,150,100,.16), transparent 72%),
      radial-gradient(ellipse at 90% 12%, rgba(177,129,211,.16), transparent 48%);
    filter: blur(36px);
    animation: ihGlow 8s ease-in-out infinite;
  }
  .institute-hero .hero-guarantee-wrap {
    width: min(100%, 992px);
    margin-inline: auto;
    padding-inline: 16px;
  }
  .institute-hero .hero-guarantee-ticker {
    position: relative;
    isolation: isolate;
    border-radius: 10px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  }
  .institute-hero .hero-guarantee-ticker::before,
  .institute-hero .hero-guarantee-ticker::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(24px, 5vw, 64px);
    z-index: 2;
    pointer-events: none;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }
  .institute-hero .hero-guarantee-ticker::before {
    left: 0;
    -webkit-mask-image: linear-gradient(90deg, #000, transparent);
    mask-image: linear-gradient(90deg, #000, transparent);
  }
  .institute-hero .hero-guarantee-ticker::after {
    right: 0;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000);
    mask-image: linear-gradient(90deg, transparent, #000);
  }
  .institute-hero .hero-guarantee-item,
  .institute-hero .hero-guarantee-number,
  .institute-hero .hero-guarantee-icon { color: #ef896b; }
  .institute-hero .hero-image-copy { max-width: 780px; line-height: 1.7; }
  .institute-hero .hero-title-keep,
  .institute-hero .hero-title-tail { white-space: nowrap; }
  @media (max-width: 767px) {
    .institute-hero { padding-top: 24px; }
    .institute-hero .hero-title { font-size: clamp(22px, 6.7vw, 40px); line-height: 1.22; }
    .institute-hero .hero-title-line { display: block; }
    .institute-hero .hero-title-line { white-space: nowrap; }
    .institute-hero .hero-title-guarantee { color: #e96849; font-size: 1em; }
    .institute-hero .hero-promise { font-size: clamp(15px, 3.7vw, 19px); }
    .institute-hero .hero-actions { margin-top: 24px; }
    .institute-hero .hero-guarantee-item { font-size: 16px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .institute-hero .hero-guarantee-ticker::before,
    .institute-hero .hero-guarantee-ticker::after { display: none; }
    .institute-hero .hero-guarantee-ticker { -webkit-mask-image: none; mask-image: none; }
  }

  /* ============================================================
     Benefits bar: fixed tag + looping text (same palette)
     ============================================================ */
  .institute-hero .hero-benefit-wrap {
    width: min(100%, 1040px);
    margin: 18px auto 0;
    padding-inline: 16px;
  }
  .institute-hero .hero-benefit-bar {
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: stretch;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #ecd9e8;
    border-radius: 22px;
    background:
      radial-gradient(ellipse at 0 0, rgba(245,133,98,.16), transparent 55%),
      linear-gradient(135deg, rgba(255,255,255,.96), rgba(250,243,252,.9) 55%, rgba(255,245,233,.95));
    box-shadow: 0 5px 0 #eadcee, 0 18px 40px rgba(75,38,106,.1), inset 0 2px 0 #fff;
  }
  .institute-hero .hero-benefit-bar::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(105deg, transparent 42%, rgba(255,255,255,.65) 50%, transparent 58%);
    transform: translateX(-120%);
    animation: ihBarShine 6s ease-in-out 1.5s infinite;
  }
  .institute-hero .hero-benefit-tag {
    position: relative;
    z-index: 2;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    padding: 0 28px 0 20px;
    background: linear-gradient(120deg, #351d4e, #4b266a 60%, #60317d);
    color: #fff;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .09em;
    text-transform: uppercase;
    white-space: nowrap;
    clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.2);
  }
  .institute-hero .hero-benefit-tag-text { display: block; }
  /* Line break inside "Our Promise" is mobile-only */
  .institute-hero .hero-promise-br { display: none; }
  .institute-hero .hero-benefit-live {
    position: relative;
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
    background: #ffd45b;
  }
  .institute-hero .hero-benefit-live::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #ffd45b;
    animation: ihPing 1.8s cubic-bezier(0,0,.2,1) infinite;
  }
  .institute-hero .hero-benefit-tag svg { width: 16px; height: 16px; color: #ffd45b; }
  .institute-hero .hero-benefit-ticker {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    padding-block: 12px;
    margin-left: -12px;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
    mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
  }
  .institute-hero .hero-benefit-ticker .hero-track { animation-duration: 28s; will-change: transform; transform: translate3d(0,0,0); }
  .institute-hero .hero-benefit-ticker .hero-copy { align-items: center; }
  .institute-hero .hero-benefit-item {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 12px;
    padding-inline: 18px;
    color: #4b266a;
    font-size: clamp(15px, 1.7vw, 20px);
    font-weight: 800;
    letter-spacing: -.015em;
    line-height: 1.4;
    white-space: nowrap;
  }
  .institute-hero .hero-benefit-word { color: #f58562; }
  .institute-hero .hero-benefit-num {
    font-size: 1.5em;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -.04em;
    color: #f58562;
    background: linear-gradient(100deg, #f58562 0%, #e96849 50%, #f58562 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ihTextShift 4.5s ease-in-out infinite;
  }
  .institute-hero .hero-benefit-spark {
    display: inline-grid;
    place-items: center;
    flex: 0 0 26px;
    width: 26px;
    height: 26px;
    margin-left: 6px;
    border-radius: 50%;
    border: 1px solid #f1d0bc;
    background: linear-gradient(145deg, #fff, #ffe2d0);
    color: #ce6b47;
    box-shadow: 0 3px 0 #deb099, inset 0 1px 0 #fff;
  }
  .institute-hero .hero-benefit-spark svg { width: 14px; height: 14px; animation: ihSpin 7s linear infinite; }
  @keyframes ihTextShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes ihSpin { to { transform: rotate(360deg); } }
  @keyframes ihPing { 0% { transform: scale(1); opacity: .8; } 80%,100% { transform: scale(2.6); opacity: 0; } }
  @keyframes ihBarShine { 0%, 55% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
  @media (max-width: 767px) {
    .institute-hero .hero-benefit-wrap { margin-top: 14px; padding-inline: 12px; }
    .institute-hero .hero-benefit-bar { border-radius: 18px; }
    .institute-hero .hero-benefit-tag {
      gap: 9px;
      padding: 10px 24px 10px 14px;
      font-size: 11px;
      letter-spacing: .08em;
    }
    /* "Our" on the first line, "Promise" on the second */
    .institute-hero .hero-promise-br { display: inline; }
    .institute-hero .hero-benefit-tag-text { line-height: 1.25; text-align: left; white-space: normal; }
    .institute-hero .hero-benefit-ticker { padding-block: 10px; margin-left: -10px; }
    .institute-hero .hero-benefit-item { padding-inline: 12px; gap: 9px; font-size: 15px; }
    .institute-hero .hero-benefit-spark { flex-basis: 22px; width: 22px; height: 22px; margin-left: 2px; }
  }
  @media (max-width: 359px) {
    .institute-hero .hero-benefit-tag { font-size: 10px; letter-spacing: .05em; padding: 9px 20px 9px 12px; gap: 7px; }
    .institute-hero .hero-benefit-item { font-size: 14px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .institute-hero .hero-benefit-bar { flex-direction: column; }
    .institute-hero .hero-benefit-tag { justify-content: center; padding: 10px 16px; clip-path: none; }
    .institute-hero .hero-benefit-tag-text { text-align: center; }
    .institute-hero .hero-promise-br { display: none; }
    .institute-hero .hero-benefit-ticker { margin-left: 0; -webkit-mask-image: none; mask-image: none; }
    .institute-hero .hero-benefit-item { white-space: normal; flex-wrap: wrap; justify-content: center; text-align: center; }
    .institute-hero .hero-benefit-spark { display: none; }
    .institute-hero .hero-benefit-num { animation: none; }
    .institute-hero .hero-benefit-bar::after { display: none; }
  }

  /* ============================================================
     Second ticker (white band, same palette) with chips
     ============================================================ */
  .institute-hero .hero-marquee-section { margin-top: 44px; }
  .institute-hero .hero-marquee-band {
    position: relative;
    isolation: isolate;
    padding-block: 14px;
    border-block: 1px solid #ead9ee;
    background: linear-gradient(180deg, #fff, #fdf9fe 60%, #fff);
    box-shadow: 0 -10px 30px rgba(75,38,106,.04), 0 14px 34px rgba(75,38,106,.06);
  }
  .institute-hero .hero-marquee-band .hero-track { animation-duration: 40s; will-change: transform; transform: translate3d(0,0,0); }
  .institute-hero .hero-marquee-band .hero-copy { align-items: center; gap: 14px; padding-right: 14px; }
  .institute-hero .hero-marquee-chip {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    gap: 11px;
    padding: 8px 20px 8px 10px;
    border: 1px solid #ecdcf0;
    border-radius: 999px;
    background: linear-gradient(145deg, #fff, #faf3fc);
    color: #4b266a;
    font-size: clamp(13px, 1.5vw, 16px);
    font-weight: 800;
    line-height: 1.4;
    white-space: nowrap;
    box-shadow: 0 4px 0 #ecdff1, 0 10px 20px rgba(75,38,106,.07), inset 0 1px 0 #fff;
    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
  }
  .institute-hero .hero-marquee-icon {
    display: grid;
    place-items: center;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #f1d0bc;
    background: linear-gradient(145deg, #fff, #ffe2d0);
    color: #ce6b47;
    box-shadow: 0 3px 0 #deb099, inset 0 1px 0 #fff;
  }
  .institute-hero .hero-marquee-icon svg { width: 15px; height: 15px; }
  .institute-hero .hero-marquee-sep { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #f58562; opacity: .7; }
  .institute-hero .hero-marquee-band::before,
  .institute-hero .hero-marquee-band::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(30px, 8vw, 110px);
    z-index: 3;
    pointer-events: none;
  }
  .institute-hero .hero-marquee-band::before { left: 0; background: linear-gradient(90deg, #fff, rgba(255,255,255,0)); }
  .institute-hero .hero-marquee-band::after { right: 0; background: linear-gradient(270deg, #fff, rgba(255,255,255,0)); }
  @media (hover:hover) and (pointer:fine) {
    .institute-hero .hero-marquee-chip:hover { transform: translateY(-2px); border-color: #e5b9a4; box-shadow: 0 6px 0 #ecdff1, 0 14px 26px rgba(75,38,106,.1), inset 0 1px 0 #fff; }
  }
  @media (max-width: 767px) {
    .institute-hero .hero-marquee-section { margin-top: 34px; }
    .institute-hero .hero-marquee-band { padding-block: 11px; }
    .institute-hero .hero-marquee-band .hero-track { animation-duration: 30s; }
    .institute-hero .hero-marquee-band .hero-copy { gap: 10px; padding-right: 10px; }
    .institute-hero .hero-marquee-chip { padding: 6px 15px 6px 8px; gap: 8px; font-size: 13px; box-shadow: 0 3px 0 #ecdff1, 0 6px 12px rgba(75,38,106,.06), inset 0 1px 0 #fff; }
    .institute-hero .hero-marquee-icon { flex-basis: 24px; width: 24px; height: 24px; }
    .institute-hero .hero-marquee-icon svg { width: 13px; height: 13px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .institute-hero .hero-marquee-band .hero-track { width: 100%; }
    .institute-hero .hero-marquee-band .hero-copy { flex-wrap: wrap; justify-content: center; padding: 0 14px; }
    .institute-hero .hero-marquee-chip { white-space: normal; text-align: center; }
    .institute-hero .hero-marquee-sep,
    .institute-hero .hero-marquee-band::before,
    .institute-hero .hero-marquee-band::after { display: none; }
  }

  /* ============================================================
     Full responsive pass: desktop / tablet / mobile
     ============================================================ */
  .institute-hero { overflow-x: clip; }
  .institute-hero img, .institute-hero svg { max-width: 100%; }
  .institute-hero .hero-heading, .institute-hero .hero-actions,
  .institute-hero .hero-stats-grid, .institute-hero .hero-target { min-width: 0; }

  /* Large desktop */
  @media (min-width: 1280px) {
    .institute-hero .container-x { width: min(100%, 1240px); }
    .institute-hero .hero-title { font-size: clamp(54px, 4.4vw, 66px); }
  }

  /* Tablet: 768px to 1023px */
  @media (min-width: 768px) and (max-width: 1023px) {
    .institute-hero { padding-top: 36px; padding-bottom: 36px; }
    .institute-hero .hero-title { font-size: clamp(36px, 5.6vw, 50px); line-height: 1.17; }
    .institute-hero .hero-promise { font-size: clamp(18px, 2.6vw, 22px); max-width: 640px; }
    .institute-hero .hero-image-copy { font-size: 16px; max-width: 640px; }
    .institute-hero .hero-benefit-wrap { padding-inline: 24px; }
    .institute-hero .hero-image-wrap { max-width: 720px; }
    .institute-hero .hero-stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
    .institute-hero .hero-stat-glass { padding: 24px 10px 22px; border-radius: 22px; }
    .institute-hero .hero-icon-3d { width: 48px; height: 48px; margin-bottom: 18px; border-radius: 16px; }
    .institute-hero .hero-icon-3d svg { width: 23px; height: 23px; }
    .institute-hero .hero-stat-value { font-size: clamp(28px, 4.2vw, 36px); }
    .institute-hero .hero-stat-label { font-size: 11px; line-height: 1.55; }
    .institute-hero .hero-target { padding: 30px; gap: 28px; }
    .institute-hero .hero-visual-frame { max-width: 560px; margin-inline: auto; }
    .institute-hero .hero-target-number { font-size: 76px; }
    .institute-hero .hero-lead-quality { font-size: 24px; }
    .institute-hero .hero-marquee-section { margin-top: 40px; }
  }

  /* Phones */
  @media (max-width: 479px) {
    .institute-hero { padding-bottom: 20px; }
    .institute-hero .hero-benefit-wrap { padding-inline: 10px; }
    .institute-hero .hero-stats-grid { margin-top: 28px; }
    .institute-hero .hero-target { margin-top: 32px; }
    .institute-hero .hero-lead-quality { white-space: normal; text-wrap: balance; }
    .institute-hero .hero-target-number { font-size: 64px; }
  }
  @media (max-width: 359px) {
    .institute-hero .hero-title { font-size: 24px; }
    .institute-hero .hero-promise { font-size: 15px; }
    .institute-hero .hero-stats-grid { gap: 10px; }
  }
  /* Short landscape phones */
  @media (max-height: 480px) and (orientation: landscape) {
    .institute-hero { padding-top: 18px; }
    .institute-hero .hero-title { font-size: clamp(22px, 4.4vw, 30px); }
  }

`;

export default function Hero() {
  const [beforeNum, afterNum] = (benefits[0] || "").split("500+");
  return (
    <section aria-labelledby="institute-hero-title" className="institute-hero">
      <style>{styles}</style>

      {/* Headline */}
      <div className="container-x">
        <header className="hero-heading">
          <p className="hero-eyebrow hero-enter">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span>For Fashion, Beauty and Skill-Based Institutes</span>
          </p>

          <h1 id="institute-hero-title" className="hero-title hero-enter" style={{ "--delay": "80ms" }}>
            <span className="hero-title-line hero-title-keep">
              Get <span className="hero-title-accent">Qualified Student</span>
            </span>{" "}
            <span className="hero-title-line hero-title-tail">
              <span className="hero-title-accent">Leads</span> &amp; Fill Your Next
            </span>{" "}
            <span className="hero-title-line">
              Batch Faster. <span className="hero-title-guarantee">Guaranteed.</span>
            </span>
          </h1>
          <p className="hero-promise hero-enter" style={{ "--delay": "120ms" }}>
            Stop Depending On Referrals, Walk-Ins And Random Enquiries. We Put Your
            Courses Directly In Front Of Prospective Students In Your Target Locations.
          </p>
        </header>
      </div>

      {/* Benefits: fixed tag + looping text */}
      <div className="hero-benefit-wrap">
        <ul className="sr-only">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div className="hero-benefit-bar" aria-hidden="true">
          <span className="hero-benefit-tag">
            <span className="hero-benefit-live" />
            <span className="hero-benefit-tag-text">
              Our{" "}<br className="hero-promise-br" />Promise
            </span>
          </span>

          <div className="hero-ticker hero-benefit-ticker">
            <div className="hero-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className={`hero-copy flex shrink-0 items-center ${
                    copy === 1 ? "hero-duplicate" : ""
                  }`}
                >
                  {[0, 1, 2].map((round) => (
                    <span
                      key={`${copy}-${round}`}
                      className={`hero-benefit-item ${round > 0 ? "hero-duplicate" : ""}`}
                    >
                      <span className="hero-benefit-word">{beforeNum.trim()}</span>
                      <strong className="hero-benefit-num">500+</strong>
                      <span>{(afterNum || "").trim()}</span>
                      <span className="hero-benefit-spark">
                        <HeroIcon name="spark" />
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        {/* Hero image: public/images/Neeraj.png */}
        <figure
          className="hero-image-wrap hero-enter"
          style={{ "--delay": "200ms" }}
        >
          <div aria-hidden="true" className="hero-image-glow" />
          <div className="hero-image-shell">
            <div className="hero-image-screen">
              <img
                className="hero-image-asset"
                src={heroImage}
                alt="Student acquisition funnel connecting fashion, beauty and skill-based institutes with prospective learners"
                width={1672}
                height={941}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </figure>

        <p
          className="hero-image-copy hero-enter"
          style={{ "--delay": "260ms" }}
        >
          Make your courses easier to discover, enquire about, and join—whether it’s fashion, beauty, makeup, or other skill-based programs.
        </p>
      </div>

      <div className="container-x">
        {/* Calls to action */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="hero-actions mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={bookingHref}
              external={bookingIsExternal}
              arrow={false}
            >
              Yes, I Want to Fill My Next Batch
            </Button>
          </div>
        </div>

        <div className="hero-stats-grid mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <GlassStatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <div className="hero-target mx-auto mt-11 grid max-w-5xl items-center gap-8 overflow-hidden rounded-[26px] border border-plum-200/80 p-5 sm:mt-14 sm:rounded-[32px] sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="min-w-0">
            <div className="hero-visual-frame rounded-[22px] border border-white/90 bg-white/55 p-3 sm:p-4">
              <HeroVisual />
            </div>
          </div>

          <div className="min-w-0">
            <p className="hero-target-number font-display font-extrabold text-plum-700">
              500
              <span className="align-top text-[.55em] text-coral-500">+</span>
            </p>
            <span className="hero-lead-quality text-30xl">
              Better Leads.{" "}
              <span>Not Just More Leads.</span>
            </span>
            <p className="mt-3 text-base font-bold text-ink ">
              Quality Student Leads Every Month
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#62536e]">
              A student acquisition system built around your courses and admission goals.
            </p>

            <ol className="mt-6 space-y-2">
              {journey.map((item, index) => (
                <li
                  key={item.title}
                  className="hero-step flex items-start gap-3 rounded-2xl p-3 sm:gap-4"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-xs font-extrabold ${
                      journeyTones[index % journeyTones.length]
                    }`}
                  >
                    <HeroIcon name={["target", "filter", "growth"][index]} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-[1.75] text-[#62536e]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 rounded-2xl border border-sun-200 bg-sun-50 px-4 py-4 text-sm leading-[1.75] text-[#7b6035]">
              Course-specific messaging. Clear enquiry journeys. Reporting that
              helps you understand performance.
            </p>
          </div>
        </div>
      </div>

      {/* Second ticker */}
      {marquee.length > 0 && (
        <div className="hero-marquee-section">
          <ul className="sr-only">
            {marquee.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>

          <div aria-hidden="true" className="hero-ticker hero-marquee-band">
            <div className="hero-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className={`hero-copy flex shrink-0 items-center ${
                    copy === 1 ? "hero-duplicate" : ""
                  }`}
                >
                  {[0, 1].flatMap((round) =>
                    marquee.map((item, index) => (
                      <span
                        key={`${copy}-${round}-${index}`}
                        className={`flex shrink-0 items-center ${round > 0 ? "hero-duplicate" : ""}`}
                        style={{ gap: "inherit" }}
                      >
                        <span className="hero-marquee-chip">
                          <span className="hero-marquee-icon">
                            <HeroIcon name="spark" />
                          </span>
                          {item}
                        </span>
                        <span className="hero-marquee-sep" style={{ marginInline: "14px" }} />
                      </span>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}