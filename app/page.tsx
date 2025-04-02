"use client";
import dynamic from "next/dynamic";
const AboutSection = dynamic(
  () => import("@/app/components/section/about-section"),
  {
    ssr: false,
  }
);
const ContactSection = dynamic(
  () => import("@/app/components/section/contact-section"),
  {
    ssr: false,
  }
);
const HeroSection = dynamic(
  () => import("@/app/components/section/hero-section"),
  {
    ssr: false,
  }
);
const ProjectSection = dynamic(
  () => import("@/app/components/section/project-section"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="relatice w-full h-full bg-background">
      <HeroSection />
      <ProjectSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
