import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, PanResponder, Dimensions, FlatList, Text} from 'react-native';
import Grid from './Grid';
import tw from 'twrnc'
import { generateNumberArray } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';
import GridManagerInputItem from './GridManagerInputItem';
import { Dimens } from '../../../constants/theme';

const Rectangle = () => {
  const {t} = useTranslation();
  const [rectangleWidth, setRectangleWidth] = useState(Dimens.contentWidth);
  const [rectangleHeight, setRectangleHeight] = useState(Dimens.contentWidth);
  const [numberOfRows, setNumberOfRow] = useState(3);
  const [numberOfColumns, setNumberOfColumn] = useState(3);
  const cellWidth = rectangleWidth / numberOfColumns;
  const [userDefinedCellWidth, setuserDefinedCellWidth] = useState<number>(0);
  const cellHeight = rectangleWidth / numberOfRows;
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
  )},
  [
    userDefinedCellWidth,
    userDefinedCellheight, 
    numberOfColumns,
    numberOfRows, 
    selectedCell,
    rectangleHeight,
    rectangleWidth
  ]);

  const renderRows = useCallback(({item})=>{
    const rowIndex = item;
    return <FlatList horizontal showsHorizontalScrollIndicator={false} data={columnData} renderItem={({item,index})=>renderGrid(rowIndex,item)}/>
  },[columnData]);

  useEffect(()=>{

  },[])
console.log({userDefinedCellWidth,userDefinedCellheight})
  return (
    <View
      style={[tw`flex-1 py-12 border`]}>
      <View style={tw`flex-row mt-4`}>
        <GridManagerInputItem 
          label={t('home.height_of')} 
          value={rectangleHeight}
          handleChangeValue={setRectangleHeight} 
        />
        <GridManagerInputItem 
          label={t('home.width_of')} 
          value={rectangleWidth}
          handleChangeValue={setRectangleWidth} 
        />
      </View>
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
      <View style={
            [tw`items-center mx-auto rounded-2 overflow-hidden mt-4`,  
            {height:rectangleHeight,width:rectangleWidth}]}>
        <FlatList
          data={rowData}
          nestedScrollEnabled
          contentContainerStyle={[tw`bg-slate-300 border-gray-800 rounded-2`]}
          renderItem={renderRows}
        />
      </View>
    </View>
  );
};

export default Rectangle;
