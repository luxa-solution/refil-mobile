import axios from 'axios';
import { API_CONFIG } from './config';
import { attachInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

attachInterceptors(apiClient);
