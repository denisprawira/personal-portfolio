import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "motion/react"; // Fix the import

// Extend from HTMLMotionProps instead of ComponentPropsWithoutRef
interface SectionContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        {...rest}
        className={`px-12 py-20 min-h-full min-w-full h-full ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

SectionContainer.displayName = "SectionContainer";
export default SectionContainer;
