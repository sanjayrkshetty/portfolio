import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import BrainGraph from "@/components/BrainGraph";
import NowPlaying from "@/components/NowPlaying";
import AskMe from "@/components/AskMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <NowPlaying />
      <BrainGraph />
      <AskMe />
      <Footer />
    </>
  );
}
