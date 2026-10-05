# Meta Ads for Institutes: landing page

A React + Vite + Tailwind CSS landing page for Meta Ads services aimed at fashion designing, beauty and skill-based institutes. Layout and section order follow https://lp.triplehash.in/ (hero, comparison of problems, checklist, process, proof, why-choose, FAQ, final CTA). Colours come from your supplied purple / orange / yellow palette.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## 1. Configure your details (.env)

Copy `.env.example` to `.env` and fill in what you have. Anything left blank is hidden or falls back safely.

| Variable | What it does |
| --- | --- |
| `VITE_BRAND_NAME` | Brand name in header, intro, footer and legal lines. Defaults to "Creative Crew". |
| `VITE_CONTACT_EMAIL` | Shown in the footer. Also used by the form as an email-draft fallback. |
| `VITE_WHATSAPP` | Country code + number, digits only (e.g. `919876543210`). Powers every "Chat on WhatsApp" button and the footer number. |
| `VITE_FORM_ENDPOINT` | URL that accepts a JSON `POST`. See below. |
| `VITE_BOOKING_URL` | Optional Calendly / Cal.com link for "Book a Strategy Call". If blank, those buttons scroll to the enquiry form. |
| `VITE_PRIVACY_URL`, `VITE_TERMS_URL` | Footer and form links. Hidden until set. |

Restart `npm run dev` after editing `.env`. Variables are baked in at build time, so rebuild before deploying.

### How the enquiry form works

The form validates name, institute, phone (8 to 15 digits), email, city and courses in the browser, and includes a hidden spam trap field. On a valid submit it does the first of these that is configured:

1. **`VITE_FORM_ENDPOINT` set:** sends the data as JSON (`name`, `institute`, `phone`, `email`, `city`, `batch`, `courses`, `budget`, `challenge`). Works with Formspree, Web3Forms, Make, Zapier, n8n or your own API. Create the form in that service, paste its endpoint URL, and make sure it allows requests from your domain.
2. **Only `VITE_CONTACT_EMAIL` set:** opens an email draft for the visitor to send.
3. **Neither set:** shows a clear message asking the visitor to use WhatsApp or the footer contact details.

No data is stored by this project. Add your own privacy policy URL before launch.

## 2. Edit the content

All copy lives in `src/data/content.js`. Nothing is invented: where your brief had placeholders (fees, budget, timelines, reporting schedule), the page says these are confirmed in the proposal.

- **Testimonials:** add real, approved quotes to the `testimonials` array. The section stays hidden until you do.
- **Case study:** fill in `featuredCampaign` with one verified campaign. Until then, the Results section explains how reports are structured.
- The **300+ leads** figure is shown only as a proposed target with a disclaimer, as in your brief.

## 3. Images

This build uses three original illustrations in `public/images/` (SVG, lazy-loaded) plus an in-code sample ad sketch in the hero. **It does not include stock or client photographs**, because none were supplied and photo libraries could not be downloaded while building.

To add real photos: place optimised files (WebP or JPG, around 1200px wide) in `public/images/` and change the `<img src>` in the `Audience` component in `src/components/Sections2.jsx`. Only use photos you own or are licensed to use, and approved student work.

## Project structure

```
index.html              title, meta description, favicon, theme colour
public/                 favicon.svg and images/
src/
  main.jsx, App.jsx     entry and page composition
  index.css             Tailwind layers, buttons, form fields, reduced-motion rules
  config/site.js        reads .env, builds WhatsApp / booking links
  data/content.js       all page copy
  hooks/useInView.js    scroll-reveal hook (respects reduced motion)
  components/           Header, Hero, HeroVisual, Sections1-3, EnquiryForm, Footer, MobileBar, ui
```

## Features

- Responsive from 320px to wide desktop with no horizontal scroll; mobile menu and sticky mobile CTA bar
- Skip link, semantic landmarks, visible keyboard focus, labelled form fields, accessible accordion (`aria-expanded` / `aria-controls`)
- Entrance animations, hover states and the logo marquee are disabled under `prefers-reduced-motion`
- Self-hosted fonts (Bricolage Grotesque, DM Sans) via Fontsource, with no external requests

## Deploying

`npm run build` outputs a static site in `dist/`. Upload it to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host. Set the `VITE_*` variables in your host's environment settings, or build locally with a `.env` file.

## Notes

This site states it is not affiliated with Meta, Facebook or Instagram. Keep that disclaimer.
