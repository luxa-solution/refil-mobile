export type Role = string;

export type AddressRequestDto = {
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  userId?: number;
  default?: boolean;
};

export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roles?: Role[];
};

export type LoginRequestDto = {
  phoneNumber: string;
  password: string;
};

export type ForgotPasswordRequestDto = {
  phoneNumber: string;
};

export type VerifyOtpQuery = {
  phoneNumber: string;
  otp: string;
};

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

export type AuthResponseDto = {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  user?: unknown;
} & Record<string, any>;
