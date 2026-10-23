"use client";

import Container from "@/components/global/Container";
import { IconBrandLinux } from "@/components/icons";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconBrandNextjs, IconBrandTypescript } from "@tabler/icons-react";
import Image from "next/image";
import { useRef } from "react";
import Experience from "../Experience/Experience";

const EASE_IN_OUT = "power2.inOut";
const EASE_OUT = "power2.out";
const EASE_IN = "power2.in";

const D_PATH =
  "M 0 0 C 18 0, 36 0, 48 0 C 76 0, 98 22, 98 50 C 98 78, 76 100, 48 100 C 36 100, 18 100, 0 100 C 0 66, 0 33, 0 0 Z M 31 25 C 36 25, 42 25, 46 25 C 57 25, 64 35, 64 50 C 64 65, 57 75, 46 75 C 42 75, 36 75, 31 75 C 31 60, 31 40, 31 25 Z";

const O_PATH =
  "M 2 50 C 2 23.5, 23.5 2, 50 2 C 76.5 2, 98 23.5, 98 50 C 98 76.5, 76.5 98, 50 98 C 23.5 98, 2 76.5, 2 50 C 2 50, 2 50, 2 50 Z M 24 50 C 24 35.6, 35.6 24, 50 24 C 64.4 24, 76 35.6, 76 50 C 76 64.4, 64.4 76, 50 76 C 35.6 76, 24 64.4, 24 50 C 24 50, 24 50, 24 50 Z";

