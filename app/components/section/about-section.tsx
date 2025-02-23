import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import SectionContainer from "@/app/components/container/section-container";

const AboutSection = () => {
  const router = useRouter();

  const boxVariants = {
    initial: { backgroundColor: "#EF4444", opacity: 0, y: 50 },
    whileInView: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
    whileHover: { backgroundColor: "#7F1D1D", opacity: 1 },
    exit: { backgroundColor: "#EF4444", opacity: 1 },
  };

  const boxes = [0, 0.3, 0.6, 0.9];

  return (
    <SectionContainer className="space-x-4 flex ">
      {boxes.map((delay, index) => (
        <motion.div
          layout
          layoutId={index.toString()}
          onClick={() => {
            router?.push(`project/${index}`);
          }}
          key={index}
          className="size-40 cursor-pointer rounded-md"
          variants={boxVariants}
          initial="initial"
          whileInView="whileInView"
          whileHover="whileHover"
          exit="exit"
          custom={delay} // Pass delay to variants
        />
      ))}
    </SectionContainer>
  );
};
export default AboutSection;
