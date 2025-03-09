import HeroSection from "@/app/components/section/hero-section";
import ProjectSection from "@/app/components/section/project-section";

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ProjectSection />
    </div>
  );
}
