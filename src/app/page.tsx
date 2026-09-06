import Projects from "@/components/sections/Project/Projects";
import DynamicBackground from "@/components/global/DynamicBackground";
import Hero from "@/components/sections/Hero/Hero";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Experience from "@/components/sections/Experience/Experience";

export default async function Home() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Hero />
      <div className='block lg:hidden'>
        <Experience />
      </div>
      <Projects />
      <Footer />
    </DynamicBackground>
  );
}
