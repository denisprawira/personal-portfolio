import { Breakpoints } from "@/app/utils/breakpoints";
import { useEffect, useState } from "react";

const getColsumns = (width: number): number => {
  if (width < Breakpoints.MD) return 1;
  if (width >= Breakpoints.MD && width < Breakpoints.XL) return 2;
  if (width >= Breakpoints.XL && width < Breakpoints.XXL) return 3;
  return 3;
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
