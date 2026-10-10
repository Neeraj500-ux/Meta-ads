import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  site,
  chatHref,
  chatIsExternal,
} from "../config/site.js";
import { calculateLeadScore, getAnswerPoints, LEAD_SCORING_CONFIG } from "../lib/leadScoring.ts";
import { trackCustom, trackEvent } from "../lib/pixel.ts";

const COURSE_OPTIONS = [
  "Fashion Designing",
  "Beauty & Cosmetology",
  "Makeup",
  "Hair Styling",
  "Other Skill-Based Courses",
];
const CHALLENGE_OPTIONS = [
  "Not getting enough enquiries",
  "Getting enquiries from the wrong locations",
  "Enquiries are not relevant to our courses",
  "Students enquire but don’t take admission",
  "Planning our first paid campaign",
];
const BUDGET_OPTIONS = [
  "Below ₹15,000",
  "₹15,000–₹30,000",
  "₹30,000–₹50,000",
  "Above ₹50,000",
  "I need help deciding",
];
const START_OPTIONS = [
  "Within the next 2 weeks",
  "Within 30 days",
  "Within 1–3 months",
  "Just exploring for now",
];
const ROLE_OPTIONS = [
  "Owner / Founder",
  "Director / Institute Head",
  "Marketing / Admissions Team",
  "Other",
];
const OTHER_COURSE = "Other Skill-Based Courses";
const FIRST_STEP_FIELDS = ["name", "institute", "phone", "city"];
const SCORING_QUESTIONS = {
  budget: "What Monthly Advertising Budget Are You Considering?",
  start: "When Would You Like To Start Promoting Your Courses?",
  role: "Your Role",
  challenge: "What Is Your Biggest Challenge With Student Enquiries Right Now?",
};
const NON_SCORING_QUESTION_LABELS = {
  name: "Your Name",
  institute: "Institute Name",
  phone: "WhatsApp Number",
  city: "Institute Location",
  otherCourse: "Other Course",
  email: "Email Address",
  link: "Institute Website Or Instagram",
};

const CLOSE_DURATION = 220;
const OPEN_EVENT = "open-enquiry-form";
const TRIGGER_SELECTOR =
  'a[href="#enquire"], a[href$="#enquire"], [data-open-enquiry]';

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const createEmpty = () => ({
  name: "",
  institute: "",
  phone: "+91 ",
  city: "",
  courses: [],
  otherCourse: "",
  challenge: "",
  budget: "",
  start: "",
  role: "",
  link: "",
  email: "",
  website: "",
});

function validate(values, step) {
  const errors = {};
  if (step === 1 || step === "all") {
    if (!values.name.trim()) {
      errors.name = "Enter your name.";
    }
    if (!values.institute.trim()) {
      errors.institute = "Enter your institute’s name.";
    }
    const phone = values.phone.trim();
    const digits = phone.replace(/\D/g, "");
    const indianNumber = phone.startsWith("+91")
      ? digits.slice(2)
      : digits.length === 12 && digits.startsWith("91")
        ? digits.slice(2)
        : digits.length === 10 && !phone.startsWith("+")
          ? digits
          : null;
    if (
      !/^[+\d\s()-]+$/.test(phone) ||
      !/^\+?[\d\s()-]+$/.test(phone) ||
      digits.length < 8 ||
      digits.length > 15 ||
      (indianNumber !== null && !/^[6-9]\d{9}$/.test(indianNumber))
    ) {
      errors.phone = "Enter a valid WhatsApp number with country code.";
    }
    if (!values.city.trim()) {
      errors.city = "Enter your institute’s city or locality.";
    }
  }
  if (step === 2 || step === "all") {
    if (!values.courses.length) {
      errors.courses = "Select at least one course.";
    }
    if (
      values.courses.includes(OTHER_COURSE) &&
      !values.otherCourse.trim()
    ) {
      errors.otherCourse =
        "Tell us which other courses you want to promote.";
    }
    if (!values.challenge) {
      errors.challenge = "Select your main enquiry challenge.";
    }
    if (!values.budget) {
      errors.budget =
        "Select a budget, or choose ‘I need help deciding’.";
    }
    if (!values.start) {
      errors.start = "Choose when you would like to start.";
    }
    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
    ) {
      errors.email =
        "Enter a valid email address, or leave this optional field empty.";
    }
    if (values.link.trim()) {
      try {
        const raw = values.link.trim();
        const url = new URL(
          /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
        );
        if (
          !["http:", "https:"].includes(url.protocol) ||
          !url.hostname.includes(".")
        ) {
          throw new Error("Invalid link");
        }
      } catch {
        errors.link = "Enter a website or Instagram profile link.";
      }
    }
  }
  return errors;
}

