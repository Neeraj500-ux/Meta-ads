// Central place for brand + contact settings. Values come from .env (see .env.example).
const env = import.meta.env;

const digits = (v = "") => v.replace(/\D/g, "");

export const site = {
  brandName: env.VITE_BRAND_NAME || "Creative Crew",
  email: env.VITE_CONTACT_EMAIL || "",
  whatsapp: digits(env.VITE_WHATSAPP),
  formEndpoint: env.VITE_FORM_ENDPOINT || "",
  privacyUrl: env.VITE_PRIVACY_URL || "",
  termsUrl: env.VITE_TERMS_URL || "",
  bookingUrl: env.VITE_BOOKING_URL || "",
};

const waMessage =
  "Hi, I’m interested in Meta Ads services for my institute. Please share the next steps.";

export const whatsappUrl = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage)}`
  : "";

// "Book a Strategy Call" goes to the booking link if set, otherwise to the enquiry form.
export const bookingHref = site.bookingUrl || "#enquire";
// "Chat on WhatsApp" goes to WhatsApp if configured, otherwise to the enquiry form.
export const chatHref = whatsappUrl || "#enquire";
export const chatIsExternal = Boolean(whatsappUrl);
export const bookingIsExternal = Boolean(site.bookingUrl);
