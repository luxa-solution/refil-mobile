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
    height: '100%',
  },
  heroImage: {
    flex: 1,
    backgroundColor: '#f5f5f5', // placeholder for image
  },
  waveContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 20,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    minHeight: '35%',
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
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  buttonFull: {
    flex: 1,
  },
}));
