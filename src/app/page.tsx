import Experience from "@/components/sections/Experience/Experience";
import Hero from "@/components/sections/Hero/Hero";
import Projects from "@/components/sections/Project/Projects";
import Footer from "@/components/shared/Footer";

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="block lg:hidden">
        <Experience />
      </div>
      <Projects />
      <Footer />
    </>
  );
}
