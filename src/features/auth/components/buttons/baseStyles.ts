// ui/buttonStyles.ts
import { StyleSheet } from 'react-native-unistyles';

export const buttonBaseStyles = StyleSheet.create((theme) => ({
  btnBase: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    fontSize: 21,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.92,
  },
}));
