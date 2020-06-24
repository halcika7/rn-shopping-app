import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

interface Props {
  style: { [key: string]: string | number };
}

const Card: FC<Props> = ({ children, style }) => (
  <View style={{ ...styles.card, ...style }}>{children}</View>
);

export default Card;
