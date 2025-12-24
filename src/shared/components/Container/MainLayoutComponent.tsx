import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  ColorValue,
  Keyboard,
  RefreshControl,
  StatusBar,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardGestureArea,
} from 'react-native-keyboard-controller';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { lightTheme } from '../../../core/styles/theme';
import globalStyle from '../../utils/globalStyle';
import Box, { ColorToken } from './Box';

const colors = lightTheme.colors as any;
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
          <KeyboardGestureArea
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
          </KeyboardGestureArea>
        </Box>
      </SafeAreaInsetView>
    </>
  );
};

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
            {avoidKeyboard ? (
              <KeyboardAvoidingView behavior="height" style={[globalStyle.flexOne]}>
                {children}
              </KeyboardAvoidingView>
            ) : (
              children
            )}
          </TouchableWithoutFeedback>
        )}
      </Box>
    </Box>
  );
};

interface insetProps {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
  backgroundColor?: ColorToken;
}
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
