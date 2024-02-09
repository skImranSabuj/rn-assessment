import {ColorObject} from '../types/types';

// Only defined colors will be used
// Exception: if new color is added please update the ColorObject type
export const defaultBaseColors = {
  primary: '#4569FF',
  secondary: '#66FCDF',
  accent: '#A0AAC0',
  neutral: '#EFEFEF',
  background: '#FFFFFF',
  onBackground: '#002022',
  surface: '#F4F4F4',
  onSurface: '#002022',
  primaryBackground: '#B7DCF6',
  success: '#00BE29',
};

export const defaultDarkThemeColors = {
  ...defaultBaseColors,
  primary: '#193832',
  background: '#0A282E',
  onBackground: '#F4F4F4',
  surface: '#002023',
  onSurface: '#FFFFFF',
  primaryBackground: '#004E5D',
  success: '#75ffe0',
};

const Colors: ColorObject = {
  ...defaultBaseColors,
  white: '#FFFFFF',
  gray: '#999898',
  yellow: '#FFBA07',
  black: '#000000',
  red: '#E64438',
  violate: '#5D5FEF',
  transperant: 'transperant',
};

export default Colors;
