import type { AxiosError } from 'axios';
import { api } from '@/core/api/client';
import { useAuthTokenStore } from '../store/authTokenStore';

let didSetup = false;

async function getAccessToken(): Promise<string | null> {
  // IMPORTANT: no AsyncStorage reads here; just store state (fast + sync)
  return useAuthTokenStore.getState().accessToken;
}

export function setupAuthInterceptors() {
  if (didSetup) return;
  didSetup = true;

  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      // TODO: refresh token flow (when backend response shape confirmed)
      // if (error.response?.status === 401) { ...refresh... }

      return Promise.reject(error);
    }
  );
}
