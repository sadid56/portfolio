"use client";

import Rocket from "@/components/ui/Rocket";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TExperience } from "@/types/experienceTypes";
import React, { useRef } from "react";
import DockText from "../../ui/DockText";
import "./timeline.css";
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
      const fill = progressFillRef.current;
      const rocket = rocketRef.current;

      if (!node || !container || !fill || !rocket) return;

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
        totalDistance = Math.max(0, (node.offsetHeight || 0) - 50);
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
          scrub: 1.2,
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

      tl.to(
        fill,
        {
          scaleY: () => (totalDistance > 0 ? 1 : 0),
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.fromTo(
        rocket,
        { y: 0, opacity: 0, scale: 0.7 },
        {
          y: () => totalDistance,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        rocket,
        {
          opacity: 0,
          scale: 0.65,
          duration: 0.12,
          ease: "power2.inOut",
        },
        0.88,
      );

      tl.to(
        fill,
        {
          opacity: 0,
          duration: 0.12,
          ease: "power2.inOut",
        },
        0.88,
      );

      const onRefreshInit = () => measure();
      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);

      return () => {
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

        <div className="absolute left-5 lg:left-1/2 -translate-x-1/2 top-4 bottom-12 w-[2px] pointer-events-none z-0 mask-[linear-gradient(to_bottom,transparent_0%,black_60px,black_calc(100%_-_60px),transparent_100%)]">
          <div
            ref={progressContainerRef}
            className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-slate-700/40 to-transparent"
          />

          <div
            ref={progressFillRef}
            className="absolute inset-x-0 top-0 h-full w-full origin-top bg-gradient-to-b from-sky-400/20 via-sky-400/50 to-sky-400 rounded-full"
          />
        </div>

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
