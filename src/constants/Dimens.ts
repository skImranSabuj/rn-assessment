import {Dimensions, Platform} from 'react-native';
import {SizesType} from '../types/types';

// Multiples of 4 for consistent spacing in UI.
export const defaultSizes: SizesType = [
  0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
];

const appLeftMargin = defaultSizes[3];
const appRightMargin = defaultSizes[3];
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const isPlatformIOS = Platform.OS === 'ios';
export const ZERO = 0;
export const ONE = 1;


const appDimens = {
  appLeftMargin: appLeftMargin,
  appRightMargin: appRightMargin,
  rootPaddingHorizontal: defaultSizes[5],
  headerHeight: isPlatformIOS ? defaultSizes[11] * 2 : defaultSizes[14],
  //screen dimention
  screenWidth: width,
  screenHeight: isPlatformIOS ? height : height + 40,
  contentWidth: width - (appLeftMargin + appRightMargin),
};

export default appDimens;
