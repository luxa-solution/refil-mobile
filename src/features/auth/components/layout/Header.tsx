import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { VerificationAnimation } from './VerificationAnimation';

type Props = {
  style?: LinearGradientProps['style'];
  isVerification?: boolean;
};

export function Header({ style, isVerification }: Props) {
  const { theme } = useUnistyles();

  return (
    <LinearGradient
      style={[styles.bg, style]}
      colors={[
        theme.colors.surfaceAuthPageStart,
        theme.colors.surfaceAuthPageMid,
        theme.colors.surfaceAuthPageEnd,
      ]}
      // Diagonal gradient similar to Figma
      start={{ x: 0.85, y: 0.05 }}
      end={{ x: 0.25, y: 0.95 }}
      locations={[0.2, 0.35, 0.7]}>
      <View style={styles.wrap}>{isVerification ? <VerificationAnimation /> : <LogoHeader />}</View>
    </LinearGradient>
  );
}

function LogoHeader() {
  return (
    <>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('@/assets/images/auth/app-logo-white.png')}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>Refill</Text>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  bg: {
    width: '100%',
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 36, // shifts logo up so wave doesn't cover it
  },
  imageWrapper: {
    width: 44,
    height: 72,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  text: {
    marginTop: 6,
    color: theme.colors.textOnColorBody,
    fontWeight: '800',
    fontSize: 28,
    letterSpacing: 0.3,
  },
}));
