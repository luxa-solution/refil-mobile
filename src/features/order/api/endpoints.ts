export const orderEndpoints = {
  getOrders: '/orders',
  getOrderById: (id: string) => `/orders/${id}`,
  cancelOrder: (id: string) => `/orders/${id}/cancel`,
} as const;
