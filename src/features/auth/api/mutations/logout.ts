import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import { LogoutResponseDto } from '@/features/auth/types/dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function logoutMutation(): Promise<ApiResult<LogoutResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.logout);
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
