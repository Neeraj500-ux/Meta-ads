import { site, whatsappUrl } from "../config/site.js";
import { BrandMark } from "./Header.jsx";
import { Button } from "./ui.jsx";

const links = [
  ["How It Works", "#process"],
  ["About", "#about"],
  ["FAQs", "#faqs"],
  ["Contact", "#enquire"],
];

export default function Footer() {
  const hasContact = site.email || whatsappUrl;

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#2a0f4d] via-[#1d0a38] to-[#12061f] pb-28 pt-16 text-[#d9cdea] sm:pb-12"
    >
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#f5b83d] to-transparent" />

      {/* soft glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7c3aed]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#a855f7]/15 blur-3xl" />

      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_.7fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              aria-label={`${site.brandName} home`}
              className="inline-flex items-center rounded-2xl border border-white/10 bg-[#1a0a33] px-5 py-4 text-white shadow-[0_10px_40px_-10px_rgba(124,58,237,0.6)] ring-1 ring-[#a855f7]/20 transition hover:border-[#f5b83d]/40 [&_*]:!text-white"
            >
              <BrandMark />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#e6dcf5]">
              Meta Ads services for fashion designing, beauty and skill-based institutes.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#bfb0d6]">
              Helping prospective students discover your courses and take the next step toward an admission conversation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5b83d]">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {whatsappUrl && (
                <li>
                  <strong className="text-white">WhatsApp:</strong>{" "}
                  <a
                    className="font-semibold text-[#f5b83d] underline-offset-4 transition hover:text-white hover:underline"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +{site.whatsapp}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <strong className="text-white">Email:</strong>{" "}
                  <a
                    className="font-semibold text-[#f5b83d] underline-offset-4 transition hover:text-white hover:underline"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </li>
              )}
              {!hasContact && <li>Use the enquiry form and we’ll reply to you directly.</li>}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5b83d]">Quick links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {links.map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    className="text-[#d9cdea] transition hover:pl-1 hover:text-white hover:underline underline-offset-4"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-y border-white/10 py-6 text-xs text-[#bfb0d6] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {site.privacyUrl && (
              <a className="transition hover:text-white hover:underline" href={site.privacyUrl} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            )}
            {site.termsUrl && (
              <a className="transition hover:text-white hover:underline" href={site.termsUrl} target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
            )}
          </div>
          <Button href="#enquire" data-enquiry-popup-trigger>Yes, I Want to Fill My Next Batch</Button>
        </div>

        {/* Disclaimers */}
        <div className="mt-6 space-y-3 text-[11px] leading-relaxed text-[#8f7fa8]">
          <p>
            This website is independently operated by {site.brandName} and is not affiliated with or endorsed by Meta, Facebook or Instagram.
          </p>
          <p>
            Campaign targets are not guarantees. Lead volume, lead quality and admissions vary with advertising budget, course offering, location, campaign response and the institute’s admissions process.
          </p>
        </div>
      </div>
    </footer>
  );
}