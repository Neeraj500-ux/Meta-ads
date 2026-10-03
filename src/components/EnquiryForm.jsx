import { useState } from "react";
import { Reveal, Button, Arrow } from "./ui.jsx";
import { site, bookingHref, bookingIsExternal, chatHref, chatIsExternal } from "../config/site.js";

const labels = {
  name: "Name", institute: "Institute", phone: "Phone / WhatsApp", email: "Email", city: "City / Service Area",
  batch: "Next batch start date", courses: "Courses to promote", budget: "Monthly advertising budget", challenge: "Main enquiry challenge",
};

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.institute.trim()) e.institute = "Enter your institute’s name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15 || !/^[+\d\s()-]+$/.test(v.phone)) e.phone = "Enter a valid phone number, 8 to 15 digits.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.city.trim()) e.city = "Enter your city or service area.";
  if (!v.courses.trim()) e.courses = "Tell us which courses you want to promote.";
  return e;
}

const empty = { name: "", institute: "", phone: "", email: "", city: "", batch: "", courses: "", budget: "", challenge: "", website: "" };

function Field({ id, label, required, error, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}{required && <span aria-hidden="true" className="text-coral-700"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-coral-700">{error}</p>}
    </div>
  );
}

export default function EnquiryForm() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle", msg: "" });

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };
  const props = (k, extra = {}) => ({
    id: `f-${k}`, name: k, value: v[k], onChange: set(k), className: "field",
    "aria-invalid": errors[k] ? "true" : undefined, "aria-describedby": errors[k] ? `f-${k}-err` : undefined, ...extra,
  });

  async function onSubmit(ev) {
    ev.preventDefault();
    if (v.website) return; // honeypot
    const errs = validate(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      setState({ status: "error", msg: "Please fix the highlighted fields." });
      return;
    }
    const { website, ...data } = v;

    if (site.formEndpoint) {
      setState({ status: "sending", msg: "Sending your enquiry…" });
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        setState({ status: "success", msg: "Thank you. Your enquiry has been received and we’ll be in touch." });
        setV(empty);
      } catch {
        setState({ status: "error", msg: "Your enquiry could not be sent. Please try again or contact us directly." });
      }
      return;
    }

    if (site.email) {
      const body = Object.entries(labels).map(([k, l]) => `${l}: ${data[k] || "Not provided"}`).join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Meta Ads Campaign Enquiry")}&body=${encodeURIComponent(body)}`;
      setState({ status: "success", msg: "Your email draft is ready. Send it from your email app to complete your enquiry." });
      return;
    }

    setState({ status: "error", msg: "The online enquiry form isn’t connected yet. Please use WhatsApp or the contact details in the footer." });
  }

  const busy = state.status === "sending";

  return (
    <section id="enquire" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="h2">Put your next batch in front of more prospective students.</h2>
          <p className="lede mt-5">Give interested learners a clear reason to explore your courses, and an easy way to contact your institute.</p>
          <p className="lede mt-3">Let’s discuss a Meta Ads campaign for your fashion designing, beauty or skill-based programs and plan the next step toward more student enquiries.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#campaign-form">Discuss My Institute’s Campaign</Button>
            <Button href={chatHref} external={chatIsExternal} variant="sun" arrow={false}>Chat on WhatsApp</Button>
          </div>
        </Reveal>

        <Reveal as="form" id="campaign-form" noValidate onSubmit={onSubmit} className="card mx-auto mt-14 max-w-3xl !bg-white !p-6 sm:!p-10" aria-labelledby="form-title">
          <h3 id="form-title" className="text-center text-2xl font-bold sm:text-3xl">Tell me about your institute.</h3>
          <p className="mt-2 text-center text-[15px]">Share a few details so I can understand your courses and campaign requirements.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field id="f-name" label="Your name" required error={errors.name}><input {...props("name", { autoComplete: "name", maxLength: 100 })} /></Field>
            <Field id="f-institute" label="Institute name" required error={errors.institute}><input {...props("institute", { autoComplete: "organization", maxLength: 150 })} /></Field>
            <Field id="f-phone" label="Phone / WhatsApp number" required error={errors.phone}><input {...props("phone", { type: "tel", inputMode: "tel", autoComplete: "tel", maxLength: 25 })} /></Field>
            <Field id="f-email" label="Email address" required error={errors.email}><input {...props("email", { type: "email", autoComplete: "email", maxLength: 200 })} /></Field>
            <Field id="f-city" label="City / service area" required error={errors.city}><input {...props("city", { autoComplete: "address-level2", maxLength: 150 })} /></Field>
            <Field id="f-batch" label="Next batch start date"><input {...props("batch", { type: "date" })} /></Field>
            <Field id="f-courses" label="Courses you want to promote" required full error={errors.courses}><input {...props("courses", { placeholder: "Fashion designing, beauty, makeup…", maxLength: 300 })} /></Field>
            <Field id="f-budget" label="Approximate monthly advertising budget" full><input {...props("budget", { placeholder: "Enter your approximate budget", maxLength: 100 })} /></Field>
            <Field id="f-challenge" label="Your main enquiry challenge" full><textarea {...props("challenge", { rows: 4, maxLength: 2000, placeholder: "Tell me about your current enquiries and goals." })} className="field min-h-[120px] resize-y" /></Field>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>Leave this empty<input tabIndex={-1} autoComplete="off" name="website" value={v.website} onChange={set("website")} /></label>
            </div>
          </div>

          <p className="mt-6 text-xs text-mute">
            By submitting, you agree to be contacted about your enquiry by {site.brandName}.
            {site.privacyUrl && <> Read our <a className="font-semibold text-plum-700 underline underline-offset-2" href={site.privacyUrl} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</>}
          </p>

          <button type="submit" disabled={busy} className="btn btn-primary group mt-5 w-full disabled:cursor-wait disabled:opacity-70">
            {busy ? "Sending…" : "Send My Campaign Enquiry"}<Arrow />
          </button>

          <p role="status" aria-live="polite" className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${state.msg ? "" : "hidden"} ${state.status === "success" ? "bg-sun-50 text-sun-700" : state.status === "error" ? "bg-coral-50 text-coral-700" : "bg-plum-50 text-plum-700"}`}>
            {state.msg}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
