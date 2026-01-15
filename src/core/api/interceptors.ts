import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosInstance } from 'axios';

const ACCESS_TOKEN_KEY = 'auth-access-token';

async function getAccessToken() {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function attachInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      // Optionally normalize errors here
      return Promise.reject(err);
    }
  );
}
