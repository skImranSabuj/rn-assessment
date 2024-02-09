import React, {useRef, useState} from 'react';
import {View, PanResponder, Dimensions, FlatList, Text} from 'react-native';
import Grid from './Grid';
import tw from 'twrnc'
// import Svg, {Rec from 'react-native-svg';t}

const Rectangle = () => {
  const [rectangles, setRectangles] = useState([]);
  const [activeRectangle, setActiveRectangle] = useState(null);
  const width = Dimensions.get('window').width;
  const [cellWidth, setCellWidth] = useState(10);
  const [numberOfRows, setNumberOfRow] = useState(10);
  const [numberOfColumns, setNumberOfColumn] = useState(5);
  const START_INDEX = 1;

  const rowData = Array.from(
    {length: numberOfRows * numberOfColumns},
    (_, i) => i + START_INDEX,
  );

  return (
    <View
      style={[tw`flex-1 p-2`]}>
      <FlatList
        data={rowData}
        numColumns={numberOfColumns}
        nestedScrollEnabled
        alwaysBounceHorizontal
        // horizontal
        renderItem={({item, index}) => (
            <Grid item={item} height={30 || width / numberOfRows} width={150 || width / numberOfColumns}/>
        )}
      />
    </View>
  );
};

export default Rectangle;
