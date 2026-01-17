import { zodResolver } from '@hookform/resolvers/zod';
import { Href, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { SignupText } from '../components/texts/signup';
import { useLogin } from '../hooks/useLogin';
import { LoginForm, loginSchema } from '../schema/login.schema';

export function LoginScreen() {
  const router = useRouter();
  const { submit, loading, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit(values);
  });

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Welcome back!</ContentTitle>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => (
              <PhoneField value={value} onChange={onChange} error={errors.phoneNumber?.message} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <TextField
                label="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="••••••"
                error={errors.password?.message ?? error}
              />
            )}
          />
          <Text style={styles.forgot} onPress={() => router.push('/auth/forgot-password' as Href)}>
            Forgot Password?
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton title="Login" onPress={onSubmit} loading={loading || isSubmitting} />
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
