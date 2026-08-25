"use client";
import { useRef, useEffect, useState } from "react";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/global/Container";
import Card from "./Card";
import VideoModal from "./VideoModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalCards = projects.length;
      if (totalCards <= 1) return;

      const getCardStep = () => {
        const firstCard = track.children[0] as HTMLElement;
        const secondCard = track.children[1] as HTMLElement;
        if (firstCard && secondCard) {
          return secondCard.offsetLeft - firstCard.offsetLeft;
        }
        return (firstCard?.offsetWidth || 850) + 40;
      };

      const getScrollDistance = () => {
        return (totalCards - 1) * getCardStep();
      };

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${(totalCards - 1) * 700}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div id='projects' className='relative w-full overflow-hidden'>
      <Container className='relative z-10'>
        <SectionTitle text='Projects_' color='My' />
      </Container>
      <div ref={containerRef} className='relative h-auto md:h-screen overflow-visible md:overflow-hidden pt-6 flex flex-col justify-center'>
        <div
          ref={trackRef}
          className='flex flex-col md:flex-row items-center h-full w-fit gap-8 md:gap-10 pb-20 md:pb-0 will-change-transform'
          style={{
            paddingLeft: "calc(50vw - min(425px, 42.5vw))",
            paddingRight: "calc(50vw - min(425px, 42.5vw))",
          }}
        >
          {projects.map((card, idx) => (
            <div key={idx} className='w-[90vw] md:w-[850px] max-w-[850px] h-[360px] md:h-[360px] shrink-0'>
              <Card project={card} onPlayVideo={() => setActiveVideo(card.video_url)} />
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
};

export default Projects;


