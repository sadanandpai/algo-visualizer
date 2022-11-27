import island from '../assets/island.svg';
import water from '../assets/water.svg';

export const pageHeader = '🌴 Number of Islands 🌴';
export const rowControl = {
  label: 'Rows',
  min: 4,
  max: 10,
  initialValue: 4,
};
export const columnControl = {
  label: 'Columns',
  min: 4,
  max: 10,
  initialValue: 5,
};
export const optionsControl = [{ label: 'Land', checked: true }, { label: 'Water' }];

export const images = {
  island,
  water,
};

export const countIslandBtnText = 'Mark Islands';
export const resetBtnText = 'Reset';
