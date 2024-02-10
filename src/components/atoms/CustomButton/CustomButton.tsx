import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';

export interface Props {
  name: string;
  onPress?: () => void;
  constainerStyle?: ViewStyle;
}

const CustomButton: FC<Props> = props => {
  const {name, onPress, constainerStyle} = props;
  return (
    <TouchableOpacity style={[tw`h-12 px py-1.5 justify-center items-center rounded-2 my-2 bg-sky-400`, constainerStyle]} onPress={()=>onPress ? onPress() : null}>
      <Text style={tw`text-neutral-50 text-xl uppercase`}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
