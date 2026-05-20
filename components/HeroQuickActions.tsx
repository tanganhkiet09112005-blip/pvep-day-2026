"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/data/sections";

const INFO_ITEMS = ["23.05.2026", "Khu du lịch Tân Cảng", "Khu vực phía Nam"];

const ACTION_ITEMS: { label: string; ariaLabel: string; target: SectionId }[] =
  [
    {
      label: "Chương trình",
      ariaLabel: "Đi tới phần chương trình PVEP Day 2026",
      target: "program",
    },
    {
      label: "Layout",
      ariaLabel: "Đi tới phần layout sự kiện PVEP Day 2026",
      target: "layout",
    },
    {
      label: "Menu",
      ariaLabel: "Đi tới phần menu tiệc PVEP Day 2026",
      target: "menu",
    },
  ];

type ShareState = "idle" | "shared" | "copied";

type HeroQuickActionsProps = {
  onNavigate: (id: SectionId) => void;
};

async function copyCurrentUrl(url: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function HeroQuickActions({ onNavigate }: HeroQuickActionsProps) {
  const [shareState, setShareState] = useState<ShareState>("idle");

  useEffect(() => {
    if (shareState === "idle") return;

    const timer = window.setTimeout(() => setShareState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [shareState]);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: "PVEP Day 2026",
      text: "Ngày hội gia đình PVEP khu vực phía Nam",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareState("shared");
        return;
      }

      await copyCurrentUrl(url);
      setShareState("copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await copyCurrentUrl(url);
        setShareState("copied");
      } catch {
        setShareState("idle");
      }
    }
  };

  const shareLabel =
    shareState === "shared"
      ? "Đã chia sẻ"
      : shareState === "copied"
        ? "Đã sao chép"
        : "Chia sẻ";

  return (
    <section
      aria-label="Thông tin nhanh và thao tác PVEP Day 2026"
      className="slide-column px-2 pt-1 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="overflow-x-auto overscroll-x-contain rounded-full border border-white/10 bg-pvep-bg-elevated/62 px-2 py-2 shadow-[0_12px_34px_rgba(0,0,0,0.24)] backdrop-blur-xl [-webkit-overflow-scrolling:touch]">
        <div className="flex min-w-max items-center gap-2">
          {INFO_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-teal-200/12 bg-white/[0.035] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-pvep-text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-2">
        {ACTION_ITEMS.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => onNavigate(item.target)}
            aria-label={item.ariaLabel}
            className="min-h-[42px] touch-manipulation rounded-xl border border-white/10 bg-pvep-bg-elevated/62 px-2 text-[11px] font-semibold text-pvep-text shadow-[0_10px_26px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-200 hover:border-teal-200/20 hover:bg-pvep-surface/72 active:scale-[0.975] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent sm:text-xs"
          >
            {item.label}
          </button>
        ))}

        <button
          type="button"
          onClick={handleShare}
          aria-label="Chia sẻ đường dẫn PVEP Day 2026"
          className="min-h-[42px] touch-manipulation rounded-xl border border-pvep-accent/24 bg-pvep-accent/12 px-2 text-[11px] font-semibold text-pvep-accent-soft shadow-[0_10px_26px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-200 hover:bg-pvep-accent/18 active:scale-[0.975] focus:outline-none focus-visible:ring-2 focus-visible:ring-pvep-accent sm:text-xs"
        >
          {shareLabel}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {shareState === "shared"
          ? "Đã chia sẻ đường dẫn PVEP Day 2026"
          : shareState === "copied"
            ? "Đã sao chép đường dẫn PVEP Day 2026"
            : ""}
      </p>
    </section>
  );
}
