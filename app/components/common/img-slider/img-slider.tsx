"use client";
import { IMG } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

type ImageSliderProps = {
  data: IMG | IMG[];
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
};

const ImageSlider = ({
  data,
  activeIndex: propActiveIndex,
  setActiveIndex: propSetActiveIndex,
}: ImageSliderProps) => {
  // Internal state for when no external state management is provided
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  // Track slide direction for animation
  const [direction, setDirection] = useState(0);

  // Use either provided state management or internal
  const activeIndex =
    propActiveIndex !== undefined ? propActiveIndex : internalActiveIndex;

  // Handle array data
  const isArrayData = Array.isArray(data);
  const imagesArray = isArrayData ? data : [data];

  const handleNext = () => {
    if (isArrayData) {
      setDirection(1); // Right to left slide
      const nextIndex =
        activeIndex === imagesArray.length - 1 ? 0 : activeIndex + 1;
      if (propSetActiveIndex) {
        propSetActiveIndex(nextIndex);
      } else {
        setInternalActiveIndex(nextIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (isArrayData) {
      setDirection(-1); // Left to right slide
      const prevIndex =
        activeIndex === 0 ? imagesArray.length - 1 : activeIndex - 1;
      if (propSetActiveIndex) {
        propSetActiveIndex(prevIndex);
      } else {
        setInternalActiveIndex(prevIndex);
      }
    }
  };

  // Set up keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    //eslint-disable-next-line
  }, [activeIndex]);

  const currentImage = isArrayData ? imagesArray[activeIndex] : data;

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative flex w-fit max-w-fit items-center justify-center bg-gray-100/10 p-2 rounded-md"
    >
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.caption}
              width={1000}
              height={700}
              className="rounded-lg"
              placeholder="blur"
              blurDataURL={currentImage.src}
              loading="lazy"
            />
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 inset-x-0 px-4 py-3 bg-black/80 z-10 text-white rounded"
            >
              {currentImage.caption}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isArrayData && imagesArray.length > 1 && (
        <>
          <Button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-all duration-200"
            aria-label="Previous image"
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Next button */}
          <Button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-all duration-200"
            aria-label="Next image"
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm z-20"
          >
            {activeIndex + 1} / {imagesArray.length}
          </motion.div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {imagesArray.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  if (propSetActiveIndex) {
                    propSetActiveIndex(index);
                  } else {
                    setInternalActiveIndex(index);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ImageSlider;
