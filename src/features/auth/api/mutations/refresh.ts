import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type { RefreshResponseDto } from '@/features/auth/types/dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function refreshMutation(token: string): Promise<ApiResult<RefreshResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.refresh, { token });
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
