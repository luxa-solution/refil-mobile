import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
    backgroundColor: theme.colors.slate[200],
    overflow: 'hidden',
  },
  filled: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.primaryDefault,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: theme.colors.primaryDefault,
  },
  dotInactive: {
    backgroundColor: theme.colors.slate[200],
  },
}));
