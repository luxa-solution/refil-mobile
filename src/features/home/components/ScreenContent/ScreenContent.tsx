import React from 'react';
import { Text, View } from 'react-native';
import { EditScreenInfo } from '@/features/home/components/EditScreenInfo/EditScreenInfo';
import MainLayoutComponent from '@/shared/components/Container/MainLayoutComponent';
import { styles } from './ScreenContent.style';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <MainLayoutComponent>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </MainLayoutComponent>
  );
};
