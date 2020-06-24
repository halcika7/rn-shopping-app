import React from 'react';
import { Text, Button } from 'react-native';
import colors from '../../constants/colors';
import CenteredView from './CenteredView';

interface Props {
  error: string;
  title: string;
  onPress: () => void;
}

const ErrorComponent = ({ error, title, onPress }: Props) => (
  <CenteredView>
    <Text>{error}</Text>
    <Button title={title} onPress={onPress} color={colors.primary} />
  </CenteredView>
);

export default ErrorComponent;
