export const AUTH_ENDPOINTS = {
  register: '/api/v1/auth/register',
  login: '/api/v1/auth/login',
  forgotPassword: '/api/v1/auth/forgot-password',
  verifyOtp: '/api/v1/auth/verify-otp',
  resetPassword: '/api/v1/auth/reset-password',
  refresh: '/api/v1/auth/refresh',
  logout: '/api/v1/auth/logout',
  user: '/api/v1/auth/user',
} as const;
