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

    if (
      digits.length < 8 ||
      digits.length > 15 ||
      !/^[+\d\s()-]+$/.test(phone)
    ) {
      errors.phone =
        "Enter a valid WhatsApp number with country code.";
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
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        values.email.trim()
      )
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
  --ce-soft: #81718c;

  padding: clamp(42px, 7vw, 88px) 20px;
  position: relative;
  isolation: isolate;

  font-family:
    Inter, system-ui, -apple-system, sans-serif;

  color: var(--ce-ink);
  background: linear-gradient(
    180deg,
    #fffdfb,
    #f8f5fc
  );

  scroll-margin-top: 90px;
}

.ce-section,
.ce-section *,
.ce-section *::before,
.ce-section *::after {
  box-sizing: border-box;
}

.ce-container {
  width: min(100%, 1120px);
  margin-inline: auto;

  display: grid;
  grid-template-columns:
    minmax(0, .85fr) minmax(0, 1.15fr);

  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

.ce-intro {
  position: sticky;
  top: 110px;
  min-width: 0;
  padding: 28px 0;
}

.ce-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 21px;
  color: #7c5a90;

  font-size: 10px;
  font-weight: 750;
  letter-spacing: .11em;
}

.ce-eyebrow svg {
  width: 15px;
  height: 15px;
}

.ce-intro h2 {
  margin: 0;
  font-size: clamp(32px, 4vw, 49px);
  line-height: 1.13;
  letter-spacing: -.055em;
  font-weight: 800;
  text-wrap: balance;
}

.ce-intro h2 span {
  color: #9a6bba;
}

.ce-intro-description {
  margin: 21px 0 0;
  max-width: 410px;

  color: #786583;
  font-size: 14px;
  line-height: 1.9;
}

.ce-sidebar-art {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;

  margin: 30px 0;
  padding: 22px;

  border: 1px solid #ede4f2;
  border-radius: 23px;

  background: linear-gradient(
    135deg,
    #fff,
    #f4ecfa
  );

  box-shadow: inset 0 1px 0 #fff;
}

.ce-art-icon {
  display: grid;
  place-items: center;

  width: 63px;
  height: 63px;
  flex-shrink: 0;

  border: 1px solid #fff;
  border-radius: 21px;

  color: #8656a2;

  background: linear-gradient(
    145deg,
    #fff,
    #e9d9f4
  );

  box-shadow:
    0 5px 0 #decaea,
    0 12px 20px #5431700d;

  transform: rotate(-7deg);
}

.ce-art-icon svg {
  width: 29px;
  height: 29px;
}

.ce-sidebar-art strong {
  display: block;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: -.02em;
}

.ce-sidebar-art p {
  margin: 5px 0 0;
  color: #786583;
  font-size: 11px;
  line-height: 1.7;
}

.ce-sidebar-steps {
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  gap: 19px;
}

.ce-sidebar-steps li {
  display: flex;
  align-items: flex-start;
  gap: 13px;
}

.ce-sidebar-steps li > span {
  display: grid;
  place-items: center;

  width: 27px;
  height: 27px;
  flex-shrink: 0;

  border: 1px solid #e8daee;
  border-radius: 9px;

  color: #9665af;
  background: #fff;

  font-size: 10px;
  font-weight: 750;
}

.ce-sidebar-steps strong {
  display: block;
  font-size: 12px;
  line-height: 1.6;
}

.ce-sidebar-steps p {
  margin: 3px 0 0;
  font-size: 11px;
  color: #786583;
  line-height: 1.7;
}

.ce-sidebar-contact {
  margin: 28px 0 0;
  color: #786583;
  font-size: 12px;
  line-height: 1.8;
}

.ce-sidebar-contact a {
  color: #543170;
  font-weight: 700;
  text-underline-offset: 4px;
}

.ce-card {
  min-width: 0;
  padding: clamp(23px, 3.5vw, 38px);

  border: 1px solid #eee5f3;
  border-radius: 28px;

  background: #fff;

  box-shadow:
    0 24px 60px #5431700a,
    0 2px 6px #54317004;

  scroll-margin-top: 100px;
}

.ce-progress {
  display: flex;
  gap: 10px;
  margin-bottom: 29px;
  padding: 6px;

  border: 1px solid #f0eaf5;
  border-radius: 14px;
  background: #faf7fc;
}

.ce-progress-item {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  padding: 10px 8px;
  border: 1px solid transparent;
  border-radius: 10px;

  color: #786583;
}

.ce-progress-item.is-active {
  color: #694183;
  background: #fff;
  border-color: #e9ddf0;
  box-shadow: 0 3px 7px #54317006;
}

.ce-progress-number {
  display: grid;
  place-items: center;

  width: 22px;
  height: 22px;
  flex-shrink: 0;

  border-radius: 7px;
  background: #f0e7f6;

  color: #786583;
  font-size: 10px;
  font-weight: 800;
}

.is-active .ce-progress-number {
  background: #795094;
  color: #fff;
}

.ce-progress-number svg {
  width: 13px;
  height: 13px;
}

.ce-progress-label {
  font-size: 11px;
  line-height: 1.4;
  font-weight: 700;
}

