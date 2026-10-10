type PixelValue = string | number | boolean | string[];
type PixelParams = Record<string, PixelValue>;

type PixelFunction = (...args: unknown[]) => void;

interface MetaPixelFunction extends PixelFunction {
  callMethod?: PixelFunction;
  queue?: unknown[][];
  push?: PixelFunction;
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

const pixelId = import.meta.env.VITE_META_PIXEL_ID;
const testEventCode = import.meta.env.VITE_META_TEST_CODE;
let initialized = false;

export function generateEventId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

function eventParams(params: PixelParams = {}): PixelParams {
  return import.meta.env.DEV && testEventCode
    ? { ...params, test_event_code: testEventCode }
    : params;
}

export function trackEvent(
  name: string,
  params: PixelParams = {},
  eventId = generateEventId()
): void {
  const safeParams = eventParams(params);
  if (import.meta.env.DEV) {
    console.log(`[Meta Pixel] ${name}`, safeParams);
  }
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", name, safeParams, { eventID: eventId });
}

export function trackCustom(
  name: string,
  params: PixelParams = {},
  eventId = generateEventId()
): void {
  const safeParams = eventParams(params);
  if (import.meta.env.DEV) {
    console.log(`[Meta Pixel] ${name}`, safeParams);
  }
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", name, safeParams, { eventID: eventId });
}

export function trackContact(method: "whatsapp" | "call"): void {
  trackEvent("Contact", { method });
}

export function initializePixel(): void {
  if (initialized || typeof window === "undefined" || !pixelId) return;
  initialized = true;

  if (!window.fbq) {
    const fbq: MetaPixelFunction = (...args) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue?.push(args);
      }
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq("init", pixelId);
  trackEvent("PageView");
}
