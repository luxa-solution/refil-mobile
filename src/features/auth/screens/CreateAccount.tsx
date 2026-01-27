import { zodResolver } from '@hookform/resolvers/zod';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { TextField } from '../components/inputs/TextField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { CreateAccountForm, createAccountSchema } from '../schema/createAccount.schema';
import { useAuthFlowStore } from '../store/authFlowStore';

export function CreateAccountScreen() {
  const router = useRouter();
  const setSignupDetails = useAuthFlowStore((s) => s.setSignupDetails);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { phoneNumber: '', firstName: '', lastName: '' },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit((values) => {
    setSignupDetails({
      phoneNumber: values.phoneNumber,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
    });

    router.push('/auth/add-password' as Href);
  });

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Create Account</ContentTitle>

        <View style={styles.buttonGroup}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => (
              <PhoneField value={value} onChange={onChange} error={errors.phoneNumber?.message} />
            )}
          />
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <TextField
                label="First Name"
                value={value}
                onChangeText={onChange}
                error={errors.firstName?.message}
                placeholder="Ahmad"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <TextField
                label="Last Name"
                value={value}
                onChangeText={onChange}
                error={errors.lastName?.message}
                placeholder="Abubakr"
              />
            )}
          />
        </View>

        <PrimaryButton title="Next" onPress={onSubmit} loading={isSubmitting} />

        <StepDots activeIndex={1} count={4} />
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
    gap: 20,
  },
}));
