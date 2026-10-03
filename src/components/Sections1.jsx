import { useState, useId } from "react";
import { Reveal, Button } from "./ui.jsx";
import { bookingHref, bookingIsExternal, site } from "../config/site.js";
// Campaign copy lives in this file, so existing content.js exports remain compatible.
const benefits = [
  {
    "title": "Hyper-Local Targeting",
    "text": "We focus your campaigns on the locations that matter to your institute, so your team connects with students who can attend your classes."
  },
  {
    "title": "Course-Specific Campaigns",
    "text": "Fashion designing students see fashion designing ads. Beauty students see beauty ads. Every campaign is built around the course being promoted."
  },
  {
    "title": "High-Intent Lead Filtering",
    "text": "Qualification questions help identify students interested in your course, location and upcoming batch before their enquiry reaches your team."
  },
  {
    "title": "Landing Pages That Convert",
    "text": "A dedicated admission funnel gives students clear course information and a simple way to request details."
  },
  {
    "title": "Instant Lead Delivery",
    "text": "Student enquiries go directly to your admissions team, helping counsellors follow up while interest is still fresh."
  },
  {
    "title": "Continuous Optimization",
    "text": "We monitor campaigns daily and refine targeting, creatives and the enquiry journey to improve lead quality and reduce wasted spend."
  }
];
const problems = [
  {
    "title": "Ads shown in the wrong locations",
    "text": "Your budget reaches people outside the areas your institute serves."
  },
  {
    "title": "Leads from cities where you do not operate",
    "text": "Your counsellors receive enquiries from students who cannot attend your classes."
  },
  {
    "title": "Students interested in the wrong course",
    "text": "Generic ads attract enquiries that do not match the programs you want to fill."
  },
  {
    "title": "Low-intent enquiries that never answer calls",
    "text": "Your team spends time following up with people who show little interest."
  },
  {
    "title": "Counsellors wasting hours on unqualified prospects",
    "text": "Repeated calls leave less time for students who are ready to discuss admission."
  },
  {
    "title": "High lead volume but low admissions",
    "text": "More form submissions do not necessarily mean more students joining your batches."
  },
  {
    "title": "Money wasted on broad targeting",
    "text": "Irrelevant audiences use up the budget that should reach suitable students."
  }
];
const approach = [
  {
    "title": "Reach Students Near Your Institute",
    "text": "Focus on your service area and make your course offer relevant to students who can realistically join."
  },
  {
    "title": "Match Every Ad to the Right Course",
    "text": "Connect each program with its own audience, message and admission enquiry journey."
  },
  {
    "title": "Filter for Meaningful Enquiries",
    "text": "Ask useful qualification questions so your team has context before the first conversation."
  },
  {
    "title": "Give Your Team a Clear Next Step",
    "text": "Deliver enquiries quickly and use follow-up feedback to keep improving campaign quality."
  }
];

