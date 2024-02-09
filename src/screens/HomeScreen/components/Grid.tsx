import { View, Text } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

export interface Props {
    height:number;
    width: number;
    item:string | number

}

const Grid: FC<Props> = ({height,width,item}) => {
  return (
    <View
        style={[{
        height: height ,
        width: width ,
    },tw`border`]}>
    <Text>{item}</Text>
    </View>
  );
}

export default Grid;