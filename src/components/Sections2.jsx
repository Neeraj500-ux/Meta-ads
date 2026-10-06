// Complete replacement for src/components/Sections2.jsx.
// Keep your existing content.js, ui.jsx, site.js and Tailwind theme.
import { useEffect, useRef, useState } from "react";
import {
  audiences,
  processDetails,
  reportMeasures,
  testimonials,
  featuredCampaign,
} from "../data/content.js";
import {
  Reveal,
  SectionHead,
  SectionCta,
  Button,
} from "./ui.jsx";
import {
  bookingHref,
  bookingIsExternal,
} from "../config/site.js";

const sectionStyles = `
  .edu-sections {
    --edu-plum: #4b2467;
    --edu-ink: #30223e;
    --edu-muted: #776982;
    position: relative;
    padding-block: clamp(48px, 7vw, 100px);
    color: var(--edu-ink);
    scroll-margin-top: 90px;
  }
  .edu-sections, .edu-sections *, .edu-sections *::before,
  .edu-sections *::after { box-sizing: border-box; }
  .edu-sections .container-x {
    width: min(100%, 1200px);
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 40px);
    min-width: 0;
  }
  .edu-sections h2 {
    font-size: clamp(27px, 3.5vw, 44px);
    line-height: 1.18;
    letter-spacing: -.025em;
    text-wrap: balance;
  }
  .edu-sections h3 { line-height: 1.35; text-wrap: balance; }
  .edu-sections p, .edu-sections dd, .edu-sections blockquote {
    line-height: 1.75;
    overflow-wrap: anywhere;
  }
  .edu-sections p, .edu-sections dd { color: var(--edu-muted); }
  .edu-sections h2, .edu-sections h3, .edu-sections dt {
    overflow-wrap: anywhere;
  }
  .edu-sections .grid > *, .edu-sections figure,
  .edu-sections blockquote, .edu-sections dl { min-width: 0; }
  .edu-sections figure, .edu-sections blockquote,
  .edu-sections dd { margin-inline: 0; }
  .edu-sections img { max-width: 100%; }
  .edu-sections .card {
    min-width: 0;
    height: 100%;
    padding: clamp(21px, 2.6vw, 32px);
    border: 1px solid #e7d6ef;
    border-radius: 24px;
    background: linear-gradient(145deg, #fff, #fcf8ff);
    box-shadow: inset 0 1px 0 #fff, 0 16px 38px -28px rgba(75,36,103,.28);
  }
  .edu-sections a {
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    text-align: center;
  }
  .edu-sections a:focus-visible {
    outline: 3px solid #ff7c53;
    outline-offset: 5px;
  }
  .edu-sections .edu-service-icon {
    position: relative;
    width: 56px;
    height: 56px;
    margin-bottom: 25px;
    flex-shrink: 0;
  }
  .edu-service-icon svg { width: 25px; height: 25px; }
  .edu-service-number {
    position: absolute;
    top: -8px;
    right: -12px;
    display: grid;
    place-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #e7d6ef;
    border-radius: 9px;
    background: #fff;
    color: #4b2467;
    font-size: 10px;
    box-shadow: 0 3px 9px rgba(75,36,103,.08);
  }
  .edu-sections .edu-report { gap: 28px; padding: clamp(22px, 3vw, 36px); }
  .edu-sections .edu-pricing { padding: clamp(24px, 4vw, 40px); }
  .edu-sections .edu-result-card { padding: clamp(21px, 4vw, 40px) !important; }
  .edu-sections .edu-result-item { min-width: 0; padding: clamp(16px, 2vw, 22px); }
  .edu-sections .edu-audience-copy { padding: clamp(22px, 2.6vw, 30px); }
  .edu-sections .edu-testimonial { display: flex; flex-direction: column; }
  .edu-sections .edu-testimonial blockquote { font-size: clamp(17px, 2vw, 21px); }
  .edu-sections .edu-testimonial figcaption { margin-top: auto; padding-top: 22px; }
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
    background: radial-gradient(circle at 25% 25%, #eadbf3, transparent 65%),
      linear-gradient(135deg, #faf3fb, #fff4df);
  }
  .edu-image-placeholder svg { width: 44px; height: 44px; opacity: .7; }
  @media (max-width: 900px) and (min-width: 768px) {
    .edu-process .ep-row { gap: 18px; grid-template-columns: minmax(0,1fr) 56px minmax(0,1fr); }
    .edu-process .ep-node { width: 52px; height: 52px; }
    .edu-process .ep-card { padding: 20px; }
    .edu-process .ep-card::after { width: 18px; right: -18px; top: 25px; }
    .edu-process .ep-row:nth-child(even) .ep-card::after { left: -18px; }
    .edu-process .ep-card-header { align-items: flex-start; gap: 10px; }
    .edu-process .ep-icon { width: 38px; height: 38px; }
  }
  @media (max-width: 639px) {
    .edu-sections .edu-report { grid-template-columns: minmax(0,1fr); gap: 22px; }
    .edu-sections .edu-report > div + div { padding-top: 22px; border-top: 1px solid #e7d6ef; }
    .edu-sections .edu-pricing a { width: 100%; min-height: 48px; }
    .edu-sections .edu-cta a { width: 100%; min-height: 48px; }
    .edu-sections .edu-audience-grid { gap: 22px; }
    .edu-sections .edu-testimonial figcaption { padding-top: 18px; }
    .edu-process .ep-card-header { align-items: flex-start; }
  }
  @media (max-width: 379px) {
    .edu-sections .container-x { padding-inline: 14px; }
    .edu-sections .card { padding: 20px; border-radius: 20px; }
    .edu-process .ep-card-header { flex-wrap: wrap; }
    .edu-process .ep-card-header > .min-w-0 { flex: 1 1 110px; }
  }
  @media (hover: hover) and (pointer: fine) {
    .edu-sections .card:hover { border-color: #cfb1de; box-shadow: 0 22px 45px -28px rgba(75,36,103,.32); }
  }
  @media (prefers-reduced-motion: reduce) {
    .edu-sections *, .edu-sections *::before, .edu-sections *::after {
      animation: none !important;
      transition: none !important;
    }
    .edu-sections .group:hover, .edu-sections .group:hover img,
    .edu-sections .card:hover { transform: none !important; }
  }
`;

