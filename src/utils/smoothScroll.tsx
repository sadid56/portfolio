"use client";

import { ScrollTrigger } from "@/lib/gsap";
import Lenis from "lenis";
import React, { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

let lenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => lenisInstance;

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
      autoRaf: true, // Native RAF loop handled by Lenis
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger to eliminate pin snapping
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
