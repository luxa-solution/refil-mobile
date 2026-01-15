import { Href, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SuccessState } from '../components/feedback/SuccessState';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { useAuthFlowStore } from '../store/authStore';

export function VerificationStatusScreen() {
  const router = useRouter();
  const nextAfterVerify = useAuthFlowStore((s) => s.nextAfterVerify);
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);

  useEffect(() => {
    const t = setTimeout(() => {
      if (nextAfterVerify === 'reset-password') {
        router.replace('/auth/reset-password' as Href);
      } else {
        resetFlow();
        router.replace('/auth/add-location' as Href);
      }
    }, 2_000);

    return () => clearTimeout(t);
  }, [nextAfterVerify, resetFlow, router]);

  return (
    <Container isVerification={true}>
      <View style={styles.wrap}>
        <ContentTitle>Verification Successful!</ContentTitle>
        <Text style={styles.sub}>
          {"Please wait.\n You'll be taken to the next screen shortly."}
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 100,
  },
  sub: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    paddingHorizontal: 24,
  },
}));
