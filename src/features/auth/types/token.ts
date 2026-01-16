export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

/**
 * Backend response shape is not confirmed yet.
 * Keep token extraction assumptions centralized here.
 */
export type TokenLikeResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
};
