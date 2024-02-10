import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import Colors from '../../../constants/Colors';
import {Sizes} from '../../../constants/theme';

type Variant =
  | 'title'
  | 'titleSmall'
  | 'titleLarge'
  | 'subTitle'
  | 'subTitleSmall'
  | 'subTitleLarge'
  | 'body'
  | 'bodySmall'
  | 'bodyLarge'
  | 'caption'
  | 'button';

interface CustomTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  style?: TextStyle;
  center?: boolean;
  isLink?: boolean;
  onPress?: () => void;
}

const CustomText: React.FC<CustomTextProps> = props => {
  const {
    variant = 'body',
    color = Colors.onBackground,
    center = false,
    isLink = false,
    style,
    onPress,
    ...restProps
  } = props;

  const textStyles: TextStyle[] = [
    styles[variant],
    isLink ? {textDecorationLine: 'underline', color: Colors.primary} : {},
    {color, textAlign: center ? 'center' : 'left'},
  ];

  return (
    <Text
      style={[...textStyles, style]}
      onPress={() => (onPress ? onPress() : null)}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Sizes[5],
    fontWeight:'600',
  },
  subTitle: {
    fontSize: Sizes[4],
    fontWeight:'500',
  },
  body: {
    fontSize: Sizes[3],
  },
  titleSmall: {
    fontSize: Sizes[4],
  },
  subTitleSmall: {
    fontSize: Sizes[3],
  },
  bodySmall: {
    fontSize: Sizes[2],
  },
  titleLarge: {
    fontSize: Sizes[6],
  },
  subTitleLarge: {
    fontSize: Sizes[5],
  },
  bodyLarge: {
    fontSize: Sizes[4],
  },
});

export default CustomText;
