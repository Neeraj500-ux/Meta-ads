import { useState } from "react";
import { faqs } from "../data/content.js";
import { Reveal, SectionHead, Button } from "./ui.jsx";
import { bookingHref, bookingIsExternal, chatHref, chatIsExternal } from "../config/site.js";

export function Consultation() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="grid items-center gap-10 rounded-[32px] border border-plum-200 bg-gradient-to-br from-white via-white to-plum-50 p-7 shadow-soft sm:p-12 lg:grid-cols-[1.3fr_.8fr]">
          <div>
            <h2 className="h2">Let’s plan the right campaign for your next batch.</h2>
            <p className="mt-5 text-[17px]">Tell me which courses you want to promote, where your institute is located and when your next batch begins.</p>
            <p className="mt-3 text-[17px]">We’ll discuss your current enquiry challenges, the proposed campaign direction and the information needed to get started.</p>
          </div>
          <div className="grid gap-3">
            <Button href={bookingHref} external={bookingIsExternal}>Yes, I Want to Fill My Next Batch</Button>
            <Button href={chatHref} external={chatIsExternal} className="pm-btn--whatsapp">
              <svg className="mr-2 inline-block h-5 w-5 align-[-4px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.55 4.19 1.6 6.02L0 24l6.1-1.6a12.03 12.03 0 0 0 5.94 1.52h.01C18.69 23.92 24 18.52 24 11.88c0-3.18-1.24-6.17-3.48-8.4ZM12.05 21.9a9.98 9.98 0 0 1-5.09-1.4l-.36-.21-3.62.95.97-3.53-.24-.38a9.96 9.96 0 0 1-1.53-5.29c0-5.52 4.49-10.01 10.02-10.01a9.94 9.94 0 0 1 7.07 2.93 9.94 9.94 0 0 1 2.93 7.07c0 5.53-4.49 10.02-10.02 10.02ZM17.54 14.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.48-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              Ask on WhatsApp
            </Button>
            <p className="text-xs text-mute">Call length and any consultation fee are confirmed when you book.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="section-y bg-gradient-to-br from-[#fbf7f2] to-[#faf3fb]">
      <div className="container-x max-w-3xl">
        <SectionHead title="Frequently asked questions." />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className={`overflow-hidden rounded-2xl border bg-white transition duration-300 ${isOpen ? "border-plum-300 shadow-soft" : "border-plum-200/80"}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-ink sm:px-6 sm:text-lg"
                  >
                    {f.q}
                    <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xl font-medium transition duration-300 ${isOpen ? "rotate-180 bg-coral-100 text-coral-700" : "bg-plum-100 text-plum-700"}`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-3 px-5 pb-6 text-[15px] sm:px-6">{f.a.map((p) => <p key={p}>{p}</p>)}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
