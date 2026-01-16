// General
export type Role = string;

export type GeneralResponseDto = {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  user?: unknown;
} & Record<string, any>;

// Address
export type AddressRequestDto = {
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  userId?: number;
  default?: boolean;
};

export type AddressResponseDto = GeneralResponseDto;

// Token Refresh
export type RefreshResponseDto = GeneralResponseDto;

// Registration
export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roles: Role[];
};

export type RegisterResponseDto = GeneralResponseDto;

// Login
export type LoginRequestDto = {
  phoneNumber: string;
  password: string;
};

export type LoginResponseDto = GeneralResponseDto;

// Logout
export type LogoutResponseDto = GeneralResponseDto;

// Forgot Password
export type ForgotPasswordRequestDto = {
  phoneNumber: string;
};

export type ForgotPasswordResponseDto = GeneralResponseDto;

// Verify OTP
export type VerifyOtpQuery = {
  phoneNumber: string;
  otp: string;
};

export type VerifyOtpResponseDto = GeneralResponseDto;

// Reset Password
export type ResetPasswordQuery = {
  otp: string;
};

export type ResetPasswordRequestDto = {
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  roles?: Role[];
  addresses?: AddressRequestDto[];
};

export type ResetPasswordResponseDto = GeneralResponseDto;

// User

export type UserResponseDto = GeneralResponseDto;
