"use client";
import SectionContainer from "@/app/components/container/section-container";
import { initialFrames } from "@/app/utils/data/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const ProjectSection = () => {
  const [hoverSize] = useState(6);
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null
  );
  const [hoveredItem, setHoveredItem] = useState<number>();
  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr";
    }
    const { row } = hovered;
    const nonHoveredSize = (12 - hoverSize) / 2;

    console.log(
      "row : ",
      [0, 1, 2]
        .map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
        .join(" ")
    );
    return [0, 1, 2]
      .map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr";
    }
    const { col } = hovered;
    const nonHoveredSize = (12 - hoverSize) / 2;
    console.log(
      "col : ",
      [0, 1, 2]
        .map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
        .join(" ")
    );
    return [0, 1, 2]
      .map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  return (
    <SectionContainer className="flex items-center justify-center">
      <motion.div
        className="relative   border gap-0.5 border-gray-900 bg-gray-900 min-h-full h-full max-h-full w-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          transition:
            "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {initialFrames.map((item, index) => {
          const row = Math.floor(item.defaultPos.y / 4);
          const col = Math.floor(item.defaultPos.x / 4);

          return (
            <motion.div
              key={index}
              onMouseEnter={() => {
                setHovered({ row, col });
                setHoveredItem(index);
              }}
              onMouseLeave={() => {
                setHovered(null);
                setHoveredItem(undefined);
              }}
              className="p-2 bg-stone-950 h-full flex justify-center items-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                className={cn(
                  "absolute w-full h-full bg-black/40 transition-all duration-700 cursor-pointer flex justify-center items-center z-20",
                  hoveredItem === index ? "opacity-100" : "opacity-0"
                )}
              >
                <p className="text-2xl text-white font-bold z-30 transition-all">{`${item.id}fdfdf`}</p>
              </motion.div>
              <Image
                src={item.corner}
                alt=""
                className="w-full h-[6rem]  object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectSection;
