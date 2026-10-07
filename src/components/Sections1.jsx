import { useId, useState } from "react";

import { Reveal, Button } from "./ui.jsx";

import { bookingHref, bookingIsExternal, site } from "../config/site.js";

// Complete replacement for Sections1.jsx. No additional packages required.

import { HeroTarget } from "./HeroSections.jsx";

const problems = [

  {

    title: "Ads in the wrong locations",

    text: "Your budget reaches students outside your service area.",

  },

  {

    title: "Leads from cities you don’t serve",

    text: "Enquiries come from students who cannot attend your classes.",

  },

  {

    title: "Students asking about the wrong course",

    text: "Generic ads attract interest in programs you don’t offer.",

  },

  {

    title: "Enquiries that never answer calls",

    text: "Low-intent leads leave your team chasing responses.",

  },

  {

    title: "Hours spent on unqualified leads",

    text: "Repeated calls take time away from admission-ready students.",

  },

  {

    title: "More leads, fewer admissions",

    text: "Form submissions grow, but your batches stay unfilled.",

  },

  {

    title: "Budget lost to broad targeting",

    text: "Irrelevant audiences use up your advertising spend.",

  },

];

const solutions = [

  {

    title: "Hyper-Local Targeting",

    text: "Reach students in the locations your institute serves.",

  },

  {

    title: "Course-Specific Campaigns",

    text: "Fashion ads for fashion students. Beauty ads for beauty students.",

  },

  {

    title: "High-Intent Lead Filtering",

    text: "Qualification questions help identify serious students.",

  },

  {

    title: "Landing Pages That Convert",

    text: "Clear course details and a simple admission enquiry form.",

  },

  {

    title: "Instant Lead Delivery",

    text: "Enquiries go straight to your team for quick follow-up.",

  },

  {

    title: "Continuous Optimization",

    text: "Daily refinements help improve quality and reduce wasted spend.",

  },

];

/* Approach data is disabled together with its section.

const approach = [

  { icon: "pin", title: "Reach Local Students", text: "Focus on students who can attend your institute." },

  { icon: "course", title: "Promote the Right Course", text: "Give every program its own audience and message." },

  { icon: "filter", title: "Qualify Each Enquiry", text: "Learn what students need before your first call." },

  { icon: "arrow", title: "Follow Up Faster", text: "Send enquiries directly to your admissions team." },

];

*/

