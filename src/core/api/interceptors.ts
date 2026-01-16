import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from './client';

type TokenGetter = () => string | null;
type TokenSetter = (accessToken: string, refreshToken?: string) => void;
type TokenClearer = () => void;

type RefreshHandler = (refreshToken: string) => Promise<{
  ok: boolean;
  accessToken?: string;
  refreshToken?: string;
}>;

let getAccessToken: TokenGetter = () => null;
let getRefreshToken: TokenGetter = () => null;
let setTokens: TokenSetter = () => {};
let clearTokens: TokenClearer = () => {};
let refreshHandler: RefreshHandler | null = null;

export function configureAuthInterceptors(opts: {
  getAccessToken: TokenGetter;
  getRefreshToken: TokenGetter;
  setTokens: TokenSetter;
  clearTokens: TokenClearer;
  refresh: RefreshHandler;
}) {
  getAccessToken = opts.getAccessToken;
  getRefreshToken = opts.getRefreshToken;
  setTokens = opts.setTokens;
  clearTokens = opts.clearTokens;
  refreshHandler = opts.refresh;
}

// Attach bearer token
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh on 401 (single retry) – refresh logic injected
let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

function subscribe(cb: (token: string | null) => void) {
  queue.push(cb);
}
function flush(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original: any = error.config;

    if (status !== 401 || original?._retry) return Promise.reject(error);
    original._retry = true;

    const rt = getRefreshToken();
    if (!rt || !refreshHandler) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribe((newToken) => {
          if (!newToken) return reject(error);
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshed = await refreshHandler(rt);

      if (!refreshed.ok || !refreshed.accessToken) {
        clearTokens();
        flush(null);
        return Promise.reject(error);
      }

      setTokens(refreshed.accessToken, refreshed.refreshToken);
      flush(refreshed.accessToken);

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${refreshed.accessToken}`;
      return api(original);
    } catch (e) {
      clearTokens();
      flush(null);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);
