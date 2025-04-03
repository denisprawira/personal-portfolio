import ImageSlider from "@/app/components/common/img-slider/img-slider";
import { IMG, IProject } from "@/app/types/types";
import { useState } from "react";
import { motion } from "motion/react";

const Features = ({ data }: { data: IProject[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <ImageSlider
        data={data.map((item) => item.img) as IMG[]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: data[activeIndex].content ?? "",
        }}
      ></div>
    </motion.div>
  );
};

export default Features;
