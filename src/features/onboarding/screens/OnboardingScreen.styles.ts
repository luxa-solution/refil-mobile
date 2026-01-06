import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flatListContainer: {
    flex: 1,
  },
  slideContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  hero: {
    width: '100%',
    height: '65%',
  },
  overlayCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    minHeight: '40%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontFamily: 'Geist',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: 1.04,
    textAlign: 'left',
    color: theme.colors.textDefaultHeading,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Geist',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16.45,
    lineHeight: 16.45,
    letterSpacing: 0,
    color: theme.colors.textDefaultBody,
    textAlign: 'left',
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  buttonHalf: {
    flex: 1,
  },
}));
