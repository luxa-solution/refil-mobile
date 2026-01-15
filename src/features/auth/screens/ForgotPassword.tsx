import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useAuthFlowStore } from '../store/authStore';
import { isValidPhone } from '../utils/phone';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const setMode = useAuthFlowStore((s) => s.setMode);
  const setPhoneNumber = useAuthFlowStore((s) => s.setPhoneNumber);
  const setNextAfterVerify = useAuthFlowStore((s) => s.setNextAfterVerify);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    setError(undefined);
    if (!isValidPhone(phone)) return setError('Enter a valid phone number');

    setMode('reset');
    setPhoneNumber(phone);
    setNextAfterVerify('reset-password');

    router.push('/auth/otp-request' as Href);
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Enter Phone Number</ContentTitle>
        <PhoneField value={phone} onChange={setPhone} error={error} />
        <PrimaryButton title="Get OTP" onPress={submit} />
        <StepDots activeIndex={1} />
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
