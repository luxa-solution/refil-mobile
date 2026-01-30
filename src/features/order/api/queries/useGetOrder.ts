import { useQuery } from '@tanstack/react-query';

import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import { OrderDetailsResponse } from '../../types/order.dtos';
import { orderEndpoints } from '../endpoints';

export async function getOrderQuery(orderId: string): Promise<ApiResult<OrderDetailsResponse>> {
  try {
    const res = await api.get<OrderDetailsResponse>(orderEndpoints.getOrderById(orderId));
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}

export function useGetOrder(orderId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderQuery(orderId),
    enabled: !!orderId && enabled,
  });
}
