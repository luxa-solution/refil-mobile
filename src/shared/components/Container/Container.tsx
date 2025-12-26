/**
 * `ScreenContainer` provides a safe-area aware screen wrapper with optional padding,
 * theming, scroll handling, and iOS keyboard avoidance. It centralizes common
 * screen scaffolding concerns for consistent layouts.
 */
import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '@/core/styles/responsive_scale';
import { styles } from './Container.style';

const isIOS = () => Platform.OS === 'ios';

/**
 * Convenience constant for horizontal edges.
 */
export const edgesHorizontal = ['left', 'right'] as Edge[];
/**
 * Convenience constant for vertical edges.
 */
export const edgesVertical = ['top', 'bottom'] as Edge[];
/**
 * Convenience constant for all edges.
 */
export const edgesAll = [...edgesHorizontal, ...edgesVertical] as Edge[];

/**
 * Props for `ScreenContainer`.
 *
 * - `containerStyle`: Style applied to the outer SafeAreaView.
 * - `contentStyle`: Style applied to the inner content wrapper.
 * - `withPadding`: Enables horizontal/vertical padding via `paddingHorizontal`/`paddingVertical`.
 * - `paddingHorizontal`/`paddingVertical`: Padding values in DP, scaled using `wp`/`hp`.
 * - `edges`: Safe-area edges to include; defaults to left, right, top.
 * - `statusBarStyle`/`hideStatusBar`: Reserved for status bar control (currently not used here).
 * - `backgroundColor`: Explicit background; if omitted, uses light/dark theme based on `useColorScheme`.
 * - `isLoading`: Reserved for future loading states.
 * - `scrollable`: When true, wraps content in `ScrollView` and forwards `scrollViewProps`.
 * - `keyboardShouldAvoidView`: When true on iOS, wraps with `KeyboardAvoidingView`.
 * - `useThemedView`: Reserved for theme-driven variants (default true).
 * - `forceTheme`: Override system theme (`'light' | 'dark'`).
 */
export interface ScreenContainerProps {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  // Add control for padding
  withPadding?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  // Add control for edges
  edges?: Edge[];
  // Add control for status bar
  statusBarStyle?: 'light-content' | 'dark-content';
  hideStatusBar?: boolean;
  // Add control for background color
  backgroundColor?: string;
  // Add loading state
  isLoading?: boolean;
  // Add scroll capability flag
  scrollable?: boolean;
  // Add keyboard handling
  keyboardShouldAvoidView?: boolean;
  scrollViewProps?: ScrollViewProps;
  // Add themed functionality control
  useThemedView?: boolean;
  // Add theme override
  forceTheme?: 'light' | 'dark';
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  containerStyle,
  contentStyle,
  withPadding = true,
  paddingHorizontal = 20,
  paddingVertical = 0,
  edges = ['left', 'right', 'top'],
  scrollable = false,
  keyboardShouldAvoidView = false,
  scrollViewProps,
  useThemedView = true, // Default to true for themed behavior
  forceTheme,
  backgroundColor,
}) => {
  const colorScheme = useColorScheme();
  const currentTheme = forceTheme || colorScheme || 'light';

  // Calculate padding based on props and insets
  const padding = {
    paddingHorizontal: withPadding ? wp(paddingHorizontal) : 0,
    paddingVertical: withPadding ? hp(paddingVertical) : 0,
  };

  // Get themed background color
  const getThemedBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    return currentTheme === 'dark' ? '#000000' : '#FFFFFF';
  };

  // Determine the content component based on scrollable prop
  const ContentWrapper = scrollable ? ScrollView : View;

  // Keyboard avoiding view for iOS
  const KeyboardWrapper =
    keyboardShouldAvoidView && Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: getThemedBackgroundColor() }, containerStyle]}
      edges={edges}>
      <KeyboardWrapper style={styles.keyboardWrapper} behavior={isIOS() ? 'padding' : undefined}>
        <View style={styles.themedContainer}>
          <ContentWrapper
            style={[styles.content, padding, contentStyle]}
            showsVerticalScrollIndicator={false}
            {...(scrollable && scrollViewProps)}>
            {children}
          </ContentWrapper>
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default ScreenContainer;
