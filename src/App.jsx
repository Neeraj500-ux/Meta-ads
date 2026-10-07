import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { Intro, Approach, Problems, Solution } from "./components/Sections1.jsx";
import { Audience, Process, Results, Testimonials, WhyChoose } from "./components/Sections2.jsx";
import { Consultation, Faq } from "./components/Sections3.jsx";
import EnquiryForm from "./components/EnquiryForm.jsx";
import Footer from "./components/Footer.jsx";
import MobileBar from "./components/MobileBar.jsx";

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!enquiryOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector("button, input, select, textarea, a[href]")
      ?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [enquiryOpen]);

  const openEnquiry = (event) => {
    const trigger = event.target.closest("[data-enquiry-popup-trigger]");
    if (!trigger) return;

    event.preventDefault();
    triggerRef.current = trigger;
    setEnquiryOpen(true);
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      setEnquiryOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll(
        "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex='-1'])"
      )
    );
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div id="top" onClickCapture={openEnquiry}>
      <a href="#main" className="sr-only z-[60] rounded-lg bg-plum-800 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      {/* <Header /> */}
      <main id="main">
        <Hero />
        <Intro />
        <Approach />
        <Problems />
        <Solution />
        <Audience />
        <Process />
        <Results />
        <Testimonials />
        <WhyChoose />
        <Consultation />
        <Faq />
        {/* <EnquiryForm /> */}
      </main>
      <Footer />
      <MobileBar />
      {enquiryOpen && (
        <div
          className="fixed inset-0 z-[110] grid place-items-center bg-[#1d0a38]/65 p-2 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEnquiryOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Student enquiry form"
            className="relative max-h-full w-full max-w-[1180px] overflow-y-auto rounded-[24px] bg-[#fcf9fe] shadow-2xl sm:rounded-[30px]"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="sticky top-0 z-20 flex justify-end px-4 pt-4">
              <button
                type="button"
                aria-label="Close enquiry form"
                onClick={() => setEnquiryOpen(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-plum-200 bg-white text-2xl leading-none text-plum-800 shadow-soft"
              >
                &times;
              </button>
            </div>
            <EnquiryForm />
          </div>
        </div>
      )}
    </div>
  );
}
