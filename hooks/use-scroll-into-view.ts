import { useRef, useEffect } from "react";
import { useAnimation, Variants } from "framer-motion";

interface UseScrollIntoViewOptions {
  threshold?: number;
  once?: boolean;
}

/**
 * Custom hook untuk trigger animasi Framer Motion saat element masuk viewport
 * @param options - Configuration options
 * @returns Object dengan ref dan controls untuk motion element
 */
export const useScrollIntoView = (
  options: UseScrollIntoViewOptions = {}
) => {
  const { threshold = 0.1, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          controls.start("hidden");
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold, once]);

  return { ref, controls };
};
