import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
} from '@/features/auth/types/dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function forgotPasswordMutation(
  body: ForgotPasswordRequestDto
): Promise<ApiResult<ForgotPasswordResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.forgotPassword, body);
    return {
      ok: true,
      data: res.data,
      status: res.status,
    };
  } catch (e) {
    return toApiError(e);
  }
}
