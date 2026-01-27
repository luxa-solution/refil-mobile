import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { loginMutation } from '../api/mutations/login';
import { useAuthTokenStore } from '../store/authTokenStore';
import { LoginRequestDto } from '../types/dto';
import { extractAuthTokens } from '../utils/token';

export function useLogin() {
  const router = useRouter();
  const setTokens = useAuthTokenStore((s) => s.setTokens);

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (args: LoginRequestDto) => {
      setError(undefined);
      setLoading(true);
      try {
        // TODO: remove __DEV__ and allow endpoint
        const res = __DEV__
          ? { ok: true as const, error: undefined as string | undefined, data: { token: 'token' } }
          : await loginMutation(args);

        if (!res.ok) return setError(res.error);

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
    },
    [router, setTokens]
  );

  return { submit, loading, error };
}
