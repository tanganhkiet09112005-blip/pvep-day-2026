"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LoadingScreen() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Đang tải trang sự kiện"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-pvep-bg"
      initial={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs font-medium tracking-[0.35em] text-pvep-accent uppercase">
          PVEP
        </p>
        <p className="text-2xl font-semibold tracking-tight text-pvep-text sm:text-3xl">
          PVEP Day 2026
        </p>
        <p className="max-w-sm text-sm text-pvep-text-muted">
          Ngày hội gia đình PVEP khu vực phía Nam
        </p>
        <div
          className={`h-10 w-10 rounded-full border-2 border-pvep-border border-t-pvep-accent ${
            reduceMotion ? "" : "animate-spin"
          }`}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
