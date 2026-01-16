import { Href, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { useAuthFlowStore } from '../store/authFlowStore';

export function VerificationStatusScreen() {
  const router = useRouter();

  const mode = useAuthFlowStore((s) => s.mode);
  const nextAfterVerify = useAuthFlowStore((s) => s.nextAfterVerify);

  useEffect(() => {
    const t = setTimeout(() => {
      if (mode === 'reset') {
        router.replace('/auth/reset-password' as Href);
        return;
      }

      // signup
      const next = nextAfterVerify ?? 'add-location';
      if (next === 'add-location') router.replace('/auth/add-location' as Href);
      else router.replace('/auth/add-location' as Href); // fallback
    }, 2_000);

    return () => clearTimeout(t);
  }, [mode, nextAfterVerify, router]);

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
