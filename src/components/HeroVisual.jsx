// Illustrative ad-to-enquiry sketch. Sample layout only - no real results are implied.
const fashionImage = `${import.meta.env.BASE_URL}images/${encodeURIComponent(
  "Collaborative Indian Fashion Design Studio.png",
)}`;

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[560px] sm:h-[380px]" role="img" aria-label="Illustration: a sample Instagram-style course ad on a phone leading to a student enquiry message">
      <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-[40px] bg-gradient-to-br from-plum-100 via-white to-sun-50" />
      <div aria-hidden="true" className="absolute left-4 top-6 h-24 w-24 rounded-full bg-sun-400/50 blur-2xl" />
      <div aria-hidden="true" className="absolute bottom-4 right-6 h-28 w-28 rounded-full bg-coral-500/30 blur-2xl" />

      {/* phone */}
      <div aria-hidden="true" className="absolute left-0 top-0 w-[54%] max-w-[190px] animate-floaty rounded-[24px] border-4 border-plum-800 bg-white shadow-lift sm:left-3 sm:w-[190px] sm:max-w-none sm:rounded-[30px] sm:border-[6px]">
        <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-plum-800/80" />
        <div className="flex min-w-0 items-center gap-1.5 px-2 pt-2.5 sm:gap-2 sm:px-3">
          <span className="h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-coral-500 to-sun-400 sm:h-6 sm:w-6" />
          <span className="h-2 min-w-0 w-16 rounded bg-plum-200" />
          <span className="ml-auto rounded bg-plum-100 px-1 py-0.5 text-[7px] font-bold text-plum-700 sm:px-1.5 sm:text-[8px]">Sponsored</span>
        </div>
        <div className="mx-3 mt-2.5 overflow-hidden rounded-xl bg-gradient-to-br from-plum-700 to-plum-500">
          <img src={fashionImage} alt="" width="480" height="320" className="block h-[96px] w-full object-cover sm:h-[118px]" />
        </div>
        <div className="space-y-1.5 px-2 pt-2.5 sm:px-3">
          <div className="h-2.5 w-4/5 rounded bg-plum-800/85" />
          <div className="h-2 w-full rounded bg-plum-100" />
          <div className="h-2 w-2/3 rounded bg-plum-100" />
        </div>
        <div className="m-2 mt-3 rounded-lg bg-coral-500 py-1.5 text-center text-[9px] font-bold text-white sm:m-3 sm:text-[10px]">Learn more</div>
      </div>

      {/* enquiry card */}
      <div className="absolute right-0 top-[16%] w-[44%] max-w-[150px] animate-floaty rounded-2xl border border-plum-200 bg-white p-2 shadow-lift [animation-delay:-2s] sm:w-[160px] sm:max-w-none sm:p-3" aria-hidden="true">
        <div className="flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#25d366]/15 text-[#128c7e] sm:h-7 sm:w-7">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor"><path d="M10 2a8 8 0 0 0-6.9 12L2 18l4.1-1.1A8 8 0 1 0 10 2Zm0 2a6 6 0 1 1-3.2 11l-.3-.2-1.9.5.5-1.8-.2-.3A6 6 0 0 1 10 4Z"/></svg>
          </span>
          <span className="min-w-0 text-[10px] font-bold leading-tight text-ink sm:text-[11px]">New enquiry</span>
        </div>
        <p className="mt-2 text-[10px] leading-snug text-mute sm:text-[11px]">“Please share fees and the next batch date.”</p>
      </div>

      {/* counsellor card */}
      <div className="absolute bottom-4 right-0 w-[44%] max-w-[150px] animate-floaty rounded-2xl border border-plum-200 bg-white p-2 shadow-lift [animation-delay:-4s] sm:w-[160px] sm:max-w-none sm:p-3" aria-hidden="true">
        <div className="flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-200 text-plum-800 sm:h-7 sm:w-7">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 10.5 3.6 3.6 7.4-8" /></svg>
          </span>
          <span className="min-w-0 text-[10px] font-bold leading-tight text-ink sm:text-[11px]">Counselling booked</span>
        </div>
        <p className="mt-2 text-[10px] leading-snug text-mute sm:text-[11px]">Your team continues the conversation.</p>
      </div>
    </div>
  );
}
