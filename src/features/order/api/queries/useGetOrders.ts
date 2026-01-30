import { useQuery } from '@tanstack/react-query';

import { ApiResult, toApiError } from '@/core/api/api-types';
import { api } from '@/core/api/client';
import { GetOrdersParams, OrderListResponse } from '../../types/order.dtos';
import { orderEndpoints } from '../endpoints';

export async function getOrdersQuery(
  params?: GetOrdersParams
): Promise<ApiResult<OrderListResponse>> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.status && params.status !== 'ALL') {
      queryParams.append('status', params.status);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = `${orderEndpoints.getOrders}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const res = await api.get<OrderListResponse>(url);
    return { ok: true, data: res.data, status: res.status };
  } catch (e) {
    return toApiError(e);
  }
}

export function useGetOrders(params?: GetOrdersParams) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrdersQuery(params),
  });
}
