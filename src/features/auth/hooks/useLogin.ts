import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { loginMutation } from '../api/mutations/login';
import { useAuthTokenStore } from '../store/authTokenStore';
import { GeneralResponseDto } from '../types/dto';
import { isValidPhone } from '../utils/phone';
import { extractAuthTokens } from '../utils/token';

export function useLogin() {
  const router = useRouter();
  const setTokens = useAuthTokenStore((s) => s.setTokens);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setErr(undefined);
    if (!isValidPhone(phone)) return setErr('Enter a valid phone number');
    if (!password) return setErr('Enter your password');

    setLoading(true);
    try {
      // TODO: remove __DEV__ and allow endpoint
      const res = __DEV__
        ? { ok: true as const, error: undefined as string | undefined, data: { token: 'token' } }
        : await loginMutation({ phoneNumber: phone, password });

      if (!res.ok) return setErr(res.error);

      // TODO: confirm token response shape from /login
      const tokens = extractAuthTokens(res.data);

      if (tokens) {
        setTokens(tokens);
      } else {
        // TODO: decide next step if backend doesn't return tokens here
      }

      router.replace('/(tabs)' as Href);
    } finally {
      setLoading(false);
    }
  }, [password, phone, router, setTokens]);

  return { phone, setPhone, password, setPassword, err, loading, submit };
}
