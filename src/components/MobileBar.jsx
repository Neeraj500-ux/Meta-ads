import {
  bookingHref,
  bookingIsExternal,
  chatHref,
  chatIsExternal,
} from "../config/site.js";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.12.55 4.19 1.6 6.02L0 24l6.1-1.6a12.03 12.03 0 0 0 5.94 1.52h.01C18.69 23.92 24 18.52 24 11.88c0-3.18-1.24-6.17-3.48-8.4ZM12.05 21.9a9.98 9.98 0 0 1-5.09-1.4l-.36-.21-3.62.95.97-3.53-.24-.38a9.96 9.96 0 0 1-1.53-5.29c0-5.52 4.49-10.01 10.02-10.01a9.94 9.94 0 0 1 7.07 2.93 9.94 9.94 0 0 1 2.93 7.07c0 5.53-4.49 10.02-10.02 10.02ZM17.54 14.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.48-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

const mobileBarStyles = `
  .cc-mobile-bar,
  .cc-mobile-bar *,
  .cc-mobile-bar *::before,
  .cc-mobile-bar *::after {
    box-sizing: border-box;
  }

  .cc-mobile-bar {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 100;
    isolation: isolate;

    padding:
      12px
      max(14px, env(safe-area-inset-right, 0px))
      calc(14px + env(safe-area-inset-bottom, 0px))
      max(14px, env(safe-area-inset-left, 0px));

    border-top: 1px solid rgba(116, 68, 148, .12);

    background: rgba(255, 252, 249, .96);

    box-shadow:
      0 -8px 30px rgba(75, 38, 106, .07),
      inset 0 1px 0 rgba(255, 255, 255, .95);

    font-family: Inter, system-ui, -apple-system, sans-serif;
  }

  .cc-mobile-bar__inner {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: 12px;

    width: 100%;
    max-width: 520px;
    margin-inline: auto;
  }

  .cc-mobile-bar__button {
    position: relative;
    isolation: isolate;
    overflow: hidden;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    min-width: 0;
    min-height: 54px;
    padding: 13px 12px;

    border: 1px solid rgba(255, 255, 255, .45);
    border-radius: 16px;

    color: #fff;
    text-decoration: none;
    text-align: center;
    font-size: clamp(13px, 3.6vw, 16px);
    font-weight: 750;
    line-height: 1.25;
    letter-spacing: -.015em;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    transition:
      transform .2s ease,
      box-shadow .2s ease,
      filter .2s ease;
  }

  .cc-mobile-bar__button::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, .16),
      transparent 55%
    );
  }

  .cc-mobile-bar__button svg {
    display: block;
    flex: 0 0 auto;
    width: 21px;
    height: 21px;
  }

  .cc-mobile-bar__call {
    background: linear-gradient(
      125deg,
      #744494 0%,
      #5d327e 48%,
      #4b266a 100%
    );

    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, .3),
      0 3px 0 #3b1c56,
      0 7px 16px rgba(75, 38, 106, .16);
  }

  .cc-mobile-bar__whatsapp {
    background: linear-gradient(
      125deg,
      #169e4b 0%,
      #10843e 55%,
      #087735 100%
    );

    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, .35),
      0 3px 0 #065c2a,
      0 7px 18px rgba(22, 158, 75, .22);

    animation: ccMobileWhatsAppPulse 5s ease-in-out infinite;
  }

  .cc-mobile-bar__whatsapp svg {
    width: 23px;
    height: 23px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .1));
  }

  .cc-mobile-bar__button:focus-visible {
    outline: 3px solid #e98568;
    outline-offset: 5px;
  }

  .cc-mobile-bar__button:active {
    animation: none;
    transform: translateY(2px) scale(.98);
    filter: brightness(.96);
  }

  @supports (backdrop-filter: blur(20px)) {
    .cc-mobile-bar {
      background: rgba(255, 252, 249, .88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .cc-mobile-bar__button:hover {
      animation-play-state: paused;
      transform: translateY(-2px);
      filter: brightness(1.06);
    }
  }

  @media (max-width: 359px) {
    .cc-mobile-bar__inner {
      gap: 9px;
    }

    .cc-mobile-bar__button {
      min-height: 50px;
      gap: 7px;
      padding-inline: 9px;
      border-radius: 14px;
      font-size: 13px;
    }

    .cc-mobile-bar__button svg {
      width: 19px;
      height: 19px;
    }

    .cc-mobile-bar__whatsapp svg {
      width: 21px;
      height: 21px;
    }
  }

  @media (min-width: 640px) {
    .cc-mobile-bar {
      display: none;
    }
  }

  @keyframes ccMobileWhatsAppPulse {
    0%, 72%, 100% {
      transform: scale(1);
    }

    80% {
      transform: scale(1.018);
    }

    88% {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-mobile-bar__button {
      animation: none !important;
      transition: none !important;
    }

    .cc-mobile-bar__button:hover,
    .cc-mobile-bar__button:active {
      transform: none;
    }
  }
`;

export default function MobileBar() {
  const ext = (external) =>
    external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <nav
      className="cc-mobile-bar"
      aria-label="Book A Call Or Chat On WhatsApp"
    >
      <style>{mobileBarStyles}</style>

      <div className="cc-mobile-bar__inner">
        <a
          href={bookingHref}
          {...ext(bookingIsExternal)}
          className="cc-mobile-bar__button cc-mobile-bar__call"
        >
          <PhoneIcon />
          <span>Book A Call</span>
        </a>

        <a
          href={chatHref}
          {...ext(chatIsExternal)}
          className="cc-mobile-bar__button cc-mobile-bar__whatsapp"
          aria-label="Chat On WhatsApp"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}