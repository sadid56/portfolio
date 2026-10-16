"use client";

import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
      ignoreMobileResize: true,
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="w-full">
      <div id="smooth-content" className="w-full">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
