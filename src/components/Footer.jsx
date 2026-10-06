import { site, whatsappUrl } from "../config/site.js";
import { BrandMark } from "./Header.jsx";

const links = [
  ["How It Works", "#process"], ["About", "#about"], ["FAQs", "#faqs"], ["Contact", "#enquire"],
];

export default function Footer() {
  const hasContact = site.email || whatsappUrl;
  return (
    <footer id="contact" className="border-t border-plum-200 bg-gradient-to-b from-[#f7f0f8] to-cream pb-28 pt-14 sm:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_.7fr]">
          <div>
            <a href="#top" aria-label={`${site.brandName} home`}><BrandMark /></a>
            <p className="mt-5 max-w-sm text-sm">Meta Ads services for fashion designing, beauty and skill-based institutes.</p>
            <p className="mt-3 max-w-sm text-sm">Helping prospective students discover your courses and take the next step toward an admission conversation.</p>
          </div>
          <div>
            <h3 className="text-base font-bold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {whatsappUrl && <li><strong>WhatsApp:</strong> <a className="font-semibold text-plum-700 underline underline-offset-2" href={whatsappUrl} target="_blank" rel="noopener noreferrer">+{site.whatsapp}</a></li>}
              {site.email && <li><strong>Email:</strong> <a className="font-semibold text-plum-700 underline underline-offset-2" href={`mailto:${site.email}`}>{site.email}</a></li>}
              {!hasContact && <li>Use the enquiry form and we’ll reply to you directly.</li>}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map(([l, h]) => <li key={h}><a href={h} className="hover:text-plum-700 hover:underline">{l}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-y border-plum-200/80 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {site.privacyUrl && <a className="hover:underline" href={site.privacyUrl} target="_blank" rel="noopener noreferrer">Privacy Policy</a>}
            {site.termsUrl && <a className="hover:underline" href={site.termsUrl} target="_blank" rel="noopener noreferrer">Terms of Service</a>}
          </div>
          <a href="#enquire" className="font-bold text-plum-700">Book a Strategy Call ↗</a>
        </div>

        <div className="mt-6 space-y-3 text-[11px] leading-relaxed text-[#908398]">
          <p>This website is independently operated by {site.brandName} and is not affiliated with or endorsed by Meta, Facebook or Instagram.</p>
          <p>Campaign targets are not guarantees. Lead volume, lead quality and admissions vary with advertising budget, course offering, location, campaign response and the institute’s admissions process.</p>
        </div>
      </div>
    </footer>
  );
}
