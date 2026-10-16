"use client";
import BaseCard from "@/components/ui/BaseCard";
import TechBadge from "@/components/ui/TechBadge";
import useIsMobile from "@/hooks/useMobile";
import { gsap, useGSAP } from "@/lib/gsap";
import { TExperience } from "@/types/experienceTypes";
import Link from "next/link";
import React, { useRef } from "react";

interface TimelineItemProps {
  item: TExperience;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobileNow = useIsMobile();
  const isEven = index % 2 === 0;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const fromX = isMobileNow ? 0 : isEven ? -50 : 50;

      const scrollParent =
        (el.parentElement?.closest(
          "[data-scroll-parent]",
        ) as HTMLElement | null) ??
        (el.parentElement?.closest(".overflow-y-auto") as HTMLElement | null) ??
        undefined;

      gsap.set(el, {
        opacity: 0,
        x: fromX,
        y: 30,
        willChange: "transform, opacity",
      });

      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: el,
          scroller: scrollParent,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [isMobileNow] },
  );

  return (
    <div
      ref={ref}
      className={`relative lg:flex lg:justify-between z-20 gap-8 pt-16 md:pt-32 ${
        isEven
          ? "flex-row lg:mr-20 ml-10 lg:ml-0"
          : "flex-row-reverse ml-10 lg:ml-20"
      }`}
    >
      <div className="w-full lg:w-[48%] relative">
        <BaseCard variant="gradient">
          <div className="relative z-10 flex flex-1 flex-col p-5 md:p-7 space-y-4">
            {/* Header: Role, Company & Minimal Italic Period */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-montserrat text-xl font-bold leading-tight text-white md:text-2xl">
                  {item.role}
                </h3>
                <p className="flex flex-wrap items-center gap-1.5 font-poppins text-xs md:text-sm text-slate-300">
                  {item.website ? (
                    <Link
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-sky-300 hover:decoration-sky-300"
                    >
                      {item.company}
                    </Link>
                  ) : (
                    <span className="font-medium text-white">{item.company}</span>
                  )}
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{item.location}</span>
                </p>
              </div>

              {/* Minimal Italic Period */}
              <span className="text-xs text-slate-400 italic shrink-0 pt-1 font-poppins">
                {item.period}
              </span>
            </div>

            {/* Highlights */}
            <ul className="space-y-2.5 pt-1 font-poppins text-xs md:text-sm leading-relaxed text-slate-300">
              {item.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Reusable Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1 md:gap-2">
              {item.tech.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default TimelineItem;
