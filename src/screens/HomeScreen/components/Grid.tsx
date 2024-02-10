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
          width: width,
          padding:width/75,
        },
        tw`bg-slate-300 justify-center item-center border-gray-300 rounded-2`,
        ] 
      }
    >
      <View style={[{flex:1},tw`rounded justify-center item-center `,selectedCell === item ? tw`bg-slate-500` : tw`bg-slate-400`]}>
        <Text style={tw`self-center text-slate-400 opacity-50`}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;