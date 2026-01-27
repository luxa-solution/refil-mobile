import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { SignupText } from '../components/texts/signup';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { ForgotPasswordForm, forgotPasswordSchema } from '../schema/forgotPassword.schema';

export function ForgotPasswordScreen() {
  const { error, loading, submit } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phoneNumber: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit(values.phoneNumber);
  });

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Enter Phone Number</ContentTitle>

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange } }) => (
            <PhoneField
              value={value}
              onChange={onChange}
              error={errors.phoneNumber?.message ?? error}
            />
          )}
        />

        <View style={styles.buttonGroup}>
          <PrimaryButton title="Get OTP" onPress={onSubmit} loading={loading || isSubmitting} />
          <SignupText />
        </View>
        <StepDots activeIndex={1} count={3} />
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
  buttonGroup: {
    gap: 10,
  },
}));
