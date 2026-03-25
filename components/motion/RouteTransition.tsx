"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";

const PAGE_TRANSITION = {
  distance: 8,
  duration: 0.36,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = `${pathname}?${searchParams.toString()}`;
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: PAGE_TRANSITION.distance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -PAGE_TRANSITION.distance },
      };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={key}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{
            duration: PAGE_TRANSITION.duration,
            ease: PAGE_TRANSITION.ease,
          }}
          style={{ width: "100%" }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
