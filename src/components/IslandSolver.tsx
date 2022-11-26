import {
  columnControl,
  countIslandBtnText,
  pageHeader,
  resetBtnText,
  rowControl,
} from "../helpers/config";
import {
  get2DArrayWithEmptyObject,
  getRandomizedGrid,
} from "../helpers/helper";
import { getCellPerimeter, setBorder } from "../algorithm/islandCounter";
import { useEffect, useRef, useState } from "react";

import { BorderIntf } from "../helpers/interfaces";
import Controls from "./Controls";
import IslandInfo from "./IslandInfo";
import IslandOrWaterButton from "./IslandOrWaterButton";
import { getNumberOfIslandsAsync } from "../algorithm/islandVisualizer";

function IslandSolver() {
  const [rows, setRows] = useState(rowControl.initialValue);
  const [cols, setCols] = useState(columnControl.initialValue);
  const [grid, setGrid] = useState(getRandomizedGrid(rows, cols));
  const [gridUI, setGridUI] = useState<BorderIntf[][]>(
    get2DArrayWithEmptyObject(rows, cols)
  );
  const [isIsland, setIsIsland] = useState(true);
  const [highlightedCell, setHighlightedCell] = useState<{
    i: number;
    j: number;
  }>({ i: -1, j: -1 });
  const [perimeter, setPerimeter] = useState<number>();
  const isSearchInProgress = useRef(false);

  const resetGrid = () => {
    setPerimeter(undefined);
    setGrid(getRandomizedGrid(rows, cols));
    setGridUI(get2DArrayWithEmptyObject(rows, cols));
    isSearchInProgress.current = false;
  };

  useEffect(resetGrid, [rows, cols]);

  const clickHandler = (e: any) => {
    if (isSearchInProgress.current) {
      return;
    }

    let gridClone = grid.map((row) => [...row]);
    const i = e.target.closest("button").dataset.i;
    const j = e.target.closest("button").dataset.j;
    gridClone[i][j] = isIsland;

    setPerimeter(undefined);
    setGrid(gridClone);
    setGridUI(get2DArrayWithEmptyObject(rows, cols));
  };

  const countIslandsClickHandler = async () => {
    setGridUI(get2DArrayWithEmptyObject(rows, cols));

    let perimeter = 0;
    const gen = getNumberOfIslandsAsync(grid);
    isSearchInProgress.current = true;
    for (const next of gen) {
      setHighlightedCell(next);
      await new Promise((r) => setTimeout(r, 250));
      if (!isSearchInProgress.current) {
        break;
      }

      setGridUI((gridUI) => {
        const gridUIClone = gridUI.map((row) => [...row]);
        setBorder(gridUIClone[next.i][next.j], grid, next.i, next.j);
        perimeter += getCellPerimeter(gridUIClone[next.i][next.j]);
        gridUIClone[next.i][next.j].validated = true;
        return gridUIClone;
      });
    }
    isSearchInProgress.current = false;
    setHighlightedCell({ i: -1, j: -1 });
    setPerimeter(perimeter);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">{pageHeader}</h1>

      <Controls
        isIsland={isIsland}
        setIsIsland={setIsIsland}
        rows={rows}
        cols={cols}
        setRows={setRows}
        setCols={setCols}
        isSearchInProgress={isSearchInProgress.current}
      />

      <div
        className={`inline-grid grid-rows-${rows} grid-cols-${cols} max-w-[90%]`}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <IslandOrWaterButton
              key={rows * i + j}
              i={i}
              j={j}
              cell={cell}
              cellUI={gridUI[i][j]}
              highlightedCell={highlightedCell}
              isSearchInProgress={isSearchInProgress.current}
              clickHandler={clickHandler}
              rows={rows}
              cols={cols}
            />
          ))
        )}
      </div>

      <div className="flex justify-center m-4 items-center">
        <button
          className="btn btn-primary"
          onClick={countIslandsClickHandler}
          disabled={isSearchInProgress.current}
        >
          {countIslandBtnText}
        </button>

        <button className="btn btn-outline m-4" onClick={resetGrid}>
          {resetBtnText}
        </button>
      </div>

      <IslandInfo grid={grid} perimeter={perimeter} />
    </>
  );
}

export default IslandSolver;