const styles = `

.s1{

  --ink:#2d2038;

  --muted:#74677e;

  --plum:#805297;

  --coral:#ef8165;

  position:relative;

  isolation:isolate;

  padding:clamp(52px,7vw,96px) 0;

  background:#fffcfa;

  color:var(--ink);

}

.s1,.s1 *,.s1 *::before,.s1 *::after{box-sizing:border-box}

.s1 .s1-wrap{width:min(1180px,100%);margin:auto;padding:0 clamp(16px,4vw,36px)}

.s1 h2,.s1 h3,.s1 p{margin:0}

.s1 h2{font-size:clamp(28px,3.7vw,46px);line-height:1.18;font-weight:800;letter-spacing:-.045em;text-wrap:balance}

.s1 p{font-size:15px;line-height:1.75;color:var(--muted)}

.s1 svg{display:block;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

.s1 a{max-width:100%;white-space:normal;text-align:center;overflow-wrap:anywhere}

.s1 button{font:inherit;touch-action:manipulation;-webkit-tap-highlight-color:transparent}

.s1 button:focus-visible,.s1 a:focus-visible{outline:3px solid var(--plum);outline-offset:4px}

.s1 [id],.s1[id]{scroll-margin-top:100px}

.s1-heading{max-width:820px;margin:0 auto 32px;text-align:center}

.s1-heading h2 span{color:var(--coral)}

.s1-heading p{max-width:620px;margin:16px auto 0}

.s1-kicker{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px;color:var(--plum);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}

.s1-kicker::before{content:'';width:6px;height:6px;flex:0 0 6px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px #8052970a}

.s1-cta{display:flex;justify-content:center;margin-top:24px}

.s1-intro-grid{display:grid;grid-template-columns:1fr 1.08fr;gap:40px;align-items:center}

.s1-intro-title{min-width:0}

.s1-intro-title h2 span{color:var(--plum)}

.s1-intro-copy{min-width:0;padding:clamp(24px,3vw,36px);border:1px solid #e9deed;border-radius:26px;background:linear-gradient(135deg,#fff,#fcf8ff);box-shadow:0 18px 50px #53326008}

.s1-intro-copy p+p{margin-top:16px}

.s1-intro-copy strong{color:var(--ink)}

.s1-intro-copy .s1-cta{justify-content:flex-start}

.s1-approach{background:linear-gradient(130deg,#fcf7f3,#faf5fc)}

.s1-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}

.s1-step{min-width:0;padding:24px 22px;border:1px solid #e8dceb;border-radius:24px;background:#ffffffd9;box-shadow:0 10px 28px #53326005;transition:transform .25s,box-shadow .25s}

.s1-step:nth-child(even){background:#fffaf6;border-color:#f0e0d7}

.s1-step-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}

.s1-step-number{font-size:11px;font-weight:800;color:#a58dae;letter-spacing:.08em}

.s1-step h3{margin-bottom:10px;font-size:18px;line-height:1.35;font-weight:750;letter-spacing:-.025em}

.s1-step p{font-size:13px}

.s1-mini-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;color:var(--plum);background:linear-gradient(145deg,#fff,#f3eaf9);border:1px solid #e7daee;box-shadow:0 4px 0 #e8dcec}

.s1-compare{padding-top:clamp(36px,4vw,56px);background:radial-gradient(ellipse at 0 20%,#fceae580,transparent 45%),radial-gradient(ellipse at 100% 80%,#efe4f580,transparent 45%),#fffcfa}

.s1-compare-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;align-items:stretch}

.s1-panel{

  --tone:#c84e67;

  --light:#ff94a5;

  --face:#ec4e6b;

  --base:#a82340;

  --glow:#ec4e6b25;

  --line:#f1dce2;

  --soft:#fff5f7;

  position:relative;

  display:flex;

  flex-direction:column;

  min-width:0;

  padding:clamp(22px,3vw,32px);

  border:1px solid var(--line);

  border-radius:28px;

  background:linear-gradient(145deg,#fff,var(--soft));

  box-shadow:0 22px 55px #442c3b08,inset 0 1px 0 #fff;

}

.s1-panel--green{

  --tone:#267852;

  --light:#63db9c;

  --face:#25ad68;

  --base:#12673b;

  --glow:#25ad6825;

  --line:#d5e9dc;

  --soft:#f3fbf6;

}

.s1-panel::before{content:'';position:absolute;left:28px;right:28px;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--tone),transparent);opacity:.5}

.s1-panel-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px}

.s1-panel-label{color:var(--tone);font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}

.s1-panel-symbol{display:grid;place-items:center;width:46px;height:46px;flex:0 0 46px;border-radius:15px;color:white;background:linear-gradient(145deg,var(--light),var(--face));border:1px solid var(--face);box-shadow:0 5px 0 var(--base),0 12px 22px var(--glow),inset 0 2px 2px #ffffff65}

.s1-panel-symbol svg{width:23px;height:23px;animation:s1-float 5s ease-in-out infinite}

.s1-panel--green .s1-panel-symbol svg{animation-delay:-2s}

.s1-panel h3{font-size:clamp(23px,2.3vw,29px);line-height:1.25;font-weight:800;letter-spacing:-.035em;text-wrap:balance}

.s1-panel-desc{margin-top:12px!important;font-size:13px!important}

.s1-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:20px 0 12px;padding-top:14px;border-top:1px solid var(--line)}

.s1-toolbar>span{color:var(--tone);font-size:clamp(12px,1.2vw,15px);font-weight:800;letter-spacing:.03em}

.s1-text-button{min-height:44px;padding:8px 6px;border:0;border-radius:8px;background:rgba(128,82,151,.06);color:var(--tone);font-size:12px!important;font-weight:800!important;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;transition:background .2s ease,transform .2s ease}

.s1-text-button:hover{background:rgba(128,82,151,.1)}

.s1-text-button:active{transform:translateY(1px)}

.s1-list{display:grid;gap:8px;list-style:none;margin:0;padding:0}

.s1-item{min-width:0;border:1px solid var(--line);border-radius:15px;background:#ffffffb5;transition:box-shadow .2s,background .2s}

.s1-item[data-open="true"]{background:#fff;box-shadow:0 6px 16px #30213b05}

.s1-row-button{display:flex;align-items:center;gap:11px;width:100%;min-height:58px;padding:13px 12px;border:0;border-radius:14px;background:transparent;color:var(--ink);text-align:left;cursor:pointer}

.s1-status{display:grid;place-items:center;width:26px;height:26px;flex:0 0 26px;border-radius:9px;color:#fff;background:linear-gradient(145deg,var(--light),var(--face));box-shadow:0 3px 0 var(--base),0 5px 10px var(--glow),inset 0 1px 1px #ffffff70;transition:transform .18s,box-shadow .18s}

.s1-status svg{width:15px;height:15px;stroke-width:2.8}

.s1-row-title{flex:1;min-width:0;font-size:14px;font-weight:700;line-height:1.45;overflow-wrap:break-word}

.s1-chevron{width:15px!important;height:15px!important;flex:0 0 15px;color:var(--tone);transition:transform .2s}

.s1-item[data-open="true"] .s1-chevron{transform:rotate(180deg)}

.s1-item-description{padding:0 36px 15px 49px;color:var(--muted);font-size:12px;line-height:1.7;overflow-wrap:break-word;animation:s1-detail .2s ease-out}

.s1-item-description[hidden]{display:none}

.s1-row-button:active .s1-status{transform:translateY(2px) scale(.94);box-shadow:0 1px 0 var(--base),0 2px 5px var(--glow)}

.s1-panel-foot{display:flex;align-items:flex-start;gap:8px;margin-top:auto;padding-top:20px;color:var(--tone);font-size:11px;line-height:1.6}

.s1-panel-foot svg{width:15px;height:15px;flex:0 0 15px;margin-top:1px}

.s1-bottom{margin-top:26px;padding:clamp(26px,4vw,42px);border:1px solid #e8ddec;border-radius:28px;background:linear-gradient(135deg,#fff,#fbf6fe);text-align:center;box-shadow:0 16px 40px #55346106}

.s1-bottom h3{max-width:690px;margin:auto;font-size:clamp(23px,2.7vw,32px);font-weight:800;line-height:1.25;letter-spacing:-.035em;text-wrap:balance}

.s1-bottom p{max-width:650px;margin:14px auto 0;color:#4e286d;font-size:clamp(16px,1.5vw,18px);line-height:1.7}

@keyframes s1-float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-3px) rotate(3deg)}}

@keyframes s1-detail{from{opacity:.5;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}

@media(hover:hover) and (pointer:fine){

  .s1-step:hover{transform:translateY(-4px);box-shadow:0 16px 32px #5332600d}

  .s1-item:hover{background:#fff;box-shadow:0 7px 18px var(--glow)}

  .s1-row-button:hover .s1-status{transform:translateY(-1px)}

}

@media(max-width:1023px){

  .s1-steps{grid-template-columns:repeat(2,minmax(0,1fr))}

  .s1-intro-grid{gap:26px}

}

@media(max-width:767px){

  .s1-compare{padding-top:6px}

  .s1-intro-grid,.s1-compare-grid{grid-template-columns:minmax(0,1fr)}

  .s1-intro-title{text-align:center}

  .s1-intro-title h2{max-width:580px;margin:auto}

  .s1-intro-copy .s1-cta{justify-content:center}

  .s1-heading{margin-bottom:26px}

  .s1-panel,.s1-bottom{border-radius:24px}

  .s1-compare-grid{gap:18px}

}

@media(max-width:480px){

  .s1-steps{grid-template-columns:minmax(0,1fr);gap:13px}

  .s1-step{padding:23px}

  .s1-panel{padding:24px 16px}

  .s1-panel-top{margin-bottom:20px}

  .s1-row-button{gap:9px;padding:13px 10px}

  .s1-row-title{font-size:13px}

  .s1-item-description{padding:0 31px 14px 45px}

  .s1-intro-copy{padding:24px 20px}

  .s1-bottom{padding:28px 19px}

  .s1-cta>a{width:100%;min-height:56px}

  .s1 p{font-size:14px}

}

@media(prefers-reduced-motion:reduce){

  .s1 *,.s1 *::before,.s1 *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}

  .s1-step:hover,.s1-row-button:hover .s1-status{transform:none}

}

`;

