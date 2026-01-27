import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { forgotPasswordMutation } from '../api/mutations/forgot-password';
import { useAuthFlowStore } from '../store/authFlowStore';

export function useForgotPassword() {
  const router = useRouter();
  const setResetDetails = useAuthFlowStore((s) => s.setResetDetails);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (phoneNumber: string) => {
      setError(undefined);
      setResetDetails({ phoneNumber });
      setLoading(true);
      try {
        // TODO: Remove __DEV__ and allow endpoint
        const res = __DEV__
          ? { ok: true as const, error: undefined as string | undefined }
          : await forgotPasswordMutation({ phoneNumber });

        if (!res.ok) return setError(res.error);

        router.push('/auth/otp-verify' as Href);
      } finally {
        setLoading(false);
      }
    },
    [router, setResetDetails]
  );

  return { submit, loading, error };
}
