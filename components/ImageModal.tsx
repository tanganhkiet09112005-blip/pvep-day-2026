"use client";

import { useCallback, useEffect, useRef, type TouchEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { SlideSectionData } from "@/data/sections";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const SWIPE_THRESHOLD = 48;

type ImageModalProps = {
  section: SlideSectionData | null;
  currentIndex: number;
  totalSlides: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ImageModal({
  section,
  currentIndex,
  totalSlides,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: ImageModalProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const ignoreBackdropClickRef = useRef(false);
  const slideNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

  const focusCloseButton = useCallback(() => {
    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const getFocusableElements = useCallback(() => {
    return Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ??
        [],
    ).filter((element) => {
      const style = window.getComputedStyle(element);
      return (
        element.tabIndex >= 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    });
  }, []);

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touchStart = touchStartRef.current;
      touchStartRef.current = null;
      if (!touchStart) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const isHorizontalSwipe =
        Math.abs(deltaX) >= SWIPE_THRESHOLD &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

      if (!isHorizontalSwipe) return;

      ignoreBackdropClickRef.current = true;
      if (deltaX < 0) {
        onNext();
      } else {
        onPrevious();
      }
    },
    [onNext, onPrevious],
  );

  const handleBackdropClick = useCallback(() => {
    if (ignoreBackdropClickRef.current) {
      ignoreBackdropClickRef.current = false;
      return;
    }

    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    focusCloseButton();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus({ preventScroll: true });
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    focusCloseButton,
    getFocusableElements,
    isOpen,
    onClose,
    onNext,
    onPrevious,
  ]);

  return (
    <AnimatePresence>
      {isOpen && section && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Hình ảnh phóng to PVEP Day 2026"
          aria-describedby="modal-slide-count"
          tabIndex={-1}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020807]/94"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={handleBackdropClick}
            aria-label="Đóng hình ảnh phóng to"
            tabIndex={-1}
          />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Đóng hình ảnh phóng to"
            className="pointer-events-auto absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-pvep-bg-elevated/90 text-pvep-text shadow-[0_12px_34px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-pvep-surface active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            className="pointer-events-none relative z-10 flex max-h-full w-full items-center justify-center px-3 pt-16 pb-[calc(5.25rem_+_env(safe-area-inset-bottom,0px))] sm:px-6"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.975 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="pointer-events-auto">
              <Image
                src={section.imageSrc}
                alt={section.alt}
                width={section.width}
                height={section.height}
                sizes="100vw"
                className="mx-auto h-auto max-h-[calc(100dvh_-_9rem_-_env(safe-area-inset-bottom,0px))] w-auto max-w-full object-contain"
                draggable={false}
                priority
              />
            </div>
          </motion.div>

          <div className="pointer-events-auto absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/12 bg-pvep-bg-elevated/92 p-1.5 shadow-[0_14px_38px_rgba(0,0,0,0.38),0_0_24px_rgba(45,160,130,0.1)] backdrop-blur-md">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Xem slide trước"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-pvep-text transition-all duration-200 hover:scale-[1.04] hover:bg-pvep-surface active:scale-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <p
              id="modal-slide-count"
              className="min-w-14 text-center text-sm font-semibold text-pvep-accent-soft"
              aria-live="polite"
            >
              {slideNumber} / {totalSlides}
            </p>

            <button
              type="button"
              onClick={onNext}
              aria-label="Xem slide tiếp theo"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-pvep-text transition-all duration-200 hover:scale-[1.04] hover:bg-pvep-surface active:scale-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
