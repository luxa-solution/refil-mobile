import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type { AuthResponseDto } from '@/features/auth/types/auth.dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function refreshMutation(token: string): Promise<ApiResult<AuthResponseDto>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.refresh, { token });
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
