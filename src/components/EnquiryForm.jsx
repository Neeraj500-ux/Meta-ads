import { useEffect, useId, useRef, useState } from "react";
import {
  site,
  chatHref,
  chatIsExternal,
} from "../config/site.js";
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
const FIRST_STEP_FIELDS = [
  "name",
  "institute",
  "phone",
  "city",
];
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
      errors.institute =
        "Enter your institute’s name.";
    }
    const phone = values.phone.trim();
    const digits = phone.replace(/\D/g, "");
    const indianNumber = phone.startsWith("+91")
      ? digits.slice(2)
      : digits.length === 12 && digits.startsWith("91")
        ? digits.slice(2)
        : digits.length === 10 && !phone.startsWith("+") ? digits : null;
    if (
      !/^[+\d\s()-]+$/.test(phone) ||
      !/^\+?[\d\s()-]+$/.test(phone) ||
      digits.length < 8 || digits.length > 15 ||
      (indianNumber !== null && !/^[6-9]\d{9}$/.test(indianNumber))
    ) {
      errors.phone = "Enter a valid WhatsApp number with country code.";
    }
    if (!values.city.trim()) {
      errors.city =
        "Enter your institute’s city or locality.";
    }
  }
  if (step === 2 || step === "all") {
    if (!values.courses.length) {
      errors.courses =
        "Select at least one course.";
    }
    if (
      values.courses.includes(OTHER_COURSE) &&
      !values.otherCourse.trim()
    ) {
      errors.otherCourse =
        "Tell us which other courses you want to promote.";
    }
    if (!values.challenge) {
      errors.challenge =
        "Select your main enquiry challenge.";
    }
    if (!values.budget) {
      errors.budget =
        "Select a budget, or choose ‘I need help deciding’.";
    }
    if (!values.start) {
      errors.start =
        "Choose when you would like to start.";
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
          /^https?:\/\//i.test(raw)
            ? raw
            : `https://${raw}`
        );
        if (
          !["http:", "https:"].includes(
            url.protocol
          ) ||
          !url.hostname.includes(".")
        ) {
          throw new Error("Invalid link");
        }
      } catch {
        errors.link =
          "Enter a website or Instagram profile link.";
      }
    }
  }
  return errors;
}
function FormIcon({
  name = "arrow",
  className = "",
}) {
  const paths = {
    arrow: (
      <path d="M5 12h14m-6-6 6 6-6 6" />
    ),
    back: (
      <path d="M19 12H5m6-6-6 6 6 6" />
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
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
function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}) {
  return (
    <div className="ce-field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span
            className="ce-required"
            aria-hidden="true"
          >
            {" "}*
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p
          className="ce-hint"
          id={`${id}-hint`}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          className="ce-error"
          id={`${id}-error`}
        >
          {error}
        </p>
      )}
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
    multiple
      ? value.includes(option)
      : value === option;
  const useDropdown =
    options === CHALLENGE_OPTIONS ||
    options === START_OPTIONS;
  if (useDropdown) {
    return (
      <div className="ce-select-question">
        <Field
          id={id}
          label={label}
          required
          error={error}
        >
          <select
            id={id}
            name={id}
            className="ce-input"
            value={value}
            required
            onChange={(event) =>
              onChange(event.target.value)
            }
            aria-invalid={
              error ? "true" : undefined
            }
            aria-describedby={
              error ? `${id}-error` : undefined
            }
          >
            <option value="">
              {options === CHALLENGE_OPTIONS
                ? "Choose your main challenge"
                : "Choose your preferred start time"}
            </option>
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
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
      className="ce-choice-group"
      id={id}
      tabIndex={-1}
      aria-invalid={
        error ? "true" : undefined
      }
      aria-describedby={
        [
          hint ? `${id}-hint` : "",
          error ? `${id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      <legend>
        {label}
        <span
          className="ce-required"
          aria-hidden="true"
        >
          {" "}*
        </span>
      </legend>
      {hint && (
        <p
          id={`${id}-hint`}
          className="ce-hint"
        >
          {hint}
        </p>
      )}
      <div
        className={`ce-options ${
          compact ? "ce-options--compact" : ""
        } ${
          multiple ? "ce-options--chips" : ""
        }`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`ce-choice ${
              selected(option)
                ? "is-selected"
                : ""
            }`}
          >
            <input
              type={
                multiple
                  ? "checkbox"
                  : "radio"
              }
              name={id}
              value={option}
              checked={selected(option)}
              onChange={() =>
                onChange(option)
              }
              aria-describedby={
                error
                  ? `${id}-error`
                  : undefined
              }
            />
            <span
              className={`ce-choice-mark ${
                multiple ? "is-square" : ""
              }`}
              aria-hidden="true"
            >
              {selected(option) && (
                <FormIcon name="check" />
              )}
            </span>
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="ce-error"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
const styles = `
.ce-section {
  --ce-plum: #543170;
  --ce-ink: #231c2d;
  --ce-muted: #786583;
  --ce-line: #e9dff0;
  position: relative;
  isolation: isolate;
  padding: clamp(48px, 7vw, 100px) clamp(16px, 4vw, 40px);
  color: var(--ce-ink);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: radial-gradient(ellipse at 0% 20%, #f0e5f6 0, transparent 45%), radial-gradient(ellipse at 100% 90%, #f3eaf8 0, transparent 42%), #fcf9fe;
  scroll-margin-top: 88px;
}
.ce-section, .ce-section *, .ce-section *::before, .ce-section *::after { box-sizing: border-box; }
.ce-section svg { display: block; }
.ce-section button, .ce-section input, .ce-section select { font-family: inherit; }
.ce-container { width: min(100%, 1180px); margin-inline: auto; display: grid; grid-template-columns: minmax(0, .86fr) minmax(0, 1.14fr); gap: clamp(28px, 5vw, 68px); align-items: start; }
.ce-intro { position: sticky; top: 100px; min-width: 0; padding-block: 0; }
.ce-eyebrow { display: inline-flex; align-items: center; gap: 9px; margin: 0 0 24px; padding: 9px 13px; border: 1px solid #e7d9ef; border-radius: 999px; background: #ffffffb8; color: #7c5a90; font-size: 11px; line-height: 1.5; letter-spacing: .075em; font-weight: 750; }
.ce-eyebrow svg { width: 15px; height: 15px; flex-shrink: 0; }
.ce-intro h2 { margin: 0; font-size: clamp(34px, 4.1vw, 52px); line-height: 1.12; letter-spacing: -.05em; font-weight: 800; text-wrap: balance; }
.ce-intro h2 span { color: var(--ce-plum); }
.ce-intro-description { max-width: 440px; margin: 23px 0 0; font-size: 16px; line-height: 1.8; color: var(--ce-muted); }
.ce-sidebar-art { position: relative; display: flex; align-items: center; gap: 19px; margin: 30px 0; padding: 22px; border: 1px solid #ffffff; border-radius: 22px; background: linear-gradient(130deg, #ffffffdb, #f7f2fab8); box-shadow: inset 0 1px 0 #fff, 0 16px 40px #6a45800b; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); }
.ce-art-icon { display: grid; place-items: center; width: 62px; height: 62px; flex: 0 0 62px; border: 1px solid #fff; border-radius: 19px; color: var(--ce-plum); background: linear-gradient(145deg, #fff, #f3ebf8); box-shadow: inset 0 1px 1px #fff, 0 4px 0 #e6daee, 0 12px 24px #54317015; transform: rotate(-6deg); }
.ce-art-icon svg { width: 29px; height: 29px; }
.ce-sidebar-art strong { display: block; font-size: 15px; line-height: 1.5; letter-spacing: -.02em; }
.ce-sidebar-art p { margin: 5px 0 0; font-size: 13px; line-height: 1.6; color: var(--ce-muted); }
.ce-sidebar-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.ce-sidebar-steps li { position: relative; display: flex; gap: 16px; padding-bottom: 25px; }
.ce-sidebar-steps li:last-child { padding-bottom: 0; }
.ce-sidebar-steps li:not(:last-child)::before { content: ""; position: absolute; width: 1px; left: 17px; top: 39px; bottom: 5px; background: linear-gradient(#ddcce7, #e9dff0); }
.ce-sidebar-steps li > span { position: relative; display: grid; place-items: center; width: 35px; height: 35px; flex: 0 0 35px; border: 1px solid #e4d9ea; border-radius: 11px; background: #fff; color: #8656a2; font-size: 12px; font-weight: 750; box-shadow: 0 3px 8px #54317006; }
.ce-sidebar-steps strong { display: block; font-size: 14px; line-height: 1.5; padding-top: 2px; }
.ce-sidebar-steps p { margin: 5px 0 0; color: var(--ce-muted); font-size: 13px; line-height: 1.65; }
.ce-sidebar-contact { margin: 28px 0 0; color: var(--ce-muted); font-size: 13px; line-height: 1.8; }
.ce-sidebar-contact a, .ce-support a { color: #56866a; font-weight: 700; text-underline-offset: 4px; }
.ce-card { position: relative; min-width: 0; margin: 0; padding: clamp(24px, 3vw, 38px); border: 1px solid #fff; border-radius: 28px; background: #ffffffef; -webkit-backdrop-filter: blur(22px); backdrop-filter: blur(22px); box-shadow: 0 25px 65px #5e3f7110, 0 3px 12px #5e3f7106, inset 0 1px 0 #fff; scroll-margin-top: 95px; }
.ce-card::before { content: ""; position: absolute; left: 32px; right: 32px; top: 0; height: 2px; background: linear-gradient(90deg, transparent, #c5a1dc, transparent); }
.ce-progress { display: flex; gap: 8px; padding: 6px; margin-bottom: 30px; border: 1px solid #f0ebf3; border-radius: 16px; background: #f8f6fa; }
.ce-progress-item { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 11px 8px; border: 1px solid transparent; border-radius: 11px; color: var(--ce-muted); }
.ce-progress-item.is-active { color: #694183; background: #fff; border-color: #eae1f0; box-shadow: 0 3px 8px #48355307; }
.ce-progress-number { display: grid; place-items: center; width: 26px; height: 26px; flex: 0 0 26px; border-radius: 8px; background: #eee9f2; color: var(--ce-muted); font-size: 12px; font-weight: 800; }
.is-active .ce-progress-number { background: linear-gradient(145deg, #a575bf, #795094); color: #fff; box-shadow: 0 3px 7px #54317020; }
.ce-progress-number svg { width: 15px; height: 15px; }
.ce-progress-label { font-size: 12px; line-height: 1.4; font-weight: 700; }
.ce-step-heading { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 28px; outline: none; }
.ce-step-icon { display: grid; place-items: center; width: 45px; height: 45px; flex: 0 0 45px; border: 1px solid #ece1f2; border-radius: 14px; color: var(--ce-plum); background: linear-gradient(145deg, #fcfbfd, #f6effa); }
.ce-step-icon svg { width: 23px; height: 23px; }
.ce-step-heading h3 { margin: 0; color: var(--ce-ink); font-size: clamp(22px, 2.2vw, 27px); line-height: 1.25; letter-spacing: -.035em; font-weight: 750; }
.ce-step-heading p { margin: 8px 0 0; font-size: 13px; line-height: 1.65; color: var(--ce-muted); }
.ce-form-body { min-width: 0; border: 0; padding: 0; margin: 0; }
.ce-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 23px 18px; }
.ce-field { min-width: 0; }
.ce-field > label, .ce-choice-group > legend { display: block; max-width: 100%; margin-bottom: 10px; padding: 0; color: #4e395c; font-size: 13px; font-weight: 650; line-height: 1.6; }
.ce-required { color: #543170; }
.ce-input { display: block; width: 100%; min-width: 0; min-height: 55px; padding: 14px 15px; border: 1px solid #e8e1ec; border-radius: 13px; outline: none; font: inherit; font-size: 16px; line-height: 1.5; color: var(--ce-ink); background: #fbf9fc; box-shadow: inset 0 1px 2px #48355303; transition: border-color .2s, box-shadow .2s, background .2s; }
.ce-input::placeholder { color: #8a7695; font-size: 14px; }
.ce-input:focus { background: #fff; border-color: #b98ed3; box-shadow: 0 0 0 4px #5431700f; }
.ce-input[aria-invalid="true"] { border-color: #d77474; background: #fffafa; }
.ce-section select.ce-input { appearance: none; padding-right: 38px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='%23786583' stroke-width='1.7'%3E%3Cpath d='m4 7 5 5 5-5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 13px center; text-overflow: ellipsis; }
.ce-hint { margin: 8px 0 0; color: var(--ce-muted); font-size: 12px; line-height: 1.65; }
.ce-error { margin: 8px 0 0; color: #b33838; font-size: 12px; line-height: 1.65; }
.ce-choice-group { min-width: 0; padding: 0; margin: 0 0 27px; border: 0; outline: none; }
.ce-choice-group:focus-visible { outline: 3px solid #cfb1e1; outline-offset: 5px; border-radius: 12px; }
.ce-choice-group > .ce-hint { margin: -3px 0 13px; }
.ce-options { display: grid; gap: 10px; }
.ce-options--compact { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.ce-choice { position: relative; display: flex; align-items: center; gap: 11px; min-width: 0; min-height: 57px; padding: 13px 14px; border: 1px solid #e9e2ed; border-radius: 13px; color: #695773; background: #fff; font-size: 13px; line-height: 1.5; cursor: pointer; transition: border-color .2s, background .2s, box-shadow .2s; }
.ce-choice > span:last-child { overflow-wrap: anywhere; }
.ce-choice input { position: absolute; width: 1px; height: 1px; padding: 0; opacity: 0; }
.ce-choice:has(input:focus-visible) { outline: 3px solid #cfb1e1; outline-offset: 3px; }
.ce-choice.is-selected { color: #694183; border-color: #c4a2d9; background: linear-gradient(135deg, #faf7fc, #f6f0fa); box-shadow: inset 0 1px 0 #fff, 0 3px 9px #54317006; }
.ce-choice-mark { display: grid; place-items: center; width: 20px; height: 20px; flex: 0 0 20px; border: 1px solid #cfc3d6; border-radius: 50%; background: #fff; }
.ce-choice-mark.is-square { border-radius: 6px; }
.is-selected .ce-choice-mark { background: var(--ce-plum); border-color: var(--ce-plum); color: #fff; }
.ce-choice-mark svg { width: 13px; height: 13px; }
.ce-options--chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.ce-options--compact .ce-choice:last-child:nth-child(odd) { grid-column: 1 / -1; }
.ce-select-question { margin-bottom: 27px; }
.ce-other-course { margin: -8px 0 27px; }
.ce-budget-note { display: flex; align-items: flex-start; gap: 8px; margin: -14px 0 27px; padding: 12px 14px; border: 1px solid #eee6f3; border-radius: 11px; background: #faf7fc; color: var(--ce-muted); font-size: 12px; line-height: 1.7; }
.ce-budget-note svg { width: 15px; height: 15px; flex: 0 0 15px; margin-top: 3px; color: var(--ce-plum); }
.ce-optional { margin-top: 3px; padding: 15px; border: 1px solid #ece6f0; border-radius: 14px; background: #fcfafd; }
.ce-optional summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; color: #695773; font-size: 13px; line-height: 1.6; font-weight: 650; cursor: pointer; list-style: none; }
.ce-optional summary::-webkit-details-marker { display: none; }
.ce-optional summary::after { content: "+"; display: grid; place-items: center; width: 25px; height: 25px; flex: 0 0 25px; border: 1px solid #eae3ee; border-radius: 8px; color: var(--ce-plum); background: #fff; font-size: 18px; font-weight: 400; }
.ce-optional[open] summary::after { content: "−"; }
.ce-optional .ce-grid { margin-top: 20px; }
.ce-full { grid-column: 1 / -1; }
.ce-consent { margin: 23px 0 0; font-size: 12px; line-height: 1.8; color: var(--ce-muted); }
.ce-consent a { color: #684084; text-underline-offset: 3px; }
.ce-actions { display: flex; align-items: stretch; gap: 11px; margin-top: 27px; }
.ce-button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-width: 0; min-height: 56px; padding: 15px 20px; border: 1px solid transparent; border-radius: 14px; font: inherit; font-size: 14px; font-weight: 700; line-height: 1.5; text-decoration: none; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s; }
.ce-button svg { width: 18px; height: 18px; flex: 0 0 18px; }
.ce-button--primary { flex: 1; color: #fff; border-color: #8c54ae; background: linear-gradient(115deg, #8b5aa5, #684084 70%, #543170); box-shadow: inset 0 1px 0 #ffffff55, 0 9px 22px #54317026; }
.ce-button--back { color: #695773; border-color: #e9e2ed; background: #fff; }
.ce-button:focus-visible, .ce-optional summary:focus-visible, .ce-section a:focus-visible { outline: 3px solid #c5a1db; outline-offset: 4px; }
.ce-button:disabled { opacity: .65; cursor: wait; }
.ce-form-body:disabled .ce-choice { cursor: wait; opacity: .7; }
.ce-support { padding-top: 21px; border-top: 1px solid #f3f0f5; margin: 23px 0 0; text-align: center; font-size: 12px; line-height: 1.8; color: var(--ce-muted); }
.ce-status { margin: 18px 0 0; padding: 13px 15px; border: 1px solid #eee4f4; border-radius: 12px; background: #f9f5fc; color: #694183; font-size: 13px; line-height: 1.7; }
.ce-status.is-error { color: #a13131; background: #fff5f5; border-color: #f2d5d5; }
.ce-honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.ce-success { display: grid; justify-items: center; padding: 35px 0; text-align: center; }
.ce-success-mark { display: grid; place-items: center; width: 72px; height: 72px; margin-bottom: 24px; border: 1px solid #c9e8d9; border-radius: 24px; color: #187b51; background: linear-gradient(145deg, #f6fff9, #e3f5ea); box-shadow: 0 8px 22px #187b510a; }
.ce-success-mark svg { width: 32px; height: 32px; }
.ce-success h3 { margin: 0; font-size: 28px; line-height: 1.3; letter-spacing: -.04em; }
.ce-success p { margin: 16px 0 26px; max-width: 400px; color: var(--ce-muted); font-size: 15px; line-height: 1.8; }
.ce-spinner { width: 17px; height: 17px; border: 2px solid #ffffff66; border-top-color: #fff; border-radius: 50%; animation: ce-spin .8s linear infinite; }
.ce-step-content { animation: ce-enter .28s ease-out; }
@keyframes ce-spin { to { transform: rotate(360deg); } }
@keyframes ce-enter { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
@media (hover: hover) {
  .ce-choice:hover { border-color: #ccb2dc; background: #fcfafd; }
  .ce-button--primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: inset 0 1px 0 #ffffff55, 0 12px 28px #54317030; }
  .ce-button--back:hover { background: #faf7fc; }
}
@media (max-width: 1000px) {
  .ce-container { grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 28px; }
  .ce-intro h2 { font-size: 39px; }
  .ce-grid { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 800px) {
  .ce-container { max-width: 640px; grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .ce-intro { position: static; padding: 0; }
  .ce-intro h2 { max-width: 590px; font-size: clamp(34px, 6vw, 44px); }
  .ce-intro-description { max-width: 540px; }
  .ce-sidebar-art { margin-block: 24px; }
  .ce-sidebar-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .ce-sidebar-steps li { display: block; padding: 0; }
  .ce-sidebar-steps li:not(:last-child)::before { display: none; }
  .ce-sidebar-steps li > span { margin-bottom: 10px; }
  .ce-sidebar-steps strong { font-size: 12px; }
  .ce-sidebar-steps p { font-size: 12px; }
  .ce-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 560px) {
  .ce-section { padding: 44px 16px; }
  .ce-eyebrow { font-size: 10px; letter-spacing: .055em; margin-bottom: 20px; }
  .ce-intro h2 { font-size: clamp(30px, 8.5vw, 39px); letter-spacing: -.045em; }
  .ce-intro-description { margin-top: 18px; font-size: 14px; line-height: 1.8; }
  .ce-sidebar-art { padding: 18px; gap: 15px; border-radius: 19px; }
  .ce-art-icon { width: 52px; height: 52px; flex-basis: 52px; border-radius: 16px; }
  .ce-sidebar-art strong { font-size: 14px; }
  .ce-sidebar-art p { font-size: 12px; }
  .ce-sidebar-steps { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .ce-sidebar-steps li { display: flex; gap: 13px; }
  .ce-sidebar-steps li > span { margin: 0; }
  .ce-sidebar-steps strong { font-size: 13px; }
  .ce-sidebar-steps p { font-size: 12px; margin-top: 3px; }
  .ce-sidebar-contact { margin-top: 20px; }
  .ce-card { padding: 22px 18px; border-radius: 23px; }
  .ce-progress { gap: 4px; padding: 5px; margin-bottom: 24px; }
  .ce-progress-item { gap: 6px; padding: 10px 5px; }
  .ce-progress-label { font-size: 11px; }
  .ce-progress-number { width: 23px; height: 23px; flex-basis: 23px; font-size: 11px; }
  .ce-step-heading { gap: 11px; margin-bottom: 24px; }
  .ce-step-heading h3 { font-size: 22px; }
  .ce-step-heading p { font-size: 12px; }
  .ce-step-icon { width: 39px; height: 39px; flex-basis: 39px; border-radius: 12px; }
  .ce-grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .ce-options--compact, .ce-options--chips { grid-template-columns: minmax(0, 1fr); }
  .ce-choice { min-height: 54px; }
  .ce-input::placeholder { font-size: 13px; }
  .ce-optional { padding: 13px; }
  .ce-actions { flex-wrap: wrap; }
  .ce-actions .ce-button--primary { flex-basis: 100%; order: -1; width: 100%; padding-inline: 12px; font-size: 13px; }
  .ce-actions .ce-button--back { width: 100%; min-height: 48px; }
  .ce-support { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .ce-section *, .ce-section *::before, .ce-section *::after { animation: none !important; transition: none !important; }
}

/* Align paired fields when a label occupies two lines. */
.ce-form-body > .ce-grid .ce-field > label { min-height: 42px; display: flex; align-items: flex-end; gap: 3px; }
.ce-intro h2 span { color: #9a6bba; }
.ce-optional .ce-field > label { min-height: 0; }
.ce-button--primary:active:not(:disabled) { transform: translateY(0); }
@media (min-width: 801px) and (max-width: 1000px) {
  .ce-form-body > .ce-grid .ce-field > label { min-height: 0; display: block; }
}
@media (max-width: 560px) {
  .ce-form-body > .ce-grid .ce-field > label { min-height: 0; display: block; }
}
@media (min-width: 801px) and (max-height: 760px) {
  .ce-intro { position: static; }
}
`;

export default function EnquiryForm() {
  const uid = useId();
  const formId = `campaign-form-${uid}`;
  const id = (key) => `${formId}-${key}`;
  const brandName =
    site.brandName || "Creative Crew";
  const [values, setValues] =
    useState(createEmpty);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "idle",
    message: "",
  });
  const pendingFocus = useRef(null);
  const stepHeading = useRef(null);
  const submitLock = useRef(false);
  const requestRef = useRef(null);
  const alive = useRef(true);
  const busy = status.type === "sending";
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      requestRef.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!pendingFocus.current) return;
    if (
      pendingFocus.current === "heading"
    ) {
      stepHeading.current?.focus({
        preventScroll: true,
      });
    } else {
      document
        .getElementById(
          pendingFocus.current
        )
        ?.focus();
    }
    pendingFocus.current = null;
  }, [step, errors]);
  const update = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
    if (
      status.type === "error" ||
      status.type === "draft"
    ) {
      setStatus({
        type: "idle",
        message: "",
      });
    }
  };
  const inputProps = (
    key,
    extra = {}
  ) => ({
    id: id(key),
    name: key,
    value: values[key],
    onChange: (event) =>
      update(
        key,
        event.target.value
      ),
    className: "ce-input",
    "aria-invalid":
      errors[key]
        ? "true"
        : undefined,
    "aria-describedby":
      errors[key]
        ? `${id(key)}-error`
        : undefined,
    ...extra,
  });
  const toggleCourse = (option) => {
    setValues((current) => ({
      ...current,
      courses:
        current.courses.includes(option)
          ? current.courses.filter(
              (course) =>
                course !== option
            )
          : [
              ...current.courses,
              option,
            ],
    }));
    setErrors((current) => ({
      ...current,
      courses: undefined,
      otherCourse: undefined,
    }));
  };
  const showErrors = (nextErrors) => {
    const first =
      Object.keys(nextErrors)[0];
    pendingFocus.current = id(first);
    setErrors(nextErrors);
    if (
      FIRST_STEP_FIELDS.includes(first)
    ) {
      setStep(1);
    }
    setStatus({
      type: "error",
      message:
        "Please check the highlighted fields.",
    });
  };
  async function onSubmit(event) {
    event.preventDefault();
    if (
      submitLock.current ||
      values.website.trim()
    ) {
      return;
    }
    const nextErrors = validate(
      values,
      step === 1 ? 1 : "all"
    );
    if (
      Object.keys(nextErrors).length
    ) {
      showErrors(nextErrors);
      return;
    }
    if (step === 1) {
      pendingFocus.current =
        "heading";
      setErrors({});
      setStatus({
        type: "idle",
        message: "",
      });
      setStep(2);
      return;
    }
    const data = {
      name: values.name.trim(),
      institute:
        values.institute.trim(),
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
    };
    if (site.formEndpoint) {
      submitLock.current = true;
      const controller =
        new AbortController();
      requestRef.current =
        controller;
      const timeout =
        window.setTimeout(
          () => controller.abort(),
          20000
        );
      setStatus({
        type: "sending",
        message:
          "Sending your institute’s details…",
      });
      try {
        const response = await fetch(
          site.formEndpoint,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body:
              JSON.stringify(data),
            signal:
              controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error(
            "Submission failed"
          );
        }
        if (!alive.current) return;
        setStatus({
          type: "success",
          message:
            "Thanks! We’ve received your institute’s details. Our team will contact you to discuss your courses and admission goals.",
        });
        setValues(createEmpty());
      } catch {
        if (alive.current) {
          setStatus({
            type: "error",
            message:
              "We couldn’t send your enquiry. Your details are still here. Please try again or contact us on WhatsApp.",
          });
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
      const body = Object.entries(
        labels
      )
        .map(
          ([key, label]) =>
            `${label}: ${
              data[key] ||
              "Not provided"
            }`
        )
        .join("\n");
      window.location.href =
        `mailto:${site.email}` +
        `?subject=${encodeURIComponent(
          "Institute Admission Goals Enquiry"
        )}` +
        `&body=${encodeURIComponent(
          body
        )}`;
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
  }
  const reset = () => {
    pendingFocus.current = "heading";
    setValues(createEmpty());
    setErrors({});
    setStep(1);
    setStatus({
      type: "idle",
      message: "",
    });
  };
  const whatsappProps =
    chatIsExternal
      ? {
          target: "_blank",
          rel:
            "noopener noreferrer",
        }
      : {};
  return (
    <section
      id="enquire"
      className="ce-section"
    >
      <style>{styles}</style>
      <div className="ce-container">
        <header className="ce-intro">
          <p className="ce-eyebrow">
            <FormIcon name="spark" />
            META ADS · INSTITUTE ENQUIRY
          </p>
          <h2>
            Let’s Plan{" "}
            <span>
              More Student Enquiries
            </span>{" "}
            For Your Next Batch
          </h2>
          <p className="ce-intro-description">
            Share your institute’s details
            so we can discuss a Meta Ads
            campaign around your courses,
            location and admission goals.
          </p>
          <div className="ce-sidebar-art">
            <span className="ce-art-icon">
              <FormIcon name="building" />
            </span>
            <div>
              <strong>
                Your Courses. Your Next Batch.
              </strong>
              <p>
                A Campaign Built Around
                Your Institute.
              </p>
            </div>
          </div>
          <ol className="ce-sidebar-steps">
            <li>
              <span>01</span>
              <div>
                <strong>
                  Tell Us About Your Institute
                </strong>
                <p>
                  Your location, courses
                  and admission goals.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>
                  Discuss Your Campaign
                </strong>
                <p>
                  Explore the budget,
                  targeting and next steps.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>
                  Plan Your Student
                  Enquiry Journey
                </strong>
                <p>
                  From course discovery
                  to admission conversations.
                </p>
              </div>
            </li>
          </ol>
          {chatHref && (
            <p className="ce-sidebar-contact">
              Prefer to talk first?{" "}
              <a
                href={chatHref}
                {...whatsappProps}
              >
                Chat On WhatsApp
              </a>
            </p>
          )}
        </header>
        <form
          id={formId}
          className="ce-card"
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={id("title")}
          aria-busy={busy}
        >
          {status.type === "success" ? (
            <div
              className="ce-success"
              role="status"
              aria-live="polite"
            >
              <span
                className="ce-success-mark"
              >
                <FormIcon name="check" />
              </span>
              <h3 id={id("title")}>
                Thanks For Sharing!
              </h3>
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
              <div
                className="ce-progress"
                aria-label={
                  `Step ${step} of 2`
                }
              >
                {[
                  "Your Institute",
                  "Admission Goals",
                ].map((label, index) => (
                  <div
                    key={label}
                    className={
                      `ce-progress-item ${
                        step >= index + 1
                          ? "is-active"
                          : ""
                      }`
                    }
                    aria-current={
                      step === index + 1
                        ? "step"
                        : undefined
                    }
                  >
                    <span
                      className="ce-progress-number"
                    >
                      {step > index + 1 ? (
                        <FormIcon
                          name="check"
                        />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className="ce-progress-label"
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="ce-step-heading"
                ref={stepHeading}
                tabIndex={-1}
              >
                <span
                  className="ce-step-icon"
                >
                  <FormIcon
                    name={
                      step === 1
                        ? "building"
                        : "spark"
                    }
                  />
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
                disabled={busy}
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
                        {...inputProps(
                          "name",
                          {
                            required: true,
                            autoComplete:
                              "name",
                            maxLength: 100,
                            placeholder:
                              "Your full name",
                          }
                        )}
                      />
                    </Field>
                    <Field
                      id={id("institute")}
                      label="Institute Name"
                      required
                      error={
                        errors.institute
                      }
                    >
                      <input
                        {...inputProps(
                          "institute",
                          {
                            required: true,
                            autoComplete:
                              "organization",
                            maxLength: 150,
                            placeholder:
                              "Your institute’s name",
                          }
                        )}
                      />
                    </Field>
                    <Field
                      id={id("phone")}
                      label="WhatsApp Number"
                      required
                      error={errors.phone}
                      hint={
                        "Include your country code. India: +91."
                      }
                    >
                      <input
                        {...inputProps(
                          "phone",
                          {
                            required: true,
                            type: "tel",
                            inputMode: "tel",
                            autoComplete:
                              "tel",
                            maxLength: 25,
                            "aria-describedby":
                              [
                                `${id("phone")}-hint`,
                                errors.phone
                                  ? `${id("phone")}-error`
                                  : "",
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(" "),
                          }
                        )}
                      />
                    </Field>
                    <Field
                      id={id("city")}
                      label={
                        "Where Is Your Institute Located?"
                      }
                      required
                      error={errors.city}
                    >
                      <input
                        {...inputProps(
                          "city",
                          {
                            required: true,
                            autoComplete:
                              "address-level2",
                            maxLength: 150,
                            placeholder:
                              "City / locality",
                          }
                        )}
                      />
                    </Field>
                  </div>
                ) : (
                  <>
                    <ChoiceGroup
                      id={id("courses")}
                      label={
                        "Which Courses Do You Want More Student Enquiries For?"
                      }
                      options={
                        COURSE_OPTIONS
                      }
                      value={
                        values.courses
                      }
                      multiple
                      compact
                      onChange={
                        toggleCourse
                      }
                      error={
                        errors.courses
                      }
                      hint={
                        "Select all courses you want to promote."
                      }
                    />
                    {values.courses.includes(
                      OTHER_COURSE
                    ) && (
                      <div
                        className="ce-other-course"
                      >
                        <Field
                          id={
                            id("otherCourse")
                          }
                          label={
                            "Specify Your Other Courses"
                          }
                          required
                          error={
                            errors.otherCourse
                          }
                        >
                          <input
                            {...inputProps(
                              "otherCourse",
                              {
                                required:
                                  true,
                                maxLength:
                                  300,
                                placeholder:
                                  "e.g. Graphic design, coding, accounting",
                              }
                            )}
                          />
                        </Field>
                      </div>
                    )}
                    <ChoiceGroup
                      id={id("challenge")}
                      label={
                        "What Is Your Biggest Challenge With Student Enquiries Right Now?"
                      }
                      options={
                        CHALLENGE_OPTIONS
                      }
                      value={
                        values.challenge
                      }
                      onChange={(value) =>
                        update(
                          "challenge",
                          value
                        )
                      }
                      error={
                        errors.challenge
                      }
                    />
                    <ChoiceGroup
                      id={id("budget")}
                      label={
                        "What Monthly Advertising Budget Are You Considering?"
                      }
                      options={
                        BUDGET_OPTIONS
                      }
                      value={
                        values.budget
                      }
                      compact
                      onChange={(value) =>
                        update(
                          "budget",
                          value
                        )
                      }
                      error={
                        errors.budget
                      }
                    />
                    <p
                      className="ce-budget-note"
                    >
                      <FormIcon
                        name="spark"
                      />
                      Budget refers to
                      ad spend. Our service
                      fee will be discussed
                      separately.
                    </p>
                    <ChoiceGroup
                      id={id("start")}
                      label={
                        "When Would You Like To Start Promoting Your Courses?"
                      }
                      options={
                        START_OPTIONS
                      }
                      value={
                        values.start
                      }
                      compact
                      onChange={(value) =>
                        update(
                          "start",
                          value
                        )
                      }
                      error={
                        errors.start
                      }
                    />
                    <details
                      className="ce-optional"
                      open={
                        errors.email ||
                        errors.link
                          ? true
                          : undefined
                      }
                    >
                      <summary>
                        Additional Details · Optional
                      </summary>
                      <div
                        className="ce-grid"
                      >
                        <Field
                          id={id("role")}
                          label="Your Role"
                        >
                          <select
                            {...inputProps(
                              "role"
                            )}
                          >
                            <option value="">
                              Select your role
                            </option>
                            {ROLE_OPTIONS.map(
                              (role) => (
                                <option
                                  key={role}
                                  value={role}
                                >
                                  {role}
                                </option>
                              )
                            )}
                          </select>
                        </Field>
                        <Field
                          id={id("email")}
                          label="Email Address"
                          error={
                            errors.email
                          }
                        >
                          <input
                            {...inputProps(
                              "email",
                              {
                                type:
                                  "email",
                                autoComplete:
                                  "email",
                                maxLength:
                                  200,
                                placeholder:
                                  "you@example.com",
                              }
                            )}
                          />
                        </Field>
                        <div
                          className="ce-full"
                        >
                          <Field
                            id={id("link")}
                            label={
                              "Institute Website Or Instagram"
                            }
                            error={
                              errors.link
                            }
                          >
                            <input
                              {...inputProps(
                                "link",
                                {
                                  autoComplete:
                                    "url",
                                  inputMode:
                                    "url",
                                  maxLength:
                                    500,
                                  placeholder:
                                    "Website or Instagram profile link",
                                }
                              )}
                            />
                          </Field>
                        </div>
                      </div>
                    </details>
                  </>
                )}
                <div
                  className="ce-honeypot"
                  aria-hidden="true"
                >
                  <label
                    htmlFor={
                      id("website")
                    }
                  >
                    Leave This Empty
                  </label>
                  <input
                    id={id("website")}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(event) =>
                      update(
                        "website",
                        event.target.value
                      )
                    }
                  />
                </div>
                {step === 2 && (
                  <p
                    className="ce-consent"
                  >
                    By submitting, you
                    agree that {brandName}
                    {" "}may contact you by
                    phone or WhatsApp about
                    your enquiry.
                    {site.privacyUrl && (
                      <>
                        {" "}Read our{" "}
                        <a
                          href={
                            site.privacyUrl
                          }
                          target="_blank"
                          rel={
                            "noopener noreferrer"
                          }
                        >
                          Privacy Policy
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
                <div
                  className="ce-actions"
                >
                  {step === 2 && (
                    <button
                      type="button"
                      className={
                        "ce-button ce-button--back"
                      }
                      aria-label={
                        "Back To Institute Details"
                      }
                      onClick={() => {
                        pendingFocus.current =
                          "heading";
                        setStep(1);
                        setStatus({
                          type: "idle",
                          message: "",
                        });
                      }}
                    >
                      <FormIcon
                        name="back"
                      />
                      <span>Back</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    className={
                      "ce-button ce-button--primary"
                    }
                    disabled={busy}
                  >
                    {busy ? (
                      <>
                        <span
                          className={
                            "ce-spinner"
                          }
                          aria-hidden={
                            "true"
                          }
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        {step === 1
                          ? "Continue"
                          : "Discuss My Admission Goals"}
                        <FormIcon />
                      </>
                    )}
                  </button>
                </div>
              </fieldset>
              <div
                aria-live="polite"
                aria-atomic="true"
              >
                {status.message && (
                  <p
                    className={
                      `ce-status ${
                        status.type ===
                        "error"
                          ? "is-error"
                          : ""
                      }`
                    }
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
              <a
                href={chatHref}
                {...whatsappProps}
              >
                Chat On WhatsApp
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}