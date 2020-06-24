import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CenteredView: FC<{}> = ({ children }) => (
  <View style={styles.centered}>{children}</View>
);

export default CenteredView;
