import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth ?? 0,
    height: window.innerHeight ?? 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize size

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default useWindowSize;
