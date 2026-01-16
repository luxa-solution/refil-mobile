import { Href, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { verifyOtpMutation } from '../api/mutations/verify-otp';
import { useAuthFlowStore } from '../store/authFlowStore';
import { useAuthTokenStore } from '../store/authTokenStore';
import { extractAuthTokens } from '../utils/token';

type Params = {
  otp: { value: string; isComplete: boolean };
  timer: { canResend: boolean; start: () => void };
};

export function useOtpActions({ otp, timer }: Params) {
  const router = useRouter();

  const mode = useAuthFlowStore((s) => s.mode);
  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);

  const setOtp = useAuthFlowStore((s) => s.setOtp);
  const setTokens = useAuthTokenStore((s) => s.setTokens);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const dots = useMemo(() => {
    const dotsCount = mode === 'signup' ? 4 : 3;
    const activeIndex = mode === 'signup' ? 3 : 2;
    return { dotsCount, activeIndex };
  }, [mode]);

  const verify = useCallback(async () => {
    setError(undefined);

    if (!mode) return setError('Invalid flow. Please restart.');
    if (!otp.isComplete) return;
    if (!phoneNumber) return setError('Missing phone number. Restart flow.');

    setLoading(true);
    try {
      // TODO: remove __DEV__ and allow endpoint
      const res = __DEV__
        ? { ok: true as const, error: undefined as string | undefined, data: { token: 'token' } }
        : await verifyOtpMutation({ phoneNumber, otp: otp.value });

      if (!res.ok) return setError(res.error);

      // store otp for reset-password endpoint query param
      setOtp(otp.value);

      // TODO: if verify-otp returns tokens, store them here
      const tokens = extractAuthTokens(res.data);
      if (tokens) setTokens(tokens);
      router.push('/auth/verification-status' as Href);
    } finally {
      setLoading(false);
    }
  }, [mode, otp.isComplete, otp.value, phoneNumber, router, setOtp, setTokens]);

  const resend = useCallback(async () => {
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
  }, [timer]);

  return {
    mode,
    phoneNumber,

    error,
    loading,
    resendLoading,

    verify,
    resend,

    dots,
  };
}
