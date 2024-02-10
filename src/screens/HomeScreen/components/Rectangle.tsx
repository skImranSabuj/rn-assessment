import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, PanResponder, Dimensions, FlatList, Text} from 'react-native';
import Grid from './Grid';
import tw from 'twrnc'
import CustomTextInput from '../../../components/atoms/CustomTextInput/CustomTextInput';
import { generateNumberArray } from '../../../utils/utils';
import CustomText from '../../../components/atoms/CustomText/CustomText';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/atoms/CustomButton/CustomButton';
import GridManagerInputItem from './GridManagerInputItem';
// import Svg, {Rec from 'react-native-svg';t}

const Rectangle = () => {
  const {t} = useTranslation();
  const [rectangles, setRectangles] = useState([]);
  const [activeRectangle, setActiveRectangle] = useState(null);
  const width = Dimensions.get('window').width;
  const height = width;
  const [numberOfRows, setNumberOfRow] = useState(3);
  const [numberOfColumns, setNumberOfColumn] = useState(3);
  // const [cellWidth, setCellWidth] = useState(width / numberOfColumns);
  const cellWidth = width / numberOfColumns;
  const [userDefinedCellWidth, setuserDefinedCellWidth] = useState<number>(0);
  const cellHeight = width / numberOfColumns;
  // const [cellHeight, setCellHeight] = useState(width / numberOfRows);
  const [userDefinedCellheight, setuserDefinedCellHeight] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<string>('');
  const START_INDEX = 1;
  const rowData = generateNumberArray(numberOfRows,START_INDEX)
  const columnData = generateNumberArray(numberOfColumns,START_INDEX)

  const renderGrid = useCallback((rowIndex, columnIndex) => {
    const gridItem = `${rowIndex}/${columnIndex}`;
    return (
        <Grid 
            item={gridItem} 
            height={userDefinedCellheight ? userDefinedCellheight : cellHeight} 
            width={userDefinedCellWidth? userDefinedCellWidth : cellWidth} 
            onPress={()=>{
              console.log({gridItem})
                setSelectedCell(gridItem)
              }
            }
            selectedCell={selectedCell}
        />
  )},[userDefinedCellWidth,userDefinedCellheight, numberOfColumns, numberOfColumns, selectedCell]);

  const renderRows = useCallback(({item})=>{
    const rowIndex = item;
    return <FlatList horizontal showsHorizontalScrollIndicator={false} data={columnData} renderItem={({item,index})=>renderGrid(rowIndex,item)}/>
  },[columnData]);

  useEffect(()=>{

  },[])
console.log({userDefinedCellWidth,userDefinedCellheight})
  return (
    <View
      style={[tw`my-auto flex-1 py-12 border`]}>
      <View style={tw`flex-row mt-4`}>
        <GridManagerInputItem 
          label={t('home.number_of_columns')} 
          value={numberOfColumns}
          handleChangeValue={setNumberOfColumn} 
        />
        <GridManagerInputItem 
          label={t('home.number_of_rows')} 
          value={numberOfRows}
          handleChangeValue={setNumberOfRow} 
        />
      </View>
      <View style={tw`flex-row my-4`}>
        <GridManagerInputItem 
          label={t('home.cell_height')} 
          value={userDefinedCellheight ? userDefinedCellheight : cellHeight}
          handleChangeValue={setuserDefinedCellHeight} 
        />
        <GridManagerInputItem 
          label={t('home.cell_width')} 
          value={userDefinedCellWidth ? userDefinedCellWidth : cellWidth}
          handleChangeValue={setuserDefinedCellWidth} 
        />
      </View>
      <View style={tw`flex-1`}>
        <FlatList
          data={rowData}
          nestedScrollEnabled
          alwaysBounceHorizontal
          contentContainerStyle={[tw`aspect-ratio-h-1 aspect-ratio-w-1 bg-slate-300 border-gray-300 mt-4 border-r-4 border-b-4`]}
          renderItem={renderRows}
        />
      </View>
    </View>
  );
};

export default Rectangle;
