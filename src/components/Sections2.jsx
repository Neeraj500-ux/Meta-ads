import { useState } from "react";
import {
  services,
  audiences,
  steps,
  processDetails,
  reportMeasures,
  testimonials,
  featuredCampaign,
  whyChoose,
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

const iconTone = [
  "from-white to-plum-100 text-plum-700 shadow-[0_6px_0_#e3d4eb]",
  "from-white to-coral-100 text-coral-700 shadow-[0_6px_0_#efdbc9]",
  "from-white to-sun-200 text-sun-700 shadow-[0_6px_0_#e9dfb5]",
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center">
        <p className="text-sm font-semibold text-plum-700">
          Image unavailable
        </p>
        <p className="text-xs text-mute">
          Please check the image file.
        </p>
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

export function Services() {
  return (
    <section id="services" className="section-y">
      <div className="container-x">
        <SectionHead title="A campaign plan built around your courses and admission goals.">
          <p>
            Your final proposal will confirm the services, deliverables and
            responsibilities included in your package.
          </p>
        </SectionHead>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={(index % 3) * 80}
              className="card group flex flex-col transition duration-300 hover:-translate-y-1 hover:border-plum-300 hover:shadow-lift"
            >
              <span
                className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br font-display text-sm font-extrabold transition duration-300 group-hover:-rotate-3 ${
                  iconTone[index % iconTone.length]
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-xl font-bold">{service.title}</h3>

              <p className="mt-3 text-[15px]">{service.text}</p>

              {service.note && (
                <p className="mt-auto border-t border-plum-100 pt-3 text-xs text-mute [margin-top:1.25rem]">
                  {service.note}
                </p>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-8 rounded-3xl border border-plum-200/80 bg-gradient-to-br from-plum-50 to-sun-50 p-7 sm:grid-cols-2 sm:p-9">
          <div>
            <h3 className="text-xl font-bold">Performance reporting</h3>

            <p className="mt-3 text-[15px]">
              Review advertising spend, leads generated, cost per lead and
              available feedback from your admissions team.
            </p>

            <p className="mt-3 text-sm">
              <strong>Reporting schedule:</strong> agreed with you before work
              begins.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Optional additional services
            </h3>

            <p className="mt-3 text-[15px]">
              Landing page creation, tracking setup, CRM integration, WhatsApp
              automation and follow-up support can be discussed on your strategy
              call. Availability and pricing are confirmed in your proposal.
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-3xl rounded-[28px] border border-[#e8d6c0] bg-gradient-to-br from-[#fff8ef] to-sun-50 p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold">Fees and advertising budget</h3>

          <p className="mx-auto mt-3 max-w-xl text-[15px]">
            Your service fee, recommended advertising budget and whether ad
            spend is billed separately are set out clearly in your proposal
            after we review your courses and goals. Nothing is decided before
            you have seen it.
          </p>

          <Button
            href={bookingHref}
            external={bookingIsExternal}
            className="mt-6"
          >
            Request My Campaign Proposal
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x">
        <SectionHead title="Marketing that reflects the skills you teach." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                <div className="flex flex-1 flex-col p-6 sm:p-7">
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

        <SectionCta href={bookingHref} external={bookingIsExternal}>
          Discuss My Courses
        </SectionCta>
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
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[22px] top-14 w-0.5 bg-gradient-to-b from-plum-200 to-coral-300 sm:left-[28px] sm:top-16"
                />
              )}

              <span
                className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold shadow-soft sm:h-14 sm:w-14 sm:text-lg ${
                  index % 2
                    ? "bg-sun-400 text-plum-800"
                    : "bg-gradient-to-br from-plum-800 to-plum-600 text-white"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 pt-1">
                <h3 className="text-xl font-bold">{step.title}</h3>

                <p className="mt-2 text-[15px] sm:text-base">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mx-auto mt-12 grid max-w-3xl gap-4 rounded-2xl border border-plum-200/80 bg-plum-50 p-6 text-sm sm:grid-cols-3">
          {processDetails.map((detail) => (
            <p key={detail.label}>
              <strong className="block">{detail.label}</strong>
              {detail.text}
            </p>
          ))}
        </Reveal>

        <SectionCta href={bookingHref} external={bookingIsExternal}>
          Discuss My Campaign Strategy
        </SectionCta>
      </div>
    </section>
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
    <section
      id="results"
      className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]"
    >
      <div className="container-x">
        <SectionHead
          title={
            campaign
              ? "See what the campaign delivered, and what those enquiries led to."
              : "How we report results, honestly."
          }
        >
          <p>
            {campaign
              ? "Campaign results show the course promoted, the advertising investment and the response generated."
              : "Leads, counselling bookings and admissions are different things. Your reports keep them separate, so you can see what the campaign contributed."}
          </p>
        </SectionHead>

        <Reveal className="card mx-auto max-w-4xl !p-7 sm:!p-10">
          <h3 className="text-xl font-bold">
            {campaign
              ? "Featured campaign"
              : "What every campaign report covers"}
          </h3>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map(([term, description], index) => (
              <div
                key={term}
                className={`rounded-2xl border border-plum-100 p-5 ${
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
              : "Verified case studies are shared on the strategy call, with the client’s permission. The 300+ figure on this page is a proposed target, not a result."}
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
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              key={testimonial.name}
              delay={index * 80}
              className="card"
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
    </section>
  );
}

export function WhyChoose() {
  const accentColors = [
    "bg-plum-700",
    "bg-coral-500",
    "bg-sun-400",
  ];

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHead title="A focused approach to your institute’s student enquiries." />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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

        <SectionCta href={bookingHref} external={bookingIsExternal}>
          Let’s Discuss Your Admission Goals
        </SectionCta>
      </div>
    </section>
  );
}