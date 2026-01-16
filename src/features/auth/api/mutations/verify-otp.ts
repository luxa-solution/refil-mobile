import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import type { VerifyOtpQuery } from '@/features/auth/types/auth.dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function verifyOtpMutation(query: VerifyOtpQuery): Promise<ApiResult<unknown>> {
  try {
    const res = await api.post(AUTH_ENDPOINTS.verifyOtp, null, {
      params: { phoneNumber: query.phoneNumber, otp: query.otp },
    });
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}