/* All styling is scoped to these sections; no extra dependencies are required. */
const styles = `
.s1{--ink:#2d2038;--muted:#74677e;--plum:#805297;--coral:#ef8165;color:var(--ink);padding:clamp(60px,7vw,104px) 0;background:#fffcfa;position:relative;isolation:isolate}
.s1,.s1 *,.s1 *::before,.s1 *::after{box-sizing:border-box}
.s1 .s1-wrap{width:min(1180px,100%);padding:0 clamp(18px,4vw,36px);margin:auto}
.s1 h2,.s1 h3,.s1 h4,.s1 p{margin:0}
.s1 h2{font-size:clamp(29px,3.6vw,46px);font-weight:800;line-height:1.19;letter-spacing:-.045em;text-wrap:balance}
.s1 p{font-size:15px;line-height:1.85;color:var(--muted)}
.s1-kicker{display:inline-flex;align-items:center;gap:8px;color:var(--plum);font-size:11px;font-weight:750;letter-spacing:.08em;text-transform:uppercase;margin-bottom:18px}
.s1-kicker::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 0 4px #8052970a}
.s1-heading{max-width:800px;margin:0 auto 36px;text-align:center}
.s1-heading h2 span{display:block;color:var(--coral);margin-top:6px}
.s1-heading>p{max-width:665px;margin:18px auto 0}
.s1 a{max-width:100%;white-space:normal;text-align:center}
.s1-cta{margin-top:26px;display:flex;justify-content:center}
.s1-intro-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(30px,5vw,64px);align-items:start}
.s1-intro-title{position:sticky;top:110px}
.s1-intro-title h2{font-size:clamp(30px,3.3vw,43px)}
.s1-intro-title h2 span{color:var(--plum)}
.s1-intro-copy{padding:clamp(24px,3vw,38px);border:1px solid #e9deed;border-radius:26px;background:linear-gradient(135deg,#fff,#fcf8ff);box-shadow:0 18px 55px #53326006}
.s1-intro-copy p+p{margin-top:18px}
.s1-intro-copy strong{color:var(--ink)}
.s1-intro-copy .s1-cta{justify-content:flex-start}
.s1-approach{background:linear-gradient(130deg,#fcf7f3,#faf5fc)}
.s1-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.s1-step{padding:25px 22px;border:1px solid #e8dceb;border-radius:24px;background:#ffffffc9;box-shadow:0 10px 28px #53326004;min-width:0;transition:transform .25s,box-shadow .25s}
.s1-step:nth-child(even){background:#fffaf6;border-color:#f0e0d7}
.s1-step-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.s1-step-number{font-size:11px;font-weight:700;letter-spacing:.08em;color:#ab97b4}
.s1-step h3{font-size:18px;line-height:1.4;font-weight:750;letter-spacing:-.025em;margin-bottom:12px}
.s1-step p{font-size:13px;line-height:1.85}
.s1-mini-icon{display:grid;place-items:center;width:42px;height:42px;flex:0 0 42px;border-radius:14px;color:var(--plum);background:linear-gradient(145deg,#fff,#f3eaf9);border:1px solid #e7daee;box-shadow:0 3px 0 #e8dcec,inset 0 1px 0 #fff}
.s1 svg{display:block;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.s1-compare{background:radial-gradient(ellipse at 0 25%,#fceae570,transparent 42%),radial-gradient(ellipse at 100% 75%,#efe4f570,transparent 42%),#fffcfa}
.s1-compare-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;align-items:stretch}
.s1-panel{--tone:#c84e67;--tint:#fff1f4;--line:#f1dce2;--shadow:#ecd2db;--soft:#fffafb;min-width:0;border:1px solid var(--line);border-radius:28px;background:linear-gradient(145deg,#fff,var(--soft));box-shadow:0 24px 60px #442c3b07,inset 0 1px 0 #fff;position:relative;padding:clamp(22px,3vw,34px);display:flex;flex-direction:column}
.s1-panel--green{--tone:#267852;--tint:#eaf7ef;--line:#d5e9dc;--shadow:#d2e6da;--soft:#f8fdfa}
.s1-panel::before{content:'';position:absolute;left:34px;right:34px;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--tone),transparent);opacity:.4}
.s1-panel-top{display:flex;align-items:center;gap:12px;justify-content:space-between;margin-bottom:22px}
.s1-panel-label{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:800;color:var(--tone);letter-spacing:.09em;text-transform:uppercase}
.s1-panel-label::before{content:'';width:5px;height:5px;background:currentColor;border-radius:50%}
.s1-panel-icon{color:var(--tone);background:linear-gradient(145deg,#fff,var(--tint));border-color:var(--line);box-shadow:0 3px 0 var(--shadow),0 8px 18px #39293506;animation:s1-float 5s ease-in-out infinite}
.s1-panel--green .s1-panel-icon{animation-delay:-2.5s}
.s1-panel h3{font-size:clamp(23px,2.15vw,28px);line-height:1.28;letter-spacing:-.035em;font-weight:800;max-width:440px;text-wrap:balance}
.s1-panel-desc{margin-top:13px!important;font-size:13px!important;line-height:1.85!important}
.s1-list-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:24px 0 12px;padding-top:18px;border-top:1px solid var(--line)}
.s1-list-toolbar>span{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:700}
.s1 .s1-text-button{font-family:inherit;cursor:pointer;background:transparent;border:0;padding:8px 0 8px 10px;min-height:44px;color:var(--tone);font-size:11px;font-weight:750;border-radius:6px}
.s1-list{list-style:none;margin:0;padding:0;display:grid;gap:9px}
.s1-item{border:1px solid transparent;border-radius:15px;background:#ffffff80;transition:background .25s,border-color .25s,box-shadow .25s;min-width:0}
.s1-item[data-open="true"]{background:#fff;border-color:var(--line);box-shadow:0 5px 16px #30213b03}
.s1 .s1-row-button{appearance:none;font:inherit;text-align:left;border:0;background:transparent;color:var(--ink);width:100%;min-height:54px;display:flex;gap:11px;align-items:flex-start;padding:14px;cursor:pointer;border-radius:14px;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.s1-row-title{font-size:14px;font-weight:700;line-height:1.55;flex:1;min-width:0}
.s1-status{display:grid;place-items:center;width:20px;height:20px;flex:0 0 20px;border-radius:7px;color:var(--tone);background:var(--tint);border:1px solid var(--line);margin-top:1px;transition:transform .2s,background .2s}
.s1-status svg{width:12px;height:12px;stroke-width:2.4}
.s1-chevron{flex:0 0 14px;width:14px!important;height:14px!important;color:#ae9db4;margin-top:4px;transition:transform .22s}
.s1-item[data-open="true"] .s1-chevron{transform:rotate(180deg)}
.s1-row-button:active .s1-status{transform:scale(.8) rotate(-10deg)}
.s1-item-description{padding:0 39px 16px 45px;color:var(--muted);font-size:12px;line-height:1.85;overflow-wrap:break-word;animation:s1-detail .24s ease-out}
.s1-item-description[hidden]{display:none}
.s1-panel-foot{margin-top:auto;padding-top:22px;font-size:11px;color:var(--tone);display:flex;align-items:center;gap:8px;line-height:1.6}
.s1-panel-foot svg{width:15px;height:15px;flex:0 0 15px}
.s1-bottom{margin-top:28px;padding:clamp(25px,4vw,44px);border:1px solid #e8ddec;border-radius:28px;background:linear-gradient(135deg,#fff,#fbf6fe);text-align:center;box-shadow:0 16px 40px #55346104}
.s1-bottom h3{font-size:clamp(23px,2.5vw,31px);line-height:1.3;letter-spacing:-.035em;font-weight:800;max-width:730px;margin:auto;text-wrap:balance}
.s1-bottom p{max-width:790px;margin:15px auto 0;font-size:14px}
.s1-notes{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 20px;margin-top:19px;color:var(--muted);font-size:11px}
.s1-notes span{display:flex;align-items:center;gap:6px}
.s1-notes svg{width:13px;height:13px;color:var(--plum)}
.s1 [id],.s1[id]{scroll-margin-top:100px}
.s1 button:focus-visible,.s1 a:focus-visible{outline:3px solid #805297;outline-offset:4px}
@keyframes s1-float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-4px) rotate(3deg)}}
@keyframes s1-detail{from{opacity:.45;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}
@media(hover:hover) and (pointer:fine){.s1-step:hover{transform:translateY(-4px);box-shadow:0 15px 32px #53326009}.s1-row-button:hover .s1-status{transform:rotate(-6deg)}.s1-item:hover{border-color:var(--line)}.s1-text-button:hover{text-decoration:underline}}
@media(max-width:1023px){.s1-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.s1-intro-grid{gap:28px}}
@media(max-width:767px){.s1-intro-grid,.s1-compare-grid{grid-template-columns:minmax(0,1fr)}.s1-intro-title{position:static;text-align:center}.s1-intro-title h2{max-width:580px;margin:auto}.s1-panel{border-radius:24px}.s1-panel h3{max-width:100%}.s1-heading{margin-bottom:28px}.s1-panel-top{margin-bottom:18px}.s1-bottom{border-radius:24px;margin-top:22px}.s1-intro-copy .s1-cta{justify-content:center}}
@media(max-width:480px){.s1-steps{grid-template-columns:minmax(0,1fr);gap:13px}.s1-step{padding:23px}.s1-step-top{margin-bottom:17px}.s1-step h3{font-size:19px}.s1-panel{padding:23px 18px}.s1-row-button{padding:13px 10px!important;gap:9px!important}.s1-row-title{font-size:13px}.s1-item-description{padding:0 29px 15px 39px}.s1-intro-copy{padding:24px 20px}.s1-cta>a{width:100%}.s1-bottom{padding:27px 20px}.s1-notes{gap:9px 14px}.s1 p{font-size:14px}}
@media(prefers-reduced-motion:reduce){.s1 *, .s1 *::before,.s1 *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.s1-step:hover{transform:none}}
`;

