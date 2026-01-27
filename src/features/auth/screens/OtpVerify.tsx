import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { OtpField } from '../components/inputs/OtpField';
import { Container } from '../components/layout/Container';
import { ContentTitle } from '../components/layout/ContentTitle';
import { StepDots } from '../components/layout/StepDots';

import { useOtp, useResendTimer } from '../hooks/useOtp';
import { useOtpFlowMeta } from '../hooks/useOtpFlowMeta';
import { useOtpVerifyActions } from '../hooks/useOtpVerifyActions';

export function OtpVerifyScreen() {
  const otp = useOtp(4);
  const timer = useResendTimer(30);

  const { phoneNumber, dots } = useOtpFlowMeta();
  const { error, loading, resendLoading, verify, resend } = useOtpVerifyActions({ otp, timer });

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

        <StepDots activeIndex={dots.activeIndex} count={dots.dotsCount} />
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
