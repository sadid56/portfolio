"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import BoxReveal from "../../ui/BoxReveal";
import "./timeline.css";
import TimelineItem from "./TimeLineItem";
import DockText from "../../ui/DockText";
import Rocket from "@/components/ui/Rocket";
import { TExperience } from "@/types/experienceTypes";

interface Props {
  data: TExperience[];
}

export const Timeline: React.FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  // Set the height and init GSAP progress
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setHeight(rect.height);

    let cleanup: (() => void) | undefined;
    (async () => {
      if (!containerRef.current || !progressContainerRef.current || !progressFillRef.current) return;
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = (gsapMod as any).gsap || (gsapMod as any).default || (gsapMod as any);
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default || (stMod as any);
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      gsap.set(progressContainerRef.current, { height: rect.height });
      gsap.set(rocketRef.current, { rotation: 180, transformOrigin: "50% 50%", force3D: true });

      const tween = gsap.fromTo(
        progressFillRef.current,
        { height: 0, opacity: 0 },
        {
          height: rect.height,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 90%",
            scrub: true,
            onUpdate: (self: any) => {
              if (rocketRef.current) {
                const targetRotation = self.direction === -1 ? 0 : 180;
                gsap.to(rocketRef.current, {
                  rotation: targetRotation,
                  duration: 0.15,
                  ease: "power2.out",
                  overwrite: "auto",
                  force3D: true,
                });
              }
            },
          },
        }
      );
      cleanup = () => {
        if ((tween as any)?.scrollTrigger) (tween as any).scrollTrigger.kill();
        if (tween && (tween as any).kill) (tween as any).kill();
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className='w-full md:px-10 overflow-hidden z-10' ref={containerRef}>
      {/* Header Section */}
      <div className='px-4 lg:w-1/2 mx-auto text-center'>
        <BoxReveal duration={0.7}>
          <DockText text='My Professional Journey' />
        </BoxReveal>

        <BoxReveal duration={0.8}>
          <p className='max-w-2xl text-sm md:text-lg mt-5 text-slate-400 font-poppins'>
            A snapshot of my hands-on experience working with modern full-stack technologies, solving real problems, and contributing to
            impactful products across teams.
          </p>
        </BoxReveal>
      </div>

      {/* Timeline Section */}
      <div ref={ref} className='relative pb-20'>
        {data.map((item: TExperience, index: number) => (
          <TimelineItem item={item} index={index} key={item.id + index} />
        ))}

        {/* Centered Progress Line */}
        <div
          ref={progressContainerRef}
          style={{ height: height + "px" }}
          className='
    absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 top-0
    overflow-hidden w-[30px]
    bg-linear-to-b from-transparent via-slate-700/20 to-transparent
    mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]
    z-0
  '
        >
          <div ref={progressFillRef} className='absolute inset-x-0 top-0 w-20'>
            {/* Custom Animated Rocket */}
            <div ref={rocketRef} className='w-12 h-12 absolute bottom-0 right-10'>
              <Rocket className='w-full h-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
