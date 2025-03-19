"use client";
import SectionContainer from "@/app/components/container/section-container";
import { initialFrames } from "@/app/utils/data/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import useWindowSize from "@/app/utils/hooks/use-window-size";
import useGridPosition from "@/app/utils/hooks/use-grid-position";
import { Breakpoints } from "@/app/utils/breakpoints";

const ProjectSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>();

  const [hoveredItem, setHoveredItem] = useState<number>();
  const { width } = useWindowSize(); // Get window width
  const { row, col, numRows, numCols } = useGridPosition(
    hoveredIndex,
    width,
    initialFrames.length
  );

  const getRowSizes = (item: number | undefined) => {
    if (typeof item !== "number") {
      return Array(numRows).fill("1fr").join(" ");
    }

    const colWeight = Array.from({ length: numRows as number }, (_, r) => r)
      .map((r) => (r === row ? `${4}fr` : `${1}fr`))
      .join(" ");

    console.log("colweight: ", colWeight);

    return colWeight;
  };

  const getColSizes = (item: number | undefined) => {
    if (typeof item !== "number") {
      return Array(numCols).fill("1fr").join(" ");
    }

    return Array.from({ length: numCols as number }, (_, r) => r)
      .map((r) => (r === col ? `${2}fr` : `${1}fr`))
      .join(" ");
  };

  return (
    <SectionContainer
      id="projects"
      className="flex flex-col items-center justify-center  gap-8 "
    >
      <motion.div className={`flex flex-col sm:flex-row w-full gap-4`}>
        <motion.p className="text-5xl yeseva-font">{`PROJECTS`}</motion.p>
        <Separator
          orientation={width > Breakpoints.SM ? "vertical" : "horizontal"}
        />
        <motion.p className="text-wrap max-w-sm">{`showcases a collection of design and development projects, highlighting creativity and functionality`}</motion.p>
      </motion.div>
      <motion.div className="h-full w-full overflow-hidden">
        <motion.div
          className="relative w-full h-full min-h-full overflow-y-auto "
          style={{
            display: "grid",
            gridTemplateRows: getRowSizes(hoveredItem),
            gridTemplateColumns: getColSizes(hoveredItem),
            transition:
              "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
          }}
        >
          {initialFrames.map((item, index) => {
            return (
              <motion.div
                key={index}
                onMouseEnter={() => {
                  setHoveredItem(index);
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredItem(undefined);
                  setHoveredIndex(index);
                }}
                className="p-2  h-full flex justify-center items-center relative border border-stone-900"
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
                    <Image
                      height={100}
                      width={100}
                      alt=""
                      src={"/corner-button.svg"}
                      className=" w-20 h-fit  "
                    />
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
                  height={200}
                  alt=""
                  className="w-full h-[10rem]  object-cover bg-red-500"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectSection;
