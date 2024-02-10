import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  TextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {Colors, Sizes} from '../../../constants/theme';
import CustomText from '../../atoms/CustomText/CustomText';
import tw from 'twrnc';

export interface Props {
  label: string;
  placeholder?: string | number| null;
  value: string;
  onChangeValue: (value: string) => any;
  type?: 'text' | 'email' | 'password';
  keyboardType?: KeyboardTypeOptions;
  textInputProps?: TextInputProps;
  containerStyle?: ViewStyle;
  inputViewStyle?: ViewStyle;
  inputTextStyle?: TextStyle;
  isEditable?: boolean;
  errorMessage?: string;
  disableDelayDebounceFn?: boolean;
  isValidated?: boolean;
}

export const CustomTextInput: React.FC<Props> = props => {
  const {
    label,
    placeholder,
    value = '',
    onChangeValue,
    type = 'text',
    keyboardType = 'default',
    textInputProps,
    containerStyle,
    inputViewStyle,
    inputTextStyle,
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

  //function reduce the api call or complex rendering
  const callSearchInterval = (value: string) => {
    if (delayDebounceFn != null) {
      clearTimeout(delayDebounceFn);
    }
    setDelayDebounceFn(
      setTimeout(() => {
        onChangeValue(value);
      }, 500),
    );
  };

  return (
    <View style={[defaultStyles.rootView, containerStyle]}>
      {label ? <CustomText variant='subTitle' style={tw`ml mb-2`}>
          {label}
      </CustomText> : null}
      <View
        style={[
          tw`border-2 border-gray-100 rounded`,
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
            tw`rounded-2`,
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
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Sizes[10],
    paddingHorizontal: Sizes[3],
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  inputText: {
    flex: 1,
    fontSize: Sizes[4],
    lineHeight: Sizes[5],
    textAlign: 'left',
  },
  errorView: {
    marginTop: 6,
    marginLeft: 2,
  },
  inputViewForError: {
    borderColor: 'transparent',
    borderWidth: 2,
  },
});

export default CustomTextInput;
