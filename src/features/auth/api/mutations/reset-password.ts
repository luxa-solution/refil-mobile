import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type {
  ResetPasswordQuery,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
} from '@/features/auth/types/dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function resetPasswordMutation(
  query: ResetPasswordQuery,
  body: ResetPasswordRequestDto
): Promise<ApiResult<ResetPasswordResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.resetPassword, body, {
      params: { otp: query.otp },
    });
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
