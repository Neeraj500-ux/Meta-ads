import { useState } from "react";

export const HERO_VIDEO_ID = "ERZnOLH1J9Y";

export default function VideoEmbed({
  id = HERO_VIDEO_ID,
  src,
  title = "Watch: how a focused Meta Ads campaign works",
  className = "",
}) {
  const [playing, setPlaying] = useState(false);

  const resolvedSrc =
    src ||
    `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div className={`video-frame-fixed ${className}`}>
      <style>{`
        /*
         * Fix the surrounding Hero.jsx frame only when it contains
         * this video. Remove the solid, downward-offset shadow.
         */
        .institute-hero .hero-image-shell:has(.video-frame-fixed) {
          display: block;
          height: auto;
          min-height: 0;
          padding: 9px;
          border: 1px solid rgba(255, 255, 255, .95);
          border-radius: 38px;
          overflow: hidden;
          line-height: 0;
          box-shadow: 0 18px 48px rgba(75, 38, 106, .10);
        }

        .institute-hero .hero-image-shell:has(.video-frame-fixed):hover {
          box-shadow: 0 18px 48px rgba(75, 38, 106, .10);
        }

        .institute-hero .hero-image-shell:has(.video-frame-fixed):focus-within {
          outline: 2px solid #b892cc;
          outline-offset: 3px;
        }

        .institute-hero .hero-image-screen:has(.video-frame-fixed) {
          display: block;
          height: auto;
          min-height: 0;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 28px;
          overflow: hidden;
          background: transparent;
          line-height: 0;
        }

        .video-frame-fixed {
          position: relative;
          isolation: isolate;
          display: block;
          width: 100%;
          min-width: 0;
          height: auto;
          margin: 0 auto;
          padding: 0;
          line-height: 0;
        }

        .video-frame-fixed,
        .video-frame-fixed * {
          box-sizing: border-box;
        }

        /*
         * A real, uniform border provides the dark frame.
         * There is no padding or extra bottom spacer.
         */
        .video-frame-fixed .vf-frame {
          position: relative;
          display: block;
          width: 100%;
          height: auto;
          min-height: 0;
          margin: 0;
          padding: 0;
          border-width: 8px;
          border-style: solid;
          border-radius: 28px;
          overflow: hidden;
          line-height: 0;
        }

        .video-frame-fixed .vf-screen {
          position: relative;
          isolation: isolate;
          display: block;
          width: 100%;
          height: auto;
          min-height: 0;
          aspect-ratio: 16 / 9;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 20px;
          overflow: hidden;
          line-height: 0;
        }

        .video-frame-fixed .vf-trigger,
        .video-frame-fixed .vf-player {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          max-width: none;
          max-height: none;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: inherit;
          vertical-align: top;
          line-height: 0;
        }

        .video-frame-fixed .vf-trigger {
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          color: inherit;
          font-family: inherit;
          text-align: left;
          overflow: hidden;
          cursor: pointer;
          box-shadow: none;
          transform: none;
        }

        .video-frame-fixed .vf-trigger::before,
        .video-frame-fixed .vf-trigger::after {
          content: none;
        }

        .video-frame-fixed .vf-trigger:focus-visible {
          outline: 3px solid white;
          outline-offset: -5px;
        }

        .video-frame-fixed .vf-thumbnail {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          border: 0;
          object-fit: cover;
          object-position: center;
          transition: transform 700ms ease;
        }

        .video-frame-fixed .vf-trigger:hover .vf-thumbnail {
          transform: scale(1.05);
        }

        .video-frame-fixed .vf-center {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          margin: 0;
          padding: 0;
          pointer-events: none;
        }

        .video-frame-fixed .vf-play {
          position: relative;
          display: grid;
          place-items: center;
          width: 96px;
          height: 96px;
          margin: 0;
          padding: 0;
          border-radius: 50%;
          transition: transform 300ms ease;
        }

        .video-frame-fixed .vf-trigger:hover .vf-play {
          transform: scale(1.1);
        }

        .video-frame-fixed .vf-play svg {
          position: relative;
          display: block;
          width: 40px;
          height: 40px;
          margin: 0;
        }

        .video-frame-fixed .vf-pulse {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          animation: vfPulse 2.4s ease-out infinite;
        }

        @keyframes vfPulse {
          0% {
            transform: scale(1);
            opacity: .4;
          }
          75%, 100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @media (max-width: 639px) {
          .institute-hero .hero-image-shell:has(.video-frame-fixed) {
            padding: 5px;
            border-radius: 30px;
          }

          .institute-hero .hero-image-screen:has(.video-frame-fixed) {
            border-radius: 24px;
          }

          .video-frame-fixed .vf-frame {
            border-width: 6px;
            border-radius: 24px;
          }

          .video-frame-fixed .vf-screen {
            border-radius: 18px;
          }

          .video-frame-fixed .vf-play {
            width: 72px;
            height: 72px;
          }

          .video-frame-fixed .vf-play svg {
            width: 32px;
            height: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video-frame-fixed .vf-pulse {
            animation: none;
            opacity: 0;
          }

          .video-frame-fixed .vf-thumbnail,
          .video-frame-fixed .vf-play {
            transition: none;
          }

          .video-frame-fixed .vf-trigger:hover .vf-thumbnail,
          .video-frame-fixed .vf-trigger:hover .vf-play {
            transform: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[34px] bg-gradient-to-br from-sun-400/50 via-coral-500/25 to-plum-500/30 blur-2xl"
      />

      <div className="vf-frame border-plum-900 bg-plum-900">
        <div className="vf-screen bg-plum-800">
          {playing ? (
            <iframe
              className="vf-player"
              src={resolvedSrc}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className="vf-trigger"
              aria-label={`Play video: ${title}`}
              onClick={() => setPlaying(true)}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-plum-800 via-plum-700 to-plum-600"
              />

              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                className="vf-thumbnail opacity-90"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-transparent to-plum-900/20"
              />

              <span aria-hidden="true" className="vf-center">
                <span className="vf-play bg-sun-400 text-plum-800 shadow-[0_12px_30px_-8px_rgba(0,0,0,.5)]">
                  <span className="vf-pulse bg-sun-400" />

                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  >
                    <path d="M8.3 5v14l11-7z" />
                  </svg>
                </span>
              </span>

              <span className="pointer-events-none absolute bottom-3 left-4 right-4 text-sm font-semibold leading-snug text-white drop-shadow sm:bottom-5 sm:left-6 sm:right-6 sm:text-base">
                Watch the video
              </span>
            </button>
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}