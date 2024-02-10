import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

export interface Props {
    height:number;
    width: number;
    item:string
    onPress: ()=>void
    selectedCell: string;
}

const Grid: FC<Props> = ({height,width,item,onPress,selectedCell}) => {
 const [rowStr,colStr] = item.split('/');
 const rowNumber = Number(rowStr);
 const colNumber = Number(colStr);
 
 const isDarkBg = rowNumber%2 === 1 && colNumber%2 === 0 || 
      rowNumber%2 === 0 && colNumber%2 === 1;
 
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
      <View 
        style={[
          tw`flex-1 rounded justify-center item-center `,
          isDarkBg ? tw`bg-slate-800` : tw`bg-slate-700`,
          selectedCell === item ? tw`bg-slate-950` : {},
        ]}>
        <Text style={tw`self-center text-slate-400 opacity-50`}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;