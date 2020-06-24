import React from 'react';
import { Text } from 'react-native';
import CenteredView from './CenteredView';

interface Props {
  text: string;
}

const NotFound = ({ text }: Props) => (
  <CenteredView>
    <Text>{text}</Text>
  </CenteredView>
);

export default NotFound;
