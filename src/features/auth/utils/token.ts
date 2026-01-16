import { AuthTokens, TokenLikeResponse } from '../types/token';

/**
 * Extracts auth tokens from a backend response.
 *
 * Backend response shape is NOT confirmed yet,
 * so we keep this flexible and centralized.
 */
export function extractAuthTokens(data: unknown): AuthTokens | null {
  const d = data as TokenLikeResponse | null | undefined;

  const accessToken = d?.accessToken ?? d?.token;
  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken: d?.refreshToken,
  };
}
