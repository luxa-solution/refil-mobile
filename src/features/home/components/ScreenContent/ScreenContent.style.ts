import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
    backgroundColor:
      (theme.colors as any).slate?.[500] || (theme.colors as any).surfaceSecondary || '#EAEDF1',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.typography,
  },
}));
