"use client";

import { motion, useReducedMotion } from "framer-motion";

type EventIntroProps = {
  onExplore: () => void;
};

export function EventIntro({ onExplore }: EventIntroProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.section
      aria-labelledby="event-intro-title"
      className="slide-column px-2 pt-3 pb-1 sm:px-4 sm:pt-5"
      {...motionProps}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-pvep-bg-elevated/68 px-4 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.28),0_0_32px_rgba(45,160,130,0.08)] backdrop-blur-xl sm:px-5 sm:py-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(73,196,158,0.16),transparent_48%),radial-gradient(ellipse_at_bottom_right,rgba(201,162,39,0.12),transparent_52%)]"
        />
        <div className="relative">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-pvep-accent-soft uppercase">
            PVEP DAY 2026
          </p>
          <h2
            id="event-intro-title"
            className="text-2xl leading-tight font-semibold text-pvep-text sm:text-3xl"
          >
            PVEP Day 2026
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-pvep-text-muted sm:text-base">
            Ngày hội gia đình PVEP khu vực phía Nam
          </p>
          <p className="mt-2 text-xs font-medium tracking-wide text-pvep-accent-soft/90 sm:text-sm">
            23.05.2026 • Khu du lịch Tân Cảng
          </p>
          <button
            type="button"
            onClick={onExplore}
            aria-label="Khám phá chương trình PVEP Day 2026"
            className="mt-4 inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-full border border-pvep-accent/35 bg-pvep-accent/14 px-4 text-sm font-semibold text-pvep-accent-soft shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-pvep-accent/20 hover:shadow-[0_12px_34px_rgba(201,162,39,0.14)] active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent"
          >
            Khám phá chương trình
          </button>
        </div>
      </div>
    </motion.section>
  );
}
