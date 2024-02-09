import { View, Text } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

export interface Props {
}

const Home: FC<Props> = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Home</Text>
    </View>
  );
}

export default Home;