function SectionStyles() {
  return <style>{styles}</style>;
}

function Icon({ name = "check", className = "" }) {
  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    cross: <path d="m8 8 8 8M16 8l-8 8" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="m12 12 8-8M17 4h3v3" /></>,
    warning: <><path d="M10.3 4 2.6 17.5A2.3 2.3 0 0 0 4.6 21h14.8a2.3 2.3 0 0 0 2-3.5L13.7 4a2 2 0 0 0-3.4 0Z" /><path d="M12 9v5M12 17h.01" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    course: <><path d="m2 8 10-5 10 5-10 5-10-5ZM6 10v7c4 3 8 3 12 0v-7M22 8v7" /></>,
    filter: <><path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{paths[name] || paths.check}</svg>;
}

export function Intro() {
  return (
    <section id="about" className="s1">
      <SectionStyles />
      <div className="s1-wrap s1-intro-grid">
        <Reveal className="s1-intro-title">
          <span className="s1-kicker">Student acquisition for your institute</span>
          <h2>You’re Not Struggling to Get Students. <span>You’re Struggling to Reach the Right Students.</span></h2>
        </Reveal>
        <Reveal delay={80} className="s1-intro-copy">
          <p>Every month, institutes spend thousands on advertising but still struggle to fill their batches. Their campaigns reach the wrong locations, attract students interested in different courses or generate enquiries that never turn into meaningful conversations.</p>
          <p><strong>Let’s fix that.</strong> At <strong>{site.brandName}</strong>, we build and manage student acquisition systems for beauty, fashion designing and other skill-based institutes.</p>
          <p>We combine course-specific messaging, local targeting, lead qualification and fast delivery to help your team attract qualified students, generate 300+ quality leads every month and fill upcoming batches without wasting your advertising budget.</p>
          <div className="s1-cta"><Button href={bookingHref} external={bookingIsExternal}>Yes, I Want to Fill My Next Batch</Button></div>
        </Reveal>
      </div>
    </section>
  );
}

