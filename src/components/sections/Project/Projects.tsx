"use client";
import Container from "@/components/global/Container";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useCallback, useRef, useState } from "react";
import Card from "./Card";
import VideoModal from "./VideoModal";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlayVideo = useCallback((url: string) => {
    setActiveVideo(url);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalCards = projects.length;
        if (totalCards <= 1) return;

        const measure = () => {
          const children = track.children;
          const first = children[0] as HTMLElement | undefined;
          const second = children[1] as HTMLElement | undefined;
          if (!first) return { padding: 16, step: 890 };

          const firstRect = first.getBoundingClientRect();
          const cardWidth = firstRect.width;
          const padding = Math.max(16, (window.innerWidth - cardWidth) / 2);

          let step = cardWidth + 40;
          if (second) {
            const secondRect = second.getBoundingClientRect();
            const computed = secondRect.left - firstRect.left;
            if (computed > 0) step = computed;
          }
          return { padding, step };
        };

        let cache = measure();
        track.style.paddingLeft = `${cache.padding}px`;
        track.style.paddingRight = `${cache.padding}px`;

        const cardEls = Array.from(track.children) as HTMLElement[];

        // Hardware-accelerated GPU layer
        gsap.set(track, { force3D: true });

        const scrollTween = gsap.to(track, {
          x: () => -((totalCards - 1) * cache.step),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${(totalCards - 1) * 580}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8, // Smooth lerp momentum (inertia glide)
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              track.style.willChange = self.isActive ? "transform" : "auto";
            },
          },
        });

        // Smooth lerped card transitions
        const cardTweens = cardEls.map((card) => {
          return gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.94, force3D: true },
            {
              opacity: 1,
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 92%",
                end: "left 50%",
                scrub: 0.5,
              },
            },
          );
        });

        const onRefresh = () => {
          cache = measure();
          track.style.paddingLeft = `${cache.padding}px`;
          track.style.paddingRight = `${cache.padding}px`;
        };

        ScrollTrigger.addEventListener("refreshInit", onRefresh);

        const timer = window.setTimeout(() => {
          onRefresh();
          ScrollTrigger.refresh();
        }, 200);

        return () => {
          window.clearTimeout(timer);
          ScrollTrigger.removeEventListener("refreshInit", onRefresh);
          cardTweens.forEach((t) => t.kill());
          scrollTween.kill();
          track.style.paddingLeft = "";
          track.style.paddingRight = "";
          track.style.willChange = "auto";
        };
      });

      mm.add("(max-width: 767px)", () => {
        const cards = Array.from(track.children) as HTMLElement[];
        const tweens = cards.map((card) =>
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          ),
        );

        return () => tweens.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      id="projects"
      className="relative w-full overflow-hidden pt-8 md:pt-0 pb-12 md:pb-0"
    >
      <Container className="relative z-10">
        <SectionTitle text="Projects_" color="My" />
      </Container>

      <div
        ref={containerRef}
        className="relative h-auto md:h-screen overflow-visible md:overflow-hidden pt-6 md:pt-0 flex flex-col justify-center"
      >
        <div
          ref={trackRef}
          className="project-track flex flex-col md:flex-row items-center h-full w-full md:w-fit gap-8 md:gap-10 pb-20 md:pb-0 px-4 md:px-0"
        >
          {projects.map((card, idx) => (
            <div
              key={idx}
              className="w-[90vw] md:w-212.5 max-w-212.5 h-90 shrink-0"
            >
              <Card project={card} onPlayVideo={handlePlayVideo} />
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoKey={activeVideo} onClose={handleCloseVideo} />
    </div>
  );
};

export default Projects;
