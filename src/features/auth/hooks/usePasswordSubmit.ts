import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { registerMutation } from '../api/mutations/register';
import { resetPasswordMutation } from '../api/mutations/reset-password';
import { useAuthFlowStore } from '../store/authFlowStore';

type Mode = 'signup' | 'reset';

function validateMode(storeMode: Mode | null, mode: Mode): string | null {
  if (!storeMode) return 'Invalid flow. Please restart.';
  if (storeMode !== mode) return 'Flow mismatch. Please restart.';
  return null;
}

function validatePasswords(password: string, confirm: string): string | null {
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password !== confirm) return 'Passwords do not match';
  return null;
}

export function usePasswordSubmit(mode: Mode) {
  const router = useRouter();

  const storeMode = useAuthFlowStore((s) => s.mode);

  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);
  const firstName = useAuthFlowStore((s) => s.firstName);
  const lastName = useAuthFlowStore((s) => s.lastName);
  const otp = useAuthFlowStore((s) => s.otp);

  const setMode = useAuthFlowStore((s) => s.setMode);
  const setNextAfterVerify = useAuthFlowStore((s) => s.setNextAfterVerify);
  const resetFlow = useAuthFlowStore((s) => s.resetFlow);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (password: string, confirm: string) => {
      setError(undefined);

      const modeErr = validateMode(storeMode, mode);
      if (modeErr) return setError(modeErr);

      const pwErr = validatePasswords(password, confirm);
      if (pwErr) return setError(pwErr);

      setLoading(true);
      try {
        if (mode === 'signup') {
          if (!phoneNumber || !firstName || !lastName) {
            setError('Missing signup details. Please restart signup.');
            return;
          }

          // TODO: remove __DEV__ and allow endpoint
          const res = __DEV__
            ? { ok: true as const, error: undefined as string | undefined }
            : await registerMutation({
                firstName,
                lastName,
                phoneNumber,
                password,
                roles: ['user'], // TODO: confirm backend role values
              });

          if (!res.ok) return setError(res.error);

          setMode('signup');
          setNextAfterVerify('add-location');
          router.replace('/auth/otp-verify' as Href);
          return;
        }

        if (mode === 'reset') {
          if (!otp) return setError('Missing OTP. Please restart reset password.');

          // TODO: remove __DEV__ and allow endpoint
          const res = __DEV__
            ? { ok: true as const, error: undefined as string | undefined }
            : await resetPasswordMutation(
                { otp },
                {
                  password,
                  // TODO: confirm backend requires other body fields
                }
              );

          if (!res.ok) return setError(res.error);

          resetFlow();
          router.replace('/auth/login' as Href);
          return;
        }

        setError('Invalid flow. Please restart.');
      } finally {
        setLoading(false);
      }
    },
    [
      storeMode,
      mode,
      phoneNumber,
      firstName,
      lastName,
      otp,
      setMode,
      setNextAfterVerify,
      resetFlow,
      router,
    ]
  );

  return { submit, loading, error };
}
