import React, {useCallback, useRef, useState} from 'react';
import {View, PanResponder, Dimensions, FlatList, Text} from 'react-native';
import Grid from './Grid';
import tw from 'twrnc'
import CustomTextInput from '../../../components/atoms/CustomTextInput/CustomTextInput';
import { generateNumberArray } from '../../../utils/utils';
import CustomText from '../../../components/atoms/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/atoms/CustomButton/CustomButton';
// import Svg, {Rec from 'react-native-svg';t}

const Rectangle = () => {
  const {t} = useTranslation();
  const [rectangles, setRectangles] = useState([]);
  const [activeRectangle, setActiveRectangle] = useState(null);
  const width = Dimensions.get('window').width;
  const height = width;
  const [numberOfRows, setNumberOfRow] = useState(10);
  const [numberOfColumns, setNumberOfColumn] = useState(3);
  const [cellWidth, setCellWidth] = useState(width / numberOfColumns);
  const [cellHeight, setCellHeight] = useState(width / numberOfRows);
  const [selectedIndex, setSelectedIndex] = useState<string>('');
  
  const START_INDEX = 1;
  const rowData = generateNumberArray(numberOfRows,START_INDEX)
  const columnData = generateNumberArray(numberOfColumns,START_INDEX)

  const onSelectCell = (cellIndex:string) =>{
    setSelectedIndex(cellIndex)
  }

  const handleColumnChange = (value) =>{
    value = Number(value);
    // value = value > 0 ? value : 1;
    setNumberOfColumn(value);

    setCellWidth(width/value)
  }

  const handleRowChange = (value) =>{
    console.log('handleRowChange val: ',value)
    value = Number.isNaN(Number(value)) ? 0  :  Number(value);
    // value = value > 0 ? value : 1;
    setNumberOfRow(value);

    setCellHeight(width/value)
  }

  const renderGrid = useCallback((rowIndex, columnIndex) => {
    const gridItem = `${rowIndex}/${columnIndex}`;
    return (
        <Grid 
            item={gridItem} 
            height={cellHeight} 
            width={cellWidth} 
            onPress={()=>onSelectCell(gridItem)}
        />
  )},[cellWidth,cellHeight]);

  const renderRows = useCallback(({item})=>{
    const rowIndex = item;
    return <FlatList horizontal showsHorizontalScrollIndicator={false} data={columnData} renderItem={({item,index})=>renderGrid(rowIndex,item)}/>
  },[columnData]);

  return (
    <View
      style={[tw`aspect-ratio-h-1 aspect-ratio-w-1 my-auto height-50 min-h-1/2`]}>
        <View style={tw`flex-row`}>
             <View style={tw`flex-1`}>
                <CustomText variant='title' style={tw`ml-4 my-2`}>
                    {t('home.number_of_columns')}
                </CustomText>
                <View>
                    <CustomTextInput 
                        keyboardType='numeric' 
                        label="Number of Columns" 
                        value={numberOfColumns.toString()}
                        onChangeValue={handleColumnChange} 
                        containerStyle={tw`mx-4`}
                    />
                </View>
            </View>
            <View style={tw`flex-1`}>
                <CustomText variant='title' style={tw`ml-4 my-2`}>
                    {t('home.number_of_rows')}
                </CustomText>
                <View>
                    <CustomTextInput 
                        keyboardType='numeric' 
                        label="Number of Columns" 
                        value={numberOfRows.toString()}
                        onChangeValue={handleRowChange} 
                        containerStyle={tw`mx-4`}
                        // disableDelayDebounceFn

                    />
                </View>
            </View>
        </View>
      <FlatList
        data={rowData}
        // numColumns={numberOfColumns}
        nestedScrollEnabled
        alwaysBounceHorizontal
        contentContainerStyle={[tw`aspect-ratio-h-1 aspect-ratio-w-1 bg-slate-300 border-gray-300 mt-4 border-r-4 border-b-4`]}
        renderItem={renderRows}
      />
    </View>
  );
};

export default Rectangle;
