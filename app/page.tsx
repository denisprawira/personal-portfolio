"use client";
import AboutSection from "@/app/components/section/about-section";
import HeroSection from "@/app/components/section/hero-section";
import ProjectSection from "@/app/components/section/project-section";

export default function Home() {
  return (
    <div className="relatice w-full h-full bg-red-300">
      <HeroSection />
      <ProjectSection />
      <AboutSection />
    </div>
  );
}
