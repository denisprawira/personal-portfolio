import { useMemo } from "react";
import { Breakpoints } from "@/app/utils/breakpoints";

const getColumns = (width: number): number => {
  if (width < Breakpoints.MD) return 1;
  if (width >= Breakpoints.MD && width < Breakpoints.XL) return 2;
  if (width >= Breakpoints.XL && width < Breakpoints.XXL) return 3;
  return 3;
};

function useGridPosition(
  index: number | undefined,
  windowWidth: number,
  length: number
) {
  const numCols = useMemo(() => getColumns(windowWidth), [windowWidth]);

  return useMemo(() => {
    if (index === undefined) {
      return { row: undefined, col: undefined, numCols };
    }

    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const numRows = Math.ceil(length / numCols) as number;
    return { row, col, numRows, numCols };
  }, [index, numCols]);
}

export default useGridPosition;
