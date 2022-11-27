import { getNumberOfIslands } from '../algorithm/islandCounter';

type ChildProps = {
  perimeter: number | null;
  grid: boolean[][];
};

const noIslandsElement = (
  <p>
    <strong>No islands found</strong>
  </p>
);

function IslandInfo({ perimeter, grid }: ChildProps) {
  const info = getNumberOfIslands(grid);

  return (
    <>
      {info.islandCount ? (
        <p>
          No of islands are <strong>{info.islandCount}</strong>
        </p>
      ) : (
        noIslandsElement
      )}

      {info.islandCount ? (
        <>
          <p>
            Biggest island has <strong>{info.biggestIsland} sq. units</strong>
          </p>
          <p>
            Smallest island has <strong>{info.smallestIsland} sq. units</strong>
          </p>
          {perimeter ? (
            <p>
              Total perimeter of islands is <strong>{perimeter} units</strong>
            </p>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default IslandInfo;
