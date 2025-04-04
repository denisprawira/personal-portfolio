"use client";
import SectionContainer from "@/app/components/container/section-container";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Squares } from "@/app/components/common/background/box-square-background";

const AboutSection = () => {
  return (
    <SectionContainer
      id="about"
      className={cn(
        "relative flex flex-col sm:flex-row  justify-center items-center  ",
        "bg-black",
        "snap-start snap-always ",
        "transition-[scroll] duration-1500 ease-in"
      )}
    >
      <Squares
        className="absolute h-full w-full left-0 top-0 opacity-50"
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <motion.div className="opacity-100 z-10 flex  w-full h-full">
        <motion.div className="bg-gray-800 w-2/5">
          <Image
            alt="Side Profile"
            width={96}
            height={96}
            src={
              "https://media.istockphoto.com/id/1262277544/vector/head-of-bearded-man-in-profile.jpg?s=612x612&w=0&k=20&c=eHazvzWaOpwkzcI-_-nJwoS72xeaAKEj_F_czcDSMFQ="
            }
            className="size-24 sm:size-28"
          />
        </motion.div>
        <motion.div className="w-full bg-red-100 w-3/5">f</motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default AboutSection;
