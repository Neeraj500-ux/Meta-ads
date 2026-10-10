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
| `VITE_META_PIXEL_ID` | Meta Pixel ID used by the Pixel initializer and the no-script fallback. |
| `VITE_META_TEST_CODE` | Meta Events Manager test code; attached to browser events only in development. |

Restart `npm run dev` after editing `.env`. Variables are baked in at build time, so rebuild before deploying.

### How the enquiry form works

The form validates name, institute, phone (8 to 15 digits), email, city and courses in the browser, and includes a hidden spam trap field. On a valid submit it does the first of these that is configured:

1. **`VITE_FORM_ENDPOINT` set:** sends the data as JSON (`name`, `institute`, `phone`, `email`, `city`, `batch`, `courses`, `budget`, `challenge`). Works with Formspree, Web3Forms, Make, Zapier, n8n, Google Apps Script or your own API. Create the form in that service, paste its endpoint URL, and make sure it allows requests from your domain.
2. **Only `VITE_CONTACT_EMAIL` set:** opens an email draft for the visitor to send.
3. **Neither set:** shows a clear message asking the visitor to use WhatsApp or the footer contact details.

No data is stored by this project. Add your own privacy policy URL before launch.

### Google Sheets / Apps Script setup

If you want every enquiry saved directly to a Google Sheet, use a Google Apps Script Web App as the `VITE_FORM_ENDPOINT`.

1. Open Google Sheets and create a workbook.
2. In the spreadsheet, go to **Extensions → Apps Script**.
3. Paste the script from `scripts/google-sheet-apps-script.js`.
4. Deploy it as a **Web App** with:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy the generated Web App URL and set it as `VITE_FORM_ENDPOINT` in `.env`.
6. In Apps Script, select `authorizeSheetAccess` and click **Run** once; review and allow the spreadsheet permissions. The script is configured for spreadsheet ID `1XTbbrrr8UzQO-V0dHcUpgepjRa7Gxgicm2fJscHRk7w` and tab `Enquiries`.
7. After changing the Apps Script, open **Deploy → Manage deployments**, edit the Web App deployment, select **New version**, and deploy it. Keep the same URL if editing the existing deployment.
8. Restart the app or rebuild for production.

If an older version installed a CRM sync trigger, remove that old trigger from Apps Script **Triggers** (clock icon). This script no longer contains or uses CRM sync code.

Example:

```env
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/AKfycby.../exec
```

The script opens the configured spreadsheet by ID (not whichever spreadsheet happens to be active) and writes each enquiry to the `Enquiries` tab. The first step is saved before the form proceeds; the final step updates that same row by lead ID while retaining its original timestamp. The frontend waits for a JSONP verification from the Web App before showing success; a failed save or verification leaves the entered details in the form and displays an error. The POST uses URL-encoded `no-cors` because Apps Script does not provide browser CORS headers for its response.

If a test does not save, confirm the `.env` value is the deployed URL ending in `/exec`, the deployment is set to **Execute as: Me** and **Anyone**, the account deploying the script can edit the spreadsheet, and a new deployment version was deployed after replacing the Apps Script code. The deployment URL should respond to a browser GET with `Google Sheet endpoint is live.`. Check the sheet tab is named exactly `Enquiries`.

## Pixel Testing

Set `VITE_META_PIXEL_ID` and `VITE_META_TEST_CODE` in `.env` (or the deployment environment), then restart the dev server. The test event code is attached only when `import.meta.env.DEV` is true. In Meta Events Manager, open **Test Events**, select the pixel, and verify events from the running local site. The Meta Pixel Helper browser extension can also confirm that the pixel loads and that events fire once. Ad blockers can prevent browser events from appearing.

Every event gets a generated `eventID` for future Conversions API deduplication. The development-only `test_event_code` is also included in event parameters. Personal fields (name, institute, phone, city, email, website, and free-text course details) are never sent as Pixel parameters.

| Event | Parameters |
| --- | --- |
| `PageView` | None |
| `ViewContent` | None |
| `QuizStart` | None |
| `QuestionAnswered` | `question_id`, `question_text`, `answer`, `points`, `step_number` (identity/free-text fields use only the value `provided`) |
| `QuizAbandon` | `last_step` |
| `Lead` | `lead_score`, `lead_temperature`, `total_points`, `value`, `currency`, `content_name` |
| `LeadCold` / `LeadWarm` / `LeadHot` | Same parameters as `Lead`; only the matching temperature event fires |
| `Contact` | `method` (`whatsapp` or `call`) |
| `CompleteRegistration` | Same parameters as `Lead`; fires only for scores 4–5 |

## 2. Edit the content

All copy lives in `src/data/content.js`. Nothing is invented: where your brief had placeholders (fees, budget, timelines, reporting schedule), the page says these are confirmed in the proposal.

- **Testimonials:** add real, approved quotes to the `testimonials` array. The section stays hidden until you do.
- **Case study:** fill in `featuredCampaign` with one verified campaign. Until then, the Results section explains how reports are structured.
- The **500+ leads** figure is shown only as a proposed target with a disclaimer, as in your brief.

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
  lib/                  Meta Pixel events and configurable lead scoring
  data/content.js       all page copy
  hooks/useInView.js    scroll-reveal hook (respects reduced motion)
  components/           Header, Hero, HeroVisual, Sections1-3, EnquiryForm, Footer, MobileBar, ui
```

## Features

- Responsive from 320px to wide desktop with no horizontal scroll; mobile menu and sticky mobile CTA bar
- Skip link, semantic landmarks, visible keyboard focus, labelled form fields, accessible accordion (`aria-expanded` / `aria-controls`)
- Entrance animations, hover states and the logo marquee are disabled under `prefers-reduced-motion`
- Self-hosted fonts (Bricolage Grotesque, DM Sans) via Fontsource; Meta Pixel loads from Meta when configured

## Deploying

`npm run build` outputs a static site in `dist/`. Upload it to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host. Set the `VITE_*` variables in your host's environment settings, or build locally with a `.env` file.

## Notes

This site states it is not affiliated with Meta, Facebook or Instagram. Keep that disclaimer.
