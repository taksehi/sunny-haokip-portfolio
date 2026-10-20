import { useEffect, useRef } from 'react';

/**
 * Hook to observe a specific DOM element and add 'is-revealed' class when scrolled into view.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true
} = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return elementRef;
}
