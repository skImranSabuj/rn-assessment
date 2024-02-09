import React from 'react';
import {RootStackParamList} from '../../types/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Rectangle from './components/Rectangle';

export interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<Props> = props => {

  return (
    <Rectangle />
  );
};

export default HomeScreen;
