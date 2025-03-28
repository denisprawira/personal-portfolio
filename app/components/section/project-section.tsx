"use client";
import SectionContainer from "@/app/components/container/section-container";
import { motion } from "motion/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import useWindowSize from "@/app/utils/hooks/use-window-size";
import { Breakpoints } from "@/app/utils/breakpoints";
import { Squares } from "@/app/components/common/background/box-square-background";
import { TextGradientScroll } from "@/app/components/text/text-gradient-scroll";
import { collection, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation";
import { TextShimmer } from "@/app/components/common/text/text-shimmer";
import { db } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import { Project } from "@/app/types/types";

const AnimatedCard = ({ item, index }: { item: Project; index: number }) => {
  return (
    <motion.div
      className="relative rounded-sm cursor-pointer h-fit group overflow-hidden"
      initial={{ y: 40 }}
      whileHover={{ y: 0 }}
      whileInView={{ y: 20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure rendering only happens on the client
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const collectionRef = collection(db, "projects");
      const querySnapshot = await getDocs(collectionRef);
      const projectsData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Project)
      );
      setProjects(projectsData.flat());
    };
    fetchProjects();
  }, []);

  if (!isClient) return null; // Prevent SSR errors by rendering nothing until client-side

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
          {projects.map((item, index) => (
            <AnimatedCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};

export default ProjectSection;
