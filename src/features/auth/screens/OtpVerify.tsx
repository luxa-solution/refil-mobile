import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { verifyOtpMutation } from '../api/mutations/verify-otp';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { OtpField } from '../components/inputs/OtpField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';
import { useOtp, useResendTimer } from '../hooks/useOtp';
import { useAuthFlowStore } from '../store/authFlowStore';
import { useAuthTokenStore } from '../store/authTokenStore';

export function OtpVerifyScreen() {
  const router = useRouter();

  const mode = useAuthFlowStore((s) => s.mode);
  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);
  const nextAfterVerify = useAuthFlowStore((s) => s.nextAfterVerify);

  const setOtp = useAuthFlowStore((s) => s.setOtp);

  const otp = useOtp(4);
  const timer = useResendTimer(30);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const setTokens = useAuthTokenStore((s) => s.setTokens);

  const verify = async () => {
    setError(undefined);

    if (!mode) return setError('Invalid flow. Please restart.');
    if (!otp.isComplete) return;
    if (!phoneNumber) return setError('Missing phone number. Restart flow.');

    setLoading(true);
    // TODO: remove __DEV__ and allow endpoint
    const res = __DEV__
      ? {
          ok: true,
          error: undefined,
          data: { token: 'token' },
        }
      : await verifyOtpMutation({ phoneNumber, otp: otp.value });

    setLoading(false);

    if (!res.ok) return setError(res.error);

    // store otp for reset-password endpoint query param
    setOtp(otp.value);

    // TODO: if verify-otp returns tokens, store them here
    const accessToken = (res.data as any)?.accessToken ?? (res.data as any)?.token;
    const refreshToken = (res.data as any)?.refreshToken;
    if (accessToken) setTokens({ accessToken, refreshToken });

    router.push('/auth/verification-status' as Href);
  };

  const resend = async () => {
    if (!timer.canResend) return;
    setResendLoading(true);
    try {
      // TODO: implement resend endpoint (swagger shows /forgot-password but not explicit resend)
      timer.start();
    } catch (e: any) {
      setError(e?.message ?? 'Resend failed');
    } finally {
      setResendLoading(false);
    }
  };

  // dots: signup flow has more steps than reset flow
  const dotsCount = mode === 'signup' ? 4 : 3;
  const activeIndex = mode === 'signup' ? 3 : 2;

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

        <StepDots activeIndex={activeIndex} count={dotsCount} />
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
