"use client";

import Rocket from "@/components/ui/Rocket";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TExperience } from "@/types/experienceTypes";
import React, { useRef } from "react";
import DockText from "../../ui/DockText";
import TimelineItem from "./TimeLineItem";

interface Props {
  data: TExperience[];
}

export const Timeline: React.FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      const container = containerRef.current;
      const progressTrack = progressContainerRef.current;
      const fill = progressFillRef.current;
      const rocket = rocketRef.current;

      if (!node || !container || !fill || !rocket || !progressTrack) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) {
        gsap.set([fill, rocket], { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(rocket, { transformOrigin: "50% 50%", rotation: 180 });
      gsap.set(fill, { transformOrigin: "top center", scaleY: 0 });

      const scrollParent =
        (container.closest("[data-scroll-parent]") as HTMLElement | null) ??
        (container.closest(".overflow-y-auto") as HTMLElement | null) ??
        undefined;

      const isNested = Boolean(scrollParent);
      let totalDistance = 0;

      const measure = () => {
        totalDistance = Math.max(0, (node.offsetHeight || 0) - 80);
        progressTrack.style.height = `${totalDistance}px`;
      };
      measure();

      const rocketRotateTo = gsap.quickTo(rocket, "rotation", {
        duration: 0.2,
        ease: "power2.out",
      });

      let lastDirection = 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          scroller: scrollParent,
          start: isNested ? "top 40%" : "top 35%",
          end: isNested ? "bottom 60%" : "bottom 65%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.direction !== lastDirection) {
              lastDirection = self.direction;
              rocketRotateTo(self.direction === -1 ? 0 : 180);
            }
          },
          onToggle: (self) => {
            rocket.style.willChange = self.isActive ? "transform" : "auto";
          },
        },
      });

      // Synchronize fill scale and rocket translation 1:1 with ease "none"
      tl.to(
        fill,
        {
          scaleY: 1,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        rocket,
        {
          y: () => totalDistance,
          duration: 1,
          ease: "none",
        },
        0,
      );

      // Fade-in at start (0 to 5%) - Never animate 'scale' on fill to prevent overriding scaleY
      tl.fromTo(
        rocket,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.05, ease: "power1.out" },
        0,
      );
      tl.fromTo(
        fill,
        { opacity: 0 },
        { opacity: 1, duration: 0.05, ease: "power1.out" },
        0,
      );

      // Clean fade-out at end (95 to 100%)
      tl.to(
        rocket,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.05,
          ease: "power1.in",
        },
        0.95,
      );
      tl.to(
        fill,
        {
          opacity: 0,
          duration: 0.05,
          ease: "power1.in",
        },
        0.95,
      );

      const onRefreshInit = () => measure();
      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      const timer = setTimeout(() => {
        measure();
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      };
    },
    { scope: containerRef, dependencies: [data] },
  );

  return (
    <div className="w-full md:px-10 overflow-hidden z-10" ref={containerRef}>
      <div className="px-4 lg:w-1/2 mx-auto text-center">
        <DockText text="My Professional Journey" />
        <p className="max-w-2xl text-sm md:text-lg mt-5 text-slate-400 font-poppins">
          A snapshot of my hands-on experience working with modern full-stack
          technologies, solving real problems, and contributing to impactful
          products across teams.
        </p>
      </div>

      <div ref={ref} className="relative pb-24 md:pb-32 pt-6 md:pt-8 mt-4">
        {data.map((item: TExperience, index: number) => (
          <TimelineItem item={item} index={index} key={item.id + index} />
        ))}

        {/* Unified track container sharing the exact height as rocket travel distance */}
        <div
          ref={progressContainerRef}
          className="absolute left-5 lg:left-1/2 -translate-x-1/2 top-4 w-0.5 pointer-events-none z-0"
        >
          {/* Background track line */}
          <div className="absolute inset-0 w-full bg-linear-to-b from-transparent via-slate-700/40 to-transparent" />

          {/* Active progress line locked 1:1 with rocket */}
          <div
            ref={progressFillRef}
            className="absolute inset-x-0 top-0 h-full w-full origin-top bg-linear-to-b from-slate-600/20 via-slate-500/50 to-slate-400 rounded-full"
          />
        </div>

        {/* Rocket element */}
        <div
          ref={rocketRef}
          className="absolute left-5 lg:left-1/2 -translate-x-1/2 top-4 w-12 h-12 z-20 pointer-events-none -mt-6"
        >
          <Rocket className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
