import { apiClient } from '@/core/api/client';
import type { RegisterRequestDto, RegisterResponseDto } from '@/features/auth/types/auth.dto';
import { AUTH_ENDPOINTS } from '../endpoints';

export async function registerMutation(payload: RegisterRequestDto) {
  const { data } = await apiClient.post<RegisterResponseDto>(AUTH_ENDPOINTS.register, payload);
  return data;
}
