import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { registerMutation } from '../api/mutations/register';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useAuthFlowStore } from '../store/authStore';

export function AddPasswordScreen() {
  const router = useRouter();

  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);
  const firstName = useAuthFlowStore((s) => s.firstName);
  const lastName = useAuthFlowStore((s) => s.lastName);
  const setMode = useAuthFlowStore((s) => s.setMode);
  const setNextAfterVerify = useAuthFlowStore((s) => s.setNextAfterVerify);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(undefined);
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');
    if (!phoneNumber || !firstName || !lastName)
      return setError('Missing signup details. Please restart signup.');

    setLoading(true);
    try {
      // await registerMutation({
      //   firstName,
      //   lastName,
      //   phoneNumber,
      //   password,
      //   roles: [ 'user' ],
      // });

      setMode('signup');
      setNextAfterVerify('add-location');

      router.replace('/auth/otp-verify' as Href);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Add Password</ContentTitle>

        <View style={styles.inputGroup}>
          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••"
            error={error}
          />
          <TextField
            label="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder="••••••"
          />
        </View>

        <PrimaryButton title="Get Started" onPress={submit} loading={loading} />

        <StepDots activeIndex={2} count={4} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 40,
  },
  inputGroup: {
    gap: 20,
  },
}));
