import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { isValidPhone } from '../utils/phone';

export function LoginScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr(undefined);
    if (!isValidPhone(phone)) return setErr('Enter a valid phone number');
    if (!password) return setErr('Enter your password');

    setLoading(true);
    try {
      // TODO: replace with real login mutation when you confirm endpoint + response tokens
      // await loginMutation({ phoneNumber: phone, password });
      router.replace('/(tabs)' as Href);
    } catch (e: any) {
      setErr(e?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Welcome back!</ContentTitle>

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

        <PrimaryButton title="Login" onPress={submit} loading={loading} />

        <Text style={styles.footer}>
          Have no account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => router.push('/auth/create-account' as Href)}>
            Sign Up
          </Text>
        </Text>
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
  forgot: {
    textAlign: 'right',
    color: theme.colors.textDefaultCaption,
    marginTop: -6,
  },
  footer: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    marginTop: 10,
  },
  footerLink: {
    color: theme.colors.primaryDefault,
    fontWeight: '900',
  },
}));
