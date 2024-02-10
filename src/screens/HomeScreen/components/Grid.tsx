import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

export interface Props {
    height:number;
    width: number;
    item:string | number
    onPress: ()=>void
}

const Grid: FC<Props> = ({height,width,item,onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
        style={[{
        height: height ,
        width: width ,
    },tw`bg-slate-400 border-gray-300 justify-center item-center border-l-4 border-t-4`]}>
            <Text style={tw`self-center text-gray-100`}>{item}</Text>
    </TouchableOpacity>
  );
}

export default Grid;