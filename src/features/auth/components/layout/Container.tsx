import React from 'react';
import { Dimensions, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Header } from './Header';
import { Wave } from './Wave';

type Props = {
  children: React.ReactNode;
  isVerification?: boolean;
};

const { height: screenHeight } = Dimensions.get('window');

export function Container({ children, isVerification }: Props) {
  return (
    <View style={styles.root}>
      <Header style={styles.header} isVerification={isVerification} />
      <Wave style={styles.wave} height={0.1 * screenHeight} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.surfacePage,
  },
  header: {
    height: '34%',
  },
  wave: {
    position: 'absolute',
    top: '25%', // overlap into gradient like Figma
    left: -10,
    right: 10,
    height: '10%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
}));
