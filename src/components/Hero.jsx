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
  chatHref,
  chatIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";
import HeroVisual from "./HeroVisual.jsx";
import VideoEmbed from "./VideoEmbed.jsx";
const benefits = ["Guaranteed 300+ Quality Student Leads Every Month."];
const stats = [
  { value: "300+", label: "Quality leads every month" },
  { value: "50+", label: "Happy clients" },
  { value: "500+", label: "Systems built" },
  { value: "20+", label: "People in our in-house team" },
];
const journeyTones = [
  "border-plum-200 bg-plum-100 text-plum-700",
  "border-coral-100 bg-coral-50 text-coral-700",
  "border-sun-200 bg-sun-50 text-sun-700",
];
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
                        ✦
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
            <Button
              href={chatHref}
              external={chatIsExternal}
              variant="sun"
              arrow={false}
              className="!px-7 !text-base"
            >
              Chat on WhatsApp
            </Button>
          </div>

        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0 rounded-3xl border border-plum-200/80 bg-white/85 px-4 py-7 text-center shadow-soft backdrop-blur-xl sm:px-6">
              <p className="font-display text-4xl font-extrabold tracking-tight text-plum-700 sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#62536e]">{stat.label}</p>
            </div>
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
                    {String(index + 1).padStart(2, "0")}
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
                      <span className="text-coral-500">✦</span>
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