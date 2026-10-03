import { useEffect, useRef, useState } from "react";
const journey = [
  {
    "title": "Reach the Right Students",
    "text": "Hyper-local, course-specific Meta Ads put your institute in front of relevant learners."
  },
  {
    "title": "Capture Qualified Enquiries",
    "text": "A focused admission funnel collects the details your counsellors need."
  },
  {
    "title": "Follow Up and Fill Your Batches",
    "text": "Fast lead delivery helps your team turn interest into admission conversations."
  }
];
const marquee = ["Hyper-Local Targeting", "Course-Specific Campaigns", "High-Intent Lead Filtering", "Instant Lead Delivery"];
import {
  bookingHref,
  bookingIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";
import HeroVisual from "./HeroVisual.jsx";
import VideoEmbed from "./VideoEmbed.jsx";
const benefits = ["Guaranteed 300+ Quality Student Leads Every Month."];
const stats = [
  { value: "300+", count: 300, label: "Quality leads every month", icon: "target", tone: "coral" },
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
    if (event.pointerType !== "mouse") return;
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
      <p className="hero-stat-value" aria-label={stat.value}>
        <span aria-hidden="true">{count.toLocaleString("en-IN")}<span>+</span></span>
      </p>
      <p className="hero-stat-label">{stat.label}</p>
    </div>
  );
}

