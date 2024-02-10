import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  TextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Text,
  Image,
} from 'react-native';
import appDimens from '../../../constants/Dimens';
// import InputLabel from '../../atoms/InputLabel/InputLabel';
import Images from '../../../constants/Images';
import {Colors, Sizes} from '../../../constants/theme';
import CustomText from '../../atoms/CustomText/CustomText';
import tw from 'twrnc';

export interface Props {
  label: string;
  isOptional?: boolean;
  placeholder?: string | null;
  value?: string;
  onChangeValue: (value: string) => any;
  type?: 'text' | 'email' | 'password';
  keyboardType?: KeyboardTypeOptions;
  textInputProps?: TextInputProps;
  containerStyle?: ViewStyle;
  inputViewStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  iconLeft?: string;
  suffixIcon?: string;
  isEditable?: boolean;
  errorMessage?: string;
  disableDelayDebounceFn?: boolean;
  isValidated?: boolean;
}

export const CustomTextInput: React.FC<Props> = props => {
  const {
    label,
    isOptional,
    placeholder,
    value = '',
    onChangeValue,
    type = 'text',
    keyboardType = 'default',
    textInputProps,
    containerStyle,
    inputViewStyle,
    inputTextStyle,
    iconLeft,
    suffixIcon,
    isEditable = true,
    errorMessage = '',
    disableDelayDebounceFn = true,
    isValidated = false,
  } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [textValue, setTextValue] = useState<string>(value);
  const [delayDebounceFn, setDelayDebounceFn] = useState<any>(null);
  const themeColors = Colors;
  useEffect(() => {
    return () => {
      if (delayDebounceFn != null) {
        clearTimeout(delayDebounceFn);
      }
    };
  }, []);

  //function reduce the api call, because we should not called api until user finish typing
  const callSearchInterval = (value: string) => {
    if (delayDebounceFn != null) {
      clearTimeout(delayDebounceFn);
    }
    setDelayDebounceFn(
      setTimeout(() => {
        // console.log('searchTerm', value)
        onChangeValue(value);
      }, 500),
    );
  };

  return (
    <View style={[defaultStyles.rootView, containerStyle]}>
      <View
        style={[
          defaultStyles.inputOuterView,
          tw`border-2 border-gray-100`,
          isValidated
            ? {borderColor: Colors.success}
            : errorMessage
            ? {borderColor: Colors.red}
            : isFocused
            ? tw`border-gray-400 bg-sky-100 border-2`
            : {},
        ]}>
        <View
          style={[
            defaultStyles.inputView,
            {backgroundColor: Colors.white},
            inputViewStyle,
            isValidated
              ? tw`bg-red-500/[.06]`
              : errorMessage
              ? {
                  ...defaultStyles.inputViewForError,
                  backgroundColor: Colors.surface,
                }
              : {},
            isFocused ? {borderWidth: 0} : {},
          ]}>
          {iconLeft && (
            <View
              style={[
                tw`justify-center items-center`,
                {
                  height: Sizes[6],
                  width: Sizes[6],
                  // borderWidth: 1,
                  borderRadius: Sizes[3],
                  borderColor: themeColors.accent,
                  marginRight: Sizes[2],
                },
              ]}>
              {/* <Icon
                name={iconLeft}
                size={18}
                // style={{marginLeft: 10}}
                color={showPassword ? Colors.primary : Colors.accent}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel="eye-icon"
              /> */}
            </View>
          )}
          {disableDelayDebounceFn ? (
            <TextInput
              editable={isEditable}
              style={[
                defaultStyles.inputText,
                {color: Colors.onBackground},
                inputTextStyle,
              ]}
              placeholder={placeholder ? placeholder : label}
              placeholderTextColor={Colors.accent}
              value={value}
              onChangeText={onChangeValue}
              autoCorrect={false}
              keyboardType={keyboardType}
              secureTextEntry={type === 'password' ? !showPassword : false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...textInputProps}
              selectionColor={Colors.primary}
            />
          ) : (
            <TextInput
              editable={isEditable}
              style={[
                defaultStyles.inputText,
                {color: Colors.onBackground},
                inputTextStyle,
              ]}
              placeholder={
                placeholder ? placeholder : textValue ? textValue : label
              }
              placeholderTextColor={Colors.accent}
              defaultValue={textValue || value}
              onChangeText={value => {
                disableDelayDebounceFn
                  ? onChangeValue(value)
                  : callSearchInterval(value);
                setTextValue(value);
              }}
              autoCorrect={false}
              keyboardType={keyboardType}
              secureTextEntry={type === 'password' ? !showPassword : false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...textInputProps}
              selectionColor={Colors.primary}
            />
          )}

        </View>
      </View>
      {errorMessage ? (
        <View style={[tw`flex-row items-center`, defaultStyles.errorView]}>
          {/* <Image
            source={Images.ic_warning}
            resizeMode="contain"
            style={defaultStyles.warningIcon}
          /> */}
          {/* errorText: {
            fontFamily: Fonts.semiBoldFont,
            fontSize: 12,
            lineHeight: 18,
            color: Colors.red,
            textAlign: 'left',
            marginLeft: 5.33,
          },
           */}

          <CustomText variant="caption" style={{marginLeft: Sizes[2]}}>
            {errorMessage}
          </CustomText>
        </View>
      ) : null}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  rootView: {
    flexDirection: 'column',
  },
  inputOuterView: {
    // borderWidth: 2,
    borderRadius: Sizes[12] * 2,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Sizes[12],
    paddingHorizontal: Sizes[3],
    borderRadius: Sizes[12] * 2,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  inputText: {
    flex: 1,
    // fontFamily: Fonts.mediumFont,
    fontSize: Sizes[4],
    lineHeight: Sizes[5],

    textAlign: 'left',
  },
  errorView: {
    marginTop: 6,
    marginLeft: 2,
  },

  warningIcon: {
    height: Sizes[3],
    width: Sizes[3],
  },
  inputViewForError: {
    borderColor: 'transparent',
    borderWidth: 2,
  },
});

export default CustomTextInput;
