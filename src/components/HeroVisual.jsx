import { useState } from "react";

// Illustrative ad-to-enquiry sketch. Sample layout only; no real results implied.
// Keep the image in public/images/ with this exact filename.
const fashionImage = `${import.meta.env.BASE_URL}images/${encodeURIComponent(
  "Collaborative Indian Fashion Design Studio.png",
)}`;

function VisualIcon({ kind, className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      {kind === "message" ? (
        <path d="M21 11.5a8.3 8.3 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.3 8.3 0 0 1-3.8-.9L3 21l1.9-5.7a8.3 8.3 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.3 8.3 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      ) : kind === "check" ? (
        <path d="m5 12 4 4L19 6" />
      ) : kind === "arrow" ? (
        <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>
      ) : kind === "heart" ? (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      ) : kind === "bookmark" ? (
        <path d="M6 3h12v18l-6-4-6 4V3Z" />
      ) : (
        <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.3v5.2c3 2 7 2 10 0v-5.2M21 9v7" /></>
      )}
    </svg>
  );
}

const visualStyles = `
  .hv-visual {
    --hv-plum: #4b2467;
    --hv-ink: #30223e;
    --hv-mute: #776982;
    --hv-coral: #ff7c53;
    position: relative;
    isolation: isolate;
    container-type: inline-size;
    width: 100%;
    max-width: 560px;
    min-width: 0;
    margin: 0 auto;
  }
  .hv-visual, .hv-visual *, .hv-visual *::before,
  .hv-visual *::after { box-sizing: border-box; }
  .hv-visual p { margin: 0; }
  .hv-stage {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr);
    gap: clamp(14px, 5cqw, 30px);
    align-items: start;
    min-height: clamp(360px, 85cqw, 476px);
    padding: clamp(16px, 5cqw, 28px);
    border: 1px solid rgba(255,255,255,.94);
    border-radius: clamp(24px, 6cqw, 34px);
    background: linear-gradient(145deg, #fbf7ff 0%, #fff 56%, #fff8e8 100%);
    box-shadow: inset 0 1px 0 #fff, 0 24px 65px -32px rgba(75,36,103,.26);
  }
  .hv-stage::before, .hv-stage::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(25px);
  }
  .hv-stage::before {
    width: 45%; height: 40%; left: 0; top: 7%;
    background: rgba(231,211,245,.55);
  }
  .hv-stage::after {
    width: 43%; height: 37%; right: 1%; bottom: 3%;
    background: rgba(255,186,123,.27);
  }
  .hv-phone {
    position: relative;
    width: 100%; min-width: 0;
    padding: clamp(7px, 1.8cqw, 11px);
    border: clamp(4px, 1.1cqw, 6px) solid var(--hv-plum);
    border-radius: clamp(25px, 6cqw, 34px);
    background: #fff;
    box-shadow: 0 8px 0 rgba(75,36,103,.07), 0 25px 38px -20px rgba(55,23,76,.42);
    animation: hv-phone-float 7s ease-in-out infinite;
  }
  .hv-speaker {
    width: 29%; height: 5px;
    margin: 0 auto clamp(11px, 3cqw, 17px);
    border-radius: 20px; background: #614778;
  }
  .hv-ad-header { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .hv-avatar {
    flex: 0 0 auto; width: clamp(20px, 5cqw, 28px);
    aspect-ratio: 1; border-radius: 50%;
    background: linear-gradient(135deg, var(--hv-coral), #ffd369);
    box-shadow: inset 0 1px 2px rgba(255,255,255,.7);
  }
  .hv-profile-line { flex: 1; min-width: 8px; height: 6px; border-radius: 6px; background: #e6d5ee; }
  .hv-sponsored {
    flex: 0 0 auto; padding: 4px; border-radius: 5px;
    background: #f2e8f8; color: #69448b;
    font-size: clamp(6px, 1.6cqw, 9px); font-weight: 750; line-height: 1.2;
  }
  .hv-photo {
    position: relative; overflow: hidden;
    width: 100%; aspect-ratio: 1.25;
    margin-top: clamp(10px, 2.6cqw, 15px);
    border-radius: 12px; background: #f1e7f8;
  }
  .hv-photo img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .hv-photo-fallback {
    display: grid; place-content: center; justify-items: center;
    gap: 10px; height: 100%; padding: 12px;
    color: var(--hv-plum); text-align: center;
    background: linear-gradient(135deg, #eee0f8, #fff2d7);
    font-size: clamp(10px, 2.5cqw, 14px); font-weight: 700;
  }
  .hv-photo-fallback svg { width: 30px; height: 30px; }
  .hv-social { display: flex; align-items: center; gap: 8px; padding-top: 9px; color: var(--hv-plum); }
  .hv-social svg { width: clamp(12px, 3cqw, 16px); height: clamp(12px, 3cqw, 16px); }
  .hv-social svg:last-child { margin-left: auto; }
  .hv-copy-lines { display: grid; gap: 6px; padding: 10px 0 12px; }
  .hv-copy-lines span { height: 6px; border-radius: 6px; background: #f0e6f7; }
  .hv-copy-lines span:first-child { width: 80%; height: 8px; background: #5c426c; }
  .hv-copy-lines span:last-child { width: 67%; }
  .hv-learn {
    display: flex; justify-content: center; align-items: center; gap: 7px;
    padding: clamp(8px, 2.2cqw, 12px) 4px;
    border-radius: 10px; background: var(--hv-coral); color: #fff;
    font-size: clamp(9px, 2.4cqw, 13px); font-weight: 750;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 4px 9px rgba(255,124,83,.16);
  }
  .hv-learn svg { width: 14px; height: 14px; }
  .hv-home { width: 32%; height: 3px; margin: 10px auto 0; border-radius: 9px; background: #e7dced; }
  .hv-journey {
    display: flex; flex-direction: column; justify-content: space-between;
    align-self: stretch; min-width: 0;
    padding-top: clamp(32px, 13cqw, 72px);
    padding-bottom: clamp(10px, 4cqw, 22px);
  }
  .hv-card {
    position: relative; width: 100%; min-width: 0;
    padding: clamp(11px, 3cqw, 17px);
    border: 1px solid #e8d5f4;
    border-radius: clamp(16px, 4cqw, 22px);
    background: rgba(255,255,255,.93);
    box-shadow: inset 0 1px 0 #fff, 0 6px 0 rgba(230,212,239,.26), 0 19px 30px -17px rgba(75,36,103,.3);
    animation: hv-card-float 6s ease-in-out infinite;
  }
  @supports (backdrop-filter: blur(18px)) {
    .hv-card { background: rgba(255,255,255,.84); backdrop-filter: blur(18px); }
  }
  .hv-card--enquiry { animation-delay: -2s; }
  .hv-card--booked { animation-delay: -4s; }
  .hv-card-header { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .hv-icon {
    display: grid; place-items: center; flex: 0 0 auto;
    width: clamp(27px, 7cqw, 36px); aspect-ratio: 1;
    border: 1px solid rgba(255,255,255,.95); border-radius: 12px;
    box-shadow: inset 0 1px 1px #fff, 0 3px 0 rgba(75,36,103,.08);
  }
  .hv-icon svg { width: 55%; height: 55%; }
  .hv-icon--green { background: linear-gradient(145deg, #e7fff4, #bff0db); color: #128c7e; }
  .hv-icon--sun { background: linear-gradient(145deg, #fff6cc, #ffe184); color: var(--hv-plum); }
  .hv-card-title {
    display: block; min-width: 0; color: var(--hv-ink);
    font-size: clamp(11px, 2.65cqw, 15px); line-height: 1.3;
    font-weight: 750; overflow-wrap: break-word;
    background: transparent;
  }
  .hv-card p {
    margin-top: 11px; color: var(--hv-mute);
    font-size: clamp(10px, 2.55cqw, 14px);
    line-height: 1.55; overflow-wrap: break-word;
  }
  .hv-connector {
    display: flex; flex: 1; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 6px; min-height: 38px; padding: 10px 0; color: #aa8ab9;
  }
  .hv-connector::before, .hv-connector::after {
    content: ""; width: 1px; height: 13px;
    background: linear-gradient(#e4d4eb, #baa0c8);
  }
  .hv-connector svg { width: 20px; height: 20px; transform: rotate(90deg); }
  @container (max-width: 359px) {
    .hv-stage { gap: 12px; padding: 14px; min-height: 354px; }
    .hv-card-header { flex-direction: column; align-items: flex-start; gap: 9px; }
    .hv-card { padding: 11px; }
    .hv-journey { padding-top: 37px; padding-bottom: 8px; }
  }
  @media (max-width: 639px) {
    .hv-phone { animation-name: hv-mobile-float; }
    .hv-card { animation-name: hv-mobile-float; }
  }
  @keyframes hv-phone-float {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-6px) rotate(.5deg); }
  }
  @keyframes hv-card-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes hv-mobile-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hv-phone, .hv-card { animation: none; }
  }
`;

