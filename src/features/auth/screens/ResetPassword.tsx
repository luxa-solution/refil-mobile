import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { resetPasswordMutation } from '../api/mutations/reset-password';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { useAuthFlowStore } from '../store/authFlowStore';

export function ResetPasswordScreen() {
  const router = useRouter();

  const otp = useAuthFlowStore((s) => s.otp);
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr(undefined);

    if (!otp) return setErr('Missing OTP. Please restart reset password.');
    if (password.length < 6) return setErr('Password must be at least 6 characters');
    if (password !== confirm) return setErr('Passwords do not match');

    setLoading(true);

    const res = await resetPasswordMutation(
      { otp },
      {
        password,
        // TODO: backend may require additional fields - confirm swagger behavior
      }
    );

    setLoading(false);

    if (!res.ok) return setErr(res.error);

    resetFlow();
    router.replace('/auth/login' as Href);
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
