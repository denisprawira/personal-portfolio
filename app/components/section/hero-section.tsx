"use client";
import { Squares } from "@/app/components/common/background/box-square-background";
import { TextShimmer } from "@/app/components/common/text/text-shimmer";
import SectionContainer from "@/app/components/container/section-container";
import { Breakpoints } from "@/app/utils/breakpoints";
import { Badge } from "@/components/ui/badge";
import useScreenSize from "@/hooks/ui/use-media-query";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useMemo, useState, memo } from "react";

interface CircularTextProps {
  text: string;
  radius: number;
}

const CircularText = memo<CircularTextProps>(({ text, radius }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
        transformOrigin: "center",
        transform: "rotate(-30deg)",
      }}
      className="animate-[spin_50s_linear_infinite]"
      aria-label={`Rotating text: ${text}`}
    >
      {text.split("").map((char, index) => {
        const angle = (index / text.length) * 360;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <span
            key={index}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
              transformOrigin: "center",
              whiteSpace: "nowrap",
              fontSize: "1rem",
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </div>
  );
});

CircularText.displayName = "CircularText";

const NavLink = ({
  isAnimated,
  href,
  label,
  index,
}: {
  isAnimated: boolean;
  href: string;
  label: string;
  index: number;
}) => (
  <motion.li
    className="group relative cursor-pointer w-fit flex gap-2"
    initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
    animate={isAnimated ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
    viewport={{ amount: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <a href={href}>{label}</a>
    <ArrowUpRight className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
    <span className="absolute bottom-0 left-0 h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
  </motion.li>
);

export default function HeroSection() {
  const { width } = useScreenSize();
  const [isAnimated, setIsAnimated] = useState(false);

  const navLinks = useMemo(
    () => [
      { href: "#projects", label: "PROJECT" },
      { href: "#about", label: "ABOUT" },
      { href: "#contact", label: "CONTACT" },
    ],
    []
  );

  const circleRadius = useMemo(() => {
    if (!width) return 55;
    if (width > Breakpoints.MD) return 74;
    if (width > Breakpoints.SM) return 70;
    return 55;
  }, [width]);

  if (width === null)
    return (
      <SectionContainer className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </SectionContainer>
    );

  return (
    <SectionContainer
      viewport={{ amount: 0.75 }}
      onViewportEnter={() => {
        setIsAnimated(true);
      }}
      onViewportLeave={() => {
        setIsAnimated(false);
      }}
      id="hero"
      className={cn(
        "relative space-y-4 flex flex-col border-x-gray-200 justify-between",
        "snap-start snap-always",
        "transition-[scroll] duration-1500 ease-in"
      )}
    >
      <Squares
        className="absolute h-full w-full left-0 top-0"
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />

      <div className="space-y-4 h-fit relative ">
        <div className="space-y-2 sm:space-y-0">
          <motion.p
            initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
            animate={
              isAnimated ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.3 }}
          >{`Hi, I'M DENIS PRAWIRA`}</motion.p>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl yeseva-font space-y-2 sm:space-y-0 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={
                isAnimated ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TextShimmer>DESIGNING & CRAFTING</TextShimmer>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={
                isAnimated ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TextShimmer className="ml-2">• DIGITAL EXPERIENCES</TextShimmer>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
          animate={isAnimated ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Badge variant="default" className="border border-muted-foreground">
            WEB DEVELOPER
          </Badge>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 items-end h-fit">
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-4 ">
            {navLinks.map((link, index) => (
              <NavLink
                isAnimated={isAnimated}
                key={link.href}
                index={index}
                href={link.href}
                label={link.label}
              />
            ))}
          </ul>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          animate={isAnimated ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="hidden items-end h-full sm:flex justify-center"
        >
          <div className="relative flex items-center justify-center size-16 animate-bounce">
            <div className="absolute border border-dashed border-gray-500 size-16 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <ArrowDown aria-hidden="true" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
          animate={isAnimated ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="justify-self-end relative w-fit p-4 sm:p-0"
        >
          <CircularText
            text="DEVELOP • DESIGN • DEPLOY • "
            radius={circleRadius}
          />
          <Image
            alt="Denis Prawira profile picture"
            width={96}
            height={96}
            className="size-24 sm:size-28 rounded-full"
            src="https://media.istockphoto.com/id/1262277544/vector/head-of-bearded-man-in-profile.jpg?s=612x612&w=0&k=20&c=eHazvzWaOpwkzcI-_-nJwoS72xeaAKEj_F_czcDSMFQ="
            priority
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
}
