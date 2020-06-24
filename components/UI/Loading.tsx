import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';
import CenteredView from './CenteredView';

interface Props {
  size?: 'small' | 'large';
}

const Loading = ({ size = 'large' }: Props) => (
  <CenteredView>
    <ActivityIndicator size={size} color={colors.primary} />
  </CenteredView>
);

export default Loading;
