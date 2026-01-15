/**
 * `MainLayoutComponent` establishes the app's common screen layout patterns:
 * safe-area handling, optional scrolling with pull-to-refresh, keyboard gestures,
 * background theming, and status bar styling. Use it as the outer wrapper for
 * feature screens to ensure consistent behavior across platforms.
 */
import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  ColorValue,
  Keyboard,
  // RefreshControl,
  StatusBar,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
// import {
//   KeyboardAvoidingView,
//   KeyboardAwareScrollView,
//   KeyboardGestureArea,
// } from 'react-native-keyboard-controller';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { lightTheme } from '@/core/styles/theme';
import globalStyle from '@/shared/utils/globalStyle';
import Box, { ColorToken } from './Box';

// const colors = lightTheme.colors as any;
/**
 * Props for `MainLayoutComponent`.
 *
 * - `children`: Screen content.
 * - `lightBar`: When true with `showBg`, uses `light-content` status bar.
 * - `transparent`: Reserved for transparent backgrounds.
 * - `scrollEnabled`: Wraps content in `KeyboardAwareScrollView` when true.
 * - `showBg`: Toggles status bar style (paired with `lightBar`).
 * - `variant`: Layout variant flag (`'main' | 'secondary'`).
 * - `hideTouchable`: When true, disables the outer `TouchableWithoutFeedback`.
 * - `isRefreshing`: Pull-to-refresh state for the scroll view.
 * - `showIndicator`: Controls the vertical scroll indicator visibility.
 * - `bounces`: Enables iOS bounce behavior in the scroll view.
 * - `avoidKeyboard`: Wraps children in `KeyboardAvoidingView` when true.
 * - `onRefresh`: Callback for pull-to-refresh.
 * - `edges`: Safe-area edges to include in `SafeAreaInsetView`.
 * - `backgroundColor`: Themed color token or raw color for the outer container.
 */
interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  transparent?: boolean;
  scrollEnabled?: boolean;
  showBg?: boolean;
  variant?: 'main' | 'secondary';
  hideTouchable?: boolean;
  isRefreshing?: boolean;
  showIndicator?: boolean;
  bounces?: boolean;
  avoidKeyboard?: boolean;
  onRefresh?: () => void;
  edges?: Edge[];
  backgroundColor?: ColorToken;
}
const MainLayoutComponent: FC<MainLayoutProps> = ({
  scrollEnabled = true,
  lightBar = true,
  edges,
  showBg,
  transparent,
  variant,
  bounces = true,
  backgroundColor,
  showIndicator,
  ...props
}) => {
  return (
    <>
      <SafeAreaInsetView backgroundColor={backgroundColor} edges={edges}>
        <Box
          flex={1}
          style={[
            {
              backgroundColor: 'transparent',
            },
          ]}>
          {/* <KeyboardGestureArea
            interpolator="ios"
            enableSwipeToDismiss
            style={[globalStyle.flexOne]}>
            {scrollEnabled ? (
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={showIndicator}
                refreshControl={
                  props?.onRefresh ? (
                    <RefreshControl
                      refreshing={!!props?.isRefreshing}
                      progressBackgroundColor={colors.primaryDefault}
                      onRefresh={props?.onRefresh}
                      tintColor={colors.primaryDefault}
                    />
                  ) : undefined
                }
                scrollEnabled={scrollEnabled}
                bounces={bounces}
                style={[globalStyle.flexOne, globalStyle.w10]}>
                <InnerItem {...props} lightBar showBg={showBg} />
              </KeyboardAwareScrollView>
            ) : (
              <Box flex={1} style={{}}>
                <InnerItem {...props} lightBar showBg={showBg} />
              </Box>
            )}
          </KeyboardGestureArea> */}
        </Box>
      </SafeAreaInsetView>
    </>
  );
};

/**
 * Internal content wrapper for `MainLayoutComponent` that manages:
 * - Status bar style based on `showBg`/`lightBar`.
 * - Keyboard dismissal via `TouchableWithoutFeedback`.
 * - Optional `KeyboardAvoidingView` when `avoidKeyboard` is true.
 */
const InnerItem: FC<
  Pick<
    MainLayoutProps,
    | 'avoidKeyboard'
    | 'lightBar'
    | 'children'
    | 'hideTouchable'
    | 'showBg'
    | 'variant'
    | 'backgroundColor'
  >
> = ({ children, backgroundColor, avoidKeyboard, lightBar, showBg, hideTouchable, variant }) => {
  return (
    <Box style={[globalStyle.w10, globalStyle.flexOne]}>
      <StatusBar
        barStyle={showBg && lightBar ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Box style={[globalStyle.flexOne, globalStyle.w10]}>
        {hideTouchable ? (
          <>{children}</>
        ) : (
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
            style={[globalStyle.flexOne, globalStyle.w10]}>
            {/* {avoidKeyboard ? (
              <KeyboardAvoidingView behavior="height" style={[globalStyle.flexOne]}>
                {children}
              </KeyboardAvoidingView>
            ) : (
              children
            )} */}
          </TouchableWithoutFeedback>
        )}
      </Box>
    </Box>
  );
};

/**
 * Props for `SafeAreaInsetView`.
 *
 * - `edges`: Safe-area edges to include for automatic padding.
 * - `style`: Additional container styles.
 * - `testID`: Optional test identifier.
 * - `backgroundColor`: Themed color token or raw color applied to the container.
 */
interface insetProps {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
  backgroundColor?: ColorToken;
}
/**
 * Safe-area aware container that applies padding based on the requested `edges`.
 * Accepts a themed `backgroundColor` token or raw color string.
 */
export const SafeAreaInsetView: FC<PropsWithChildren<insetProps>> = ({
  edges = ['top', 'bottom'],
  style,
  testID,
  children,
  backgroundColor,
}) => {
  // const { colors } = useAppTheme();
  const { bottom, left, right, top } = useSafeAreaInsets();
  const insets = useMemo(() => {
    return {
      paddingTop: edges?.includes('top') ? top : undefined,
      paddingBottom: edges?.includes('bottom') ? bottom : undefined,
      paddingLeft: edges?.includes('left') ? left : undefined,
      paddingRight: edges?.includes('right') ? right : undefined,
    };
  }, [bottom, edges, left, right, top]);
  const dynamicStyle = StyleSheet.create((theme) => ({
    base: {
      ...(backgroundColor && {
        backgroundColor: ((theme.colors as any)[backgroundColor] || backgroundColor) as ColorValue,
      }),
    } satisfies ViewStyle,
  }));
  return (
    <Box
      testID={testID}
      style={[insets, globalStyle.w10, globalStyle.flexOne, dynamicStyle.base, style]}>
      {children}
    </Box>
  );
};

export default MainLayoutComponent;
