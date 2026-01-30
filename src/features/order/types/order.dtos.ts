export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  weight: string;
  price: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  deliveryPhone: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderDetailsResponse {
  order: Order;
}

export interface GetOrdersParams {
  status?: OrderStatus | 'ALL';
  page?: number;
  limit?: number;
}
