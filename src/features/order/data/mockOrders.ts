import { Order, OrderStatus } from '../types/order.dtos';

/**
 * Mock orders data for testing and development
 *
 * To use this in development:
 * 1. Import this data in OrderScreen.tsx
 * 2. Temporarily replace the API call with this data
 * 3. Comment out or wrap in a development flag
 */

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    status: OrderStatus.PENDING,
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Heagle Gasoline',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '40kg',
        price: 85000,
      },
    ],
    totalAmount: 85000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-30T10:30:00Z',
    updatedAt: '2026-01-30T10:30:00Z',
    estimatedDeliveryTime: '2026-01-30T14:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-002',
    status: OrderStatus.PENDING,
    items: [
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Bovas Filling Station',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '10kg',
        price: 20000,
      },
    ],
    totalAmount: 20000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-30T09:15:00Z',
    updatedAt: '2026-01-30T09:15:00Z',
    estimatedDeliveryTime: '2026-01-30T13:15:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-003',
    status: OrderStatus.CONFIRMED,
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Premium Diesel',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '15kg',
        price: 30000,
      },
    ],
    totalAmount: 30000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-30T08:00:00Z',
    updatedAt: '2026-01-30T08:15:00Z',
    estimatedDeliveryTime: '2026-01-30T12:00:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2026-004',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Bovas Filling Station',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '10kg',
        price: 20000,
      },
    ],
    totalAmount: 20000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-29T08:00:00Z',
    updatedAt: '2026-01-29T12:45:00Z',
    estimatedDeliveryTime: '2026-01-29T12:00:00Z',
    actualDeliveryTime: '2026-01-29T11:45:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-2026-005',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'Heagle Gasoline Premium',
        productImage: 'https://via.placeholder.com/150',
        quantity: 2,
        weight: '25kg',
        price: 50000,
      },
    ],
    totalAmount: 50000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-28T15:20:00Z',
    updatedAt: '2026-01-28T18:30:00Z',
    estimatedDeliveryTime: '2026-01-28T18:00:00Z',
    actualDeliveryTime: '2026-01-28T17:50:00Z',
  },
  {
    id: '8',
    orderNumber: 'ORD-2026-008',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'item-5',
        productId: 'prod-5',
        productName: 'Heagle Gasoline Premium',
        productImage: 'https://via.placeholder.com/150',
        quantity: 2,
        weight: '25kg',
        price: 50000,
      },
    ],
    totalAmount: 50000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-28T15:20:00Z',
    updatedAt: '2026-01-28T18:30:00Z',
    estimatedDeliveryTime: '2026-01-28T18:00:00Z',
    actualDeliveryTime: '2026-01-28T17:50:00Z',
  },
  {
    id: '6',
    orderNumber: 'ORD-2026-006',
    status: OrderStatus.CONFIRMED,
    items: [
      {
        id: 'item-6',
        productId: 'prod-6',
        productName: 'Shell V-Power',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '20kg',
        price: 42000,
      },
    ],
    totalAmount: 42000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-30T07:30:00Z',
    updatedAt: '2026-01-30T07:45:00Z',
    estimatedDeliveryTime: '2026-01-30T11:30:00Z',
  },
  {
    id: '7',
    orderNumber: 'ORD-2026-007',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'item-7',
        productId: 'prod-7',
        productName: 'Bovas Diesel',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        weight: '50kg',
        price: 95000,
      },
    ],
    totalAmount: 95000,
    deliveryAddress: {
      street: 'Airport Road',
      city: 'Ilorin',
      state: 'Kwara',
      country: 'Nigeria',
      fullAddress: 'Asa Dam, Airport Road, Ilorin',
    },
    deliveryPhone: '(+234) 9135-464-740',
    createdAt: '2026-01-27T10:00:00Z',
    updatedAt: '2026-01-27T14:15:00Z',
    estimatedDeliveryTime: '2026-01-27T14:00:00Z',
    actualDeliveryTime: '2026-01-27T13:55:00Z',
  },
];

export const getMockOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find((order) => order.id === orderId);
};

export const getMockOrdersByStatus = (status: OrderStatus): Order[] => {
  return mockOrders.filter((order) => order.status === status);
};
