import { bookingHref, bookingIsExternal, chatHref, chatIsExternal } from "../config/site.js";

export default function MobileBar() {
  const ext = (x) => (x ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1.5fr_1fr] gap-2.5 border-t border-plum-200 bg-cream/95 px-4 pt-3 shadow-[0_-10px_30px_-15px_rgba(75,38,106,.35)] backdrop-blur-xl sm:hidden" style={{ paddingBottom: "calc(.75rem + env(safe-area-inset-bottom))" }}>
      <a href={bookingHref} {...ext(bookingIsExternal)} className="btn btn-primary !min-h-[48px] !rounded-xl !px-3 !py-2.5 !text-[13px]">Discuss My Campaign</a>
      <a href={chatHref} {...ext(chatIsExternal)} className="btn btn-sun !min-h-[48px] !rounded-xl !px-3 !py-2.5 !text-[13px]">WhatsApp</a>
    </div>
  );
}
