"use client";
import SectionContainer from "@/app/components/container/section-container";
import { motion } from "motion/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import useWindowSize from "@/app/utils/hooks/use-window-size";
import { Breakpoints } from "@/app/utils/breakpoints";
import { Squares } from "@/app/components/common/background/box-square-background";
import { TextGradientScroll } from "@/app/components/text/text-gradient-scroll";
import { TextShimmer } from "@/app/components/common/text/text-shimmer";
import { useEffect, useState } from "react";
import { IMenu, Project } from "@/app/types/types";
import { useRouter } from "next/navigation";
import useProjectQuery from "@/app/hooks/queries/project-queries";
import { useGlobalState } from "@/app/hooks/store/global-state";
import { cn } from "@/lib/utils";

const AnimatedCard = ({
  item,
  index,
  isAnimated,
}: {
  item: Project;
  index: number;
  isAnimated: boolean;
}) => {
  const router = useRouter();
  const { setValue: setMenu } = useGlobalState<IMenu[]>("PROJECT_MENU");
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width >= Breakpoints.SM) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [width]);

  return (
    <motion.div
      key={index + isMobile.toString()}
      className="relative rounded-sm cursor-pointer h-fit group overflow-hidden"
      initial={{ y: 60, opacity: 0, filter: "blur(5px)" }}
      whileHover={{ y: 0 }}
      animate={isAnimated ? { y: 20, opacity: 1, filter: "blur(0px)" } : {}}
      viewport={isMobile ? { amount: 0 } : { amount: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      onClick={() => {
        setMenu(item.menu);
        router.push(`/pages/${item.id}`);
      }}
    >
      <div className="absolute w-full h-full bg-black/10 hover:bg-black/70 hover:backdrop-blur-sm transition-all duration-300" />
      <div className="absolute right-3 top-3 flex justify-center items-center h-fit w-fit transition-all duration-300 group-hover:opacity-100 opacity-0">
        <Image
          height={100}
          width={100}
          alt=""
          src={"/corner-button.svg"}
          className="w-16 h-fit"
        />
        <p className="text-orange-600 absolute rotate-45 translate-x-2 -translate-y-1 yeseva-font text-xs">
          More
        </p>
      </div>
      <Image
        width={700}
        height={200}
        src={item.image}
        alt={item.title}
        className="w-full h-auto"
      />
      <div className="absolute bottom-0 left-0 translate-y-10 group-hover:translate-y-0 bg-background/80 transition-all duration-300 px-4 py-2 w-full">
        <p className="text-muted-foreground">{item.title}</p>
      </div>
    </motion.div>
  );
};

const ProjectSection = () => {
  const { width } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  const { projectList } = useProjectQuery();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <SectionContainer
      id="projects"
      viewport={{ amount: 0.85 }}
      onViewportEnter={() => {
        setIsAnimated(true);
      }}
      onViewportLeave={() => {
        setIsAnimated(false);
      }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 ",
        "snap-start snap-always ",
        "transition-[scroll] duration-1500 ease-in "
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
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={isAnimated ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row w-full gap-4 z-10 items-center "
      >
        <TextShimmer className="text-5xl yeseva-font">PROJECTS</TextShimmer>
        <Separator
          orientation={
            isClient && width > Breakpoints.SM ? "vertical" : "horizontal"
          }
        />
        <TextGradientScroll text="showcases a collection of design and development projects, highlighting creativity and functionality" />
      </motion.div>
      <motion.div className=" sm:h-full w-full h-full ">
        <motion.div className="relative w-full h-fit  sm:h-full  overflow-y-auto gap-2 gap-y-8 sm:gap-y-2 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {projectList.isLoading && <p>Loading...</p>}

          {projectList.data?.map((item: Project, index) => (
            <AnimatedCard
              key={item.id}
              item={item}
              index={index}
              isAnimated={isAnimated}
            />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectSection;
