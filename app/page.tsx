import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import BrainGraph from "@/components/BrainGraph";
import AskMe from "@/components/AskMe";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <CursorGlow />
      <Nav />
      <Hero />
      <ScrollReveal>
        <About />
        <Skills />
        <Projects />
        <BrainGraph />
        <AskMe />
      </ScrollReveal>
      <Footer />
    </>
  );
}
