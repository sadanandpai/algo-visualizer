import { BorderIntf } from "../helpers/interfaces";

export function getNumberOfIslands(grid: boolean[][]) {
  let gridClone1 = grid.map((row) => [...row]); // clone the grid to avoid mutation
  const vistedGridCells1 = Array.from(
    new Array(grid.length),
    () => new Array(grid[0].length)
  );

  let maxSize = 0,
    minSize = grid.length * grid[0].length,
    islandCount = 0;
  for (let i = 0; i < gridClone1.length; i++) {
    for (let j = 0; j < gridClone1[0].length; j++) {
      if (gridClone1[i][j]) {
        vistedGridCells1[i][j] = true;
        const size = countIslands(
          gridClone1,
          vistedGridCells1,
          i,
          j,
          gridClone1.length,
          gridClone1[0].length
        );
        minSize = Math.min(minSize, size);
        maxSize = Math.max(maxSize, size);
        islandCount++;
      }
    }
  }

  return { islandCount, biggestIsland: minSize, smallestIsland: maxSize };
}

export function countIslands(
  gridClone: boolean[][],
  vistedGridCells: boolean[][],
  i: number,
  j: number,
  m: number,
  n: number,
  size = 0
): any {
  if (i >= m || j >= n || i < 0 || j < 0) return 0;
  if (!gridClone[i][j]) return 0;

  vistedGridCells[i][j] = true;
  gridClone[i][j] = false;
  size++;
  size += countIslands(gridClone, vistedGridCells, i, j + 1, m, n);
  size += countIslands(gridClone, vistedGridCells, i, j - 1, m, n);
  size += countIslands(gridClone, vistedGridCells, i + 1, j, m, n);
  size += countIslands(gridClone, vistedGridCells, i - 1, j, m, n);

  return size;
}

export const setBorder = (
  cell: Partial<BorderIntf>,
  grid: boolean[][],
  i: number,
  j: number
) => {
  let sides = 0;
  if (grid[i][j]) {
    if (!grid[i]?.[j - 1]) {
      cell.left = true;
      sides++;
    }
    if (!grid[i]?.[j + 1]) {
      cell.right = true;
      sides++;
    }
    if (!grid[i - 1]?.[j]) {
      cell.top = true;
      sides++;
    }
    if (!grid[i + 1]?.[j]) {
      cell.bottom = true;
      sides++;
    }
  }
  return sides;
};
