import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { forgotPasswordMutation } from '../api/mutations/forgot-password';
import { useAuthFlowStore } from '../store/authFlowStore';
import { isValidPhone } from '../utils/phone';

export function useForgotPassword() {
  const router = useRouter();
  const setResetDetails = useAuthFlowStore((s) => s.setResetDetails);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setError(undefined);
    if (!isValidPhone(phone)) return setError('Enter a valid phone number');

    setResetDetails({ phoneNumber: phone });

    setLoading(true);
    try {
      // TODO: Remove __DEV__ and allow endpoint
      const res = __DEV__
        ? { ok: true as const, error: undefined as string | undefined }
        : await forgotPasswordMutation({ phoneNumber: phone });

      if (!res.ok) return setError(res.error);

      router.push('/auth/otp-verify' as Href);
    } finally {
      setLoading(false);
    }
  }, [phone, router, setResetDetails]);

  return { phone, setPhone, error, loading, submit };
}
