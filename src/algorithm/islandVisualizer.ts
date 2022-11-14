export function* getNumberOfIslandsAsync(grid: boolean[][]) {
  let gridClone = grid.map((row) => [...row]); // clone the grid to avoid mutation
  const vistedGridCells = Array.from(
    new Array(grid.length),
    () => new Array(grid[0].length)
  );

  for (let i = 0; i < gridClone.length; i++) {
    for (let j = 0; j < gridClone[0].length; j++) {
      if (gridClone[i][j]) {
        vistedGridCells[i][j] = true;
        yield* countIslandsAsync(
          gridClone,
          vistedGridCells,
          i,
          j,
          gridClone.length,
          gridClone[0].length
        );
      } else if (!vistedGridCells[i][j]) {
        yield { i, j };
      }
    }
  }
}

export function* countIslandsAsync(
  gridClone: boolean[][],
  vistedGridCells: boolean[][],
  i: number,
  j: number,
  m: number,
  n: number
): any {
  if (i >= m || j >= n || i < 0 || j < 0) return;
  if (!gridClone[i][j]) return;

  yield { i, j };

  vistedGridCells[i][j] = true;
  gridClone[i][j] = false;
  yield* countIslandsAsync(gridClone, vistedGridCells, i, j + 1, m, n);
  yield* countIslandsAsync(gridClone, vistedGridCells, i, j - 1, m, n);
  yield* countIslandsAsync(gridClone, vistedGridCells, i + 1, j, m, n);
  yield* countIslandsAsync(gridClone, vistedGridCells, i - 1, j, m, n);
}
