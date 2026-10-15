"use client";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef, useState } from "react";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const letters = container.querySelectorAll(".flip-letter");
      if (!letters.length) return;

      gsap.fromTo(
        letters,
        { opacity: 0, y: 12, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.025,
          duration: 0.35,
          ease: "back.out(1.7)",
          clearProps: "transform",
        },
      );

      const timeout = setTimeout(() => {
        const currentLetters =
          containerRef.current?.querySelectorAll(".flip-letter");
        if (currentLetters && currentLetters.length > 0) {
          gsap.to(currentLetters, {
            opacity: 0,
            y: -14,
            scale: 0.92,
            stagger: 0.015,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              setIndex((prev) => (prev + 1) % words.length);
            },
          });
        } else {
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, duration);

      return () => clearTimeout(timeout);
    },
    { dependencies: [index, duration, words.length], scope: containerRef },
  );

  const currentWord = words[index] || words[0];

  return (
    <span
      ref={containerRef}
      className={cn(
        "z-10 inline-block relative text-center text-white font-bold font-montserrat px-1",
        className,
      )}
    >
      {currentWord.split(" ").map((word, wordIndex) => (
        <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, letterIndex) => (
            <span
              key={`l-${wordIndex}-${letterIndex}`}
              className="flip-letter inline-block"
            >
              {letter}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};
