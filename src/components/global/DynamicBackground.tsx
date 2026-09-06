"use client";
import { useScroll, useTransform, motion } from "motion/react";

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.7, 0.8, 1],
    ["#010610", "#010610", "#010610", "#010610", "#090946", "#010610"]
  );

  return (
    <div className='relative w-full min-h-screen bg-[#010610]'>
      <motion.div
        className='fixed inset-0 pointer-events-none -z-50 will-change-transform'
        style={{ backgroundColor }}
      />
      {children}
    </div>
  );
}
