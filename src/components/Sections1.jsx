import { Reveal, SectionHead, SectionCta, Button, Check } from "./ui.jsx";
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
const tone = [
  "bg-plum-50 border-plum-200 hover:border-plum-300",
  "bg-coral-50 border-coral-100 hover:border-coral-300",
];
export function Intro() {
  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <SectionHead title="You’re Not Struggling to Get Students. You’re Struggling to Reach the Right Students." />
        <Reveal className="card mx-auto max-w-4xl !p-7 sm:!p-12">
          <span className="mb-6 inline-flex rounded-full border border-plum-200 bg-plum-50 px-4 py-2 text-xs font-bold text-plum-700">Student acquisition for your institute</span>
          <div className="space-y-5 text-base leading-[1.85] sm:text-[17px]">
            <p>Every month, institutes spend thousands on advertising but still struggle to fill their batches. Their campaigns reach the wrong locations, attract students interested in different courses or generate enquiries that never turn into meaningful conversations.</p>
            <p><strong className="text-plum-700">Let’s fix that.</strong> At <strong>{site.brandName}</strong>, we build and manage student acquisition systems for beauty, fashion designing and other skill-based institutes.</p>
            <p>We combine course-specific messaging, local targeting, lead qualification and fast delivery to help your team attract qualified students, generate 300+ quality leads every month and fill upcoming batches without wasting your advertising budget.</p>
          </div>
          <Button href={bookingHref} external={bookingIsExternal} className="mt-8">Yes, I Want to Fill My Next Batch</Button>
        </Reveal>
      </div>
    </section>
  );
}
export function Approach() {
  return (
    <section className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title="How We Help Institutes Get Better Leads, Not Just More Leads">
          <p>Most institutes don’t have an ad problem. They have a targeting, funnel and lead-quality problem. We bring those pieces together into one focused admission journey.</p>
        </SectionHead>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {approach.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 90} className={`group min-w-0 rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none sm:p-9 ${tone[(index + Math.floor(index / 2)) % 2]}`}>
              <span aria-hidden="true" className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white text-plum-700 shadow-[0_6px_0_#e3d4eb]"><Check className="h-5 w-5" /></span>
              <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </div>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Improve My Student Lead Quality</SectionCta>
      </div>
    </section>
  );
}

const comparisonStyles = `
  .ad-compare { --ac-ink:#281e35; --ac-muted:#716579; padding:clamp(64px,8vw,112px) 0; position:relative; isolation:isolate; background:radial-gradient(ellipse at 8% 15%,#fce6df80,transparent 42%),radial-gradient(ellipse at 95% 85%,#eee2f580,transparent 44%),linear-gradient(135deg,#fffaf6,#faf7fb); }
  .ad-compare, .ad-compare *, .ad-compare *::before, .ad-compare *::after { box-sizing:border-box; }
  .ad-compare .container-x { width:min(1180px,100%); margin-inline:auto; padding-inline:clamp(18px,4vw,36px); }
  .ad-compare__intro { max-width:850px; margin:0 auto 48px; text-align:center; }
  .ad-compare__eyebrow { display:inline-flex; align-items:center; gap:9px; margin-bottom:20px; padding:9px 16px; border:1px solid #e8d9ef; border-radius:999px; background:#ffffffcc; color:#744494; box-shadow:0 5px 16px #74449408; font-size:12px; font-weight:750; }
  .ad-compare__eyebrow::before { content:''; width:7px; height:7px; flex-shrink:0; border-radius:50%; background:#9862ad; box-shadow:0 0 0 4px #9862ad12; }
  .ad-compare__intro h2 { margin:0; color:var(--ac-ink); font-size:clamp(29px,3.7vw,48px); line-height:1.17; letter-spacing:-.045em; font-weight:800; text-wrap:balance; }
  .ad-compare__intro h2 span { display:block; margin-top:8px; color:#ef795a; }
  .ad-compare__intro p { margin:20px auto 0; max-width:690px; color:var(--ac-muted); font-size:clamp(14px,1.4vw,16px); line-height:1.85; }
  .ad-compare__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:26px; align-items:stretch; }
  .ad-compare__card { --ac-tone:#d94362; --ac-light:#ffedf0; --ac-edge:#f3cbd3; position:relative; min-width:0; padding:clamp(24px,3vw,38px); border:1px solid var(--ac-edge); border-radius:30px; background:linear-gradient(145deg,#fffafa,#fff1f3); box-shadow:0 20px 50px #412b3d08,inset 0 1px 0 #fff; transition:box-shadow .3s,border-color .3s; }
  .ad-compare__card--green { --ac-tone:#218954; --ac-light:#e4f9ec; --ac-edge:#bbe6ce; background:linear-gradient(145deg,#fafffc,#effaf3); }
  .ad-compare__card:hover { border-color:var(--ac-tone); box-shadow:0 24px 55px #412b3d10,inset 0 1px 0 #fff; }
  .ad-compare__card-top { display:flex; align-items:center; justify-content:space-between; gap:14px; padding-bottom:28px; border-bottom:1px solid var(--ac-edge); }
  .ad-compare__tag { display:inline-flex; padding:7px 11px; border:1px solid var(--ac-edge); border-radius:999px; background:var(--ac-light); color:var(--ac-tone); font-size:10px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; line-height:1.5; }
  .ad-compare__micro { display:block; margin-top:9px; color:var(--ac-muted); font-size:12px; line-height:1.5; }
  .ad-compare__hero-icon { position:relative; display:grid; place-items:center; flex:0 0 66px; width:66px; height:66px; border:1px solid #fff; border-radius:21px; color:var(--ac-tone); background:linear-gradient(145deg,#fff,var(--ac-light)); box-shadow:0 6px 0 var(--ac-edge),0 14px 23px #3929350b,inset 0 2px 0 #fff; animation:ac-float 4.8s ease-in-out infinite; }
  .ad-compare__card--green .ad-compare__hero-icon { animation-delay:-2.4s; }
  .ad-compare__hero-icon::after { content:''; position:absolute; right:-4px; top:-4px; width:13px; height:13px; border:3px solid #fff; border-radius:50%; background:var(--ac-tone); }
  .ad-compare__hero-icon svg { width:30px; height:30px; fill:none; stroke:currentColor; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
  .ad-compare__card h3 { margin:25px 0 12px; color:var(--ac-tone); font-size:clamp(23px,2.25vw,29px); line-height:1.26; letter-spacing:-.03em; font-weight:800; text-wrap:balance; }
  .ad-compare__summary { margin:0; color:var(--ac-muted); font-size:14px; line-height:1.8; }
  .ad-compare__list { list-style:none; padding:0; margin:24px 0 0; display:grid; gap:0; }
  .ad-compare__row { display:flex; align-items:flex-start; gap:13px; min-width:0; padding:18px 0; border-top:1px solid var(--ac-edge); }
  .ad-compare__row > div { min-width:0; flex:1; }
  .ad-compare__row:last-child { padding-bottom:0; }
  .ad-compare__row h4 { margin:0; color:#30283b; font-size:15px; line-height:1.55; font-weight:750; }
  .ad-compare__row p { margin:5px 0 0; color:var(--ac-muted); font-size:13px; line-height:1.8; }
  .ad-compare__icon { display:grid; place-items:center; flex:0 0 23px; width:23px; height:23px; margin-top:2px; border:1px solid; border-radius:8px; color:#fff; }
  .ad-compare__icon svg { width:12px; height:12px; fill:none; stroke:currentColor; stroke-width:2.6; stroke-linecap:round; stroke-linejoin:round; }
  .ad-compare__icon--red { border-color:#ee647d; background:linear-gradient(145deg,#f68798,#dc4363); box-shadow:0 2px 0 #ac3450,inset 0 1px 0 #ffffff60; }
  .ad-compare__icon--green { border-color:#45bc7b; background:linear-gradient(145deg,#67d79b,#26945c); box-shadow:0 2px 0 #1c7145,inset 0 1px 0 #ffffff60; }
  .ad-compare__bottom { position:relative; margin:32px auto 0; padding:clamp(25px,4vw,44px); border:1px solid #e8dcec; border-radius:28px; text-align:center; background:linear-gradient(125deg,#ffffffed,#fcf8ffeb); box-shadow:0 15px 40px #53335e05; }
  .ad-compare__bottom h3 { max-width:740px; margin:0 auto; color:var(--ac-ink); font-size:clamp(22px,2.5vw,30px); line-height:1.3; letter-spacing:-.03em; font-weight:800; text-wrap:balance; }
  .ad-compare__bottom p { max-width:790px; margin:14px auto 0; color:var(--ac-muted); font-size:14px; line-height:1.85; }
  .ad-compare__bottom a { max-width:100%; white-space:normal; text-align:center; }
  .ad-compare__note { display:flex; flex-wrap:wrap; justify-content:center; gap:10px 22px; margin-top:20px; color:#7b6b82; font-size:11px; }
  .ad-compare__note span { display:inline-flex; align-items:center; gap:6px; }
  .ad-compare__note span::before { content:''; width:5px; height:5px; border-radius:50%; background:#9e78b0; }
  .ad-compare [id] { scroll-margin-top:100px; }
  @keyframes ac-float { 0%,100% { transform:translateY(0) rotate(-4deg); } 50% { transform:translateY(-7px) rotate(3deg); } }
  @media (max-width:767px) { .ad-compare__grid { grid-template-columns:minmax(0,1fr); gap:22px; } .ad-compare__intro { margin-bottom:30px; } .ad-compare__card { border-radius:24px; } .ad-compare__card-top { padding-bottom:22px; } .ad-compare__bottom { border-radius:24px; margin-top:24px; } }
  @media (max-width:380px) { .ad-compare__card { padding:23px 19px; } .ad-compare__row { gap:10px; } .ad-compare__hero-icon { flex-basis:54px; width:54px; height:54px; border-radius:17px; } .ad-compare__hero-icon svg { width:26px; height:26px; } .ad-compare__tag { font-size:9px; padding:6px 9px; } .ad-compare__bottom a { width:100%; } }
  @media (prefers-reduced-motion:reduce) { .ad-compare__hero-icon { animation:none; } .ad-compare__card { transition:none; } }
`;

function CardTop({ positive = false }) {
  return (
    <div className="ad-compare__card-top">
      <div>
        <span className="ad-compare__tag">{positive ? "How We Fix This" : "Common Challenges"}</span>
        <span className="ad-compare__micro">{positive ? "A focused admission journey" : "Where your budget loses direction"}</span>
      </div>
      <span className="ad-compare__hero-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          {positive ? (
            <>
              <circle cx="16" cy="16" r="11" />
              <circle cx="16" cy="16" r="6" />
              <path d="m13 16 2 2 5-5M24 8l4-4M24 4v4h4" />
            </>
          ) : (
            <>
              <path d="M13.5 5.5 3.8 23a3 3 0 0 0 2.6 4.5h19.2a3 3 0 0 0 2.6-4.5L18.5 5.5a2.9 2.9 0 0 0-5 0Z" />
              <path d="M16 12v7M16 23h.01" />
            </>
          )}
        </svg>
      </span>
    </div>
  );
}

