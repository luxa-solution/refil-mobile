import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function getUserQuery(): Promise<ApiResult<unknown>> {
  try {
    // docs say POST /user
    const res = await api.post(AUTH_ENDPOINTS.user);
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