.ce-step-heading {
  display: flex;
  align-items: flex-start;
  gap: 13px;

  margin-bottom: 27px;
  outline: none;
}

.ce-step-icon {
  display: grid;
  place-items: center;

  width: 39px;
  height: 39px;
  flex-shrink: 0;

  border: 1px solid #f0e6f5;
  border-radius: 12px;

  color: #786583;
  background: #fbf7fd;
}

.ce-step-icon svg {
  width: 20px;
  height: 20px;
}

.ce-step-heading h3 {
  margin: 0;
  font-size: clamp(20px, 2.5vw, 25px);
  line-height: 1.3;
  letter-spacing: -.035em;
  font-weight: 750;
}

.ce-step-heading p {
  margin: 7px 0 0;
  color: #786583;
  font-size: 11px;
  line-height: 1.75;
}

.ce-form-body {
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
}

.ce-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 22px 16px;
}

.ce-field {
  min-width: 0;
}

.ce-field > label,
.ce-choice-group > legend {
  margin-bottom: 9px;
  display: block;

  color: #695773;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.7;
}

.ce-required {
  color: #786583;
}

.ce-input {
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 53px;

  padding: 14px;
  border: 1px solid #e9e0ef;
  border-radius: 12px;

  outline: none;
  font: inherit;
  font-size: 16px;
  line-height: 1.5;

  color: #4f3a5b;
  background: #fdfbfe;

  transition:
    border-color .2s,
    box-shadow .2s,
    background .2s;
}

.ce-input::placeholder {
  color: #897491;
  font-size: 12px;
}

.ce-input:focus {
  border-color: #b58bca;
  background: #fff;
  box-shadow: 0 0 0 4px #a575bd12;
}

.ce-input[aria-invalid="true"] {
  border-color: #de9988;
  background: #fffaf8;
}

.ce-section select.ce-input {
  appearance: none;
  padding-right: 38px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%238c759a' stroke-width='1.6'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E");

  background-repeat: no-repeat;
  background-position: right 14px center;

  font-size: 13px;
  text-overflow: ellipsis;
}

.ce-hint {
  margin: 7px 0 0;
  color: #786583;
  font-size: 10px;
  line-height: 1.8;
}

.ce-error {
  margin: 7px 0 0;
  color: #b85e45;
  font-size: 11px;
  line-height: 1.7;
}

.ce-choice-group {
  min-width: 0;
  padding: 0;
  margin: 0 0 24px;
  border: 0;
  outline: none;
}

.ce-choice-group:focus-visible {
  outline: 3px solid #d3b8e1;
  outline-offset: 6px;
  border-radius: 12px;
}

.ce-choice-group > .ce-hint {
  margin: -3px 0 12px;
}

.ce-options {
  display: grid;
  gap: 9px;
}

.ce-options--compact {
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
}

.ce-choice {
  position: relative;

  display: flex;
  align-items: center;
  gap: 9px;

  min-height: 48px;
  padding: 11px 12px;

  border: 1px solid #eae1f0;
  border-radius: 11px;

  background: #fff;
  color: #786583;

  font-size: 11px;
  line-height: 1.6;
  cursor: pointer;

  transition:
    background .2s,
    border-color .2s,
    color .2s;
}

.ce-choice input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.ce-choice:has(input:focus-visible) {
  outline: 3px solid #d0b0e0;
  outline-offset: 3px;
}

.ce-choice.is-selected {
  background: #f7effb;
  color: #6c4386;
  border-color: #b997cb;
}

.ce-choice-mark {
  display: grid;
  place-items: center;

  width: 17px;
  height: 17px;
  flex-shrink: 0;

  border: 1px solid #dfcce9;
  border-radius: 50%;
  background: #fff;
}

.ce-choice-mark.is-square {
  border-radius: 5px;
}

.is-selected .ce-choice-mark {
  background: #9162ab;
  border-color: #9162ab;
  color: #fff;
}

.ce-choice-mark svg {
  width: 12px;
  height: 12px;
}

.ce-options--chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ce-options--chips .ce-choice {
  min-height: 41px;
  padding: 9px 13px;
  border-radius: 999px;
  font-size: 11px;
}

.ce-options--chips .ce-choice-mark {
  width: 16px;
  height: 16px;
}

.ce-select-question {
  margin-bottom: 24px;
}

.ce-other-course {
  margin: -9px 0 24px;
}

.ce-budget-note {
  display: flex;
  align-items: flex-start;
  gap: 7px;

  padding: 0;
  margin: -13px 0 24px;

  color: #786583;
  font-size: 10px;
  line-height: 1.8;
}

.ce-budget-note svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;

  margin-top: 3px;
  color: #786583;
}

.ce-optional {
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #f0e9f4;
}

.ce-optional summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 6px 0;

  color: #786583;
  font-size: 11px;
  font-weight: 650;

  cursor: pointer;
  list-style: none;
}

.ce-optional summary::-webkit-details-marker {
  display: none;
}

.ce-optional summary::after {
  content: "+";

  display: grid;
  place-items: center;

  width: 22px;
  height: 22px;

  border: 1px solid #eee4f3;
  border-radius: 7px;

  font-size: 16px;
  font-weight: 400;
}