function SectionStyles() {

  return <style>{styles}</style>;

}

function Icon({ name = "check", className = "" }) {

  const paths = {

    check: <path d="m5 12 4 4L19 6" />,

    cross: <path d="m7 7 10 10M17 7 7 17" />,

    chevron: <path d="m6 9 6 6 6-6" />,

    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,

    target: (

      <>

        <circle cx="12" cy="12" r="8" />

        <circle cx="12" cy="12" r="4" />

        <path d="m12 12 8-8M17 4h3v3" />

      </>

    ),

    warning: (

      <>

        <path d="m12 3 10 18H2L12 3Z" />

        <path d="M12 9v5M12 17h.01" />

      </>

    ),

    pin: (

      <>

        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />

        <circle cx="12" cy="10" r="2.5" />

      </>

    ),

    course: (

      <>

        <path d="m2 8 10-5 10 5-10 5-10-5ZM6 10v7c4 3 8 3 12 0v-7M22 8v7" />

      </>

    ),

    filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,

  };

  return (

    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">

      {paths[name] || paths.check}

    </svg>

  );

}

function BatchCta() {

  return (

    <div className="s1-cta">

      <Button href={bookingHref} external={bookingIsExternal} data-enquiry-popup-trigger>

        Yes, I Want to Fill My Next Batch

      </Button>

    </div>

  );

}