export default function HeroVisual() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <figure className="hv-visual">
      <style>{visualStyles}</style>
      <div className="hv-stage" role="img"
        aria-label="Sample illustration: a sponsored course ad on a phone, a student asking for fees and the next batch date, and a counselling booking. No real results are implied.">
        <div className="hv-phone" aria-hidden="true">
          <div className="hv-speaker" />
          <div className="hv-ad-header">
            <span className="hv-avatar" />
            <span className="hv-profile-line" />
            <span className="hv-sponsored">Sponsored</span>
          </div>
          <div className="hv-photo">
            {imageFailed ? (
              <div className="hv-photo-fallback">
                <VisualIcon kind="course" />
                <span>Fashion Design Studio</span>
              </div>
            ) : (
              <img src={fashionImage} alt="" width="480" height="384"
                decoding="async" onError={() => setImageFailed(true)} />
            )}
          </div>
          <div className="hv-social">
            <VisualIcon kind="heart" />
            <VisualIcon kind="message" />
            <VisualIcon kind="bookmark" />
          </div>
          <div className="hv-copy-lines"><span /><span /><span /></div>
          {/* Decorative ad CTA, not an interactive button. */}
          <div className="hv-learn">Learn more <VisualIcon kind="arrow" /></div>
          <div className="hv-home" />
        </div>

        <div className="hv-journey" aria-hidden="true">
          <div className="hv-card hv-card--enquiry">
            <div className="hv-card-header">
              <span className="hv-icon hv-icon--green"><VisualIcon kind="message" /></span>
              <span className="hv-card-title">New enquiry</span>
            </div>
            <p>“Please share fees and the next batch date.”</p>
          </div>
          <div className="hv-connector"><VisualIcon kind="arrow" /></div>
          <div className="hv-card hv-card--booked">
            <div className="hv-card-header">
              <span className="hv-icon hv-icon--sun"><VisualIcon kind="check" /></span>
              <span className="hv-card-title">Counselling booked</span>
            </div>
            <p>Your team continues the conversation.</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
