import React from 'react';
import { View } from 'react-native';
import { styles } from './Container.style';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};