// Each export can be mounted independently with its responsive styles.
function SectionFrame({ className = "", children, ...props }) {
  return (
    <section {...props} className={`edu-sections ${className}`}>
      <style>{sectionStyles}</style>
      {children}
    </section>
  );
}

const steps = [
  {
    "title": "Strategy Setup",
    "text": "We understand your courses, ideal students, target locations and admission goals before building your campaign plan."
  },
  {
    "title": "Admission Funnel & Campaign Setup",
    "text": "We create your student enquiry system and launch course-specific Meta Ads designed to attract interested learners."
  },
  {
    "title": "Lead Collection System",
    "text": "Students submit their details through a clear enquiry form with qualification questions relevant to your institute."
  },
  {
    "title": "Daily Lead Delivery",
    "text": "New enquiries are delivered directly to your team for quick calls, counselling and follow-up."
  },
  {
    "title": "Batch Filling Support",
    "text": "We review campaign performance and feedback from your admissions team to refine the system and support your batch-filling goals."
  }
];
const whyChoose = [
  {
    "title": "Specialized in Education Marketing",
    "text": "We focus on student lead generation, with campaigns shaped around courses, admission cycles and the decisions learners make."
  },
  {
    "title": "Proven Lead Generation Framework",
    "text": "Our framework combines relevant audiences, course-focused messaging and qualification questions to attract students interested in learning a skill."
  },
  {
    "title": "Consistent Lead Flow",
    "text": "Keep your courses visible throughout the month, so enquiries do not depend only on referrals or admission season."
  },
  {
    "title": "Complete Done-For-You Service",
    "text": "We handle strategy, creatives, campaign management, optimization and reporting, while your team focuses on counselling and admissions."
  }
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
    files: [
      "beauty-institute.png.png",
      "beauty-institute.png",
    ],
    alt: "Beauty and makeup training at an institute",
  },
  skills: {
    files: [
      "skills-institute.png.png",
      "skills-institute.png",
    ],
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
      className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
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
                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-plum-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-plum-50">
                  {image ? (
                    <AudienceImage
                      key={audienceKey}
                      image={image}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-5 text-center text-sm font-semibold text-plum-700">
                      {audience.title}
                    </div>
                  )}
                </div>
                <div className="edu-audience-copy flex flex-1 flex-col p-6 sm:p-7">
                  <span
                    className={`inline-block self-start rounded-lg px-2.5 py-1 text-xs font-bold ${
                      audienceTint[index % audienceTint.length]
                    }`}
                  >
                    {audience.label}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">
                    {audience.title}
                  </h3>
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
        <Reveal className="mx-auto mt-10 max-w-2xl text-center text-[15px]">
          This service is suited to institutes with a clear course offering and
          a team ready to respond to student enquiries.
        </Reveal>
        <div className="edu-cta"><SectionCta href={bookingHref} external={bookingIsExternal}>
          Discuss My Courses
        </SectionCta></div>
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
    position: relative;
    isolation: isolate;
    background: linear-gradient(155deg, #fff 0%, #fbf6fd 48%, #fffaf0 100%);
  }
  .edu-process *, .edu-process *::before, .edu-process *::after {
    box-sizing: border-box;
  }
  .ep-timeline {
    --ep-progress: 0;
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
    padding: 8px 0;
    list-style: none;
  }
  .ep-rail {
    position: absolute;
    z-index: -1;
    top: 38px;
    bottom: 38px;
    left: 50%;
    width: 3px;
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
    box-shadow: 0 0 12px rgba(255,124,83,.4);
  }
  .ep-row {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
    align-items: start;
    gap: 26px;
    padding: 0 0 42px;
    min-width: 0;
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
    transition: background .35s ease, color .35s ease, border-color .35s ease, box-shadow .35s ease;
  }
  .ep-row.is-reached .ep-node {
    border-color: #fff;
    background: linear-gradient(145deg, #65417f, var(--ep-plum));
    color: #fff;
    box-shadow: 0 0 0 5px #eee1f5, 0 8px 22px -7px rgba(75,36,103,.45);
  }
  .ep-row:nth-child(even).is-reached .ep-node {
    background: linear-gradient(145deg, #ff996e, var(--ep-coral));
    box-shadow: 0 0 0 5px #ffeadf, 0 8px 22px -7px rgba(255,124,83,.4);
  }
  .ep-row.is-current .ep-node::after {
    content: "";
    position: absolute;
    inset: -7px;
    border: 1px solid rgba(75,36,103,.25);
    border-radius: inherit;
    animation: ep-node-pulse 2.8s ease-out infinite;
    pointer-events: none;
  }
  .ep-card {
    --ep-enter-x: -18px;
    position: relative;
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    padding: 25px;
    border: 1px solid #e7d6ef;
    border-radius: 23px;
    background: linear-gradient(145deg, rgba(255,255,255,.97), rgba(249,243,253,.92));
    box-shadow: inset 0 1px 0 #fff, 0 5px 0 rgba(227,212,235,.24), 0 18px 36px -25px rgba(75,36,103,.32);
    transition: opacity .65s ease, transform .65s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease, border-color .3s ease;
  }
  .ep-row:nth-child(even) .ep-card {
    --ep-enter-x: 18px;
    grid-column: 3;
    background: linear-gradient(145deg, #fff, #fff8ee);
    border-color: #efddcc;
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
  .ep-row:nth-child(even) .ep-card::after {
    right: auto;
    left: -25px;
    background: #efcfb8;
  }
  .ep-card-header { display: flex; align-items: center; gap: 13px; }
  .ep-icon {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 46px;
    height: 46px;
    border: 1px solid #fff;
    border-radius: 15px;
    background: linear-gradient(145deg, #fff, #eadaf5);
    color: var(--ep-plum);
    box-shadow: inset 0 1px 0 #fff, 0 4px 0 #e3d4eb;
  }
  .ep-row:nth-child(even) .ep-icon {
    color: #c75d37;
    background: linear-gradient(145deg, #fff, #ffe5d1);
    box-shadow: inset 0 1px 0 #fff, 0 4px 0 #efdbc9;
  }
  .ep-row:last-child .ep-icon {
    color: var(--ep-plum);
    background: linear-gradient(145deg, #fff, #fff0b3);
    box-shadow: inset 0 1px 0 #fff, 0 4px 0 #e9dfb5;
  }
  .ep-icon svg { width: 23px; height: 23px; }
  .ep-step-label {
    display: block;
    margin-bottom: 5px;
    color: #8b719b;
    font-size: 10px;
    font-weight: 750;
    letter-spacing: .13em;
    text-transform: uppercase;
  }
  .ep-card h3 {
    margin: 0;
    color: var(--ep-ink);
    font-size: clamp(18px, 1.65vw, 22px);
    font-weight: 750;
    line-height: 1.35;
    overflow-wrap: break-word;
  }
  .ep-card p {
    margin: 16px 0 0;
    color: var(--ep-muted);
    font-size: 15px;
    line-height: 1.75;
    overflow-wrap: break-word;
  }
  .ep-timeline.is-enhanced .ep-row:not(.is-visible) .ep-card {
    opacity: 0;
    transform: translate(var(--ep-enter-x), 14px);
  }
  .ep-timeline.is-enhanced .ep-row.is-visible .ep-card { opacity: 1; transform: none; }
  .ep-details {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    max-width: 940px;
    margin: 44px auto 0;
    padding: 24px;
    border: 1px solid #e7d6ef;
    border-radius: 23px;
    background: rgba(255,255,255,.8);
    box-shadow: 0 15px 35px -25px rgba(75,36,103,.25);
  }
  .ep-details p { min-width: 0; margin: 0; color: var(--ep-muted); font-size: 14px; line-height: 1.7; }
  .ep-details strong { display: block; margin-bottom: 5px; color: var(--ep-plum); }
  @media (hover: hover) and (pointer: fine) {
    .ep-timeline .ep-row.is-visible .ep-card:hover,
    .ep-timeline:not(.is-enhanced) .ep-card:hover {
      transform: translateY(-4px);
      border-color: #c8a5db;
      box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(227,212,235,.24), 0 24px 40px -24px rgba(75,36,103,.36);
    }
  }
  @media (max-width: 767px) {
    .ep-timeline { max-width: 560px; }
    .ep-rail { left: 24px; }
    .ep-row { grid-template-columns: 48px minmax(0, 1fr); gap: 17px; padding-bottom: 27px; }
    .ep-node { grid-column: 1; width: 48px; height: 48px; font-size: 15px; }
    .ep-card, .ep-row:nth-child(even) .ep-card { --ep-enter-x: 0px; grid-column: 2; padding: 20px; border-radius: 20px; }
    .ep-card::after, .ep-row:nth-child(even) .ep-card::after { top: 23px; left: -17px; right: auto; width: 17px; }
    .ep-icon { width: 39px; height: 39px; border-radius: 13px; }
    .ep-icon svg { width: 20px; height: 20px; }
    .ep-card-header { gap: 11px; }
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
    .ep-card::after, .ep-row:nth-child(even) .ep-card::after { top: 19px; left: -12px; width: 12px; }
    .ep-card-header { align-items: flex-start; gap: 9px; }
    .ep-icon { width: 32px; height: 32px; border-radius: 10px; }
    .ep-icon svg { width: 18px; height: 18px; }
    .ep-card h3 { font-size: 16px; }
    .ep-card p { font-size: 13px; }
    .ep-step-label { font-size: 9px; }
  }
  @keyframes ep-node-pulse {
    0% { transform: scale(1); opacity: .65; }
    100% { transform: scale(1.3); opacity: 0; }
  }
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
                <article className="ep-card">
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
        <div className="edu-cta"><SectionCta href={bookingHref} external={bookingIsExternal}>
          Discuss My Campaign Strategy
        </SectionCta></div>
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
      ].filter(
        ([, value]) =>
          value !== undefined && value !== null && value !== ""
      )
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
        <Reveal className="edu-result-card card mx-auto max-w-4xl !p-7 sm:!p-10">
          <h3 className="text-xl font-bold">
            {campaign
              ? "Featured campaign"
              : "What every campaign report covers"}
          </h3>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map(([term, description], index) => (
              <div
                key={term}
                className={`edu-result-item rounded-2xl border border-plum-100 p-5 ${
                  index % 4 === 1 || index % 4 === 2
                    ? "bg-sun-50"
                    : "bg-white"
                }`}
              >
                <dt className="text-sm font-bold text-plum-700">
                  {term}
                </dt>
                <dd className="mt-1 text-[15px]">
                  {description}
                </dd>
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
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              key={testimonial.name}
              delay={index * 80}
              className="edu-testimonial card"
            >
              <blockquote className="font-display text-xl leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-plum-100 pt-4 text-sm">
                <strong>{testimonial.name}</strong>
                <br />
                {testimonial.role}, {testimonial.institute}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
export function WhyChoose() {
  const accentColors = [
    "bg-plum-700",
    "bg-coral-500",
    "bg-sun-400",
  ];
  return (
    <SectionFrame className="section-y">
      <div className="container-x">
        <SectionHead title="Why Institutes Choose Us" />
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {whyChoose.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 80}
              className="card transition duration-300 hover:-translate-y-1 hover:border-plum-300 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className={`mb-5 block h-1.5 w-12 rounded-full ${
                  accentColors[index % accentColors.length]
                }`}
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-[15px]">{item.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="edu-cta"><SectionCta href={bookingHref} external={bookingIsExternal}>
          Let’s Discuss Your Admission Goals
        </SectionCta></div>
      </div>
    </SectionFrame>
  );
}
