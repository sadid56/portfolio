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

        const scrollTween = gsap.to(track, {
          x: () => -((totalCards - 1) * cache.step),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${(totalCards - 1) * 600}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              track.style.willChange = self.isActive ? "transform" : "auto";
            },
          },
        });

        const cardTriggers: ScrollTrigger[] = [];

        cardEls.forEach((card, i) => {
          gsap.set(card, {
            transformOrigin: "50% 50%",
            willChange: "transform, opacity",
          });

          const st = ScrollTrigger.create({
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 95%",
            end: "left 45%",
            scrub: 0.4,
            onUpdate: (self) => {
              const p = self.progress;
              const eased = 1 - Math.pow(1 - p, 3);
              card.style.opacity = String(0.25 + eased * 0.75);
              card.style.transform = `scale(${0.92 + eased * 0.08})`;
            },
            onLeave: () => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            },
          });

          cardTriggers.push(st);
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
        }, 250);

        return () => {
          window.clearTimeout(timer);
          ScrollTrigger.removeEventListener("refreshInit", onRefresh);
          cardTriggers.forEach((st) => st.kill());
          cardEls.forEach((card) => {
            card.style.opacity = "";
            card.style.transform = "";
            card.style.willChange = "";
          });
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
              className="w-[90vw] md:w-[850px] max-w-[850px] h-[360px] shrink-0"
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
