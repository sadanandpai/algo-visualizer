import { getNumberOfIslands } from "../algorithm/islandCounter";

function IslandInfo({ perimeter, grid }: any) {
  const info = getNumberOfIslands(grid);

  return (
    <>
      <p>
        No of islands are <strong>{info.islandCount}</strong>
      </p>
      <p>
        Biggest island has <strong>{info.biggestIsland} sq. units</strong>
      </p>
      <p>
        Smallest island has <strong>{info.smallestIsland} sq. units</strong>
      </p>
      {perimeter && (
        <p>
          Total perimeter of islands is <strong>{perimeter} units</strong>
        </p>
      )}
    </>
  );
}

export default IslandInfo;
