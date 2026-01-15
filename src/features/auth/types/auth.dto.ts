export type UserRole = string;

export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roles: UserRole[];
};

// Your Swagger shows {} as response for 200, so keep it permissive
export type RegisterResponseDto = Record<string, unknown>;

// These endpoints are not in the snippet you pasted.
// Add them when you confirm swagger routes for OTP/login/reset.
export type LoginRequestDto = {
  phoneNumber: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken?: string;
  refreshToken?: string;
  [k: string]: unknown;
};
