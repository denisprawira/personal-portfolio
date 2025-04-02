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
import { Menu, Project } from "@/app/types/types";
import { useRouter } from "next/navigation";
import useProjectQuery from "@/app/hooks/queries/project-queries";
import { useGlobalState } from "@/app/hooks/store/global-state";

const AnimatedCard = ({ item, index }: { item: Project; index: number }) => {
  const router = useRouter();
  const { setValue: setMenu } = useGlobalState<Menu[]>("PROJECT_MENU");

  return (
    <motion.div
      className="relative rounded-sm cursor-pointer h-fit group overflow-hidden"
      initial={{ y: 60, opacity: 0 }}
      whileHover={{ y: 0 }}
      whileInView={{ y: 20, opacity: 1 }}
      viewport={{ amount: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      onClick={() => {
        setMenu(item.menu);
        router.push(`/project/${item.id}`);
      }}
    >
      <div className="absolute w-full h-full  bg-black/10 hover:bg-black/70 transition-all duration-300 " />
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <SectionContainer
      id="projects"
      className="relative flex flex-col items-center justify-center gap-8"
    >
      <Squares
        className="absolute h-full w-full left-0 top-0"
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <motion.div className="flex flex-col sm:flex-row w-full gap-4 z-10 items-center">
        <TextShimmer className="text-5xl yeseva-font">PROJECTS</TextShimmer>
        <Separator
          orientation={
            isClient && width > Breakpoints.SM ? "vertical" : "horizontal"
          }
        />
        <TextGradientScroll text="showcases a collection of design and development projects, highlighting creativity and functionality" />
      </motion.div>
      <motion.div className="h-fit sm:h-full w-full">
        <motion.div className="relative w-full h-fit sm:h-full min-h-full overflow-y-auto gap-2 gap-y-8 sm:gap-y-2 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.isLoading && <p>Loading...</p>}

          {projectList.data?.map((item: Project, index) => (
            <AnimatedCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectSection;
