"use client";
import { useScroll, motion, useTransform } from "motion/react";

const TopProgressBar = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useTransform(scrollYProgress, (pos) => (pos <= 0.001 ? 0 : Math.min(1, pos)));

  const opacity = useTransform(scrollYProgress, (pos) => {
    if (pos <= 0.002) return 0;
    if (pos <= 0.02) return (pos - 0.002) / 0.018;
    return 1;
  });

  return (
    <div className='fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none overflow-hidden'>
      <motion.div
        className='w-full h-full bg-gradient-to-r from-[#0ad08e] via-[#03e8f4] to-[#38bdf8]'
        style={{
          scaleX,
          opacity,
          transformOrigin: "0% 50%",
        }}
      />
    </div>
  );
};

export default TopProgressBar;

