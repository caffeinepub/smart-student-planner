import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { About } from "./components/portfolio/About";
import { Achievements } from "./components/portfolio/Achievements";
import { Contact } from "./components/portfolio/Contact";
import { CurrentlyLearning } from "./components/portfolio/CurrentlyLearning";
import { Education } from "./components/portfolio/Education";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { MoreAboutMe } from "./components/portfolio/MoreAboutMe";
import { Navbar } from "./components/portfolio/Navbar";
import { ParticleField } from "./components/portfolio/ParticleField";
import { Projects } from "./components/portfolio/Projects";
import { Skills } from "./components/portfolio/Skills";

export type Page =
  | "dashboard"
  | "timetable"
  | "tasks"
  | "reading"
  | "coding"
  | "calendar"
  | "birthdays"
  | "habits";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background:
            "linear-gradient(135deg, #050712 0%, #070B18 50%, #060D1A 100%)",
        }}
      >
        <ParticleField />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Achievements />
            <CurrentlyLearning />
            <MoreAboutMe />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