export function Intro() {

  return (

    <section id="about" className="s1">

      <SectionStyles />

      <div className="s1-wrap s1-intro-grid">

        <Reveal className="s1-intro-title">

          <span className="s1-kicker">Student acquisition for institutes</span>

          <h2>

            You’re Not Struggling to Get Students.{" "}

            <span>You’re Struggling to Reach the Right Students.</span>

          </h2>

        </Reveal>

        <Reveal delay={80} className="s1-intro-copy">

          <p>
            Wrong Locations, Mismatched Courses And Low-Intent Enquiries Make It Harder To
            Fill Your Batches.
          </p>

          <p>
            <strong>Let’s Fix That.</strong> At{" "}
            <strong>{site.brandName}</strong>, We Build Student Acquisition
            Systems For Beauty, Fashion Designing And Skill-Based Institutes.
          </p>

          <p>
            Local Targeting, Course-Specific Ads And Qualified Enquiries Help Your Team
            Turn Student Interest Into Admission Conversations.
          </p>

          <BatchCta />

        </Reveal>

      </div>

    </section>

  );

}

// This section is intentionally disabled. Keep the export for existing App imports.

export function Approach() {

  /*

  return (

    <section className="s1 s1-approach">

      <SectionStyles />

      <div className="s1-wrap">

        <Reveal className="s1-heading">

          <span className="s1-kicker">Our approach</span>

          <h2>Better Leads. <span>Not Just More Leads.</span></h2>

          <p>Better targeting, a clear admission funnel and faster follow-up.</p>

        </Reveal>

        <div className="s1-steps">

          {approach.map((item, index) => (

            <Reveal key={item.title} delay={index * 60} className="s1-step">

              <div className="s1-step-top"><span className="s1-mini-icon"><Icon name={item.icon} /></span><span className="s1-step-number">0{index + 1}</span></div>

              <h3>{item.title}</h3><p>{item.text}</p>

            </Reveal>

          ))}

        </div>

      </div>

    </section>

  );

  */

  return null;

}

