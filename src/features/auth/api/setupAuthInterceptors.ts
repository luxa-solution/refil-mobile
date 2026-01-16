import { configureAuthInterceptors } from '@/core/api/interceptors';
import { useAuthTokenStore } from '../store/authTokenStore';
import { refreshMutation } from './mutations/refresh';

export function setupAuthInterceptors() {
  configureAuthInterceptors({
    getAccessToken: () => useAuthTokenStore.getState().getAccessToken(),
    getRefreshToken: () => useAuthTokenStore.getState().getRefreshToken(),
    setTokens: (accessToken, refreshToken) =>
      useAuthTokenStore.getState().setTokens({ accessToken, refreshToken }),
    clearTokens: () => useAuthTokenStore.getState().clearTokens(),

    refresh: async (refreshToken) => {
      // TODO: confirm refresh request/response shape
      const res = await refreshMutation(refreshToken);
      if (!res.ok)
        return {
          ok: false,
        };

      // TODO: confirm token keys returned by backend
      const accessToken =
        (res.data as any)?.accessToken ??
        (res.data as any)?.token ??
        (res.data as any)?.access_token;

      const newRefresh =
        (res.data as any)?.refreshToken ?? (res.data as any)?.refresh_token ?? refreshToken;

      return {
        ok: !!accessToken,
        accessToken,
        refreshToken: newRefresh,
      };
    },
  });
}
