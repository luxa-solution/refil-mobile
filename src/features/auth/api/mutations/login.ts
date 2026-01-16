import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type { LoginRequestDto, LoginResponseDto } from '@/features/auth/types/dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function loginMutation(body: LoginRequestDto): Promise<ApiResult<LoginResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.login, body);
    return {
      ok: true,
      data: res.data,
      status: res.status,
    };
  } catch (e) {
    return toApiError(e);
  }
}
