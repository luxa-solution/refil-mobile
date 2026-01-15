import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { OtpField } from '../components/inputs/OtpField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useOtp, useResendTimer } from '../hooks/useOtp';
import { useAuthFlowStore } from '../store/authStore';

export function OtpVerifyScreen() {
  const router = useRouter();

  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);
  const nextAfterVerify = useAuthFlowStore((s) => s.nextAfterVerify);
  const setNextAfterVerify = useAuthFlowStore((s) => s.setNextAfterVerify);

  const otp = useOtp(4);
  const timer = useResendTimer(30);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const verify = async () => {
    setError(undefined);
    if (!otp.isComplete) return;

    setLoading(true);
    try {
      // TODO: replace with real verify OTP mutation when endpoint is confirmed
      // await verifyOtpMutation({ phoneNumber, code: otp.value });

      // decide next
      // signup -> add-location, reset -> reset-password
      const next = nextAfterVerify ?? 'add-location';
      setNextAfterVerify(next);

      router.push('/auth/verification-status' as Href);
    } catch (e: any) {
      setError(e?.message ?? 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!timer.canResend) return;
    setResendLoading(true);
    try {
      // TODO: await sendOtpMutation({ phoneNumber })
      timer.start();
    } catch (e: any) {
      setError(e?.message ?? 'Resend failed');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.wrap}>
        <View style={styles.textGroup}>
          <ContentTitle>Enter Four Digits Code</ContentTitle>
          <Text style={styles.subtitle}>We have sent OTP code to {phoneNumber}</Text>
        </View>

        <OtpField value={otp.value} onChange={otp.setDigit} length={otp.length} />

        {!!error && <Text style={styles.err}>{error}</Text>}

        <View style={styles.buttonGroup}>
          <PrimaryButton
            title="Verify"
            onPress={verify}
            disabled={!otp.isComplete}
            loading={loading}
          />

          <Text style={styles.resend} onPress={resend}>
            {resendLoading
              ? 'Resending...'
              : timer.canResend
                ? 'Resend code'
                : `Resend in ${timer.remaining}s`}
          </Text>
        </View>

        <StepDots activeIndex={3} count={4} />
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
  textGroup: {
    gap: 6,
  },
  buttonGroup: {
    gap: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.textDefaultCaption,
    marginBottom: 10,
  },
  err: {
    textAlign: 'center',
    color: theme.colors.error[500],
    marginTop: -6,
  },
  resend: {
    textAlign: 'center',
    color: theme.colors.primaryDefault,
    marginTop: 6,
    fontWeight: '800',
  },
}));
