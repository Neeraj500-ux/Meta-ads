import { journey, marquee } from "../data/content.js";
import { bookingHref, bookingIsExternal, chatHref, chatIsExternal } from "../config/site.js";
import { Button } from "./ui.jsx";
import HeroVisual from "./HeroVisual.jsx";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div aria-hidden="true" className="grain absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full border-2 border-plum-700/10 [background:repeating-radial-gradient(circle,transparent_0_29px,rgba(75,38,106,.08)_30px_31px,transparent_32px_60px)]" />
      <div aria-hidden="true" className="absolute -left-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-sun-400/25 blur-3xl" />

      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-rise inline-flex max-w-full items-center gap-2.5 rounded-full bg-gradient-to-r from-plum-800 to-plum-700 px-5 py-2.5 text-[13px] font-semibold text-white shadow-soft sm:text-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-sun-400 animate-pulseRing" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-sun-400" />
            </span>
            Meta Ads for fashion, beauty and skill-based institutes
          </p>

          <h1 className="animate-rise mt-7 text-[2.4rem] font-extrabold [animation-delay:90ms] sm:text-6xl lg:text-[4.2rem]">
            Aim for{" "}
            <span className="relative whitespace-nowrap text-coral-500">
              300+ student leads
              <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun-400"><path d="M3 9c60-8 130-8 294-2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
            </span>{" "}
            with a focused Meta Ads campaign.*
          </h1>

          <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg text-[#62536e] [animation-delay:180ms] sm:text-xl">
            Put your courses in front of prospective students through Facebook and Instagram ads designed around your institute, your location and your upcoming batches.
          </p>
          <p className="animate-rise mx-auto mt-4 max-w-2xl [animation-delay:240ms]">
            Whether you offer fashion designing, makeup, beauty or other skill-based programs, make it easier for interested students to discover your courses, request details and connect with your admissions team.
          </p>

          <ul className="animate-rise mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 border-y border-coral-500/20 bg-gradient-to-r from-transparent via-coral-50 to-transparent py-4 [animation-delay:300ms]">
            {["Promote Your Courses", "Generate Student Enquiries", "Create Admission Opportunities"].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-bold text-plum-700">
                <span aria-hidden="true" className="text-coral-500">✦</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="animate-rise mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center [animation-delay:360ms]">
            <Button href={bookingHref} external={bookingIsExternal} className="sm:min-w-[320px] !min-h-[60px] !text-base">
              Discuss My Institute’s Campaign
            </Button>
            <Button href={chatHref} external={chatIsExternal} variant="sun" arrow={false}>
              Chat on WhatsApp
            </Button>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-xs text-mute">
            *300+ leads is a proposed campaign target, not a guaranteed result. The timeframe, advertising budget and lead definition are confirmed in your proposal.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-8 rounded-[32px] border border-plum-200/80 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <HeroVisual />
            <p className="mt-3 text-center text-xs text-mute">Sample layout for illustration</p>
          </div>

          <div>
            <p className="font-display text-7xl font-extrabold leading-none tracking-tighter text-plum-700 sm:text-8xl">
              300<span className="align-top text-[.55em] text-coral-500">+</span>
            </p>
            <p className="mt-2 text-base font-semibold text-ink">Student lead target*</p>
            <p className="mt-1 text-sm">For your next batch. Confirmed per campaign.</p>

            <ol className="mt-8 space-y-5">
              {journey.map((j, i) => (
                <li key={j.title} className="flex gap-4">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-xs font-extrabold ${["border-plum-200 bg-plum-100 text-plum-700", "border-coral-100 bg-coral-50 text-coral-700", "border-sun-200 bg-sun-50 text-sun-700"][i]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold">{j.title}</h3>
                    <p className="text-sm">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-7 rounded-2xl border border-sun-200 bg-sun-50 px-4 py-3 text-sm text-[#7b6035]">
              Course-specific messaging. Clear enquiry journeys. Reporting that helps you understand performance.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y border-coral-500/20 py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <span key={m + k} className="flex items-center gap-7 whitespace-nowrap px-6 text-sm font-bold text-plum-700">
                  {m}
                  <span className="text-coral-500">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
