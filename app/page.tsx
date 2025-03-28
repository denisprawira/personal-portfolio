"use client";
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  }
);

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
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relatice w-full h-full">
        <HeroSection />
        <ProjectSection />
        <AboutSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  );
}
