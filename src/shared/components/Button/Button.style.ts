import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ms, wp as scale } from '@/core/styles/responsive_scale';

import type { ButtonVariant } from './Button';

export const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: 'center',
    borderRadius: scale(24),
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: scale(52),
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    // Platform-specific elevation
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          height: 2,
          width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  fullWidth: {
    alignSelf: 'stretch',
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },

  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  iconContainer: {
    marginRight: scale(8),
  },

  buttonText: {
    fontSize: ms(16),
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  // Variant: filled
  filled: {
    backgroundColor: theme.colors.primaryDefault,
    borderWidth: 0,
  },

  filledText: {
    color: theme.colors.background,
  },

  // Variant: outline
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primaryDefault,
    borderWidth: scale(1.5),
  },

  outlineText: {
    color: theme.colors.primaryDefault,
  },

  // Variant: ghost
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  ghostText: {
    color: theme.colors.primaryDefault,
  },
}));

/**
 * Helper to get variant-specific button style
 */
export const getVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return styles.filled;
    case 'outline':
      return styles.outline;
    case 'ghost':
      return styles.ghost;
    default:
      return styles.filled;
  }
};

/**
 * Helper to get variant-specific text style
 */
export const getTextStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return styles.filledText;
    case 'outline':
      return styles.outlineText;
    case 'ghost':
      return styles.ghostText;
    default:
      return styles.filledText;
  }
};

/**
 * Helper to get variant-specific spinner color
 */
export const getSpinnerColor = (variant: ButtonVariant, themeColors: any) => {
  switch (variant) {
    case 'filled':
      return themeColors.background;
    case 'outline':
    case 'ghost':
      return themeColors.primaryDefault;
    default:
      return themeColors.background;
  }
};
