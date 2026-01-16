import { Href, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { SignupText } from '../components/texts/signup';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen() {
  const router = useRouter();
  const { phone, setPhone, password, setPassword, err, loading, submit } = useLogin();

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
