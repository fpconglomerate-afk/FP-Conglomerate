import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on route changes, unless the URL includes a hash—then we scroll to that element.
 * Retries briefly so lazy-loaded routes (suspended pages) still find `#id` in the DOM.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace(/^#/, "");
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return true;
      }
      return false;
    };

    scrollToTarget();
    const t1 = window.setTimeout(scrollToTarget, 100);
    const t2 = window.setTimeout(scrollToTarget, 350);
    const t3 = window.setTimeout(scrollToTarget, 700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, hash]);

  return null;
}
