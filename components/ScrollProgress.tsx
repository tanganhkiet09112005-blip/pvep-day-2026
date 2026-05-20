"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };

    const updateProgress = () => {
      animationFrameRef.current = null;
      const nextProgress = calculateProgress();
      if (
        Math.abs(nextProgress - progressRef.current) < 0.1 &&
        nextProgress !== 0 &&
        nextProgress !== 100
      ) {
        return;
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[60] h-1 bg-pvep-bg-elevated"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Tiến trình cuộn trang"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-teal-300 via-pvep-accent to-pvep-accent-soft shadow-[0_0_14px_rgba(201,162,39,0.22)]"
        style={{ width: `${progress}%` }}
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.12, ease: "easeOut" }
        }
      />
    </div>
  );
}
