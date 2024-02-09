import {ColorObject} from '../types/types';
import defaultColors, {
  defaultBaseColors,
  defaultDarkThemeColors,
} from './Colors';
import appDimens, {defaultSizes, isPlatformIOS} from './Dimens';
// import App, {defaultSizes, isPlatformIOS} from './Dimens';

export const Colors: ColorObject = defaultColors;
export const BaseColors = defaultBaseColors;
export const DarkThemeColors = defaultDarkThemeColors;
export const Dimens = appDimens;
export const Sizes = defaultSizes;
export const isIOS = isPlatformIOS;

const Theme = {Colors, BaseColors, DarkThemeColors, Dimens, isIOS};

export default Theme;
