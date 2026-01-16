const testingBaseUrl = 'https://refil.onrender.com';
const productionBaseUrl = 'https://refil.com';

export const API_CONFIG = {
  baseURL: __DEV__ ? testingBaseUrl : productionBaseUrl,
  timeoutMs: 30_000,
} as const;
