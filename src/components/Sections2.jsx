import { services, audiences, steps, processDetails, reportMeasures, testimonials, featuredCampaign, whyChoose } from "../data/content.js";
import { Reveal, SectionHead, SectionCta, Button } from "./ui.jsx";
import { bookingHref, bookingIsExternal } from "../config/site.js";

const iconTone = [
  "from-white to-plum-100 text-plum-700 shadow-[0_6px_0_#e3d4eb]",
  "from-white to-coral-100 text-coral-700 shadow-[0_6px_0_#efdbc9]",
  "from-white to-sun-200 text-sun-700 shadow-[0_6px_0_#e9dfb5]",
];

export function Services() {
  return (
    <section id="services" className="section-y">
      <div className="container-x">
        <SectionHead title="A campaign plan built around your courses and admission goals.">
          <p>Your final proposal will confirm the services, deliverables and responsibilities included in your package.</p>
        </SectionHead>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80} className="card group flex flex-col transition duration-300 hover:-translate-y-1 hover:border-plum-300 hover:shadow-lift">
              <span className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br font-display text-sm font-extrabold transition duration-300 group-hover:-rotate-3 ${iconTone[i % 3]}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-[15px]">{s.text}</p>
              {s.note && <p className="mt-auto border-t border-plum-100 pt-3 text-xs text-mute [margin-top:1.25rem]">{s.note}</p>}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-8 rounded-3xl border border-plum-200/80 bg-gradient-to-br from-plum-50 to-sun-50 p-7 sm:grid-cols-2 sm:p-9">
          <div>
            <h3 className="text-xl font-bold">Performance reporting</h3>
            <p className="mt-3 text-[15px]">Review advertising spend, leads generated, cost per lead and available feedback from your admissions team.</p>
            <p className="mt-3 text-sm"><strong>Reporting schedule:</strong> agreed with you before work begins.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Optional additional services</h3>
            <p className="mt-3 text-[15px]">Landing page creation, tracking setup, CRM integration, WhatsApp automation and follow-up support can be discussed on your strategy call. Availability and pricing are confirmed in your proposal.</p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-3xl rounded-[28px] border border-[#e8d6c0] bg-gradient-to-br from-[#fff8ef] to-sun-50 p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold">Fees and advertising budget</h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px]">
            Your service fee, recommended advertising budget and whether ad spend is billed separately are set out clearly in your proposal after we review your courses and goals. Nothing is decided before you have seen it.
          </p>
          <Button href={bookingHref} external={bookingIsExternal} className="mt-6">Request My Campaign Proposal</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Audience() {
  const tint = ["bg-plum-100 text-plum-700", "bg-coral-100 text-coral-700", "bg-sun-200 text-sun-700"];
  return (
    <section className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title="Marketing that reflects the skills you teach." />
        <div className="grid gap-6 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.key} delay={i * 90} className="group overflow-hidden rounded-3xl border border-plum-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="overflow-hidden">
                <img src={`/images/audience-${a.key}.svg`} alt="" width="480" height="320" loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-bold ${tint[i]}`}>{a.label}</span>
                <h3 className="mt-4 text-xl font-bold">{a.title}</h3>
                <div className="mt-3 space-y-3 text-[15px]">{a.text.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-2xl text-center text-[15px]">
          This service is suited to institutes with a clear course offering and a team ready to respond to student enquiries.
        </Reveal>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Discuss My Courses</SectionCta>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section-y">
      <div className="container-x">
        <SectionHead title="A clear process from understanding your institute to reviewing results." />
        <ol className="mx-auto max-w-3xl">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
              {i < steps.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[22px] top-14 w-0.5 bg-gradient-to-b from-plum-200 to-coral-300 sm:left-[28px] sm:top-16" />}
              <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold sm:h-14 sm:w-14 sm:text-lg ${i % 2 ? "bg-sun-400 text-plum-800" : "bg-gradient-to-br from-plum-800 to-plum-600 text-white"} shadow-soft`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] sm:text-base">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mx-auto mt-12 grid max-w-3xl gap-4 rounded-2xl border border-plum-200/80 bg-plum-50 p-6 text-sm sm:grid-cols-3">
          {processDetails.map((d) => (
            <p key={d.label}><strong className="block">{d.label}</strong>{d.text}</p>
          ))}
        </Reveal>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Discuss My Campaign Strategy</SectionCta>
      </div>
    </section>
  );
}

export function Results() {
  const c = featuredCampaign;
  const rows = c && [
    ["Institute", c.institute], ["Course promoted", c.course], ["Location", c.location], ["Campaign period", c.period],
    ["Advertising spend", c.spend], ["Leads generated", c.leads], ["Lead definition", c.leadDefinition], ["Cost per lead", c.costPerLead],
    ["Counselling bookings", c.bookings], ["Admissions", c.admissions],
  ].filter(([, v]) => v);

  return (
    <section id="results" className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title={c ? "See what the campaign delivered, and what those enquiries led to." : "How we report results, honestly."}>
          <p>{c ? "Campaign results show the course promoted, the advertising investment and the response generated." : "Leads, counselling bookings and admissions are different things. Your reports keep them separate, so you can see what the campaign contributed."}</p>
        </SectionHead>

        <Reveal className="card mx-auto max-w-4xl !p-7 sm:!p-10">
          <h3 className="text-xl font-bold">{c ? "Featured campaign" : "What every campaign report covers"}</h3>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {(rows || reportMeasures.map((m) => [m.term, m.desc])).map(([t, d], i) => (
              <div key={t} className={`rounded-2xl border border-plum-100 p-5 ${i % 4 === 1 || i % 4 === 2 ? "bg-sun-50" : "bg-white"}`}>
                <dt className="text-sm font-bold text-plum-700">{t}</dt>
                <dd className="mt-1 text-[15px]">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-mute">
            {c ? "Figures are specific to this campaign and are not a promise of future results." : "Verified case studies are shared on the strategy call, with the client’s permission. The 300+ figure on this page is a proposed target, not a result."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="section-y">
      <div className="container-x">
        <SectionHead title="Hear from the institutes I’ve worked with." />
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.name} delay={i * 80} className="card">
              <blockquote className="font-display text-xl leading-relaxed text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-plum-100 pt-4 text-sm"><strong>{t.name}</strong><br />{t.role}, {t.institute}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHead title="A focused approach to your institute’s student enquiries." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 80} className="card transition duration-300 hover:-translate-y-1 hover:border-plum-300 hover:shadow-lift">
              <span aria-hidden="true" className={`mb-5 block h-1.5 w-12 rounded-full ${["bg-plum-700", "bg-coral-500", "bg-sun-400"][i % 3]}`} />
              <h3 className="text-lg font-bold">{w.title}</h3>
              <p className="mt-3 text-[15px]">{w.text}</p>
            </Reveal>
          ))}
        </div>
        <SectionCta href={bookingHref} external={bookingIsExternal}>Let’s Discuss Your Admission Goals</SectionCta>
      </div>
    </section>
  );
}