function FormIcon({ name = "arrow", className = "" }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    back: <path d="M19 12H5m6-6-6 6 6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    alert: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.8v5.2m0 3.1h.01" />
      </>
    ),
    building: (
      <path d="M4 21h16M6 21V3h12v18M10 7h4M10 11h4M10 15h4M10 21v-3h4v3" />
    ),
    spark: (
      <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" />
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

function ErrorText({ id, children }) {
  return (
    <p className="ce-error" id={id}>
      <FormIcon name="alert" />
      <span>{children}</span>
    </p>
  );
}

function Field({ id, label, required = false, error, hint, children }) {
  return (
    <div className={`ce-field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="ce-required" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p className="ce-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ChoiceGroup({
  id,
  label,
  options,
  value,
  onChange,
  multiple = false,
  error,
  hint,
  compact = false,
}) {
  const selected = (option) =>
    multiple ? value.includes(option) : value === option;
  const useDropdown =
    options === CHALLENGE_OPTIONS || options === START_OPTIONS;

  if (useDropdown) {
    return (
      <div className="ce-select-question">
        <Field id={id} label={label} required error={error}>
          <select
            id={id}
            name={id}
            className="ce-input"
            value={value}
            required
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <option value="">
              {options === CHALLENGE_OPTIONS
                ? "Choose your main challenge"
                : "Choose your preferred start time"}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>
    );
  }

  return (
    <fieldset
      className={`ce-choice-group ${error ? "has-error" : ""}`}
      id={id}
      tabIndex={-1}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={
        [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      <legend>
        {label}
        <span className="ce-required" aria-hidden="true">
          {" "}*
        </span>
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="ce-hint">
          {hint}
        </p>
      )}
      <div
        className={`ce-options ${compact ? "ce-options--compact" : ""} ${
          multiple ? "ce-options--chips" : ""
        }`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`ce-choice ${selected(option) ? "is-selected" : ""}`}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={id}
              value={option}
              checked={selected(option)}
              onChange={() => onChange(option)}
              aria-describedby={error ? `${id}-error` : undefined}
            />
            <span
              className={`ce-choice-mark ${multiple ? "is-square" : ""}`}
              aria-hidden="true"
            >
              {selected(option) && <FormIcon name="check" />}
            </span>
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </fieldset>
  );
}

const styles = `
.ce-root {
  --ce-plum: #543170;
  --ce-plum-2: #684084;
  --ce-plum-3: #8b5aa5;
  --ce-ink: #231c2d;
  --ce-muted: #786583;
  --ce-line: #e9dff0;
  --ce-danger: #b33838;
  color: var(--ce-ink);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.ce-root, .ce-root *, .ce-root *::before, .ce-root *::after { box-sizing: border-box; }
.ce-root svg { display: block; }
.ce-root button, .ce-root input, .ce-root select { font-family: inherit; }

/* ---------- Inline section ---------- */
.ce-section {
  position: relative;
  isolation: isolate;
  padding: clamp(40px, 6vw, 88px) clamp(16px, 4vw, 36px);
  background:
    radial-gradient(ellipse 60% 50% at 0% 15%, #f0e5f6 0, transparent 70%),
    radial-gradient(ellipse 55% 45% at 100% 95%, #f3eaf8 0, transparent 70%),
    #fcf9fe;
  scroll-margin-top: 88px;
  overflow-x: clip;
}
.ce-container { display: block; width: min(100%, 720px); margin-inline: auto; }

/* ---------- Popup ---------- */
.ce-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(14px, env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) max(14px, env(safe-area-inset-bottom)) max(14px, env(safe-area-inset-left));
  background: radial-gradient(ellipse at 50% 0%, #54317055, transparent 70%), #1f1428a8;
  -webkit-backdrop-filter: blur(10px) saturate(1.1);
  backdrop-filter: blur(10px) saturate(1.1);
  animation: ce-overlay-in ${CLOSE_DURATION + 40}ms ease-out both;
  overscroll-behavior: contain;
}
.ce-overlay.is-closing { animation: ce-overlay-out ${CLOSE_DURATION}ms ease-in both; pointer-events: none; }
.ce-dialog {
  position: relative;
  width: min(100%, 720px);
  max-height: 100%;
  border-radius: 30px;
  animation: ce-dialog-in .34s cubic-bezier(.2, .9, .3, 1.02) both;
  outline: none;
}
.ce-overlay.is-closing .ce-dialog { animation: ce-dialog-out ${CLOSE_DURATION}ms cubic-bezier(.4, 0, 1, 1) both; }
.ce-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 6;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid #ebe2f1;
  border-radius: 14px;
  color: #694183;
  background: #ffffffe6;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px #5431701a;
  cursor: pointer;
  transition: transform .2s, background .2s, box-shadow .2s, color .2s;
}
.ce-close svg { width: 19px; height: 19px; }
.ce-close:focus-visible { outline: 3px solid #c5a1db; outline-offset: 3px; }
.ce-close:active { transform: scale(.94); }

/* ---------- Card ---------- */
.ce-card {
  position: relative;
  min-width: 0;
  margin: 0 auto;
  padding: clamp(24px, 3.2vw, 40px);
  border: 1px solid #ffffff;
  border-radius: 30px;
  background: linear-gradient(180deg, #ffffff 0%, #fefcff 100%);
  box-shadow: 0 30px 80px #5e3f711c, 0 6px 18px #5e3f710a, inset 0 1px 0 #fff;
  scroll-margin-top: 95px;
}
.ce-card::before { content: ""; position: absolute; left: 36px; right: 36px; top: 0; height: 2px; background: linear-gradient(90deg, transparent, #c5a1dc, transparent); pointer-events: none; }
.ce-card--modal {
  max-height: calc(100dvh - 28px);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #d7c3e4 transparent;
  background: #fffffff7;
  box-shadow: 0 40px 110px #2a173d55, 0 10px 30px #2a173d22, inset 0 1px 0 #fff;
}
.ce-card--modal::-webkit-scrollbar { width: 8px; }
.ce-card--modal::-webkit-scrollbar-thumb { background: #d7c3e4; border-radius: 99px; border: 2px solid transparent; background-clip: content-box; }
.ce-card--modal .ce-step-heading { padding-right: 52px; }
.ce-card--modal .ce-success { padding-top: 48px; }

/* ---------- Progress ---------- */
.ce-progress { display: flex; gap: 8px; padding: 6px; border: 1px solid #f0ebf3; border-radius: 17px; background: #f8f6fa; }
.ce-progress-item { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 11px 8px; border: 1px solid transparent; border-radius: 12px; color: var(--ce-muted); transition: background .3s, color .3s, border-color .3s, box-shadow .3s; }
.ce-progress-item.is-active { color: #694183; background: #fff; border-color: #eae1f0; box-shadow: 0 4px 12px #48355310; }
.ce-progress-number { display: grid; place-items: center; width: 26px; height: 26px; flex: 0 0 26px; border-radius: 9px; background: #eee9f2; color: var(--ce-muted); font-size: 12px; font-weight: 800; transition: background .3s, color .3s; }
.is-active .ce-progress-number { background: linear-gradient(145deg, #a575bf, #795094); color: #fff; box-shadow: 0 3px 8px #54317030; }
.ce-progress-number svg { width: 15px; height: 15px; }
.ce-progress-label { font-size: 12px; line-height: 1.4; font-weight: 700; }
.ce-progress-bar { height: 3px; margin: 12px 6px 30px; border-radius: 99px; background: #f0e9f5; overflow: hidden; }
.ce-progress-bar span { display: block; height: 100%; width: 100%; border-radius: inherit; background: linear-gradient(90deg, #a575bf, #684084); transform-origin: left center; transition: transform .45s cubic-bezier(.3, .8, .3, 1); }

/* ---------- Heading ---------- */
.ce-step-heading { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 30px; outline: none; }
.ce-step-icon { display: grid; place-items: center; width: 48px; height: 48px; flex: 0 0 48px; border: 1px solid #ece1f2; border-radius: 15px; color: var(--ce-plum); background: linear-gradient(145deg, #fdfcfe, #f4ebf9); box-shadow: 0 6px 16px #54317010, inset 0 1px 0 #fff; }
.ce-step-icon svg { width: 24px; height: 24px; }
.ce-step-heading h3 { margin: 0; color: var(--ce-ink); font-size: clamp(22px, 2.3vw, 28px); line-height: 1.22; letter-spacing: -.035em; font-weight: 760; }
.ce-step-heading p { margin: 8px 0 0; font-size: 13.5px; line-height: 1.65; color: var(--ce-muted); }

/* ---------- Fields ---------- */
.ce-form-body { min-width: 0; border: 0; padding: 0; margin: 0; }
.ce-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 18px; }
.ce-field { min-width: 0; }
.ce-field > label, .ce-choice-group > legend { display: block; max-width: 100%; margin-bottom: 10px; padding: 0; color: #4e395c; font-size: 13px; font-weight: 650; line-height: 1.6; letter-spacing: .005em; }
.ce-required { color: #8b3fb0; }
.ce-input { display: block; width: 100%; min-width: 0; min-height: 56px; padding: 14px 16px; border: 1px solid #e6dfeb; border-radius: 14px; outline: none; font: inherit; font-size: 16px; line-height: 1.5; color: var(--ce-ink); background: #fbf9fc; box-shadow: inset 0 1px 2px #48355306; transition: border-color .2s, box-shadow .2s, background .2s; }
.ce-input::placeholder { color: #8a7695; font-size: 14px; }
.ce-input:focus { background: #fff; border-color: #a97bc6; box-shadow: 0 0 0 4px #68408418, 0 6px 16px #5431700d; }
.ce-input[aria-invalid="true"] { border-color: #d77474; background: #fffafa; }
.ce-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 4px #d7747424; }
.ce-input:disabled { opacity: .7; cursor: wait; }
.ce-section select.ce-input, .ce-overlay select.ce-input { appearance: none; -webkit-appearance: none; padding-right: 42px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='%23786583' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 7 5 5 5-5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; text-overflow: ellipsis; cursor: pointer; }
.ce-hint { margin: 8px 0 0; color: var(--ce-muted); font-size: 12px; line-height: 1.65; }
.ce-error { display: flex; align-items: flex-start; gap: 6px; margin: 8px 0 0; color: var(--ce-danger); font-size: 12.5px; line-height: 1.55; font-weight: 550; animation: ce-shake .36s ease-out; }
.ce-error svg { width: 15px; height: 15px; flex: 0 0 15px; margin-top: 2px; }
.ce-choice-group { min-width: 0; padding: 0; margin: 0 0 28px; border: 0; outline: none; }
.ce-choice-group:focus-visible { outline: 3px solid #cfb1e1; outline-offset: 5px; border-radius: 12px; }
.ce-choice-group > .ce-hint { margin: -3px 0 13px; }
.ce-options { display: grid; gap: 10px; }
.ce-options--compact { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.ce-choice { position: relative; display: flex; align-items: center; gap: 12px; min-width: 0; min-height: 58px; padding: 13px 15px; border: 1px solid #e8e1ed; border-radius: 14px; color: #695773; background: #fff; font-size: 13.5px; line-height: 1.5; cursor: pointer; transition: border-color .2s, background .2s, box-shadow .2s, transform .2s, color .2s; }
.ce-choice > span:last-child { overflow-wrap: anywhere; }
.ce-choice input { position: absolute; width: 1px; height: 1px; padding: 0; opacity: 0; }
.ce-choice:has(input:focus-visible) { outline: 3px solid #cfb1e1; outline-offset: 3px; }
.ce-choice.is-selected { color: #5a3475; font-weight: 600; border-color: #b98ed3; background: linear-gradient(135deg, #faf6fd, #f4ecf9); box-shadow: inset 0 1px 0 #fff, 0 6px 16px #54317010; }
.ce-choice-mark { display: grid; place-items: center; width: 21px; height: 21px; flex: 0 0 21px; border: 1.5px solid #d0c4d7; border-radius: 50%; background: #fff; transition: background .2s, border-color .2s, transform .2s; }
.ce-choice-mark.is-square { border-radius: 7px; }
.is-selected .ce-choice-mark { background: linear-gradient(145deg, #8b5aa5, #543170); border-color: var(--ce-plum); color: #fff; transform: scale(1.04); }
.ce-choice-mark svg { width: 13px; height: 13px; stroke-width: 2.4; }
.ce-choice-group.has-error .ce-choice { border-color: #efc9c9; }
.ce-options--chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.ce-options--compact .ce-choice:last-child:nth-child(odd) { grid-column: 1 / -1; }
.ce-select-question { margin-bottom: 28px; }
.ce-other-course { margin: -8px 0 28px; animation: ce-enter .28s ease-out; }
.ce-budget-note { display: flex; align-items: flex-start; gap: 9px; margin: -14px 0 28px; padding: 12px 15px; border: 1px solid #eee6f3; border-radius: 12px; background: linear-gradient(135deg, #fbf8fd, #f7f1fb); color: var(--ce-muted); font-size: 12.5px; line-height: 1.7; }
.ce-budget-note svg { width: 15px; height: 15px; flex: 0 0 15px; margin-top: 3px; color: var(--ce-plum); }
.ce-optional { margin-top: 3px; padding: 16px; border: 1px solid #ece6f0; border-radius: 16px; background: #fcfafd; transition: border-color .2s, background .2s; }
.ce-optional[open] { background: #fff; border-color: #e4d9eb; }
.ce-optional summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 28px; color: #695773; font-size: 13.5px; line-height: 1.6; font-weight: 650; cursor: pointer; list-style: none; border-radius: 8px; }
.ce-optional summary::-webkit-details-marker { display: none; }
.ce-optional summary::after { content: "+"; display: grid; place-items: center; width: 28px; height: 28px; flex: 0 0 28px; border: 1px solid #eae3ee; border-radius: 9px; color: var(--ce-plum); background: #fff; font-size: 18px; font-weight: 400; transition: background .2s; }
.ce-optional[open] summary::after { content: "−"; }
.ce-optional .ce-grid { margin-top: 20px; }
.ce-full { grid-column: 1 / -1; }
.ce-consent { margin: 24px 0 0; font-size: 12px; line-height: 1.8; color: var(--ce-muted); }
.ce-consent a { color: #684084; text-underline-offset: 3px; }

/* ---------- Buttons ---------- */
.ce-actions { display: flex; align-items: stretch; gap: 12px; margin-top: 28px; }
.ce-button { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-width: 0; min-height: 58px; padding: 15px 22px; border: 1px solid transparent; border-radius: 16px; font: inherit; font-size: 14.5px; font-weight: 700; line-height: 1.5; text-decoration: none; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s, border-color .2s; }
.ce-button svg { width: 18px; height: 18px; flex: 0 0 18px; }
.ce-button--primary { flex: 1; color: #fff; border-color: #8c54ae; background: linear-gradient(115deg, #8b5aa5, #684084 70%, #543170); box-shadow: inset 0 1px 0 #ffffff55, 0 12px 26px #5431702e; }
.ce-button--primary::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 30%, #ffffff30 50%, transparent 70%); transform: translateX(-120%); transition: transform .7s ease; pointer-events: none; }
.ce-button--back { color: #695773; border-color: #e9e2ed; background: #fff; min-width: 96px; }
.ce-button:focus-visible, .ce-optional summary:focus-visible, .ce-root a:focus-visible { outline: 3px solid #c5a1db; outline-offset: 4px; }
.ce-button:disabled { opacity: .7; cursor: wait; }
.ce-button--primary:active:not(:disabled), .ce-button--back:active { transform: scale(.985); }
.ce-form-body:disabled .ce-choice { cursor: wait; opacity: .7; }
.ce-support { padding-top: 22px; border-top: 1px solid #f3f0f5; margin: 24px 0 0; text-align: center; font-size: 12.5px; line-height: 1.8; color: var(--ce-muted); }
.ce-support a { color: #4d7f62; font-weight: 700; text-underline-offset: 4px; }
.ce-status { margin: 18px 0 0; padding: 13px 16px; border: 1px solid #eee4f4; border-radius: 13px; background: #f9f5fc; color: #694183; font-size: 13px; line-height: 1.7; animation: ce-enter .25s ease-out; }
.ce-status.is-error { color: #a13131; background: #fff5f5; border-color: #f2d5d5; }
.ce-honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.ce-success { display: grid; justify-items: center; padding: 35px 0; text-align: center; animation: ce-enter .35s ease-out; }
.ce-success-mark { display: grid; place-items: center; width: 76px; height: 76px; margin-bottom: 24px; border: 1px solid #c9e8d9; border-radius: 26px; color: #187b51; background: linear-gradient(145deg, #f6fff9, #e3f5ea); box-shadow: 0 10px 26px #187b5114; animation: ce-pop .5s cubic-bezier(.2, 1.2, .3, 1) both; }
.ce-success-mark svg { width: 34px; height: 34px; stroke-width: 2.2; }
.ce-success h3 { margin: 0; font-size: 28px; line-height: 1.3; letter-spacing: -.04em; }
.ce-success p { margin: 16px 0 26px; max-width: 420px; color: var(--ce-muted); font-size: 15px; line-height: 1.8; }
.ce-spinner { width: 17px; height: 17px; border: 2px solid #ffffff66; border-top-color: #fff; border-radius: 50%; animation: ce-spin .8s linear infinite; }
.ce-step-content { animation: ce-enter .3s ease-out; }

/* ---------- Motion ---------- */
@keyframes ce-spin { to { transform: rotate(360deg); } }
@keyframes ce-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ce-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
@keyframes ce-shake { 0% { transform: translateX(0); } 25% { transform: translateX(-3px); } 55% { transform: translateX(3px); } 100% { transform: translateX(0); } }
@keyframes ce-overlay-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes ce-overlay-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes ce-dialog-in { from { opacity: 0; transform: translateY(14px) scale(.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes ce-dialog-out { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(8px) scale(.965); } }

@media (hover: hover) {
  .ce-choice:hover { border-color: #ccb2dc; background: #fcfafd; transform: translateY(-1px); box-shadow: 0 6px 14px #54317009; }
  .ce-choice.is-selected:hover { background: linear-gradient(135deg, #faf6fd, #f4ecf9); }
  .ce-input:hover:not(:focus):not([aria-invalid="true"]) { border-color: #d2c2dc; background: #fff; }
  .ce-button--primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: inset 0 1px 0 #ffffff55, 0 16px 34px #54317040; }
  .ce-button--primary:hover:not(:disabled)::after { transform: translateX(120%); }
  .ce-button--back:hover { background: #faf7fc; border-color: #d9c8e4; }
  .ce-close:hover { background: #fff; color: #543170; transform: rotate(90deg); box-shadow: 0 8px 20px #5431702b; }
  .ce-optional summary:hover::after { background: #f6effa; }
}

/* ---------- Responsive ---------- */
@media (max-width: 640px) {
  .ce-grid { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .ce-section { padding: 44px 14px; }
  .ce-overlay { padding: 8px; }
  .ce-card--modal { max-height: calc(100dvh - 16px); }
  .ce-dialog, .ce-card { border-radius: 24px; }
  .ce-card { padding: 22px 18px 24px; }
  .ce-card::before { left: 24px; right: 24px; }
  .ce-close { top: 12px; right: 12px; }
  .ce-progress { gap: 4px; padding: 5px; }
  .ce-progress-bar { margin: 10px 4px 24px; }
  .ce-progress-item { gap: 6px; padding: 10px 5px; }
  .ce-progress-label { font-size: 11px; }
  .ce-progress-number { width: 23px; height: 23px; flex-basis: 23px; font-size: 11px; }
  .ce-step-heading { gap: 12px; margin-bottom: 24px; }
  .ce-card--modal .ce-step-heading { padding-right: 48px; }
  .ce-step-heading h3 { font-size: 21px; }
  .ce-step-heading p { font-size: 12.5px; }
  .ce-step-icon { width: 40px; height: 40px; flex-basis: 40px; border-radius: 13px; }
  .ce-step-icon svg { width: 21px; height: 21px; }
  .ce-grid { gap: 20px; }
  .ce-options--compact, .ce-options--chips { grid-template-columns: minmax(0, 1fr); }
  .ce-choice { min-height: 54px; }
  .ce-input::placeholder { font-size: 13px; }
  .ce-optional { padding: 13px; }
  .ce-actions { flex-wrap: wrap; }
  .ce-actions .ce-button--primary { flex-basis: 100%; order: -1; width: 100%; padding-inline: 12px; font-size: 13.5px; }
  .ce-actions .ce-button--back { width: 100%; min-height: 50px; }
  .ce-support { font-size: 12px; }
  .ce-success h3 { font-size: 24px; }
}
@media (max-width: 640px) {
  .ce-form-body > .ce-grid .ce-field > label { min-height: 0; display: block; }
}
@media (min-width: 641px) {
  /* Align paired fields when a label occupies two lines. */
  .ce-form-body > .ce-grid .ce-field > label { min-height: 42px; display: flex; align-items: flex-end; gap: 3px; }
}
.ce-optional .ce-field > label { min-height: 0 !important; display: block !important; }
@media (max-height: 560px) and (orientation: landscape) {
  .ce-overlay { align-items: flex-start; }
  .ce-card--modal { max-height: calc(100dvh - 16px); }
}
@media (prefers-reduced-motion: reduce) {
  .ce-root *, .ce-root *::before, .ce-root *::after { animation: none !important; transition: none !important; }
  .ce-overlay, .ce-dialog { animation: none !important; }
}
`;

export default function EnquiryForm({
  modal = false,
  open: openProp,
  onClose,
} = {}) {
  const uid = useId();
  const formId = `campaign-form-${uid}`;
  const id = (key) => `${formId}-${key}`;
  const brandName = site.brandName || "Creative Crew";
  const [values, setValues] = useState(createEmpty);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const pendingFocus = useRef(null);
  const stepHeading = useRef(null);
  const submitLock = useRef(false);
  const requestRef = useRef(null);
  const alive = useRef(true);
  const leadId = useRef(null);
  const quizStarted = useRef(false);
  const quizAbandoned = useRef(false);
  const leadTracked = useRef(false);
  const lastStep = useRef(1);
  const [finalSubmitLocked, setFinalSubmitLocked] = useState(false);
  const busy = status.type === "sending";
  const leadScore = calculateLeadScore(values);
  const leadSummary = `Lead Score: ${leadScore.score}/5 (${leadScore.temperature[0].toUpperCase()}${leadScore.temperature.slice(1)})`;

  // ---------- Popup state ----------
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = modal && (isControlled ? Boolean(openProp) : internalOpen);
  const [rendered, setRendered] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);

  const requestClose = () => {
    onClose?.();
    if (!isControlled) setInternalOpen(false);
  };
  const requestCloseRef = useRef(requestClose);
  requestCloseRef.current = requestClose;

  // Mount / unmount with a closing animation.
  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement;
      setClosing(false);
      setRendered(true);
      return undefined;
    }
    if (!rendered) return undefined;
    if (prefersReducedMotion()) {
      setRendered(false);
      setClosing(false);
      return undefined;
    }
    setClosing(true);
    const timer = window.setTimeout(() => {
      setRendered(false);
      setClosing(false);
      const target = returnFocusRef.current;
      if (target && typeof target.focus === "function" && document.contains(target)) {
        target.focus({ preventScroll: true });
      }
    }, CLOSE_DURATION);
    return () => window.clearTimeout(timer);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Open from any "#enquire" link / [data-open-enquiry] element or a custom event.
  useEffect(() => {
    if (!modal || isControlled) return undefined;
    const open = () => setInternalOpen(true);
    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }
      const trigger = event.target.closest(TRIGGER_SELECTOR);
      if (!trigger) return;
      event.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [modal, isControlled]);

  // Body scroll lock, Escape to close, and focus trap while the popup is shown.
  useEffect(() => {
    if (!modal || !rendered) return undefined;
    const body = document.body;
    const html = document.documentElement;
    const previous = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };
    const scrollbar = window.innerWidth - html.clientWidth;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!dialogRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      html.style.overflow = previous.htmlOverflow;
    };
  }, [modal, rendered]);

  // Move focus into the popup when it opens (heading, so mobile keyboards don't pop up).
  useEffect(() => {
    if (!modal || !isOpen || !rendered) return undefined;
    const frame = window.requestAnimationFrame(() => {
      (stepHeading.current || dialogRef.current)?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [modal, isOpen, rendered]);

  const startQuiz = () => {
    if (quizStarted.current) return;
    quizStarted.current = true;
    trackCustom("QuizStart");
  };

  const recordQuestionAnswer = (questionId, questionText, answer, points = 0) => {
    startQuiz();
    trackCustom("QuestionAnswered", {
      question_id: questionId,
      question_text: questionText,
      answer,
      points,
      step_number: lastStep.current,
    });
  };

  const trackAbandon = () => {
    if (!quizStarted.current || quizAbandoned.current || leadTracked.current) {
      return;
    }
    quizAbandoned.current = true;
    trackCustom("QuizAbandon", { last_step: lastStep.current });
  };

  const trackLead = () => {
    if (leadTracked.current) return;
    leadTracked.current = true;
    const params = {
      lead_score: leadScore.score,
      lead_temperature: leadScore.temperature,
      total_points: leadScore.totalPoints,
      value: LEAD_SCORING_CONFIG.valueByScore[leadScore.score],
      currency: "INR",
      content_name: document.title,
    };

    trackEvent("Lead", params);
    const temperatureEvent = {
      cold: "LeadCold",
      warm: "LeadWarm",
      hot: "LeadHot",
    }[leadScore.temperature];
    trackCustom(temperatureEvent, params);
    if (leadScore.score >= 4) {
      trackEvent("CompleteRegistration", params);
    }
  };

  // One ID per lead so Step 1 and Step 2 land on the same Google Sheet row.
  const getLeadId = () => {
    if (!leadId.current) {
      leadId.current =
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    return leadId.current;
  };

  const verifySheetSave = (id, stage, signal) =>
    new Promise((resolve, reject) => {
      const callbackName = `__sheetVerify_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`;
      let settled = false;
      let attempts = 0;
      let retryTimer;
      let script;
      const timeout = window.setTimeout(() => {
        finish(
          reject,
          new Error(
            "Google Sheets did not confirm the save. Make sure the latest Apps Script is deployed as a Web App with access set to Anyone."
          )
        );
      }, 20000);

      const cleanup = () => {
        window.clearTimeout(timeout);
        window.clearTimeout(retryTimer);
        script?.remove();
        delete window[callbackName];
        signal?.removeEventListener("abort", handleAbort);
      };
      const finish = (callback, value) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback(value);
      };
      const handleAbort = () =>
        finish(reject, new Error("Saving the enquiry timed out."));

      window[callbackName] = (result) => {
        if (result?.ok && result.saved) {
          finish(resolve, result);
        } else if (result?.ok && attempts < 20) {
          window.clearTimeout(retryTimer);
          retryTimer = window.setTimeout(loadVerification, 500);
        } else {
          finish(
            reject,
            new Error(result?.error || "The enquiry was not found in the sheet.")
          );
        }
      };
      if (signal?.aborted) {
        handleAbort();
        return;
      }
      signal?.addEventListener("abort", handleAbort, { once: true });

      function loadVerification() {
        if (settled) return;
        attempts += 1;
        script = document.createElement("script");
        script.onerror = () => {
          finish(
            reject,
            new Error(
              "Could not load save verification. The deployed Apps Script must be updated and accessible to Anyone."
            )
          );
        };
        const verificationUrl = new URL(site.formEndpoint);
        verificationUrl.searchParams.set("action", "verify");
        verificationUrl.searchParams.set("leadId", id);
        verificationUrl.searchParams.set("stage", stage);
        verificationUrl.searchParams.set("callback", callbackName);
        script.src = verificationUrl.toString();
        document.head.appendChild(script);
      }

      loadVerification();
    });

  // Apps Script's cross-origin POST response is opaque. Confirm the exact lead
  // and stage through the Web App's JSONP status endpoint before showing success.
  const saveToSheet = async (payload, signal) => {
    await fetch(site.formEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
      signal,
    });
    await verifySheetSave(payload.leadId, payload.stage, signal);
  };

  useEffect(() => {
    alive.current = true;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") trackAbandon();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", trackAbandon);

    return () => {
      alive.current = false;
      requestRef.current?.abort();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", trackAbandon);
      trackAbandon();
    };
  }, []);

  useEffect(() => {
    if (!pendingFocus.current) return;
    if (pendingFocus.current === "heading") {
      stepHeading.current?.focus({ preventScroll: true });
    } else {
      document.getElementById(pendingFocus.current)?.focus();
    }
    pendingFocus.current = null;
  }, [step, errors]);

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (key in SCORING_QUESTIONS) {
      recordQuestionAnswer(
        key,
        SCORING_QUESTIONS[key],
        value,
        getAnswerPoints(key, value)
      );
    }
    if (status.type === "error" || status.type === "draft") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const inputProps = (key, extra = {}) => ({
    id: id(key),
    name: key,
    value: values[key],
    onChange: (event) => update(key, event.target.value),
    onBlur: () => {
      const questionText = NON_SCORING_QUESTION_LABELS[key];
      if (questionText && values[key].trim()) {
        recordQuestionAnswer(key, questionText, "provided");
      }
    },
    className: "ce-input",
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `${id(key)}-error` : undefined,
    ...extra,
  });

  const toggleCourse = (option) => {
    const nextCourses = values.courses.includes(option)
      ? values.courses.filter((course) => course !== option)
      : [...values.courses, option];
    setValues((current) => ({
      ...current,
      courses: nextCourses,
    }));
    recordQuestionAnswer(
      "courses",
      "Which Courses Do You Want More Student Enquiries For?",
      nextCourses,
      0
    );
    setErrors((current) => ({
      ...current,
      courses: undefined,
      otherCourse: undefined,
    }));
  };

  const showErrors = (nextErrors) => {
    const first = Object.keys(nextErrors)[0];
    pendingFocus.current = id(first);
    setErrors(nextErrors);
    if (FIRST_STEP_FIELDS.includes(first)) {
      setStep(1);
    }
    setStatus({
      type: "error",
      message: "Please check the highlighted fields.",
    });
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (submitLock.current || finalSubmitLocked || values.website.trim()) {
      return;
    }
    lastStep.current = step;
    const nextErrors = validate(values, step === 1 ? 1 : "all");
    if (Object.keys(nextErrors).length) {
      showErrors(nextErrors);
      return;
    }

    if (step === 1) {
      if (site.formEndpoint) {
        submitLock.current = true;
        const controller = new AbortController();
        requestRef.current = controller;
        const timeout = window.setTimeout(() => controller.abort(), 20000);
        setStatus({
          type: "sending",
          message: "Saving your institute details…",
        });
        try {
          await saveToSheet({
            leadId: getLeadId(),
            stage: "step1",
            name: values.name.trim(),
            institute: values.institute.trim(),
            phone: values.phone.trim(),
            city: values.city.trim(),
          }, controller.signal);
          if (!alive.current) return;
          setStatus({ type: "idle", message: "" });
          pendingFocus.current = "heading";
          setErrors({});
          lastStep.current = 2;
          setStep(2);
        } catch (error) {
          if (alive.current) {
            setStatus({
              type: "error",
              message: `We couldn’t save your initial details. ${error.message} Please try again.`,
            });
          }
        } finally {
          window.clearTimeout(timeout);
          submitLock.current = false;
          requestRef.current = null;
        }
        return;
      }
      pendingFocus.current = "heading";
      setErrors({});
      setStatus({ type: "idle", message: "" });
      lastStep.current = 2;
      setStep(2);
      return;
    }

    const data = {
      leadId: getLeadId(),
      stage: "complete",
      name: values.name.trim(),
      institute: values.institute.trim(),
      phone: values.phone.trim(),
      city: values.city.trim(),
      courses: values.courses
        .map((course) =>
          course === OTHER_COURSE
            ? `Other: ${values.otherCourse.trim()}`
            : course
        )
        .join(", "),
      challenge: values.challenge,
      budget: values.budget,
      start: values.start,
      role: values.role,
      link: values.link.trim(),
      email: values.email.trim(),
      leadScore: leadScore.score,
      leadTemperature: leadScore.temperature,
      totalPoints: leadScore.totalPoints,
      leadSummary,
    };

    submitLock.current = true;
    setFinalSubmitLocked(true);
    trackLead();

    if (site.formEndpoint) {
      const controller = new AbortController();
      requestRef.current = controller;
      const timeout = window.setTimeout(() => controller.abort(), 20000);
      setStatus({
        type: "sending",
        message: "Sending your institute’s details…",
      });
      try {
        await saveToSheet(data, controller.signal);
        if (!alive.current) return;
        setStatus({
          type: "success",
          message:
            "Thanks! Your enquiry has been saved. Our team will contact you to discuss your courses and admission goals.",
        });
        setValues(createEmpty());
        leadId.current = null;
      } catch (error) {
        if (alive.current) {
          setStatus({
            type: "error",
            message:
              `We couldn’t confirm that your enquiry was saved. ${error.message} Your details are still here; please try again or contact us on WhatsApp.`,
          });
          setFinalSubmitLocked(false);
        }
      } finally {
        window.clearTimeout(timeout);
        submitLock.current = false;
        requestRef.current = null;
      }
      return;
    }

    if (site.email) {
      const labels = {
        name: "Your Name",
        institute: "Institute",
        phone: "WhatsApp Number",
        city: "City / Locality",
        courses: "Courses",
        challenge: "Main Challenge",
        budget: "Monthly Ad Spend",
        start: "Campaign Start",
        role: "Your Role",
        link: "Website / Instagram",
        email: "Email",
      };
      const body = Object.entries(labels)
        .map(([key, label]) => `${label}: ${data[key] || "Not provided"}`)
        .join("\n");
      window.location.href =
        `mailto:${site.email}` +
        `?subject=${encodeURIComponent(
          "Institute Admission Goals Enquiry"
        )}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus({
        type: "draft",
        message:
          "Your email app has been requested to open a draft. Send that email to complete your enquiry. If it doesn’t open, contact us on WhatsApp.",
      });
      return;
    }

    setStatus({
      type: "error",
      message:
        "The online form isn’t connected yet. Please contact us on WhatsApp to discuss your admission goals.",
    });
    submitLock.current = false;
    setFinalSubmitLocked(false);
  }

  const reset = () => {
    pendingFocus.current = "heading";
    leadId.current = null;
    submitLock.current = false;
    setValues(createEmpty());
    setErrors({});
    setStep(1);
    lastStep.current = 1;
    quizStarted.current = false;
    quizAbandoned.current = false;
    leadTracked.current = false;
    setFinalSubmitLocked(false);
    setStatus({ type: "idle", message: "" });
  };

  const whatsappProps = chatIsExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Keep the focused field visible above the mobile keyboard inside the popup.
  const keepFocusedFieldVisible = (event) => {
    if (!modal) return;
    const target = event.target;
    if (!(target instanceof Element) || !target.matches("input, select")) return;
    window.setTimeout(() => {
      target.scrollIntoView?.({
        block: "center",
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }, 280);
  };

  const formNode = (
    <form
      id={formId}
      className={`ce-card${modal ? " ce-card--modal" : ""}`}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id("title")}
      aria-busy={busy}
      onFocusCapture={keepFocusedFieldVisible}
      onPointerDownCapture={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("input, select, textarea, .ce-choice")
        ) {
          startQuiz();
        }
      }}
    >
      <input type="hidden" name="leadScore" value={leadScore.score} />
      <input
        type="hidden"
        name="leadTemperature"
        value={leadScore.temperature}
      />
      <input
        type="hidden"
        name="totalPoints"
        value={leadScore.totalPoints}
      />
      <input type="hidden" name="leadSummary" value={leadSummary} />
      {status.type === "success" ? (
        <div className="ce-success" role="status" aria-live="polite">
          <span className="ce-success-mark">
            <FormIcon name="check" />
          </span>
          <h3 id={id("title")}>Thanks For Sharing!</h3>
          <p>{status.message}</p>
          <button
            type="button"
            className="ce-button ce-button--back"
            onClick={reset}
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <>
          <div className="ce-progress" aria-label={`Step ${step} of 2`}>
            {["Your Institute", "Admission Goals"].map((label, index) => (
              <div
                key={label}
                className={`ce-progress-item ${
                  step >= index + 1 ? "is-active" : ""
                }`}
                aria-current={step === index + 1 ? "step" : undefined}
              >
                <span className="ce-progress-number">
                  {step > index + 1 ? (
                    <FormIcon name="check" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="ce-progress-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="ce-progress-bar" aria-hidden="true">
            <span style={{ transform: `scaleX(${step / 2})` }} />
          </div>

          <div className="ce-step-heading" ref={stepHeading} tabIndex={-1}>
            <span className="ce-step-icon">
              <FormIcon name={step === 1 ? "building" : "spark"} />
            </span>
            <div>
              <h3 id={id("title")}>
                {step === 1
                  ? "Start With Your Institute"
                  : "Your Admission Goals"}
              </h3>
              <p>
                Step {step} of 2 ·{" "}
                {step === 1
                  ? "Start with your institute and contact details."
                  : "Tell us what you want your next campaign to achieve."}
              </p>
            </div>
          </div>

          <fieldset
            disabled={busy || (step === 2 && finalSubmitLocked)}
            className="ce-form-body ce-step-content"
            key={step}
          >
            {step === 1 ? (
              <div className="ce-grid">
                <Field
                  id={id("name")}
                  label="Your Name"
                  required
                  error={errors.name}
                >
                  <input
                    {...inputProps("name", {
                      required: true,
                      autoComplete: "name",
                      maxLength: 100,
                      placeholder: "Your full name",
                    })}
                  />
                </Field>
                <Field
                  id={id("institute")}
                  label="Institute Name"
                  required
                  error={errors.institute}
                >
                  <input
                    {...inputProps("institute", {
                      required: true,
                      autoComplete: "organization",
                      maxLength: 150,
                      placeholder: "Your institute’s name",
                    })}
                  />
                </Field>
                <Field
                  id={id("phone")}
                  label="WhatsApp Number"
                  required
                  error={errors.phone}
                  hint="Include your country code. India: +91."
                >
                  <input
                    {...inputProps("phone", {
                      required: true,
                      type: "tel",
                      inputMode: "tel",
                      autoComplete: "tel",
                      maxLength: 25,
                      "aria-describedby": [
                        `${id("phone")}-hint`,
                        errors.phone ? `${id("phone")}-error` : "",
                      ]
                        .filter(Boolean)
                        .join(" "),
                    })}
                  />
                </Field>
                <Field
                  id={id("city")}
                  label="Where Is Your Institute Located?"
                  required
                  error={errors.city}
                >
                  <input
                    {...inputProps("city", {
                      required: true,
                      autoComplete: "address-level2",
                      maxLength: 150,
                      placeholder: "City / locality",
                    })}
                  />
                </Field>
              </div>
            ) : (
              <>
                <ChoiceGroup
                  id={id("courses")}
                  label="Which Courses Do You Want More Student Enquiries For?"
                  options={COURSE_OPTIONS}
                  value={values.courses}
                  multiple
                  compact
                  onChange={toggleCourse}
                  error={errors.courses}
                  hint="Select all courses you want to promote."
                />
                {values.courses.includes(OTHER_COURSE) && (
                  <div className="ce-other-course">
                    <Field
                      id={id("otherCourse")}
                      label="Specify Your Other Courses"
                      required
                      error={errors.otherCourse}
                    >
                      <input
                        {...inputProps("otherCourse", {
                          required: true,
                          maxLength: 300,
                          placeholder:
                            "e.g. Graphic design, coding, accounting",
                        })}
                      />
                    </Field>
                  </div>
                )}
                <ChoiceGroup
                  id={id("challenge")}
                  label="What Is Your Biggest Challenge With Student Enquiries Right Now?"
                  options={CHALLENGE_OPTIONS}
                  value={values.challenge}
                  onChange={(value) => update("challenge", value)}
                  error={errors.challenge}
                />
                <ChoiceGroup
                  id={id("budget")}
                  label="What Monthly Advertising Budget Are You Considering?"
                  options={BUDGET_OPTIONS}
                  value={values.budget}
                  compact
                  onChange={(value) => update("budget", value)}
                  error={errors.budget}
                />
                <p className="ce-budget-note">
                  <FormIcon name="spark" />
                  Budget refers to ad spend. Our service fee will be
                  discussed separately.
                </p>
                <ChoiceGroup
                  id={id("start")}
                  label="When Would You Like To Start Promoting Your Courses?"
                  options={START_OPTIONS}
                  value={values.start}
                  compact
                  onChange={(value) => update("start", value)}
                  error={errors.start}
                />
                <details
                  className="ce-optional"
                  open={errors.email || errors.link ? true : undefined}
                >
                  <summary>Additional Details · Optional</summary>
                  <div className="ce-grid">
                    <Field id={id("role")} label="Your Role">
                      <select {...inputProps("role")}>
                        <option value="">Select your role</option>
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      id={id("email")}
                      label="Email Address"
                      error={errors.email}
                    >
                      <input
                        {...inputProps("email", {
                          type: "email",
                          autoComplete: "email",
                          maxLength: 200,
                          placeholder: "you@example.com",
                        })}
                      />
                    </Field>
                    <div className="ce-full">
                      <Field
                        id={id("link")}
                        label="Institute Website Or Instagram"
                        error={errors.link}
                      >
                        <input
                          {...inputProps("link", {
                            autoComplete: "url",
                            inputMode: "url",
                            maxLength: 500,
                            placeholder:
                              "Website or Instagram profile link",
                          })}
                        />
                      </Field>
                    </div>
                  </div>
                </details>
              </>
            )}

            <div className="ce-honeypot" aria-hidden="true">
              <label htmlFor={id("website")}>Leave This Empty</label>
              <input
                id={id("website")}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) =>
                  update("website", event.target.value)
                }
              />
            </div>

            {step === 2 && (
              <p className="ce-consent">
                By submitting, you agree that {brandName} may contact you
                by phone or WhatsApp about your enquiry.
                {site.privacyUrl && (
                  <>
                    {" "}Read our{" "}
                    <a
                      href={site.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </>
                )}
              </p>
            )}

            <div className="ce-actions">
              {step === 2 && (
                <button
                  type="button"
                  className="ce-button ce-button--back"
                  aria-label="Back To Institute Details"
                  onClick={() => {
                    pendingFocus.current = "heading";
                    lastStep.current = 1;
                    setStep(1);
                    setStatus({ type: "idle", message: "" });
                  }}
                >
                  <FormIcon name="back" />
                  <span>Back</span>
                </button>
              )}
              <button
                type="submit"
                className="ce-button ce-button--primary"
                disabled={busy}
              >
                {busy ? (
                  <>
                    <span className="ce-spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : step === 1 ? (
                  <>
                    Continue
                    <FormIcon name="arrow" />
                  </>
                ) : (
                  <>
                    Discuss My Admission Goals
                    <FormIcon name="arrow" />
                  </>
                )}
              </button>
            </div>
          </fieldset>

          <div aria-live="polite" aria-atomic="true">
            {status.message && (
              <p
                className={`ce-status ${
                  status.type === "error" ? "is-error" : ""
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </>
      )}

      {chatHref && (
        <p className="ce-support">
          Prefer a conversation?{" "}
          <a href={chatHref} {...whatsappProps}>
            Chat On WhatsApp
          </a>
        </p>
      )}
    </form>
  );

  // ---------- Inline (default) ----------
  if (!modal) {
    return (
      <section id="enquire" className="ce-root ce-section">
        <style>{styles}</style>
        <div className="ce-container">{formNode}</div>
      </section>
    );
  }

  // ---------- Popup ----------
  if (!rendered || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`ce-root ce-overlay${closing ? " is-closing" : ""}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <style>{styles}</style>
      <div
        className="ce-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id("title")}
        tabIndex={-1}
      >
        <button
          type="button"
          className="ce-close"
          aria-label="Close form"
          onClick={requestClose}
        >
          <FormIcon name="close" />
        </button>
        {formNode}
      </div>
    </div>,
    document.body
  );
}