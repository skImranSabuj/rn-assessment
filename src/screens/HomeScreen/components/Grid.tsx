import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

export interface Props {
    height:number;
    width: number;
    item:string | number
    onPress: ()=>void
    selectedCell: string;
}

const Grid: FC<Props> = ({height,width,item,onPress,selectedCell}) => {
  if(item===selectedCell){
console.log(selectedCell)
  }
  return (
    <TouchableOpacity
      onPress={onPress}
        style={[{
          height: height,
          width: width
        },
        tw`justify-center item-center border-l-4 border-t-4 border-gray-300`,
        selectedCell === item ? tw`bg-slate-500 ` : tw`bg-slate-400 `] 
      }
    >
        <Text style={tw`self-center text-slate-400 opacity-50`}>{item}</Text>
    </TouchableOpacity>
  );
}

export default Grid;