const styles = `
  .institute-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 8% 10%, rgba(255,222,133,.16), transparent 38%),
      radial-gradient(ellipse at 95% 25%, rgba(116,68,148,.07), transparent 38%);
  }
  .institute-hero,
  .institute-hero *,
  .institute-hero *::before,
  .institute-hero *::after {
    box-sizing: border-box;
  }
  .institute-hero .hero-enter {
    animation: ihReveal .8s cubic-bezier(.22,1,.36,1) both;
    animation-delay: var(--delay, 0ms);
  }
  .institute-hero .hero-video-wrap {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 760px;
    min-width: 0;
    margin: 36px auto 0;
  }
  .institute-hero .hero-video-glow {
    position: absolute;
    inset: 16px 24px -12px;
    z-index: -1;
    border-radius: 32px;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      rgba(116,68,148,.22),
      rgba(245,133,98,.2),
      rgba(255,210,91,.24)
    );
    filter: blur(28px);
    animation: ihGlow 6s ease-in-out infinite;
  }
  .institute-hero .hero-video-shell {
    position: relative;
    width: 100%;
    padding: 6px;
    overflow: hidden;
    border: 1px solid rgba(75,38,106,.13);
    border-radius: 25px;
    background: linear-gradient(145deg, #fff, #faf4fc 55%, #fff5e9);
    box-shadow:
      0 20px 48px rgba(75,38,106,.1),
      0 5px 15px rgba(75,38,106,.04),
      inset 0 1px 0 #fff;
    transition: border-color .35s ease, box-shadow .35s ease;
  }
  .institute-hero .hero-video-screen {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    border-radius: 19px;
    background: transparent;
  }
  /* Let VideoEmbed fill the frame instead of sitting inside side panels. */
  .institute-hero .hero-video-screen > * {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .institute-hero .hero-video-screen > div {
    padding: 0 !important;
  }
  .institute-hero .hero-video-screen iframe,
  .institute-hero .hero-video-screen video {
    display: block;
    width: 100%;
    max-width: 100%;
    border: 0;
  }
  .institute-hero .hero-video-screen iframe {
    aspect-ratio: 16 / 9;
  }
  .institute-hero .hero-video-screen video {
    height: auto;
  }
  .institute-hero .hero-video-screen img {
    max-width: 100%;
  }
  .institute-hero .hero-video-screen button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .institute-hero .hero-video-screen button:focus-visible {
    outline: 3px solid #ffd45b;
    outline-offset: -5px;
  }
  .institute-hero .hero-video-shell:focus-within {
    border-color: rgba(75,38,106,.4);
  }
  .institute-hero .hero-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
    color: #786882;
    font-size: 12px;
    line-height: 1.6;
    text-align: center;
  }
  .institute-hero .hero-caption::before,
  .institute-hero .hero-caption::after {
    content: "";
    width: 28px;
    height: 1px;
    background: rgba(75,38,106,.16);
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
    display: flex;
    width: max-content;
    animation: ihMarquee 36s linear infinite;
  }
  .institute-hero .hero-ticker:hover .hero-track {
    animation-play-state: paused;
  }
  .institute-hero .hero-target {
    background:
      radial-gradient(ellipse at top left, rgba(235,222,244,.4), transparent 55%),
      radial-gradient(ellipse at bottom right, rgba(255,231,180,.25), transparent 50%),
      rgba(255,255,255,.88);
    box-shadow:
      0 20px 50px rgba(75,38,106,.06),
      inset 0 1px 0 #fff;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
  .institute-hero .hero-step {
    transition: background-color .3s ease, transform .3s ease;
  }
  .institute-hero .hero-actions a,
  .institute-hero .hero-actions button {
    max-width: 100%;
    min-height: 58px;
    white-space: normal;
    text-align: center;
  }
  @media (hover: hover) and (pointer: fine) {
    .institute-hero .hero-video-shell:hover {
      border-color: rgba(75,38,106,.25);
      box-shadow:
        0 24px 55px rgba(75,38,106,.14),
        0 6px 18px rgba(75,38,106,.05);
    }
    .institute-hero .hero-step:hover {
      transform: translateX(3px);
      background: rgba(255,255,255,.85);
    }
  }
  @media (max-width: 767px) {
    .institute-hero .hero-video-wrap {
      max-width: 620px;
      margin-top: 28px;
    }
    .institute-hero .hero-video-shell {
      padding: 5px;
      border-radius: 21px;
    }
    .institute-hero .hero-video-screen {
      border-radius: 15px;
    }
    .institute-hero .hero-video-glow {
      inset: 12px 16px -8px;
      filter: blur(22px);
    }
  }
  @media (max-width: 480px) {
    .institute-hero .hero-video-wrap {
      margin-top: 25px;
    }
    .institute-hero .hero-video-shell {
      padding: 4px;
      border-radius: 17px;
      box-shadow: 0 12px 28px rgba(75,38,106,.09);
    }
    .institute-hero .hero-video-screen {
      border-radius: 12px;
    }
    .institute-hero .hero-caption {
      margin-top: 12px;
      font-size: 11px;
    }
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
    .institute-hero .hero-track {
      width: 100%;
    }
    .institute-hero .hero-copy {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 0;
    }
    .institute-hero .hero-duplicate {
      display: none;
    }
    .institute-hero .hero-step:hover {
      transform: none;
    }
  }

  /* Liquid glass finish, layered surfaces and local SVG icons. */
  .institute-hero {
    background:
      radial-gradient(ellipse at 4% 3%, #fff0d9 0, transparent 42%),
      radial-gradient(ellipse at 96% 20%, #f1e6fa 0, transparent 44%),
      linear-gradient(180deg, #fffcf9, #fcf8fd 58%, #fffaf4);
  }
  .institute-hero h1 {
    text-shadow: 0 2px 0 rgba(255,255,255,.8);
  }
  .institute-hero .hero-video-shell {
    padding: 9px;
    border: 1px solid rgba(255,255,255,.95);
    border-radius: 30px;
    background: linear-gradient(135deg,#ffffffd9,#f4eafa9c,#fff5e4d9);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 25px 65px #4b266a18, 0 5px 0 #e8d9ef, inset 0 2px 0 #fff;
  }
  .institute-hero .hero-video-screen { border-radius: 23px; }
  .institute-hero .hero-video-glow { animation: ihGlow 6s ease-in-out infinite; }
  .institute-hero .hero-actions a {
    position: relative;
    border-radius: 19px;
    box-shadow: 0 5px 0 #3f2059, 0 17px 32px #74449424;
    transition: transform .3s ease, box-shadow .3s ease;
  }
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
  .institute-hero .hero-step { border: 1px solid transparent; }
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
    .institute-hero .hero-actions a:hover { transform: translateY(-3px); box-shadow: 0 7px 0 #3f2059, 0 21px 38px #74449430; }
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
    .institute-hero .hero-video-shell { padding: 5px; border-radius: 22px; }
    .institute-hero .hero-video-screen { border-radius: 17px; }
    .institute-hero .hero-actions a { width: 100%; }
  }
  @keyframes ihIconFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes ihShine { from { transform: translateX(-55%); } to { transform: translateX(55%); } }
  @media (prefers-reduced-motion:reduce) {
    .institute-hero .hero-stat-glass { transform: none!important; }
    .institute-hero .hero-stat-shine { display: none; }
    .institute-hero .hero-actions a:hover { transform: none; }
  }

  .institute-hero .hero-actions a:focus-visible {
    outline: 3px solid #f58562;
    outline-offset: 6px;
  }
  .institute-hero .hero-video-shell:focus-within {
    border-color: #b892cc;
    box-shadow: 0 25px 65px #4b266a18, 0 0 0 3px #ead9f1;
  }
  @supports not (backdrop-filter: blur(24px)) {
    .institute-hero .hero-stat-glass,
    .institute-hero .hero-target,
    .institute-hero .hero-video-shell {
      background-color: #fffcfe;
    }
  }
  @media (max-width:359px) {
    .institute-hero .hero-stat-glass {
      padding-inline: 10px;
    }
    .institute-hero .hero-stat-label {
      font-size: 10px;
      overflow-wrap: anywhere;
    }
  }
`;
export default function Hero() {
  return (
    <section className="institute-hero pb-12 pt-9 sm:pb-20 sm:pt-14">
      <style>{styles}</style>
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="grain absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute -left-28 top-32 h-72 w-72 rounded-full bg-sun-400/15 blur-3xl" />
        <div className="absolute -right-32 top-72 h-80 w-80 rounded-full bg-plum-200/30 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-plum-700/10 [background:repeating-radial-gradient(circle,transparent_0_35px,rgba(75,38,106,.05)_36px_37px,transparent_38px_72px)]" />
      </div>
      {/* Headline */}
      <div className="container-x">
        <div className="mx-auto max-w-5xl text-center">
          <p className="hero-enter inline-flex max-w-full items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-plum-800 to-plum-700 px-4 py-2.5 text-left text-xs font-semibold leading-relaxed text-white shadow-soft sm:px-6 sm:text-sm">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-sun-400"
            />
            Meta Ads for fashion, beauty and skill-based institutes
          </p>
          <h1
            className="hero-enter mx-auto mt-7 max-w-[980px] text-[clamp(2rem,5.3vw,4.5rem)] font-extrabold leading-[1.12] tracking-[-0.045em] text-ink [text-wrap:balance] sm:mt-8"
            style={{ "--delay": "80ms" }}
          >
            Get More <span className="text-coral-500">Student Admissions,</span>{" "}
            Lower Your Cost Per Lead &amp; Fill Your Upcoming Batches Faster
            <span className="mt-5 block text-[clamp(1.15rem,2.7vw,2rem)] leading-snug tracking-[-0.025em] text-plum-700">
              Without Spending an Extra Rupee on Advertising.
            </span>
          </h1>
          <p
            className="hero-enter mx-auto mt-5 max-w-[730px] text-base leading-[1.8] text-[#62536e] sm:mt-6 sm:text-lg lg:text-xl"
            style={{ "--delay": "140ms" }}
          >
            Stop depending on referrals, walk-ins and random enquiries. We put your
            courses directly in front of prospective students in your target locations.
          </p>
        </div>
        {/* Video */}
        <div
          className="hero-video-wrap hero-enter"
          style={{ "--delay": "200ms" }}
        >
          <div aria-hidden="true" className="hero-video-glow" />
          <div className="hero-video-shell">
            <div className="hero-video-screen">
              <VideoEmbed />
            </div>
          </div>
          <p className="hero-caption">Watch the video</p>
        </div>
        <p
          className="hero-enter mx-auto mt-7 max-w-[740px] text-center text-base leading-[1.85] text-[#62536e] sm:mt-9 sm:text-lg"
          style={{ "--delay": "260ms" }}
        >
          Whether you offer fashion designing, makeup, beauty or other
          skill-based programs, make it easier for interested students to
          discover your courses, request details and connect with your
          admissions team.
        </p>
      </div>
      {/* Benefits */}
      <div className="mt-8 sm:mt-10">
        <ul className="sr-only">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="hero-ticker border-y border-coral-500/15 bg-gradient-to-r from-coral-50/30 via-coral-50/70 to-sun-50/40 py-4 sm:py-5"
        >
          <div className="hero-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={`hero-copy flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6 ${
                  copy === 1 ? "hero-duplicate" : ""
                }`}
              >
                {[0, 1, 2].flatMap((round) =>
                  benefits.map((benefit) => (
                    <span
                      key={`${copy}-${round}-${benefit}`}
                      className={`flex items-center gap-3 whitespace-nowrap rounded-full border border-plum-200/70 bg-white px-5 py-3 text-sm font-bold text-plum-700 shadow-soft sm:px-7 sm:text-base ${
                        round > 0 ? "hero-duplicate" : ""
                      }`}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral-50 text-coral-500">
                        <HeroIcon name="spark" />
                      </span>
                      {benefit}
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-x">
        {/* Calls to action */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="hero-actions mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={bookingHref}
              external={bookingIsExternal}
              className="!px-6 !text-base sm:min-w-[320px]"
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
        {/* Target panel */}
        <div className="hero-target mx-auto mt-11 grid max-w-5xl items-center gap-8 overflow-hidden rounded-[26px] border border-plum-200/80 p-5 sm:mt-14 sm:rounded-[32px] sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="min-w-0">
            <div className="rounded-[22px] border border-white/90 bg-white/55 p-3 sm:p-4">
              <HeroVisual />
            </div>
            <p className="mt-3 text-center text-xs text-mute">
              Sample layout for illustration
            </p>
          </div>
          <div className="min-w-0">
            <p className="font-display text-7xl font-extrabold leading-none tracking-tighter text-plum-700 sm:text-8xl">
              300
              <span className="align-top text-[.55em] text-coral-500">
                +
              </span>
            </p>
            <p className="mt-3 text-base font-bold text-ink">
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
        <div className="mt-11 sm:mt-14">
          <ul className="sr-only">
            {marquee.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="hero-ticker border-y border-plum-200/60 bg-white/30 py-4"
          >
            <div
              className="hero-track"
              style={{ animationDuration: "42s" }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className={`hero-copy flex shrink-0 items-center ${
                    copy === 1 ? "hero-duplicate" : ""
                  }`}
                >
                  {marquee.map((item, index) => (
                    <span
                      key={`${copy}-${index}`}
                      className="flex items-center gap-6 whitespace-nowrap px-5 text-sm font-bold text-plum-700 sm:px-7"
                    >
                      {item}
                      <span className="text-coral-500"><HeroIcon name="spark" /></span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}