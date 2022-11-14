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
import { getNumberOfIslands, setBorder } from "../algorithm/islandCounter";
import { useEffect, useRef, useState } from "react";

import Controls from "./Controls";
import IslandOrWaterButton from "./IslandOrWaterButton";
import { getNumberOfIslandsAsync } from "../algorithm/islandVisualizer";

function IslandSolver() {
  const [rows, setRows] = useState(rowControl.initialValue);
  const [cols, setCols] = useState(columnControl.initialValue);
  const [grid, setGrid] = useState(getRandomizedGrid(rows, cols));
  const [gridUI, setGridUI] = useState(get2DArrayWithEmptyObject(rows, cols));
  const [isIsland, setIsIsland] = useState(true);
  const [highlightedCell, setHighlightedCell] = useState<{
    i: number;
    j: number;
  }>({ i: -1, j: -1 });
  const [islands, setIslands] = useState<number>();
  const isSearchInProgress = useRef(false);

  const resetGrid = () => {
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
        perimeter += setBorder(
          gridUIClone[next.i][next.j],
          grid,
          next.i,
          next.j
        );

        return gridUIClone;
      });
    }
    isSearchInProgress.current = false;
    setHighlightedCell({ i: -1, j: -1 });
    setIslands(perimeter);
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

      <div className={`inline-grid grid-rows-${rows} grid-cols-${cols}`}>
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
            />
          ))
        )}
      </div>

      <div className="flex flex-col m-4 items-center">
        <button
          className="btn"
          onClick={countIslandsClickHandler}
          disabled={isSearchInProgress.current}
        >
          {countIslandBtnText}
        </button>

        <button className="btn m-4" onClick={resetGrid}>
          {resetBtnText}
        </button>

        <span>No of islands are {getNumberOfIslands(grid).islandCount}</span>
        <span>
          Biggest island has {getNumberOfIslands(grid).biggestIsland} sq. units
        </span>
        <span>
          Smallest island has {getNumberOfIslands(grid).smallestIsland} sq.
          units
        </span>
      </div>
    </>
  );
}

export default IslandSolver;
