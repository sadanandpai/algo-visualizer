import { BorderIntf, CellPosition } from '../helpers/interfaces';

import { MouseEventHandler } from 'react';
import { images } from '../helpers/config';

type ChildProps = {
  i: number;
  j: number;
  cell: boolean;
  cellUI: BorderIntf;
  highlightedCell: CellPosition;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  isSearchInProgress: boolean;
};

const islandImage = <img src={images.island} alt="island" className="max-h-full h-20" />;
const waterImage = <img src={images.water} alt="water" className="max-h-full h-20" />;

function IslandOrWaterButton({ i, j, cell, cellUI, highlightedCell, clickHandler, isSearchInProgress }: ChildProps) {
  return (
    <button
      className={`bg-white flex align-center justify-center p-1 aspect-square border-4 border-transparent ${
        cellUI.left ? 'border-l-4 border-l-green-600' : ''
      } ${cellUI.right ? 'border-r-4 border-r-green-600' : ''} ${cellUI.top ? 'border-t-4 border-t-green-600' : ''} ${
        cellUI.bottom ? 'border-b-4 border-b-green-600' : ''
      } ${highlightedCell.i === i && highlightedCell.j === j ? 'scale-75' : ''} ${
        isSearchInProgress ? 'cursor-not-allowed' : ''
      }`}
      data-i={i}
      data-j={j}
      onClick={clickHandler}
    >
      {cell ? islandImage : waterImage}
    </button>
  );
}

export default IslandOrWaterButton;
