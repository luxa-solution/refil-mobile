import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Prop = {
  children: React.ReactNode;
};

export function ContentTitle({ children }: Prop) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: theme.colors.textDefaultHeading,
    // marginBottom: 6
  },
}));
