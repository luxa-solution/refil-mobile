import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { useAuthFlowStore } from '../store/authStore';

export function ResetPasswordScreen() {
  const router = useRouter();
  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr(undefined);
    if (password.length < 6) return setErr('Password must be at least 6 characters');
    if (password !== confirm) return setErr('Passwords do not match');

    setLoading(true);
    try {
      // TODO: replace with real reset password endpoint when confirmed
      // await resetPasswordMutation({ phoneNumber, password });

      resetFlow();
      router.replace('/auth/login' as Href);
    } catch (e: any) {
      setErr(e?.message ?? 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Set New Password</ContentTitle>

        <TextField
          label="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••"
        />
        <TextField
          label="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          placeholder="••••••"
          error={err}
        />

        <PrimaryButton title="Save" onPress={submit} loading={loading} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
}));
