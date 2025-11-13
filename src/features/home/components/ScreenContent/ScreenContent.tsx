import React from 'react';
import { Text, View } from 'react-native';
import { EditScreenInfo } from '../EditScreenInfo/EditScreenInfo';
import { styles } from './ScreenContent.style';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
