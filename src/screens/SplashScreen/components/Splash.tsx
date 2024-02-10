import {View, Text, Image, ImageBackground} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';
import CustomText from '../../../components/atoms/CustomText/CustomText';
import {Colors} from '../../../constants/theme';
import Images from '../../../constants/images';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../components/atoms/CustomButton/CustomButton';

export interface Props {
  handleNavigation: ()=> void;
}

const Spash: FC<Props> = ({handleNavigation}) => {
  const {t} = useTranslation();
  return (
    <ImageBackground source={Images.grid_bg} imageStyle={tw`opacity-30`} style={tw`flex-1 p-4 android:pt-2`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          source={Images.logo}
          resizeMode="contain"
          style={{height: 200, width: 200}}
        />
      </View>
      <View style={tw`flex-1 justify-end`}>
        {/* <CustomText variant="titleLarge" color={Colors.onBackground} center>
          {t('splash.welcom_to')}
        </CustomText> */}
        <CustomButton 
          name={t('splash.lets_start')} 
          onPress={handleNavigation} 
          constainerStyle={tw`mx-4 mb-12`}
        />
      </View>
    </ImageBackground>
  );
};

export default Spash;
