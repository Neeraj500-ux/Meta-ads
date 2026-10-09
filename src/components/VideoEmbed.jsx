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
    <div className={`relative mx-auto w-full ${className}`}>
      <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[34px] bg-gradient-to-br from-sun-400/50 via-coral-500/25 to-plum-500/30 blur-2xl" />
      <div className="overflow-hidden rounded-[24px] border border-plum-200 bg-plum-900 p-1.5 shadow-lift sm:rounded-[28px] sm:p-2">
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-plum-800 sm:rounded-[22px]">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={resolvedSrc}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 grid h-full w-full place-items-center text-left"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-plum-800 via-plum-700 to-plum-600" />
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-transparent to-plum-900/20" />
              <span className="relative grid h-[72px] w-[72px] place-items-center rounded-full bg-sun-400 text-plum-800 shadow-[0_12px_30px_-8px_rgba(0,0,0,.5)] transition duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-sun-400 animate-pulseRing" />
                <svg aria-hidden="true" viewBox="0 0 24 24" className="relative ml-1 h-8 w-8 sm:h-10 sm:w-10" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
              </span>
              <span className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white drop-shadow sm:bottom-5 sm:left-6 sm:text-base">
                Watch the video
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}