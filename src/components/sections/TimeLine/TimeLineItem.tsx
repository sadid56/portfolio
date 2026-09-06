import React, { useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useMobile";
import { TExperience } from "@/types/experienceTypes";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItemProps {
  item: TExperience;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);

  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const fromX = isMobile ? 0 : isEven ? -50 : 50;
    const fromY = 30;

    gsap.set(el, { opacity: 0, x: fromX, y: fromY, willChange: "transform, opacity", force3D: true });

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "transform,willChange",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [isEven, isMobile]);

  return (
    <div
      ref={ref}
      className={`relative lg:flex lg:justify-between z-20 gap-10 pt-20 md:pt-40 ${
        isEven ? "flex-row lg:mr-28 ml-10 lg:ml-0" : "flex-row-reverse ml-10 lg:ml-28"
      }`}
    >
      <div
        className='p-5 md:p-10 w-full lg:w-[50%] relative rounded-3xl
        border border-white/10 bg-slate-800/40 backdrop-blur-xl
        shadow-xl hover:shadow-2xl transition-shadow duration-500 isolate'
      >
        <div className='space-y-4'>
          {/* Header (2 lines) */}
          <div className='space-y-1.5'>
            {/* Line 1: Role */}
            <h3 className='text-xl md:text-2xl font-bold text-white font-montserrat leading-tight'>{item.role}</h3>

            {/* Line 2: Company, Location & Period */}
            <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs md:text-sm text-slate-300'>
              <p>
                {item?.website ? (
                  <Link
                    className='underline text-white font-medium hover:text-sky-300 transition-colors'
                    target='_blank'
                    href={item.website}
                  >
                    {item.company}
                  </Link>
                ) : (
                  <span className='text-white font-medium'>{item.company}</span>
                )}{" "}
                · {item.location}
              </p>
              <span className='text-xs text-slate-300 italic shrink-0'>{item.period}</span>
            </div>
          </div>

          {/* Tech stack */}
          <div className='flex flex-wrap gap-2 pt-1'>
            {item.tech.map((tech) => (
              <span
                key={tech}
                className='text-xs rounded-full bg-slate-800/90
                border border-white/15 px-3 py-1 text-slate-200 font-medium'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul className='pt-3 space-y-2.5 text-sm md:text-[15px] text-slate-200'>
            {item.highlights.map((point, i) => (
              <li key={i} className='flex gap-2.5 text-start items-start'>
                <span className='mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0' />
                <span className='leading-relaxed font-normal'>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
