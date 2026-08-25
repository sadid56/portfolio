"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconBrandReact, IconBrandNextjs, IconBrandTypescript, IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import Container from "@/components/global/Container";
import { cn } from "@/lib/cn";
import Link from "next/link";
import usePageScroll from "@/hooks/usePageScroll";
import { FlipWords } from "@/components/ui/FlipWords";
import Skills from "../Skills/Skills";
import LINKS from "@/constant/links";
import useScrollTrigger from "@/hooks/useScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const dLetterRef = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const handleScroll = usePageScroll();
  const isScroll = useScrollTrigger();
  const words = ["Software developer", "Web developer", "Full stack developer", "React developer"];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px)",
      () => {
        const ctaButtons = containerRef.current?.querySelectorAll(".cta-btn") ?? [];
        const gradualEls = containerRef.current?.querySelectorAll(".GradualSpacing") ?? [];
        const blurTargets = containerRef.current?.querySelectorAll(".blur-target") ?? [];

        const letters = Array.from(nameRef.current?.querySelectorAll("span") ?? []);
        const leftLetters = letters.slice(0, 2); // S, A
        const rightLetters = letters.slice(3, 5); // I, D
        const dLetter = dLetterRef.current;
        const description = containerRef.current?.querySelector(".GradualSpacing");
        const cta = containerRef.current?.querySelector(".cta-btn");

        const otherContentTargets: (Element | HTMLElement)[] = [
          ...Array.from(gradualEls),
          ...Array.from(ctaButtons),
          ...Array.from(blurTargets),
        ];
        if (portraitRef.current) otherContentTargets.push(portraitRef.current);

        const dPath = containerRef.current?.querySelector("#dLetterPath");
        const dPathShape = "M 0 0 C 18 0, 36 0, 48 0 C 76 0, 98 22, 98 50 C 98 78, 76 100, 48 100 C 36 100, 18 100, 0 100 C 0 66, 0 33, 0 0 Z M 31 25 C 36 25, 42 25, 46 25 C 57 25, 64 35, 64 50 C 64 65, 57 75, 46 75 C 42 75, 36 75, 31 75 C 31 60, 31 40, 31 25 Z";
        const oPathShape = "M 2 50 C 2 23.5, 23.5 2, 50 2 C 76.5 2, 98 23.5, 98 50 C 98 76.5, 76.5 98, 50 98 C 23.5 98, 2 76.5, 2 50 C 2 50, 2 50, 2 50 Z M 24 50 C 24 35.6, 35.6 24, 50 24 C 64.4 24, 76 35.6, 76 50 C 76 64.4, 64.4 76, 50 76 C 35.6 76, 24 64.4, 24 50 C 24 50, 24 50, 24 50 Z";

        // Initial setup with GPU acceleration
        if (dPath) {
          gsap.set(dPath, { attr: { d: dPathShape } });
        }

        if (revealRef.current) {
          gsap.set(revealRef.current, {
            clipPath: "circle(0% at 50% 50%)",
            willChange: "clip-path",
            force3D: true,
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
            force3D: true,
          });
        }

        gsap.set([...leftLetters, ...rightLetters], {
          opacity: 1,
          x: 0,
          scale: 1,
          willChange: "transform, opacity",
          force3D: true,
        });

        gsap.set(otherContentTargets, {
          opacity: 1,
          scale: 1,
          y: 0,
          willChange: "transform, opacity",
          force3D: true,
        });

        // Create buttery smooth timeline with fast, responsive scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=950",
            scrub: 0.7,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // 1. Ambient elements fade out immediately
        tl.to(
          otherContentTargets,
          {
            opacity: 0,
            scale: 0.92,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.01,
          },
          0,
        );

        if (description || cta) {
          tl.to(
            [description, cta].filter(Boolean),
            {
              y: 40,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            0,
          );
        }

        // 2. Letters split and move out rapidly
        tl.to(
          leftLetters,
          {
            x: -250,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );

        tl.to(
          rightLetters,
          {
            x: 250,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );

        // 3. Move D letter quickly towards center
        tl.to(
          dLetter,
          {
            x: () => {
              if (!dLetter) return 0;
              const dRect = dLetter.getBoundingClientRect();
              const dCenterX = dRect.left + dRect.width / 2;
              return window.innerWidth / 2 - dCenterX;
            },
            y: () => {
              if (!dLetter) return 0;
              const dRect = dLetter.getBoundingClientRect();
              const dCenterY = dRect.top + dRect.height / 2;
              return window.innerHeight / 2 - dCenterY;
            },
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );

        // 3.5 Morph D into a full circular 'O' portal ring as it starts scaling
        if (dPath) {
          tl.to(
            dPath,
            {
              attr: { d: oPathShape },
              duration: 0.4,
              ease: "power2.inOut",
            },
            0.2,
          );
        }

        // 4. Scale up D / O ring as camera zooms through it
        tl.to(
          dLetter,
          {
            scale: 24,
            ease: "power2.in",
            duration: 0.7,
            force3D: true,
          },
          0.4,
        );

        // 5. Circle reveal opens up seamlessly in sync
        tl.to(
          revealRef.current,
          {
            clipPath: "circle(150% at 50% 50%)",
            ease: "power2.inOut",
            duration: 0.8,
            force3D: true,
          },
          0.45,
        );

        // 6. D / O ring vanishes smoothly right as the portal opens
        tl.to(
          dLetter,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.65,
        );

        // Floating icons gentle animation
        const floatingIcons = Array.from(containerRef.current?.querySelectorAll(".floating-icon") ?? []);
        floatingIcons.forEach((el, idx) => {
          const baseDuration = 3 + (idx % 3) * 0.6;
          gsap.to(el, {
            y: "+=18",
            rotate: idx % 2 === 0 ? 6 : -6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: baseDuration,
          });
        });

        // Parallax with mouse move
        const onMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const mx = (e.clientX - rect.left) / rect.width - 0.5;
          const my = (e.clientY - rect.top) / rect.height - 0.5;
          floatingIcons.forEach((el, idx) => {
            const speed = 10 + (idx % 4) * 5;
            gsap.to(el, { x: mx * speed, yPercent: my * 2, duration: 0.3, ease: "power2.out" });
          });
        };
        containerRef.current?.addEventListener("mousemove", onMouseMove);

        return () => {
          containerRef.current?.removeEventListener("mousemove", onMouseMove);
          gsap.killTweensOf(floatingIcons);
        };
      },
      containerRef,
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id='home' ref={containerRef} className='relative h-screen overflow-hidden'>
      <div className='pointer-events-none hidden lg:block absolute inset-0 z-20 blur-target'>
        <IconBrandReact className='floating-icon absolute top-[18%] right-[28%] w-9 h-9 text-blue-300/70 drop-shadow-[0_0_10px_rgba(203,213,225,0.25)]' />
        <IconBrandNextjs className='floating-icon absolute bottom-28 left-[35%] w-10 h-10 text-slate-200/70' />
        <IconBrandTypescript className='floating-icon absolute top-[18%] md:top-[22%] right-[5%] w-9 h-9 text-blue-300/70' />
      </div>
      <div ref={revealRef} className='absolute inset-0 z-50 bg-mainBgColor' style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <Skills />
      </div>
      <div className='absolute hidden lg:block inset-0 z-0 blur-target'>
        <div className='absolute -top-20 -right-20 w-[24rem] h-[24rem] bg-linear-to-br from-cyan-300/8 via-blue-400/6 to-transparent rounded-full blur-3xl float-slow'></div>
      </div>
      <div className='absolute inset-0 z-0 blur-target bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_70%_60%_at_20%_50%,black_30%,transparent_100%)]'></div>

      {/* Background Portrait Overlay */}
      <div ref={portraitRef} className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
        <div
          className='absolute right-[10%] md:right-[40%] bottom-[40%] md:-bottom-[20%] w-full h-[130%] bg-no-repeat bg-bottom-right bg-contain opacity-20 md:opacity-15 lg:opacity-13'
          style={{
            backgroundImage: "url('/hero.png')",
            maskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 100%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            filter: "grayscale(100%) brightness(1.5) contrast(1.1)",
          }}
        />
      </div>
      <Container className='relative z-30 pb-20 pr-4 lg:pr-28 2xl:pr-0 h-full flex flex-col justify-end items-end text-right'>
        {/* Name */}
        <div ref={nameRef} className='mb-6'>
          <h1 className='text-[70px] sm:text-[80px] leading-[90%] md:text-[130px] lg:text-[150px] xl:text-[210px] font-montserrat uppercase font-black select-none flex items-center justify-end'>
            {"Sadid".split("").map((letter, idx) =>
              idx === 2 ? (
                <span
                  key={idx}
                  ref={dLetterRef}
                  className='inline-flex items-center justify-center mx-1 align-baseline cursor-default relative'
                  style={{
                    width: "0.76em",
                    height: "0.71em",
                    verticalAlign: "0.015em",
                    transformOrigin: "50% 50%",
                    willChange: "transform, opacity",
                  }}
                >
                  <svg
                    viewBox='0 0 100 100'
                    className='w-full h-full overflow-visible'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <defs>
                      <linearGradient id='dMorphGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                        <stop offset='0%' stopColor='#ffffff' />
                        <stop offset='50%' stopColor='#cbd5e1' />
                        <stop offset='100%' stopColor='#94a3b8' />
                      </linearGradient>
                    </defs>
                    <path
                      id='dLetterPath'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M 0 0 C 18 0, 36 0, 48 0 C 76 0, 98 22, 98 50 C 98 78, 76 100, 48 100 C 36 100, 18 100, 0 100 C 0 66, 0 33, 0 0 Z M 31 25 C 36 25, 42 25, 46 25 C 57 25, 64 35, 64 50 C 64 65, 57 75, 46 75 C 42 75, 36 75, 31 75 C 31 60, 31 40, 31 25 Z'
                      fill='url(#dMorphGrad)'
                    />
                  </svg>
                </span>
              ) : (
                <span
                  key={idx}
                  className='inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent cursor-default'
                >
                  {letter}
                </span>
              )
            )}
          </h1>
        </div>

        {/* Description */}
        <div className='text-slate-300 font-poppins font-normal max-w-[700px] mb-6 GradualSpacing'>
          Passionate {<FlipWords words={words} />} specializing in React, Next.js, Node.js, PostgreSQL, and TypeScript, with a strong focus
          on clean code, scalability, and continuous learning.
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-wrap gap-4 justify-end cta-btn'>
          <Link
            target='_blank'
            href={LINKS.blog}
            className={cn(
              "group relative h-12 px-8 bg-slate-800/40 backdrop-blur-xl border border-sky-500/20 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-500 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:-translate-y-1 flex items-center gap-2 text-sky-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-950",
              isScroll ? "z-[-1]" : "z-1",
            )}
          >
            <span className='absolute inset-0 bg-linear-to-r from-transparent via-sky-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></span>
            <span className='relative z-10'>Blogs</span>
            <IconArrowUpRight className='relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </Link>
          <Link
            target='_blank'
            href={LINKS.github}
            className={cn(
              "group relative h-12 px-8 bg-sky-500/20 backdrop-blur-xl border border-sky-400/30 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-500 hover:bg-sky-500/30 hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:-translate-y-1 flex items-center gap-2 text-sky-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-950",
              isScroll ? "z-[-1]" : "z-1",
            )}
          >
            <IconBrandGithub className='w-5 h-5' />
            <span>GitHub</span>
          </Link>
        </div>
      </Container>
      {/* Modern Minimal Scroll Indicator */}
      <div className='fixed right-5 bottom-8 z-40 pointer-events-none hidden md:flex flex-col items-center gap-2.5 select-none opacity-70 hover:opacity-100 transition-opacity'>
        <span className='text-[9px] uppercase text-slate-400 [writing-mode:vertical-rl] rotate-180'>
          SCROLL
        </span>
        <div className='w-px h-10 bg-linear-to-b from-sky-400 via-sky-400/40 to-transparent' />
      </div>
    </section>
  );
};

export default Hero;
