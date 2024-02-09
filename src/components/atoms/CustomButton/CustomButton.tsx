import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';

export interface Props {
  name: string;
  onPress?: () => void;
}

const CustomButton: FC<Props> = props => {
  const {name, onPress} = props;
  return (
    <TouchableOpacity style={[tw`px py-1.5 justify-center items-center rounded-full my-2 bg-sky-400 `]} onPress={()=>onPress ? onPress() : null}>
      <Text style={[tw`text-neutral-50`]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
