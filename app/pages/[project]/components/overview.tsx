import { motion } from "motion/react";

const Overview = ({ data }: { data: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      dangerouslySetInnerHTML={{
        __html: data ?? "",
      }}
    ></motion.div>
  );
};

export default Overview;
