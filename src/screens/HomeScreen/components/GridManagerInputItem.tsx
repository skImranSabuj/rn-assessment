import { View, Text, ViewProps } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';
import CustomTextInput from '../../../components/atoms/CustomTextInput/CustomTextInput';

export interface Props {
    label:string;
    value:number;
    handleChangeValue:(value:number)=>void;
    constainerStyle?:ViewProps
}

const GridManagerInputItem: FC<Props> = ({label, value, handleChangeValue, constainerStyle}) => {
  return (
    <CustomTextInput
      keyboardType='numeric' 
      label={label}
      placeholder={Math.round(value).toString()}
      value={value}
      onChangeValue={(value)=>handleChangeValue(Number(value))} 
      containerStyle={[tw`mx-4 flex-1`,constainerStyle]}
      disableDelayDebounceFn={false}
    />
  );
}

export default GridManagerInputItem;