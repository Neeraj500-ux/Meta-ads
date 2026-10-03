// Illustrative ad-to-enquiry sketch. Sample layout only - no real results are implied.
export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[560px] sm:h-[380px]" role="img" aria-label="Illustration: a sample Instagram-style course ad on a phone leading to a student enquiry message">
      <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-[40px] bg-gradient-to-br from-plum-100 via-white to-sun-50" />
      <div aria-hidden="true" className="absolute left-4 top-6 h-24 w-24 rounded-full bg-sun-400/50 blur-2xl" />
      <div aria-hidden="true" className="absolute bottom-4 right-6 h-28 w-28 rounded-full bg-coral-500/30 blur-2xl" />

      {/* phone */}
      <div aria-hidden="true" className="absolute left-3 top-0 w-[190px] animate-floaty sm:left-6 rounded-[30px] border-[6px] border-plum-800 bg-white shadow-lift sm:w-[210px]">
        <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-plum-800/80" />
        <div className="flex items-center gap-2 px-3 pt-2.5">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-coral-500 to-sun-400" />
          <span className="h-2 w-16 rounded bg-plum-200" />
          <span className="ml-auto rounded bg-plum-100 px-1.5 py-0.5 text-[8px] font-bold text-plum-700">Sponsored</span>
        </div>
        <div className="mx-3 mt-2.5 overflow-hidden rounded-xl bg-gradient-to-br from-plum-700 to-plum-500">
          <svg viewBox="0 0 180 150" className="block w-full">
            <circle cx="140" cy="30" r="46" fill="#ffd65a" opacity=".9" />
            <path d="M70 40c0-8 6-12 12-12h10c6 0 12 4 12 12l6 28-16 8 6 52H64l6-52-16-8z" fill="#fcf8f3" />
            <path d="M82 28c3 8 17 8 20 0" fill="none" stroke="#f77d54" strokeWidth="3" strokeLinecap="round" />
            <path d="M58 120h68" stroke="#f77d54" strokeWidth="4" strokeLinecap="round" />
            <circle cx="30" cy="110" r="5" fill="#f77d54" />
            <circle cx="40" cy="30" r="3" fill="#ffd65a" />
          </svg>
        </div>
        <div className="space-y-1.5 px-3 pt-2.5">
          <div className="h-2.5 w-4/5 rounded bg-plum-800/85" />
          <div className="h-2 w-full rounded bg-plum-100" />
          <div className="h-2 w-2/3 rounded bg-plum-100" />
        </div>
        <div className="m-3 mt-3 rounded-lg bg-coral-500 py-1.5 text-center text-[10px] font-bold text-white">Learn more</div>
      </div>

      {/* enquiry card */}
      <div className="absolute right-0 top-[16%] w-[150px] animate-floaty rounded-2xl border border-plum-200 bg-white p-3 shadow-lift [animation-delay:-2s] sm:w-[175px]" aria-hidden="true">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25d366]/15 text-[#128c7e]">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 2a8 8 0 0 0-6.9 12L2 18l4.1-1.1A8 8 0 1 0 10 2Zm0 2a6 6 0 1 1-3.2 11l-.3-.2-1.9.5.5-1.8-.2-.3A6 6 0 0 1 10 4Z"/></svg>
          </span>
          <span className="text-[11px] font-bold text-ink">New enquiry</span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-mute">“Please share fees and the next batch date.”</p>
      </div>

      {/* counsellor card */}
      <div className="absolute bottom-4 right-0 w-[150px] animate-floaty rounded-2xl border border-plum-200 bg-white p-3 shadow-lift [animation-delay:-4s] sm:w-[175px]" aria-hidden="true">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sun-200 text-plum-800">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 10.5 3.6 3.6 7.4-8" /></svg>
          </span>
          <span className="text-[11px] font-bold text-ink">Counselling booked</span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-mute">Your team continues the conversation.</p>
      </div>
    </div>
  );
}
