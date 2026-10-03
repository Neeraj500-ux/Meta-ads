import { useEffect, useRef, useState } from "react";

// Reveals an element once it has entered (or been scrolled past) the viewport.
// Position-based, so anchor-link jumps can never leave content hidden.
export function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
        setSeen(true);
        cleanup();
      }
    };
    const onEvent = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    function cleanup() {
      window.removeEventListener("scroll", onEvent);
      window.removeEventListener("resize", onEvent);
      if (raf) cancelAnimationFrame(raf);
    }
    window.addEventListener("scroll", onEvent, { passive: true });
    window.addEventListener("resize", onEvent);
    check();
    return cleanup;
  }, []);

  return [ref, seen];
}