export function Approach() {
  const icons = ["pin", "course", "filter", "arrow"];
  return (
    <section className="s1 s1-approach">
      <SectionStyles />
      <div className="s1-wrap">
        <Reveal className="s1-heading">
          <span className="s1-kicker">Our approach</span>
          <h2>How We Help Institutes Get Better Leads, Not Just More Leads</h2>
          <p>Most institutes don’t have an ad problem. They have a targeting, funnel and lead-quality problem. We bring those pieces together into one focused admission journey.</p>
        </Reveal>
        <div className="s1-steps">
          {approach.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="s1-step">
              <div className="s1-step-top"><span className="s1-mini-icon"><Icon name={icons[index]} /></span><span className="s1-step-number">0{index + 1}</span></div>
              <h3>{item.title}</h3><p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="s1-cta"><Button href={bookingHref} external={bookingIsExternal}>Improve My Student Lead Quality</Button></div>
      </div>
    </section>
  );
}

/* Descriptions are visible initially. Tap a row to fold or reopen its detail. */
function ComparisonCard({ positive = false, items, title, summary }) {
  const id = useId();
  const [openItems, setOpenItems] = useState(() => items.map(() => true));
  const allOpen = openItems.every(Boolean);
  function toggleItem(index) {
    setOpenItems(current => current.map((value, i) => i === index ? !value : value));
  }
  return (
    <Reveal delay={positive ? 90 : 0} className={`s1-panel ${positive ? "s1-panel--green" : ""}`}>
      {positive && <div id="solution" />}
      <div className="s1-panel-top">
        <span className="s1-panel-label">{positive ? "How We Fix This" : "Common Challenges"}</span>
        <span className="s1-mini-icon s1-panel-icon"><Icon name={positive ? "target" : "warning"} /></span>
      </div>
      <h3>{title}</h3>
      <p className="s1-panel-desc">{summary}</p>
      <div className="s1-list-toolbar">
        <span>{items.length} {positive ? "focused solutions" : "common problems"}</span>
        <button type="button" className="s1-text-button" aria-controls={`${id}-list`} aria-label={`${allOpen ? "Collapse" : "Expand"} all ${positive ? "solution" : "problem"} details`} onClick={() => setOpenItems(items.map(() => !allOpen))}>{allOpen ? "Collapse details" : "Expand details"}</button>
      </div>
      <ul id={`${id}-list`} className="s1-list">
        {items.map((item, index) => (
          <li key={item.title} className="s1-item" data-open={openItems[index]}>
            <button type="button" id={`${id}-trigger-${index}`} className="s1-row-button" aria-expanded={openItems[index]} aria-controls={`${id}-detail-${index}`} onClick={() => toggleItem(index)}>
              <span className="s1-status"><Icon name={positive ? "check" : "cross"} /></span>
              <span className="s1-row-title">{item.title}</span>
              <Icon name="chevron" className="s1-chevron" />
            </button>
            <div id={`${id}-detail-${index}`} hidden={!openItems[index]} className="s1-item-description">{item.text}</div>
          </li>
        ))}
      </ul>
      <div className="s1-panel-foot"><Icon name={positive ? "check" : "warning"} /><span>{positive ? "Built around your courses, location and upcoming batches." : "Tap any row to collapse or view its details."}</span></div>
    </Reveal>
  );
}

export function Problems() {
  return (
    <section id="problems" className="s1 s1-compare">
      <SectionStyles />
      <div className="s1-wrap">
        <Reveal className="s1-heading">
          <span className="s1-kicker">Better Targeting. Better Leads.</span>
          <h2>Stop Wasting Your Ad Budget.<span>Start Reaching the Right Students.</span></h2>
          <p>Most institutes don’t have an ad problem. They have a targeting, funnel and lead-quality problem. Here’s what we fix—and how we fix it.</p>
        </Reveal>
        <div className="s1-compare-grid">
          <ComparisonCard items={problems} title="Common Advertising Problems We Fix" summary="Do these challenges sound familiar? These are the issues that can hold back your institute’s admissions." />
          <ComparisonCard positive items={benefits} title="We Build a Student Acquisition System Designed for Institutes" summary="The right students. The right courses. A clear path to admission." />
        </div>
        <Reveal className="s1-bottom">
          <span className="s1-kicker">A more focused path forward</span>
          <h3>The Right Students. The Right Courses. A Clear Path to Admission.</h3>
          <p>More leads are useful when they give your admissions team more relevant conversations. Our system connects your courses with students looking for their next skill.</p>
          <p>We start with the programs you want to promote, the locations you serve and the batches you want to fill. Then we build the targeting, enquiry funnel and delivery process around those priorities.</p>
          <p>Your team receives the enquiries. We keep improving the campaigns using performance data and feedback from your counsellors.</p>
          <div className="s1-cta"><Button href={bookingHref} external={bookingIsExternal}>Yes, I Want to Fill My Next Batch</Button></div>
          <div className="s1-notes"><span><Icon />Course-specific campaigns</span><span><Icon />Local student targeting</span><span><Icon />Clear enquiry delivery</span></div>
        </Reveal>
      </div>
    </section>
  );
}

// The solution is included beside Problems. Keep the existing App export compatible.
export function Solution() {
  return null;
}
