import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { OutlineButton } from '../components/buttons/OutlineButton';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { useAuthFlowStore } from '../store/authFlowStore';

export function WelcomeScreen() {
  const router = useRouter();
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);

  return (
    <Container animateWave={true}>
      <View style={styles.center}>
        <ContentTitle>Welcome!</ContentTitle>

        <View style={styles.buttonGroup}>
          <PrimaryButton
            title="Create Account"
            onPress={() => {
              resetFlow();
              router.push('/auth/create-account' as Href);
            }}
          />

          <OutlineButton title="Login" onPress={() => router.push('/auth/login' as Href)} />
        </View>

        <Text style={styles.link} onPress={() => router.push('/auth/add-location' as Href)}>
          Continue as Guest?
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  center: {
    flex: 1,
    justifyContent: 'center',
    gap: 44,
  },
  buttonGroup: {
    gap: 24,
  },
  link: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    // marginTop: 10
  },
}));
