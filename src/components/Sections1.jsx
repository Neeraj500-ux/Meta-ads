import { useState } from "react";
import { approach, problems, benefits } from "../data/content.js";
import { Reveal, SectionHead, SectionCta, Button, Check } from "./ui.jsx";
import { bookingHref, bookingIsExternal } from "../config/site.js";
import { site } from "../config/site.js";

export function Intro() {
  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <SectionHead title={<>Your institute has valuable skills to teach. Let’s help more students discover them.</>} />
        <Reveal className="card mx-auto max-w-3xl !p-8 sm:!p-12">
          <div className="space-y-5 text-[17px]">
            <p>
              I run <strong>{site.brandName}</strong>, and I provide Meta Ads services for fashion designing, beauty and other skill-based institutes looking to generate student enquiries.
            </p>
            <p>
              Every institute has something different to offer—practical training, experienced trainers, specialised courses, learning facilities or a supportive classroom environment. My approach starts by understanding those strengths and presenting them clearly to prospective students.
            </p>
            <p>
              From the first ad to the enquiry form, the message stays focused on what students want to know: what they will learn, how the course works and why they should consider your institute.
            </p>
          </div>
          <a href="#enquire" className="group mt-8 inline-flex items-center gap-2 font-bold text-plum-700 underline-offset-4 hover:underline">
            Let’s talk about your institute
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const tone = [
  "bg-plum-50 border-plum-200 hover:border-plum-300",
  "bg-coral-50 border-coral-100 hover:border-coral-300",
];

export function Approach() {
  return (
    <section className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title="Give every campaign a clear purpose: more relevant student enquiries.">
          <p>Your advertising should help prospective students understand your courses and take the next step.</p>
        </SectionHead>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 90} className={`group rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-9 ${tone[(i + Math.floor(i / 2)) % 2]}`}>
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white text-plum-700 shadow-[0_6px_0_#e3d4eb] transition duration-300 group-hover:-rotate-3">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold">{a.title}</h3>
              <p className="mt-3 text-[15px]">{a.text}</p>
            </Reveal>
          ))}
        </div>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Plan My Student Enquiry Campaign</SectionCta>
      </div>
    </section>
  );
}

export function Problems() {
  // Interactive checklist, as on the reference page. Purely visual; nothing is stored.
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (i) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <section id="problems" className="section-y">
      <div className="container-x">
        <SectionHead title="Is your institute ready for more students, but struggling to generate consistent enquiries?">
          <p>You work hard to deliver useful training. Bringing a steady flow of prospective students into your admission process can still be challenging.</p>
        </SectionHead>

        <Reveal className="mx-auto max-w-3xl rounded-[28px] border border-plum-200/80 bg-white/90 px-5 shadow-soft sm:px-9">
          <fieldset>
            <legend className="sr-only">Tick the challenges that sound like your institute</legend>
            {problems.map((p, i) => {
              const id = `problem-${i}`;
              return (
                <div key={p.title} className="border-b border-plum-100 last:border-0">
                  <label htmlFor={id} className="flex cursor-pointer gap-4 py-6 sm:gap-5">
                    <input id={id} type="checkbox" className="peer sr-only" checked={picked.has(i)} onChange={() => toggle(i)} />
                    <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-plum-200 bg-white text-white transition peer-checked:border-plum-700 peer-checked:bg-plum-700 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum-700">
                      <Check className={`h-4 w-4 transition-transform ${picked.has(i) ? "scale-100" : "scale-0"}`} />
                    </span>
                    <span>
                      <span className={`block font-display text-lg font-bold leading-snug transition-colors sm:text-xl ${picked.has(i) ? "text-plum-700" : "text-ink"}`}>{p.title}</span>
                      <span className="mt-2 block text-[15px]">{p.text}</span>
                    </span>
                  </label>
                </div>
              );
            })}
          </fieldset>
        </Reveal>

        <p className="mx-auto mt-6 text-center text-sm font-semibold text-plum-700" aria-live="polite">
          {picked.size > 0 ? `${picked.size} of ${problems.length} sound familiar. This is exactly what we can plan around.` : "Tick any that sound like your institute."}
        </p>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Discuss My Institute’s Challenges</SectionCta>
      </div>
    </section>
  );
}

export function Solution() {
  return (
    <section id="solution" className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h2">Connect your courses with students looking for their next skill.</h2>
          <div className="mt-6 space-y-4 text-[17px]">
            <p>My Meta Ads service brings course messaging, campaign planning and enquiry generation into one coordinated approach.</p>
            <p>We begin with your admission priorities: which courses you want to promote, where your students come from and when your next batches start.</p>
            <p>Then we build a campaign that helps prospective students understand your offer and contact your team.</p>
          </div>
          <Button href={bookingHref} external={bookingIsExternal} className="mt-8">Build My Campaign Plan</Button>
        </Reveal>

        <ul className="space-y-4">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 60} className="group flex gap-4 rounded-3xl border border-plum-200/80 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-plum-300 sm:p-7">
              <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${i % 2 ? "bg-coral-100 text-coral-700" : "bg-plum-100 text-plum-700"}`}>
                <Check />
              </span>
              <div>
                <h3 className="text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-[15px]">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
