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
            <Button href={chatHref} external={chatIsExternal} className="pm-btn--whatsapp">Ask on WhatsApp</Button>
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
