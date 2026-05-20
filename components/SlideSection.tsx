"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SectionId, SlideSectionData } from "@/data/sections";

const SLIDE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 760px";

const SLIDE_FRAME =
  "slide-frame relative w-full overflow-hidden rounded-sm touch-manipulation";

const SECTION_CHROME: Record<
  SectionId,
  {
    labelClassName: string;
    glow: string;
  }
> = {
  home: {
    labelClassName: "border-pvep-accent/30 text-pvep-accent-soft",
    glow:
      "radial-gradient(ellipse at 50% 12%, rgba(64, 198, 163, 0.16), transparent 48%), radial-gradient(ellipse at 50% 88%, rgba(201, 162, 39, 0.11), transparent 54%)",
  },
  program: {
    labelClassName: "border-teal-300/25 text-teal-100",
    glow:
      "linear-gradient(180deg, rgba(14, 64, 43, 0.18), rgba(7, 26, 18, 0.1) 48%, rgba(34, 144, 118, 0.1))",
  },
  activities: {
    labelClassName: "border-pvep-accent/25 text-pvep-accent-soft",
    glow:
      "radial-gradient(ellipse at 46% 40%, rgba(55, 160, 118, 0.14), transparent 56%), linear-gradient(180deg, rgba(201, 162, 39, 0.055), transparent 62%)",
  },
  "team-building": {
    labelClassName: "border-emerald-300/25 text-emerald-100",
    glow:
      "radial-gradient(ellipse at 50% 48%, rgba(35, 190, 140, 0.15), transparent 58%), linear-gradient(180deg, transparent, rgba(48, 130, 79, 0.11))",
  },
  layout: {
    labelClassName: "border-cyan-200/25 text-cyan-100",
    glow:
      "radial-gradient(ellipse at 50% 45%, rgba(54, 159, 176, 0.13), transparent 56%), linear-gradient(180deg, rgba(7, 26, 18, 0), rgba(22, 75, 72, 0.12))",
  },
  menu: {
    labelClassName: "border-pvep-accent/30 text-pvep-accent-soft",
    glow:
      "radial-gradient(ellipse at 50% 40%, rgba(201, 162, 39, 0.12), transparent 56%), linear-gradient(180deg, rgba(7, 26, 18, 0), rgba(13, 52, 34, 0.18))",
  },
};

type SlideSectionProps = {
  section: SlideSectionData;
  onZoomClick: (trigger: HTMLButtonElement) => void;
};

export function SlideSection({ section, onZoomClick }: SlideSectionProps) {
  const reduceMotion = useReducedMotion();
  const HeadingTag = section.headingLevel === 1 ? "h1" : "h2";
  const chrome = SECTION_CHROME[section.id];

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20, scale: 0.99 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.12, margin: "0px 0px -6% 0px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="relative isolate scroll-mt-20 overflow-hidden px-2 py-2.5 sm:px-4 sm:py-3.5 md:py-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-95"
        style={{ background: chrome.glow }}
      />
      {section.id !== "home" && (
        <div
          aria-hidden="true"
          className="slide-column mb-2 h-px bg-gradient-to-r from-transparent via-teal-200/16 to-transparent"
        />
      )}

      <div className="slide-column">
        <HeadingTag id={`${section.id}-heading`} className="sr-only">
          {section.heading}
        </HeadingTag>

        <motion.div className="w-full" {...motionProps}>
          <div className="mb-2 flex items-center gap-2 px-0.5">
            <span
              className={`inline-flex rounded-full border bg-pvep-bg-elevated/58 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_22px_rgba(0,0,0,0.2)] backdrop-blur-md ${chrome.labelClassName}`}
            >
              {section.sectionLabel}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-teal-200/18 via-pvep-accent/12 to-transparent"
            />
          </div>

          <button
            type="button"
            onClick={(event) => onZoomClick(event.currentTarget)}
            className={`group w-full ${SLIDE_FRAME} cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent focus-visible:ring-offset-2 focus-visible:ring-offset-pvep-bg`}
            aria-haspopup="dialog"
            aria-label={`Phóng to slide PVEP Day 2026: ${section.heading}`}
          >
            <div className="relative w-full">
              <Image
                src={section.imageSrc}
                alt={section.alt}
                width={section.width}
                height={section.height}
                priority={section.priority}
                loading={section.priority ? undefined : "lazy"}
                sizes={SLIDE_SIZES}
                className="h-auto w-full object-contain"
                draggable={false}
              />
            </div>
          </button>

          <p
            className="mt-1.5 text-center text-[10px] font-medium tracking-wide text-pvep-text-muted/72 lg:hidden"
            aria-hidden="true"
          >
            Chạm để xem rõ hơn
          </p>
          <p
            className="mt-1.5 hidden text-center text-[11px] font-medium tracking-wide text-pvep-text-muted/60 lg:block"
            aria-hidden="true"
          >
            Nhấn để xem lớn
          </p>
        </motion.div>
      </div>
    </section>
  );
}
