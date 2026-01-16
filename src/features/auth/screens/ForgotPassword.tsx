import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { forgotPasswordMutation } from '../api/mutations/forgot-password';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PhoneField } from '../components/inputs/PhoneField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useAuthFlowStore } from '../store/authFlowStore';
import { isValidPhone } from '../utils/phone';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const setResetDetails = useAuthFlowStore((s) => s.setResetDetails);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(undefined);
    if (!isValidPhone(phone)) return setError('Enter a valid phone number');

    setResetDetails({ phoneNumber: phone });

    setLoading(true);
    const res = await forgotPasswordMutation({ phoneNumber: phone });
    setLoading(false);

    if (!res.ok) return setError(res.error);

    router.push('/auth/otp-verify' as Href);
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <ContentTitle>Enter Phone Number</ContentTitle>
        <PhoneField value={phone} onChange={setPhone} error={error} />
        <PrimaryButton title="Get OTP" onPress={submit} loading={loading} />
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
