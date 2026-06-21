import { useReducedMotion, useScroll, useTransform } from "motion/react";

export function useParallax(range = 120) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : range]);
}
