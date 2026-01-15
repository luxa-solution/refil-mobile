export const API_CONFIG = {
  // testing env from your docs
  testingBaseUrl: 'https://refil.onrender.com',
  // you said production is refill.com
  productionBaseUrl: 'https://refil.com',
  // pick based on __DEV__
  baseUrl: __DEV__ ? 'https://refil.onrender.com' : 'https://refill.com',
  timeoutMs: 30_000,
} as const;
