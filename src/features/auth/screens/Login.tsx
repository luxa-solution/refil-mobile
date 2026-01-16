import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { loginMutation } from '../api/mutations/login';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { SignupText } from '../components/texts/signup';
import { useAuthTokenStore } from '../store/authTokenStore';
import { isValidPhone } from '../utils/phone';

export function LoginScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const setTokens = useAuthTokenStore((s) => s.setTokens);

  const submit = async () => {
    setErr(undefined);
    if (!isValidPhone(phone)) return setErr('Enter a valid phone number');
    if (!password) return setErr('Enter your password');

    setLoading(true);

    // TODO: remove __DEV__ and allow endpoint
    const res = __DEV__
      ? {
          ok: true,
          error: undefined,
          data: { token: 'token' },
        }
      : await loginMutation({ phoneNumber: phone, password });

    setLoading(false);

    if (!res.ok) return setErr(res.error);

    // TODO: confirm token response shape from /login
    const accessToken = (res.data as any)?.accessToken ?? (res.data as any)?.token;
    const refreshToken = (res.data as any)?.refreshToken;

    if (accessToken) {
      setTokens({ accessToken, refreshToken });
    } else {
      // TODO: if backend doesn't return tokens here, decide next step
      // (maybe verify-otp returns token? maybe separate session endpoint?)
    }

    router.replace('/(tabs)' as Href);
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Welcome back!</ContentTitle>

        <View style={styles.inputGroup}>
          <PhoneField value={phone} onChange={setPhone} />
          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••"
            error={err}
          />
          <Text style={styles.forgot} onPress={() => router.push('/auth/forgot-password' as Href)}>
            Forgot Password?
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton title="Login" onPress={submit} loading={loading} />
          <SignupText />
        </View>
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
  buttonGroup: {
    gap: 10,
  },
  forgot: {
    textAlign: 'right',
    color: theme.colors.textDefaultCaption,
    marginTop: -6,
  },
}));