const PORTRAIT_URL = "/sadid.webp";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const dLetterRef = useRef<HTMLSpanElement>(null);
  const experienceContentRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });

      const mm = gsap.matchMedia();

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        const reveal = revealRef.current;
        const expContent = experienceContentRef.current;
        if (reveal) gsap.set(reveal, { clearProps: "clipPath" });
        if (expContent)
          gsap.set(expContent, { clearProps: "transform,opacity,willChange" });
        return () => {
          mm.revert();
        };
      }

      mm.add("(min-width: 1024px)", () => {
        const container = containerRef.current;
        if (!container) return;

        const blurTargets = container.querySelectorAll(".blur-target");
        const letters = Array.from(
          nameRef.current?.querySelectorAll(".hero-letter") ?? [],
        );
        const leftLetters = letters.slice(0, 2);
        const rightLetters = letters.slice(2, 4);
        const dLetter = dLetterRef.current;
        const description = container.querySelector(".GradualSpacing");
        const reveal = revealRef.current;
        const expContent = experienceContentRef.current;
        const dPath = container.querySelector<SVGPathElement>("#dLetterPath");

        const otherContentTargets: Element[] = Array.from(blurTargets);
        if (portraitRef.current) otherContentTargets.push(portraitRef.current);

        if (dPath) gsap.set(dPath, { attr: { d: D_PATH } });

        if (reveal) {
          gsap.set(reveal, {
            clipPath: "circle(0% at 50% 50%)",
            scrollTop: 0,
            willChange: "clip-path",
          });
        }

        if (expContent) {
          gsap.set(expContent, {
            scale: 0.78,
            y: 150,
            opacity: 0,
            transformOrigin: "center top",
            willChange: "transform, opacity",
          });
        }

        if (dLetter) {
          gsap.set(dLetter, {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            transformOrigin: "50% 50%",
            willChange: "transform, opacity",
          });
        }

        if (letters.length) {
          gsap.set(letters, { opacity: 1, x: 0, scale: 1 });
        }
        if (otherContentTargets.length) {
          gsap.set(otherContentTargets, { opacity: 1, scale: 1, y: 0 });
        }

        const tl = gsap.timeline({
          defaults: { ease: EASE_OUT },
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=170%",
            scrub: 0.75,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          otherContentTargets,
          {
            opacity: 0,
            scale: 0.92,
            y: -20,
            duration: 0.35,
            stagger: 0.01,
            pointerEvents: "none",
          },
          0,
        );

        if (description) {
          tl.to(description, { y: 40, opacity: 0, duration: 0.3 }, 0);
        }

        tl.to(
          leftLetters,
          {
            x: -250,
            opacity: 0,
            scale: 0.8,
            duration: 0.45,
            ease: EASE_IN_OUT,
          },
          0,
        );
        tl.to(
          rightLetters,
          {
            x: 250,
            opacity: 0,
            scale: 0.8,
            duration: 0.45,
            ease: EASE_IN_OUT,
          },
          0,
        );

        tl.to(
          dLetter,
          {
            x: () => {
              if (!dLetter) return 0;
              const r = dLetter.getBoundingClientRect();
              return window.innerWidth / 2 - (r.left + r.width / 2);
            },
            y: () => {
              if (!dLetter) return 0;
              const r = dLetter.getBoundingClientRect();
              return window.innerHeight / 2 - (r.top + r.height / 2);
            },
            duration: 0.45,
            ease: EASE_IN_OUT,
          },
          0,
        );

        if (dPath) {
          tl.to(
            dPath,
            {
              attr: { d: O_PATH },
              duration: 0.3,
              ease: EASE_IN_OUT,
            },
            0.15,
          );
        }

        tl.to(dLetter, { scale: 24, ease: EASE_IN, duration: 0.5 }, 0.3);

        if (reveal) {
          tl.to(
            reveal,
            {
              clipPath: "circle(120% at 50% 50%)",
              ease: EASE_IN_OUT,
              duration: 0.55,
            },
            0.35,
          );
        }

        if (expContent) {
          tl.to(
            expContent,
            {
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: EASE_OUT,
            },
            0.35,
          );
        }

        tl.to(dLetter, { opacity: 0, duration: 0.25 }, 0.55);

        if (reveal) {
          tl.to(
            reveal,
            {
              scrollTop: () => {
                const el = revealRef.current;
                if (!el) return 0;
                return Math.max(0, el.scrollHeight - el.clientHeight);
              },
              ease: "none",
              duration: 0.55,
            },
            0.6,
          );
        }

        const floatingIcons = Array.from(
          container.querySelectorAll(".floating-icon"),
        );
        const iconTweens = floatingIcons.map((el, idx) =>
          gsap.to(el, {
            y: "+=18",
            rotate: idx % 2 === 0 ? 6 : -6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 3 + (idx % 3) * 0.6,
          }),
        );

        return () => {
          iconTweens.forEach((t) => t.kill());
          const targets = [dLetter, expContent, reveal].filter(
            Boolean,
          ) as Element[];
          if (targets.length) gsap.set(targets, { willChange: "auto" });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const reveal = revealRef.current;
        const expContent = experienceContentRef.current;

        if (reveal) gsap.set(reveal, { clearProps: "clipPath,scrollTop" });
        if (expContent)
          gsap.set(expContent, { clearProps: "transform,opacity,willChange" });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-0 z-20 blur-target"
      >
        <IconBrandLinux className="floating-icon absolute top-[18%] right-[28%] w-9 h-9 text-slate-200/70 drop-shadow-[0_0_10px_rgba(203,213,225,0.25)]" />
        <IconBrandNextjs className="floating-icon absolute bottom-28 left-[35%] w-10 h-10 text-slate-200/70" />
        <IconBrandTypescript className="floating-icon absolute top-[18%] md:top-[22%] right-[5%] w-9 h-9 text-blue-300/70" />
      </div>

      <div
        className="absolute hidden lg:block inset-0 z-0 blur-target"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-linear-to-br from-cyan-300/8 via-blue-400/6 to-transparent rounded-full blur-3xl float-slow" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 blur-target bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_70%_60%_at_20%_50%,black_30%,transparent_100%)]"
      />

      <div
        ref={portraitRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Mobile Portrait Overlay: Centered, smooth bottom fade behind SADID text */}
        <div
          className="block md:hidden absolute left-1/2 -translate-x-1/2 bottom-[26%] sm:bottom-[28%] w-[92vw] max-w-105 aspect-square opacity-25 pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 62% at 50% 40%, black 30%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0.2) 75%, transparent 92%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 62% at 50% 40%, black 30%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0.2) 75%, transparent 92%)",
            filter: "grayscale(100%) brightness(1.4) contrast(1.1)",
          }}
        >
          <Image
            src={PORTRAIT_URL}
            alt="Sadid - Creative Full-Stack Web Developer"
            title="Sadid"
            priority
            fetchPriority="high"
            width={420}
            height={420}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Desktop Portrait Overlay */}
        <div
          className="hidden md:block absolute md:right-[35%] lg:right-[38%] 2xl:right-[42%] md:bottom-[-10%] w-full max-w-212.5 lg:max-w-250 2xl:max-w-300 h-[120%] max-h-212.5 lg:max-h-237.5 2xl:max-h-262.5 opacity-20 md:opacity-15 lg:opacity-13 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 20%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 100%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            filter: "grayscale(100%) brightness(1.5) contrast(1.1)",
          }}
        >
          <Image
            src={PORTRAIT_URL}
            alt="Sadid - Creative Full-Stack Web Developer"
            title="Sadid"
            priority
            fetchPriority="high"
            width={600}
            height={600}
            className="w-full h-full object-contain object-bottom-right pointer-events-none"
          />
        </div>
      </div>

      <Container className="relative z-30 pb-10 md:pb-10 lg:pb-12 pr-6 md:pr-12 lg:pr-20 2xl:pr-28 w-full max-w-350 2xl:max-w-462.5 3xl:max-w-550 h-full flex flex-col justify-end items-end text-right">
        <div ref={nameRef} className="mb-3 md:mb-4">
          <h1
            aria-label="Sadid"
            className="text-[70px] sm:text-[80px] leading-[90%] md:text-[130px] lg:text-[150px] xl:text-[210px] font-montserrat uppercase font-black select-none flex items-center justify-end"
          >
            <span className="hero-letter inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent cursor-default">
              S
            </span>
            <span className="hero-letter inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent cursor-default">
              A
            </span>

            <span
              ref={dLetterRef}
              className="inline-flex items-center justify-center mx-1 align-baseline cursor-default relative"
              style={{
                width: "0.76em",
                height: "0.71em",
                verticalAlign: "0.015em",
                transformOrigin: "50% 50%",
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="dMorphGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                </defs>
                <path
                  id="dLetterPath"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={D_PATH}
                  fill="url(#dMorphGrad)"
                />
              </svg>
            </span>

            <span className="hero-letter inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent cursor-default">
              I
            </span>
            <span className="hero-letter inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent cursor-default">
              D
            </span>
          </h1>
        </div>

        <div className="text-slate-300 font-poppins font-normal max-w-170 text-sm sm:text-base leading-relaxed mb-0 GradualSpacing">
          Passionate developer who genuinely loves coding and building new
          things. Turning creative ideas into reality and crafting smooth
          digital experiences is both my passion and my favorite hobby.
        </div>
      </Container>

      <div
        ref={revealRef}
        data-scroll-parent
        className="hidden lg:block lg:absolute lg:inset-0 z-50 bg-mainBgColor lg:overflow-hidden scrollbar-none [&::-webkit-scrollbar]:hidden lg:[clip-path:circle(0%_at_50%_50%)]"
      >
        <div ref={experienceContentRef} className="w-full lg:min-h-full">
          <Experience />
        </div>
      </div>

      <div className="absolute right-5 bottom-8 z-40 pointer-events-none hidden md:flex flex-col items-center gap-2.5 select-none opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase text-slate-400 [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </span>
        <div className="w-px h-10 bg-linear-to-b from-sky-400 via-sky-400/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
