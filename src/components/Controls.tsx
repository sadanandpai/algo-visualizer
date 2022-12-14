import { optionsControl } from '../helpers/config';

type ChildProps = {
  rows: number;
  cols: number;
  setRows: Function;
  setCols: Function;
  isIsland: boolean;
  setIsIsland: Function;
  isSearchInProgress: boolean;
};

function Controls({ rows, cols, setRows, setCols, isIsland, setIsIsland, isSearchInProgress }: ChildProps) {
  return (
    <>
      <div className="flex gap-2 px-2 md:px-0 md:gap-6 justify-center">
        <label className="flex">
          <span className="label-text mx-2 md:mx-5">Rows</span>
          <input
            type="range"
            min="4"
            max="10"
            value={rows}
            onChange={e => setRows(+e.target.value)}
            className={`range range-xs ${isSearchInProgress && 'cursor-not-allowed'}`}
            disabled={isSearchInProgress}
          />
        </label>
        <label className="flex">
          <span className="label-text mx-5">Columns</span>
          <input
            type="range"
            min="4"
            max="10"
            value={cols}
            onChange={e => setCols(+e.target.value)}
            className={`range range-xs ${isSearchInProgress && 'cursor-not-allowed'}`}
            disabled={isSearchInProgress}
          />
        </label>
      </div>

      <div className="my-4">
        <label className="cursor-pointer inline-flex items-center">
          <span className="label-text mx-5">{optionsControl[0].label}</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-green-500"
            onChange={() => setIsIsland(true)}
            checked={isIsland}
            disabled={isSearchInProgress}
          />
        </label>
        <label className="cursor-pointer inline-flex items-center">
          <span className="label-text mx-5">{optionsControl[1].label}</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-blue-500"
            onChange={() => setIsIsland(false)}
            checked={!isIsland}
            disabled={isSearchInProgress}
          />
        </label>
      </div>
    </>
  );
}

export default Controls;
