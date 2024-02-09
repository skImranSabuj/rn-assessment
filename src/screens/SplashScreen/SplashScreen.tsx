import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../types/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Splash from './components/Splash';

export interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'Splash'>;
}

const SplashScreen: React.FC<Props> = props => {

  const handleNavigation = () =>{
    props.navigation.navigate('Home')
  }
  return (
    <Splash handleNavigation={handleNavigation}/>
  );
};

export default SplashScreen;