function RoundStatusIcon({ positive = false }) {
  return (
    <span aria-hidden="true" className={`ad-compare__icon ${positive ? "ad-compare__icon--green" : "ad-compare__icon--red"}`}>
      <svg viewBox="0 0 24 24">
        {positive ? <path d="m5 12 4 4L19 6" /> : <path d="m7 7 10 10M17 7 7 17" />}
      </svg>
    </span>
  );
}
export function Problems() {
  return (
    <section id="problems" className="ad-compare">
      <style>{comparisonStyles}</style>
      <div className="container-x">
        <Reveal className="ad-compare__intro">
          <span className="ad-compare__eyebrow">Better Targeting. Better Leads.</span>
          <h2>Stop Wasting Your Ad Budget.<br /><span>Start Reaching the Right Students.</span></h2>
          <p>Most institutes don’t have an ad problem. They have a targeting, funnel and lead-quality problem. Here’s what we fix—and how we fix it.</p>
        </Reveal>
        <div className="ad-compare__grid">
          <Reveal className="ad-compare__card ad-compare__card--red">
            <CardTop />
            <h3>Common Advertising Problems We Fix</h3>
            <p className="ad-compare__summary">Do these challenges sound familiar? These are the issues that can hold back your institute’s admissions.</p>
            <ul className="ad-compare__list">
              {problems.map((problem) => (
                <li key={problem.title} className="ad-compare__row">
                  <RoundStatusIcon />
                  <div><h4>{problem.title}</h4><p>{problem.text}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="ad-compare__card ad-compare__card--green">
            <div id="solution" />
            <CardTop positive />
            <h3>We Build a Student Acquisition System Designed for Institutes</h3>
            <p className="ad-compare__summary">The right students. The right courses. A clear path to admission.</p>
            <ul className="ad-compare__list">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="ad-compare__row">
                  <RoundStatusIcon positive />
                  <div><h4>{benefit.title}</h4><p>{benefit.text}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="ad-compare__bottom">
          <h3>The Right Students. The Right Courses. A Clear Path to Admission.</h3>
          <p>More leads are useful when they give your admissions team more relevant conversations. Our system connects your courses with students looking for their next skill.</p>
          <p>We start with the programs you want to promote, the locations you serve and the batches you want to fill. Then we build the targeting, enquiry funnel and delivery process around those priorities.</p>
          <p>Your team receives the enquiries. We keep improving the campaigns using performance data and feedback from your counsellors.</p>
          <Button href={bookingHref} external={bookingIsExternal} className="mt-7">Yes, I Want to Fill My Next Batch</Button>
          <div className="ad-compare__note"><span>Course-specific campaigns</span><span>Local student targeting</span><span>Clear enquiry delivery</span></div>
        </Reveal>
      </div>
    </section>
  );
}
// Both columns now render in Problems. Preserve the existing App import/render
// of Solution without repeating the same solution content below the comparison.
export function Solution() {
  return null;
}