.ce-optional[open] summary::after {
  content: "−";
}

.ce-optional .ce-grid {
  margin-top: 19px;
}

.ce-full {
  grid-column: 1 / -1;
}

.ce-consent {
  margin: 22px 0 0;
  color: #786583;
  font-size: 10px;
  line-height: 1.8;
}

.ce-consent a {
  color: #8c699f;
  text-underline-offset: 3px;
}

.ce-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
}

.ce-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 54px;
  padding: 14px 19px;

  border: 1px solid transparent;
  border-radius: 13px;

  font: inherit;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 750;

  cursor: pointer;
  text-decoration: none;

  transition:
    transform .2s,
    box-shadow .2s;
}

.ce-button svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.ce-button--primary {
  flex: 1;

  background: linear-gradient(
    115deg,
    #8b5aa5,
    #684084
  );

  color: #fff;
  border-color: #ffffff77;

  box-shadow:
    inset 0 1px 0 #ffffff44,
    0 4px 0 #543170,
    0 10px 23px #86549f20;
}

.ce-button--back {
  color: #786583;
  border-color: #ecdff3;
  background: #fff;
}

.ce-button:focus-visible,
.ce-optional summary:focus-visible {
  outline: 3px solid #c9a5d9;
  outline-offset: 5px;
}

.ce-button:disabled {
  opacity: .65;
  cursor: wait;
}

.ce-support {
  margin: 22px 0 0;
  color: #786583;
  font-size: 10px;
  line-height: 1.8;
  text-align: center;
}

.ce-support a {
  color: #56866a;
  font-weight: 700;
  text-underline-offset: 3px;
}

.ce-status {
  margin: 18px 0 0;
  padding: 12px 14px;

  border: 1px solid #ede0f4;
  border-radius: 12px;

  color: #786583;
  background: #fcf8fe;

  font-size: 11px;
  line-height: 1.8;
}

.ce-status.is-error {
  color: #b05c42;
  background: #fff9f5;
  border-color: #f1ddcf;
}

.ce-success {
  padding: 25px 0;
  text-align: center;
}

.ce-success-mark {
  display: grid;
  place-items: center;

  width: 68px;
  height: 68px;
  margin: 0 auto 24px;

  border: 1px solid #e0eedf;
  border-radius: 24px;

  background: #f1faf0;
  color: #6e9b70;
}

.ce-success-mark svg {
  width: 31px;
  height: 31px;
}

.ce-success h3 {
  margin: 0;
  font-size: 29px;
  letter-spacing: -.035em;
}

.ce-success p {
  margin: 14px auto 25px;
  color: #786583;
  font-size: 13px;
  line-height: 1.9;
}

.ce-honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.ce-spinner {
  width: 18px;
  height: 18px;

  border: 2px solid #ffffff55;
  border-top-color: #fff;
  border-radius: 50%;

  animation: ceSpin .8s linear infinite;
}

@keyframes ceSpin {
  to {
    transform: rotate(360deg);
  }
}

@media (hover: hover) and (pointer: fine) {
  .ce-choice:hover {
    border-color: #c4a3d4;
  }

  .ce-button:not(:disabled):hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 900px) {
  .ce-container {
    gap: 30px;

    grid-template-columns:
      minmax(0, .8fr) minmax(0, 1.2fr);
  }

  .ce-card {
    padding: 25px;
  }

  .ce-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .ce-section {
    padding: 42px 16px;
  }

  .ce-container {
    display: block;
    max-width: 560px;
  }

  .ce-intro {
    position: static;
    padding: 0;
    margin-bottom: 27px;
  }

  .ce-eyebrow {
    margin-bottom: 14px;
  }

  .ce-intro h2 {
    font-size: clamp(30px, 8.5vw, 42px);
    max-width: 470px;
  }

  .ce-intro-description {
    font-size: 12px;
    line-height: 1.9;
    margin-top: 15px;
  }

  .ce-sidebar-art,
  .ce-sidebar-steps,
  .ce-sidebar-contact {
    display: none;
  }

  .ce-card {
    padding: 24px 20px;
    border-radius: 24px;
  }

  .ce-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 19px 13px;
  }

  .ce-step-heading {
    margin-bottom: 23px;
  }

  .ce-progress {
    margin-bottom: 25px;
    gap: 5px;
  }

  .ce-progress-label {
    font-size: 10px;
  }

  .ce-progress-item {
    gap: 7px;
    padding: 9px 6px;
  }
}

@media (max-width: 479px) {
  .ce-grid {
    grid-template-columns: 1fr;
  }

  .ce-card {
    padding: 23px 18px;
  }

  .ce-intro h2 {
    font-size: 31px;
  }

  .ce-step-heading h3 {
    font-size: 20px;
  }

  .ce-step-icon {
    display: none;
  }

  .ce-button--back {
    padding-inline: 13px;
  }

  .ce-button--back span {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ce-section * {
    animation: none !important;
    transition: none !important;
  }

  .ce-button:hover {
    transform: none !important;
  }
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
          id="campaign-form"
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
                className="ce-form-body"
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