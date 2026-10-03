import { journey, marquee } from "../data/content.js";
import {
  bookingHref,
  bookingIsExternal,
  chatHref,
  chatIsExternal,
} from "../config/site.js";
import { Button } from "./ui.jsx";
import HeroVisual from "./HeroVisual.jsx";
import VideoEmbed from "./VideoEmbed.jsx";

const benefits = [
  "Promote Your Courses",
  "Generate Student Enquiries",
  "Create Admission Opportunities",
];

const journeyTones = [
  "border-plum-200 bg-plum-100 text-plum-700",
  "border-coral-100 bg-coral-50 text-coral-700",
  "border-sun-200 bg-sun-50 text-sun-700",
];

const heroStyles = `
  .institute-hero {
    isolation: isolate;
    background:
      radial-gradient(
        ellipse at 12% 8%,
        rgba(255, 222, 133, .18),
        transparent 35%
      ),
      radial-gradient(
        ellipse at 92% 22%,
        rgba(116, 68, 148, .08),
        transparent 34%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, .35),
        rgba(255, 255, 255, .08)
      );
  }

  .institute-hero,
  .institute-hero *,
  .institute-hero *::before,
  .institute-hero *::after {
    box-sizing: border-box;
  }

  .institute-hero .hero-enter {
    animation: instituteHeroEnter .8s cubic-bezier(.22, 1, .36, 1) both;
    animation-delay: var(--hero-delay, 0ms);
  }

  .institute-hero .hero-orb {
    animation: instituteHeroFloat 12s ease-in-out infinite;
    will-change: transform;
  }

  .institute-hero .hero-orb-alt {
    animation-delay: -6s;
  }

  .institute-hero .hero-status-ring {
    animation: instituteHeroPulse 2.8s ease-out infinite;
  }

  .institute-hero .hero-video-shell {
    position: relative;
    isolation: isolate;
    width: 100%;
    padding: clamp(6px, 1.1vw, 12px);
    border: 1px solid rgba(255, 255, 255, .95);
    border-radius: clamp(20px, 3vw, 36px);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, .95),
      rgba(250, 244, 255, .78) 48%,
      rgba(255, 245, 232, .88)
    );
    box-shadow:
      0 24px 65px rgba(75, 38, 106, .12),
      0 8px 22px rgba(75, 38, 106, .06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    transition:
      transform .55s cubic-bezier(.22, 1, .36, 1),
      box-shadow .55s ease;
  }

  .institute-hero .hero-video-shell::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -16px;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(
      from 30deg,
      rgba(116, 68, 148, .22),
      rgba(245, 133, 98, .26),
      rgba(255, 210, 91, .3),
      rgba(116, 68, 148, .22)
    );
    filter: blur(26px);
    opacity: .5;
    animation: instituteVideoGlow 7s ease-in-out infinite;
    transition: opacity .5s ease;
  }

  .institute-hero .hero-video-shell::after {
    content: "";
    position: absolute;
    z-index: 2;
    inset: 0;
    border: 1px solid rgba(75, 38, 106, .07);
    border-radius: inherit;
    pointer-events: none;
  }

  .institute-hero .hero-video-screen {
    position: relative;
    overflow: hidden;
    border-radius: clamp(15px, 2.5vw, 26px);
    background: #241330;
    isolation: isolate;
  }

  .institute-hero .hero-video-screen > * {
    width: 100%;
    min-width: 0;
  }

  .institute-hero .hero-video-screen iframe,
  .institute-hero .hero-video-screen video {
    display: block;
    max-width: 100%;
    border: 0;
  }

  .institute-hero .hero-video-screen iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .institute-hero .hero-video-screen video {
    width: 100%;
    height: auto;
  }

  .institute-hero .hero-video-screen img {
    max-width: 100%;
  }

  .institute-hero .hero-video-shell:focus-within {
    outline: 3px solid rgba(116, 68, 148, .35);
    outline-offset: 5px;
  }

  .institute-hero .hero-benefit-track {
    animation: instituteHeroMarquee 36s linear infinite;
    will-change: transform;
  }

  .institute-hero .hero-secondary-track {
    animation: instituteHeroMarquee 42s linear infinite;
    will-change: transform;
  }

  .institute-hero .hero-ticker:hover .hero-benefit-track,
  .institute-hero .hero-ticker:hover .hero-secondary-track {
    animation-play-state: paused;
  }

  .institute-hero .hero-benefit-pill {
    box-shadow:
      0 5px 15px rgba(75, 38, 106, .04),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    transition:
      transform .3s ease,
      box-shadow .3s ease;
  }

  .institute-hero .hero-target-panel {
    background:
      radial-gradient(
        ellipse at 0% 0%,
        rgba(235, 222, 244, .48),
        transparent 50%
      ),
      radial-gradient(
        ellipse at 100% 100%,
        rgba(255, 231, 180, .3),
        transparent 48%
      ),
      rgba(255, 255, 255, .85);
    box-shadow:
      0 24px 60px rgba(75, 38, 106, .07),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .institute-hero .hero-step {
    transition:
      transform .3s ease,
      background-color .3s ease,
      box-shadow .3s ease;
  }

  .institute-hero .hero-cta a,
  .institute-hero .hero-cta button {
    max-width: 100%;
    white-space: normal;
    text-align: center;
    transition:
      transform .3s ease,
      box-shadow .3s ease,
      background-color .3s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .institute-hero .hero-video-shell:hover {
      transform: translateY(-5px);
      box-shadow:
        0 32px 75px rgba(75, 38, 106, .16),
        0 12px 28px rgba(75, 38, 106, .08),
        inset 0 1px 0 rgba(255, 255, 255, 1);
    }

    .institute-hero .hero-video-shell:hover::before {
      opacity: .8;
    }

    .institute-hero .hero-benefit-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(75, 38, 106, .09);
    }

    .institute-hero .hero-step:hover {
      transform: translateX(4px);
      background-color: rgba(255, 255, 255, .9);
      box-shadow: 0 8px 24px rgba(75, 38, 106, .05);
    }

    .institute-hero .hero-cta a:hover,
    .institute-hero .hero-cta button:hover {
      transform: translateY(-3px);
    }
  }

  @keyframes instituteHeroEnter {
    from {
      opacity: 0;
      transform: translateY(22px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes instituteHeroFloat {
    0%, 100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(12px, -20px, 0);
    }
  }

  @keyframes instituteHeroPulse {
    0% {
      transform: scale(1);
      opacity: .65;
    }
    80%, 100% {
      transform: scale(2.3);
      opacity: 0;
    }
  }

  @keyframes instituteVideoGlow {
    0%, 100% {
      opacity: .4;
      transform: scale(.98);
    }
    50% {
      opacity: .65;
      transform: scale(1.02);
    }
  }

  @keyframes instituteHeroMarquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
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

    .institute-hero .hero-video-shell:hover,
    .institute-hero .hero-step:hover,
    .institute-hero .hero-benefit-pill:hover {
      transform: none;
    }

    .institute-hero .hero-ticker {
      overflow: visible;
      mask-image: none;
      -webkit-mask-image: none;
    }

    .institute-hero .hero-benefit-track,
    .institute-hero .hero-secondary-track {
      width: 100%;
    }

    .institute-hero .hero-ticker-copy {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 0;
    }

    .institute-hero .hero-ticker-duplicate {
      display: none;
    }
  }
`;