function ComparisonCard({ positive = false, items, title, summary }) {

  const id = useId();

  const [openItems, setOpenItems] = useState(() => items.map(() => positive));

  const allOpen = openItems.every(Boolean);

  const toggleAll = () => setOpenItems(items.map(() => !allOpen));

  const toggleItem = (index) =>

    setOpenItems((current) => current.map((open, i) => (i === index ? !open : open)));

  return (

    <Reveal

      delay={positive ? 80 : 0}

      className={`s1-panel${positive ? " s1-panel--green" : ""}`}

    >

      {positive && <span id="solution" aria-hidden="true" />}

      <div className="s1-panel-top">

        <span className="s1-panel-label">

          {positive ? "How We Fix This" : "Common Challenges"}

        </span>

        <span className="s1-panel-symbol">

          <Icon name={positive ? "target" : "warning"} />

        </span>

      </div>

      <h3>{title}</h3>

      <p className="s1-panel-desc">{summary}</p>

      <div className="s1-toolbar">

        <span>

          {items.length} {positive ? "focused solutions" : "common problems"}

        </span>

        <button

          type="button"

          className="s1-text-button"

          aria-controls={`${id}-list`}

          onClick={toggleAll}

        >

          {allOpen ? "Collapse all" : "Expand all"}

        </button>

      </div>

      <ul id={`${id}-list`} className="s1-list">

        {items.map((item, index) => (

          <li key={item.title} className="s1-item" data-open={openItems[index]}>

            <button

              type="button"

              id={`${id}-trigger-${index}`}

              className="s1-row-button"

              aria-expanded={openItems[index]}

              aria-controls={`${id}-detail-${index}`}

              onClick={() => toggleItem(index)}

            >

              <span className="s1-status">

                <Icon name={positive ? "check" : "cross"} />

              </span>

              <span className="s1-row-title">{item.title}</span>

              <Icon name="chevron" className="s1-chevron" />

            </button>

            <div

              id={`${id}-detail-${index}`}

              hidden={!openItems[index]}

              className="s1-item-description"

            >

              {item.text}

            </div>

          </li>

        ))}

      </ul>

      <div className="s1-panel-foot">

        <Icon name={positive ? "check" : "warning"} />

        <span>

          {positive

            ? "Built around your courses, location and batches."

            : "Tap a problem to view its details."}

        </span>

      </div>

    </Reveal>

  );

}

export function Problems() {

  return (

    <section id="problems" className="s1 s1-compare">

      <SectionStyles />

      <div className="s1-wrap">

        <Reveal className="s1-heading">

          <span className="s1-kicker">Better targeting. Better admissions.</span>

          <h2>

            Stop Wasting Your Ad Budget. <span>Reach the Right Students.</span>

          </h2>

          <p>

            Most institutes don’t have an ad problem. They have a targeting, funnel and

            lead-quality problem.

          </p>

        </Reveal>

        <div className="s1-compare-grid">

          <ComparisonCard

            items={problems}

            title="Common Advertising Problems We Fix"

            summary="What’s holding back your admissions?"

          />

          <ComparisonCard

            positive

            items={solutions}

            title="A Student Acquisition System for Institutes"

            summary="The right students. The right courses. A clear path to admission."

          />

        </div>

        <Reveal className="s1-bottom">

          <span className="s1-kicker">Let’s fill your next batch</span>

          <h3>Your Courses Deserve the Right Students.</h3>

          <p>

            We build the targeting, enquiry funnel and lead delivery around your

            institute. Your team focuses on admission conversations.

          </p>

          <BatchCta />


        </Reveal>

        <HeroTarget />

      </div>

    </section>

  );

}

// Solutions render beside Problems; this export keeps existing App imports valid.

export function Solution() {

  return null;

}
