import { images } from "../helpers/config";

const islandImage = <img src={images.island} alt="island" className="h-full" />;
const waterImage = <img src={images.water} alt="water" className="h-full" />;

function IslandOrWaterButton({
  i,
  j,
  cell,
  cellUI,
  highlightedCell,
  clickHandler,
  isSearchInProgress,
}: any) {
  return (
    <button
      className={`border border-grey h-24 w-24 bg-white flex align-center justify-center p-1
              ${cellUI.left && "border-l-4 border-l-green-600"}
              ${cellUI.right && "border-r-4 border-r-green-600"}
              ${cellUI.top && "border-t-4 border-t-green-600"}
              ${cellUI.bottom && "border-b-4 border-b-green-600"}
              ${
                highlightedCell.i === i &&
                highlightedCell.j === j &&
                "scale-110"
              }
              ${isSearchInProgress && "cursor-not-allowed"}
              `}
      data-i={i}
      data-j={j}
      onClick={clickHandler}
    >
      {cell ? islandImage : waterImage}
    </button>
  );
}

export default IslandOrWaterButton;
