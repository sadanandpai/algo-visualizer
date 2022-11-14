export const getRandomizedGrid = (rows: number, cols: number) => {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.random() > 0.5);
    }
    grid.push(row);
  }

  return grid;
};

export const get2DArrayWithEmptyObject = (rows: number, cols: number) => {
  return Array.from(new Array(rows), () =>
    Array.from(new Array(cols), () => ({}))
  );
};