function Sparkle({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 3 14.4 9.6 21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="m6 12 4 4 8-8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="institute-hero relative overflow-hidden pb-12 pt-9 sm:pb-20 sm:pt-14 lg:pt-16">
      <style>{heroStyles}</style>

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="grain absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />

        <div className="hero-orb absolute -left-28 top-20 h-72 w-72 rounded-full bg-sun-400/20 blur-3xl sm:h-96 sm:w-96" />

        <div className="hero-orb hero-orb-alt absolute -right-32 top-72 h-80 w-80 rounded-full bg-plum-200/40 blur-3xl sm:h-[440px] sm:w-[440px]" />

        <div className="absolute -right-28 top-12 h-80 w-80 rounded-full border border-plum-700/10 [background:repeating-radial-gradient(circle,transparent_0_35px,rgba(75,38,106,.06)_36px_37px,transparent_38px_72px)] sm:h-[420px] sm:w-[420px]" />

        <div className="absolute bottom-64 left-[-140px] h-80 w-80 rounded-full border border-coral-500/10" />
      </div>

      {/* Headline and introduction */}
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="hero-enter flex justify-center">
            <p className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-plum-800 to-plum-700 px-4 py-3 text-left text-xs font-semibold leading-relaxed text-white shadow-[0_8px_24px_rgba(75,38,106,0.16)] sm:px-6 sm:text-sm">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="hero-status-ring absolute inset-0 rounded-full bg-sun-400" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-sun-400" />
              </span>

              Meta Ads for fashion, beauty and skill-based institutes
            </p>
          </div>

          <h1
            className="hero-enter mx-auto mt-7 max-w-[980px] text-[clamp(2.1rem,5.4vw,4.65rem)] font-extrabold leading-[1.1] tracking-[-0.045em] text-ink [text-wrap:balance] sm:mt-9"
            style={{ "--hero-delay": "80ms" }}
          >
            Aim for{" "}
            <span className="relative inline-block pb-2 text-coral-500">
              300+ student leads
              <svg
                aria-hidden="true"
                viewBox="0 0 600 22"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-0 left-0 h-3 w-full text-sun-400 sm:h-4"
              >
                <path
                  d="M7 15C140 3 350 4 593 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            with a focused Meta Ads campaign.*
          </h1>

          <p
            className="hero-enter mx-auto mt-6 max-w-[740px] text-base leading-[1.8] text-[#62536e] sm:mt-7 sm:text-lg lg:text-xl"
            style={{ "--hero-delay": "160ms" }}
          >
            Put your courses in front of prospective students through Facebook
            and Instagram ads designed around your institute, your location and
            your upcoming batches.
          </p>
        </div>

        {/* Premium video frame */}
        <div
          className="hero-enter relative mx-auto mt-9 max-w-[940px] sm:mt-12"
          style={{ "--hero-delay": "240ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-5 -top-5 hidden h-12 w-12 items-center justify-center rounded-2xl border border-sun-200 bg-sun-50 text-sun-700 shadow-soft lg:flex"
          >
            <Sparkle className="h-6 w-6" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 -right-5 hidden h-14 w-14 items-center justify-center rounded-[20px] border border-coral-100 bg-coral-50 text-coral-500 shadow-soft lg:flex"
          >
            <Sparkle className="h-7 w-7" />
          </div>

          <div className="hero-video-shell">
            <div className="hero-video-screen">
              <VideoEmbed />
            </div>
          </div>
        </div>

        <p
          className="hero-enter mx-auto mt-8 max-w-[760px] text-center text-base leading-[1.85] text-[#62536e] sm:mt-10 sm:text-lg"
          style={{ "--hero-delay": "320ms" }}
        >
          Whether you offer fashion designing, makeup, beauty or other
          skill-based programs, make it easier for interested students to
          discover your courses, request details and connect with your admissions
          team.
        </p>
      </div>

      {/* Full-width benefits carousel */}
      <div className="relative mt-9 sm:mt-12">
        <ul className="sr-only">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="hero-ticker overflow-hidden border-y border-coral-500/15 bg-gradient-to-r from-coral-50/30 via-coral-50/80 to-sun-50/40 py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] sm:py-5"
        >
          <div className="hero-benefit-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={`hero-ticker-copy flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6 ${
                  copy === 1 ? "hero-ticker-duplicate" : ""
                }`}
              >
                {[0, 1, 2].flatMap((round) =>
                  benefits.map((benefit) => (
                    <span
                      key={`${copy}-${round}-${benefit}`}
                      className={`hero-benefit-pill flex items-center gap-3 whitespace-nowrap rounded-full border border-plum-200/70 bg-white/95 px-5 py-3 text-sm font-bold text-plum-700 sm:px-7 sm:text-base ${
                        round > 0 ? "hero-ticker-duplicate" : ""
                      }`}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coral-50 text-coral-500">
                        <CheckIcon className="h-4 w-4" />
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
          <div
            className="hero-enter hero-cta mt-9 flex flex-col items-stretch justify-center gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-4"
            style={{ "--hero-delay": "360ms" }}
          >
            <Button
              href={bookingHref}
              external={bookingIsExternal}
              className="!min-h-[60px] !px-6 !text-base shadow-[0_12px_28px_rgba(75,38,106,0.18)] sm:min-w-[320px]"
            >
              Discuss My Institute’s Campaign
            </Button>

            <Button
              href={chatHref}
              external={chatIsExternal}
              variant="sun"
              arrow={false}
              className="!min-h-[60px] !px-7 !text-base"
            >
              Chat on WhatsApp
            </Button>
          </div>

          <p className="mx-auto mt-5 max-w-[620px] px-1 text-xs leading-[1.8] text-mute sm:mt-6">
            *300+ leads is a proposed campaign target, not a guaranteed result.
            The timeframe, advertising budget and lead definition are confirmed
            in your proposal.
          </p>
        </div>

        {/* Campaign target panel */}
        <div className="hero-target-panel relative mx-auto mt-12 grid max-w-6xl items-center gap-9 overflow-hidden rounded-[26px] border border-plum-200/80 p-5 backdrop-blur-xl sm:mt-16 sm:rounded-[36px] sm:p-9 lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:p-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          />

          {/* Illustration */}
          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 bottom-4 top-8 rounded-full bg-plum-200/25 blur-3xl"
            />

            <div className="relative rounded-[22px] border border-white/90 bg-white/60 p-3 shadow-[0_12px_35px_rgba(75,38,106,0.05)] sm:rounded-[28px] sm:p-5">
              <HeroVisual />
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-mute">
              Sample layout for illustration
            </p>
          </div>

          {/* Target and journey */}
          <div className="relative min-w-0">
            <div className="flex items-center gap-4 sm:gap-5">
              <p className="shrink-0 font-display text-[clamp(4.25rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.07em] text-plum-700">
                300
                <span className="relative -top-[0.35em] ml-1 text-[.5em] text-coral-500">
                  +
                </span>
              </p>

              <div className="min-w-0 border-l border-plum-200 pl-4 sm:pl-5">
                <p className="text-base font-bold leading-snug text-ink sm:text-lg">
                  Student lead target*
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#62536e]">
                  For your next batch. Confirmed per campaign.
                </p>
              </div>
            </div>

            <ol className="mt-7 space-y-2 sm:mt-8">
              {journey.map((item, index) => (
                <li
                  key={item.title}
                  className="hero-step flex items-start gap-3 rounded-2xl border border-transparent p-3 sm:gap-4"
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border text-sm font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
                      journeyTones[index % journeyTones.length]
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.75] text-[#62536e]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sun-200/90 bg-gradient-to-br from-sun-50 to-white/90 px-4 py-4 sm:mt-7 sm:px-5">
              <Sparkle className="mt-0.5 h-5 w-5 shrink-0 text-sun-700" />

              <p className="text-sm leading-[1.75] text-[#7b6035]">
                Course-specific messaging. Clear enquiry journeys. Reporting
                that helps you understand performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second full-width ticker */}
      {marquee.length > 0 && (
        <div className="mt-11 sm:mt-14">
          <ul className="sr-only">
            {marquee.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>

          <div
            aria-hidden="true"
            className="hero-ticker overflow-hidden border-y border-plum-200/60 bg-white/35 py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          >
            <div className="hero-secondary-track flex w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className={`hero-ticker-copy flex shrink-0 items-center ${
                    copy === 1 ? "hero-ticker-duplicate" : ""
                  }`}
                >
                  {marquee.map((item, index) => (
                    <span
                      key={`${copy}-${index}-${item}`}
                      className="flex items-center gap-6 whitespace-nowrap px-5 text-xs font-bold tracking-wide text-plum-700 sm:gap-8 sm:px-7 sm:text-sm"
                    >
                      {item}
                      <Sparkle className="h-4 w-4 shrink-0 text-coral-500" />
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