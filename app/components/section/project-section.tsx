"use client";
import SectionContainer from "@/app/components/container/section-container";
import { initialFrames } from "@/app/utils/data/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
// import CornerButton from "/corner-button.svg";

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
    <SectionContainer className="flex items-center justify-center flex-col sm:flex-row">
      <motion.div
        className={`flex flex-col items-start flex-[1_1_auto] min-w-0 sm:mr-12  h-full gap-6`}
      >
        <motion.p className="text-5xl yeseva-font">{`Project`}</motion.p>
        <Separator />
        <motion.p className="text-wrap">
          {`Take a look at my projects, where aesthetics and functionality come
          together. My approach combines design thinking, front-end
          technologies, and user-centered principles to create meaningful
          experiences. From concept to execution, I aim to develop interfaces
          that are not only visually stunning but also highly intuitive and
          responsive`}
        </motion.p>
      </motion.div>
      <motion.div
        className="relative   border gap-0.5 border-gray-900 bg-gray-900 min-h-full h-full max-h-full w-full flex-[3_1_auto] min-w-[60%]"
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
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <motion.div
                className={cn(
                  "absolute w-full h-full bg-black/80 transition-all duration-500 cursor-pointer flex justify-center items-center z-20",
                  hoveredItem === index ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="absolute right-3 top-3  flex justify-center items-center h-fit w-fit transition-all duration-300">
                  <img src={"/corner-button.svg"} className=" w-20 h-fit  " />
                  <p
                    className={`text-orange-600 absolute rotate-45 translate-x-2 -translate-y-1  yeseva-font text-lg`}
                  >{`More`}</p>
                </div>
                <motion.p
                  className="relative text-2xl duration-200  text-white font-bold z-30 transition-all yeseva-font before:content-[''] before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    hoveredItem === index
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                >
                  {`${item.title}`}
                </motion.p>
              </motion.div>
              <Image
                src={item.image}
                width={100}
                height={100}
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
