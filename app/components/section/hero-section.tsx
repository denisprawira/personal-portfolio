"use client";
import { Squares } from "@/app/components/common/background/box-square-background";
import { TextShimmer } from "@/app/components/common/text/text-shimmer";
import SectionContainer from "@/app/components/container/section-container";
import { Breakpoints } from "@/app/utils/breakpoints";
import { Badge } from "@/components/ui/badge";
import useScreenSize from "@/hooks/ui/use-media-query";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface CircularTextProps {
  text: string;
  radius: number;
}

const CircularText: React.FC<CircularTextProps> = ({ text, radius }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
export default function HeroSection() {
  const { width } = useScreenSize();

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  if (width === null) return <>Loading...</>;

  return (
    <SectionContainer className="relative space-y-4 flex flex-col border-x-gray-200 justify-between ">
      <Squares
        className="absolute h-full w-full left-0 top-0 "
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <div className="space-y-4  h-fit relative ">
        <div className="space-y-2 sm:space-y-0">
          <p>{`Hi, I'M DENIS PRAWIRA`}</p>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl yeseva-font space-y-2 sm:space-y-0 flex flex-col">
            <TextShimmer>DESIGNING & CRAFTING</TextShimmer>
            <TextShimmer className="ml-2">• DIGITAL EXPERIENCES</TextShimmer>
          </div>
        </div>
        <Badge
          variant={"default"}
          className="border border-muted-foreground"
        >{`WEB DEVELOPER`}</Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-end h-fit  ">
        <div>
          <ul className="flex flex-col gap-4">
            <li className="group relative cursor-pointer w-fit">
              <div className="flex gap-2 items-center cursor-pointer group relative overflow-hidden">
                <span className="hover:text-gray-300 transition-all">
                  <a href="#projects" className="">
                    PROJECT
                  </a>
                </span>
                <ArrowUpRight className=" opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
              </div>
              <span className="absolute bottom-0 left-0 h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="group relative cursor-pointer w-fit">
              <div className="flex gap-2 items-center cursor-pointer group relative overflow-hidden">
                <span className="hover:text-gray-300 transition-all">
                  ABOUT
                </span>
                <ArrowUpRight className=" opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
              </div>
              <span className="absolute bottom-0 left-0 h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="group relative cursor-pointer w-fit">
              <div className="flex gap-2 items-center cursor-pointer group relative overflow-hidden">
                <span className="hover:text-gray-300 transition-all">
                  CONTACT
                </span>
                <ArrowUpRight className=" opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
              </div>
              <span className="absolute bottom-0 left-0 h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </div>
        <div className="hidden items-end h-full sm:flex justify-center ">
          <div className="relative flex items-center justify-center size-16 animate-bounce">
            <div className="absolute border border-dashed border-gray-500 size-16 rounded-full animate-[spin_10s_linear_infinite] "></div>
            <ArrowDown />
          </div>
        </div>
        <div className="justify-self-end relative w-fit p-4 sm:p-0">
          <CircularText
            text="DEVELOP • DESIGN • DEPLOY • "
            radius={
              width > Breakpoints.MD ? 74 : width > Breakpoints.SM ? 70 : 55
            }
          />
          <Image
            alt="Side Profile"
            width={96}
            height={96}
            className="size-24 sm:size-28 rounded-full"
            src="https://media.istockphoto.com/id/1262277544/vector/head-of-bearded-man-in-profile.jpg?s=612x612&w=0&k=20&c=eHazvzWaOpwkzcI-_-nJwoS72xeaAKEj_F_czcDSMFQ="
          />
        </div>
      </div>
    </SectionContainer>
  );
}
