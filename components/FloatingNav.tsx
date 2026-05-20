"use client";

import { useEffect, useRef } from "react";
import { NAV_ITEMS, type SectionId } from "@/data/sections";

type FloatingNavProps = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
};

export function FloatingNav({ activeSection, onNavigate }: FloatingNavProps) {
  return (
    <nav
      aria-label="Điều hướng trang sự kiện"
      className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-white/10 bg-pvep-bg-elevated/58 p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_28px_rgba(45,160,130,0.1)] backdrop-blur-xl lg:flex xl:right-8"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "location" : undefined}
            className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent ${
              isActive
                ? "border border-pvep-accent/40 bg-pvep-surface/92 text-pvep-accent-soft shadow-[0_0_22px_rgba(201,162,39,0.16)]"
                : "border border-transparent text-pvep-text-muted hover:border-teal-300/18 hover:bg-pvep-surface/55 hover:text-pvep-text"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function MobileNav({ activeSection, onNavigate }: FloatingNavProps) {
  const itemRefs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>(
    {},
  );

  useEffect(() => {
    const activeButton = itemRefs.current[activeSection];
    if (!activeButton) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    activeButton.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  return (
    <nav
      aria-label="Điều hướng trang sự kiện"
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-pvep-bg-elevated/88 shadow-[0_-6px_22px_rgba(0,0,0,0.36),0_-1px_20px_rgba(45,160,130,0.08)] backdrop-blur-xl lg:hidden"
      style={{
        paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))",
      }}
    >
      <ul className="flex scroll-px-2 items-center gap-1 overflow-x-auto overscroll-x-contain px-2 py-1.5 [-webkit-overflow-scrolling:touch]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <button
                ref={(button) => {
                  itemRefs.current[item.id] = button;
                }}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`min-h-[44px] min-w-[3.25rem] touch-manipulation rounded-lg px-2.5 py-2 text-center text-[11px] leading-tight font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent sm:min-w-[3.5rem] sm:px-3 sm:text-xs ${
                  isActive
                    ? "bg-pvep-surface text-pvep-accent-soft shadow-[0_0_18px_rgba(201,162,39,0.12)] ring-1 ring-pvep-accent/42"
                    : "text-pvep-text-muted active:bg-pvep-surface/50"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
