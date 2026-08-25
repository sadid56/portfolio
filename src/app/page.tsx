import Projects from "@/components/sections/Project/Projects";
import DynamicBackground from "@/components/global/DynamicBackground";
import Hero from "@/components/sections/Hero/Hero";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Experience from "@/components/sections/Experience/Experience";
import Skills from "@/components/sections/Skills/Skills";
import { Suspense } from "react";

export default async function Home() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Hero />
      <div className='block lg:hidden'>
        <Suspense>
          <Skills />
        </Suspense>
      </div>
      <Experience />
      <Projects />
      <Footer />
    </DynamicBackground>
  );
}
