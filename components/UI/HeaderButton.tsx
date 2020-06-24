import React from 'react';
import { HeaderButton as Button } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

interface Props {
  title: string;
  iconName: string;
  onPress: () => void;
}

const HeaderButton = (props: Props) => {
  return (
    <Button
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : colors.primary}
    />
  );
};

export default HeaderButton;
