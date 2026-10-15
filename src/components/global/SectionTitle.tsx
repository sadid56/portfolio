"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "@/styles/section-title.module.css";
import { useRef } from "react";

interface SectionTitleProps {
  color: string;
  text: string;
  lineBreak?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  color,
  text,
  lineBreak = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !headingRef.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40, willChange: "transform, opacity" },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
            onEnter: () => {
              headingRef.current?.classList.add(styles.animation);
              gsap.set(ref.current, { willChange: "auto" });
            },
          },
        },
      );
    },
    { scope: ref, dependencies: [color, text] },
  );

  return (
    <div ref={ref} className="relative">
      <h2
        ref={headingRef}
        className={`flex ${lineBreak ? "flex-col" : ""} gap-2 text-3xl md:text-5xl font-semibold font-montserrat bg-gradient-to-r from-white/50 via-slate-300 to-slate-600 bg-clip-text text-transparent`}
      >
        <span>{color}</span>
        <span className="text-slate-300">{text}</span>
      </h2>
    </div>
  );
};

export default SectionTitle;
