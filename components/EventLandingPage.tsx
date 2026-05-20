"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  SLIDE_SECTIONS,
  type SectionId,
  type SlideSectionData,
} from "@/data/sections";
import { SlideSection } from "@/components/SlideSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingNav, MobileNav } from "@/components/FloatingNav";
import { BackToTop } from "@/components/BackToTop";
import { ImageModal } from "@/components/ImageModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PremiumBackground } from "@/components/PremiumBackground";
import { EventIntro } from "@/components/EventIntro";
import { HeroQuickActions } from "@/components/HeroQuickActions";

export function EventLandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [modalSection, setModalSection] = useState<SlideSectionData | null>(
    null,
  );
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const modalIndex = modalSection
    ? SLIDE_SECTIONS.findIndex((section) => section.id === modalSection.id)
    : -1;

  useEffect(() => {
    const minDisplay = window.setTimeout(() => setIsLoading(false), 500);
    let loadTimer: number | undefined;
    const onLoad = () => {
      loadTimer = window.setTimeout(() => setIsLoading(false), 120);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.clearTimeout(minDisplay);
      if (loadTimer !== undefined) window.clearTimeout(loadTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    const sectionElements = SLIDE_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-18% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.55] },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openZoom = useCallback(
    (section: SlideSectionData, trigger?: HTMLElement) => {
      const activeElement = document.activeElement;
      modalTriggerRef.current =
        trigger ?? (activeElement instanceof HTMLElement ? activeElement : null);
      setModalSection(section);
    },
    [],
  );

  const closeZoom = useCallback(() => {
    setModalSection(null);
    window.requestAnimationFrame(() => {
      modalTriggerRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const showAdjacentSlide = useCallback((direction: -1 | 1) => {
    setModalSection((currentSection) => {
      if (!currentSection) return currentSection;

      const currentIndex = SLIDE_SECTIONS.findIndex(
        (section) => section.id === currentSection.id,
      );
      if (currentIndex < 0) return currentSection;

      const nextIndex =
        (currentIndex + direction + SLIDE_SECTIONS.length) %
        SLIDE_SECTIONS.length;
      return SLIDE_SECTIONS[nextIndex];
    });
  }, []);

  const showPreviousSlide = useCallback(() => {
    showAdjacentSlide(-1);
  }, [showAdjacentSlide]);

  const showNextSlide = useCallback(() => {
    showAdjacentSlide(1);
  }, [showAdjacentSlide]);

  return (
    <>
      <PremiumBackground />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <FloatingNav
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
          <MobileNav
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
          <BackToTop />
          <ImageModal
            section={modalSection}
            currentIndex={modalIndex}
            totalSlides={SLIDE_SECTIONS.length}
            isOpen={modalSection !== null}
            onClose={closeZoom}
            onPrevious={showPreviousSlide}
            onNext={showNextSlide}
          />
        </>
      )}

      <main
        className={`relative z-10 min-h-screen pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:pb-6 lg:pr-4 ${
          isLoading ? "overflow-hidden" : ""
        }`}
      >
        <div className="mx-auto w-full">
          <EventIntro onExplore={() => scrollToSection("program")} />

          {SLIDE_SECTIONS.map((section, index) => (
            <div key={section.id} className="relative">
              <SlideSection
                section={section}
                onZoomClick={(trigger) => openZoom(section, trigger)}
              />
              {index === 0 && <HeroQuickActions onNavigate={scrollToSection} />}
            </div>
          ))}
        </div>

        <footer className="slide-column px-3 pt-3 pb-4 text-center text-xs text-pvep-text-muted sm:pb-5">
          <div
            aria-hidden="true"
            className="mb-4 h-px bg-gradient-to-r from-transparent via-teal-200/14 to-transparent"
          />
          <p>PVEP Day 2026 — Khu du lịch Tân Cảng · 23.5.2026</p>
        </footer>
      </main>
    </>
  );
}
