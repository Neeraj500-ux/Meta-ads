import { useEffect, useRef, useState } from "react";

import { bookingHref, bookingIsExternal } from "../config/site.js";

import { Button } from "./ui.jsx";

import HeroVisual from "./HeroVisual.jsx";

const heroImageBase = import.meta.env.BASE_URL || "/";

const defaultHeroImage = `${heroImageBase.endsWith("/") ? heroImageBase : `${heroImageBase}/`}images/${encodeURIComponent("Neeraj.png")}`;

const defaultJourney = [

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

const defaultMarquee = ["Hyper-Local Targeting", "Course-Specific Campaigns", "High-Intent Lead Filtering", "Instant Lead Delivery"];

const defaultBenefits = ["Guaranteed 500+ Quality Student Leads Every Month."];

const defaultStats = [

  { value: "500+", count: 500, label: "Quality leads every month", icon: "target", tone: "coral" },

  { value: "50+", count: 50, label: "Happy clients", icon: "people", tone: "plum" },

  { value: "500+", count: 500, label: "Systems built", icon: "layers", tone: "sun" },

  { value: "20+", count: 20, label: "People in our in-house team", icon: "team", tone: "plum" },

];

const defaultJourneyTones = [

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

export function HeroHeading() {

  return (

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

        <p
          className="hero-promise hero-enter"
          style={{
            "--delay": "120ms",
            fontSize: "clamp(20px, 4vw, 30px)",
          }}
        >
          We Put Your Courses Directly In Front Of Prospective Students In Your
          Target Locations.
        </p>

      </header>

    </div>

  );

}

export function HeroBenefits({ benefits = defaultBenefits } = {}) {

  benefits = Array.isArray(benefits) ? benefits : defaultBenefits;

  if (!benefits.length) return null;

  const [beforeNum, afterNum] = String(benefits[0] || "").split("500+");

  return (

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

                className={`hero-copy flex shrink-0 items-center ${copy === 1 ? "hero-duplicate" : ""

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

  );

}

export function HeroImageSection({ image = defaultHeroImage } = {}) {

  return (

    <div className="container-x">

      <figure

        className="hero-image-wrap hero-enter"

        style={{ "--delay": "200ms" }}

      >

        <div aria-hidden="true" className="hero-image-glow" />

        <div className="hero-image-shell">

          <div className="hero-image-screen">

            <img

              className="hero-image-asset"

              src={image}

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


    </div>

  );

}

export function HeroActions() {

  return (

    <div className="container-x">

      <div className="mx-auto max-w-4xl text-center">

        <div className="hero-actions mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">

          <Button

            href={bookingHref}

            external={bookingIsExternal}

            arrow={false}

            data-enquiry-popup-trigger

          >

            Yes, I Want to Fill My Next Batch

          </Button>

        </div>


      </div>


      <p

        className="hero-image-copy hero-enter "

        style={{ "--delay": "260ms" }}

      >

        Make your courses easier to discover, enquire about, and join—whether it’s fashion, beauty, makeup, or other skill-based programs.

      </p>
    </div>


  );

}

export function HeroStats({ stats = defaultStats } = {}) {
  stats = Array.isArray(stats) ? stats : defaultStats;

  return (
    <div className="container-x">
      <div className="hero-stats-grid mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4 [&_.hero-stat-label]:!text-[15px]">
        {stats.map((stat, index) => (
          <GlassStatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
}

export function HeroTarget({ journey = defaultJourney, journeyTones = defaultJourneyTones } = {}) {

  journey = Array.isArray(journey) ? journey : defaultJourney;

  journeyTones = Array.isArray(journeyTones) && journeyTones.length ? journeyTones : defaultJourneyTones;

  const targetRef = useRef(null);
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.IntersectionObserver
    ) {
      setLeadCount(500);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      const startedAt = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setLeadCount(Math.round(500 * eased));

        if (progress < 1) frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
    }, { threshold: 0.3 });

    observer.observe(target);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ht-independent">
      <style>{`
.ht-independent { width:100%; min-width:0; text-align:left; }
.ht-independent, .ht-independent *, .ht-independent *::before, .ht-independent *::after { box-sizing:border-box; }
.ht-independent > .container-x { width:100%; max-width:1100px; margin-inline:auto; padding-inline:clamp(12px,2vw,24px); }
.ht-independent .hero-target {
  display:grid; grid-template-columns:minmax(0,.95fr) minmax(0,1.1fr);
  align-items:center; gap:clamp(24px,4vw,44px); width:100%; max-width:100%;
  margin:32px auto 0; padding:clamp(24px,3.5vw,42px); min-width:0;
  border:1px solid #e7d7ed; border-radius:30px; text-align:left;
  background:radial-gradient(ellipse at 0 0,rgba(235,218,247,.5),transparent 55%),linear-gradient(135deg,#fffdff,#fffaf5);
  box-shadow:0 20px 50px rgba(75,38,106,.07),inset 0 1px 0 #fff;
}
.ht-independent .hero-target > div { min-width:0; }
.ht-independent .hero-visual-frame { width:100%; min-width:0; padding:14px; border:1px solid #fff; border-radius:26px; background:rgba(255,255,255,.65); box-shadow:0 16px 35px rgba(75,38,106,.06); }
.ht-independent .hero-visual-frame > * { width:100%; max-width:100%; min-width:0; }
.ht-independent .hero-target-number { margin:0; color:#4b266a; font-size:clamp(76px,8vw,104px); font-weight:800; line-height:1; letter-spacing:-.065em; }
.ht-independent .hero-target-number > span { color:#ff7956; font-size:.45em; vertical-align:top; line-height:1.2; }
.ht-independent .hero-lead-quality { display:block; margin:15px 0 0; color:#4b266a; font-size:clamp(28px,3vw,36px); font-weight:800; line-height:1.25; letter-spacing:-.035em; text-wrap:balance; }
.ht-independent .hero-lead-quality > span { color:#f46b48; }
.ht-independent .hero-lead-quality + p { margin:16px 0 0; color:#30223e; font-size:15px; font-weight:750; line-height:1.5; }
.ht-independent .hero-lead-quality + p + p { margin:7px 0 0; color:#74637f; font-size:14px; line-height:1.8; }
.ht-independent .hero-target ol { list-style:none; padding:0; margin:24px 0 0; }
.ht-independent .hero-step { display:flex; align-items:flex-start; gap:15px; padding:14px 10px; border:1px solid transparent; border-radius:16px; text-align:left; transition:background-color .2s,border-color .2s; }
.ht-independent .hero-step > span { display:grid; place-items:center; flex:0 0 40px; width:40px; height:40px; border-radius:12px; box-shadow:0 4px 0 rgba(75,38,106,.12),inset 0 1px 0 #fff; }
.ht-independent .hero-step svg { display:block; width:22px; height:22px; }
.ht-independent .hero-step h3 { margin:0; color:#30223e; font-size:16px; font-weight:750; line-height:1.4; letter-spacing:-.02em; }
.ht-independent .hero-step p { margin:6px 0 0; color:#74637f; font-size:14px; line-height:1.8; overflow-wrap:anywhere; }
.ht-independent .hero-target > div:last-child > p:last-child { margin:22px 0 0; padding:15px 18px; border:1px solid #f1dfcc; border-radius:16px; background:linear-gradient(120deg,#fff8ee,#fffdf9); color:#826342; font-size:13px; line-height:1.75; }
@media(hover:hover) and (pointer:fine) { .ht-independent .hero-step:hover { background:#ffffffb8; border-color:#eadcf1; } }
@media(max-width:900px) {
  .ht-independent .hero-target { grid-template-columns:minmax(0,1fr); gap:28px; }
  .ht-independent .hero-visual-frame { max-width:440px; margin-inline:auto; }
}
@media(max-width:480px) {
  .ht-independent > .container-x { padding-inline:0; }
  .ht-independent .hero-target { margin-top:24px; padding:22px 16px; border-radius:24px; }
  .ht-independent .hero-target-number { font-size:74px; }
  .ht-independent .hero-lead-quality { font-size:28px; }
  .ht-independent .hero-step { gap:12px; padding:12px 0; }
  .ht-independent .hero-step h3 { font-size:15px; }
  .ht-independent .hero-step p { font-size:13px; }
}
@media(prefers-reduced-motion:reduce) { .ht-independent .hero-step { transition:none; } }
`}</style>

      <div className="container-x">

        <div ref={targetRef} className="hero-target mx-auto mt-11 grid max-w-5xl items-center gap-8 overflow-hidden rounded-[26px] border border-plum-200/80 p-5 sm:mt-14 sm:rounded-[32px] sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-10">

          {/* <div className="min-w-0"> */}

            {/* <div className="hero-visual-frame rounded-[22px] border border-white/90 bg-white/55 p-3 sm:p-4"> */}

              <HeroVisual />

            {/* </div> */}

          {/* </div> */}

          <div className="min-w-0">

            <p className="hero-target-number font-display font-extrabold text-plum-700">

              {leadCount}

              <span className="align-top text-[.55em] text-coral-500">+</span>

            </p>

            <span className="hero-lead-quality">

              Better Leads.{" "}

              <span>Not Just More Leads.</span>

            </span>

            <p className="mt-3 text-[15px] font-bold text-ink">

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

                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-xs font-extrabold ${journeyTones[index % journeyTones.length]

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

    </div>
  );

}

export function HeroMarquee({ items = defaultMarquee } = {}) {

  items = Array.isArray(items) ? items : defaultMarquee;

  if (!items.length) return null;

  return (

    <div className="hero-marquee-section">

      <ul className="sr-only">

        {items.map((item, index) => (

          <li key={`${item}-${index}`}>{item}</li>

        ))}

      </ul>

      <div aria-hidden="true" className="hero-ticker hero-marquee-band">

        <div className="hero-track">

          {[0, 1].map((copy) => (

            <div

              key={copy}

              className={`hero-copy flex shrink-0 items-center ${copy === 1 ? "hero-duplicate" : ""

                }`}

            >

              {[0, 1].flatMap((round) =>

                items.map((item, index) => (

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

  );

}
