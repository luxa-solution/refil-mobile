# Orders Feature

This feature provides order history and order details functionality for the Refil mobile app.

## Overview

The orders feature includes:

- **Order History Screen**: Displays a list of orders with filtering (All, Pending, Completed)
- **Order Details Screen**: Shows detailed information about a specific order
- **Empty State**: Displays when there are no orders
- **Order Card**: Reusable component for displaying order summary

## Screens

### OrderScreen (`/order` tab)

- Displays a list of user orders
- Filter orders by status: All Orders, Pending, Completed
- Each order card shows:
  - Product image and name
  - Weight and price
  - Delivery phone
  - Delivery address
  - Action buttons based on order status
- Empty state when no orders exist

### OrderDetailsScreen (`/order-details?orderId=xxx`)

- Shows complete order information
- Displays order status badge
- Shows order number and dates
- Lists all items in the order
- Shows delivery information
- Displays total amount
- Action buttons for pending orders (Checkout, Cancel)

## Components

### OrderCard

Displays a summary of an order with:

- Product thumbnail
- Product name, weight, and price
- Phone number and delivery address
- Status-based actions (Checkout/Cancel for pending, Delivered badge for completed)

### EmptyOrdersState

Shown when user has no orders:

- Illustrative icon
- "No Order to Display" message
- "Make your first order" call-to-action button

## Data Types

### OrderStatus (Enum)

- `PENDING`: Order is awaiting confirmation
- `CONFIRMED`: Order has been confirmed
- `DELIVERING`: Order is in transit
- `DELIVERED`: Order has been delivered
- `CANCELLED`: Order has been cancelled

### Order (Interface)

```typescript
{
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
```

## API Endpoints

### Get Orders

```typescript
GET /orders?status={status}&page={page}&limit={limit}
```

### Get Order by ID

```typescript
GET / orders / { orderId };
```

## Usage

### Testing with Mock Data

During development, you can test the UI with mock data:

1. **Import the mock data:**

```typescript
import { mockOrders, getMockOrdersByStatus } from '@/features/order/data/mockOrders';
```

2. **Use in OrderScreen temporarily:**

```typescript
// Replace the actual API call
// const { data, isLoading } = useGetOrders({ status: selectedFilter });

// With mock data
const orders = getMockOrdersByStatus(selectedFilter);
const isLoading = false;
```

3. **Use in OrderDetailsScreen temporarily:**

```typescript
import { getMockOrderById } from '@/features/order/data/mockOrders';

// Replace the actual API call
// const { data, isLoading } = useGetOrder(orderId);

// With mock data
const order = getMockOrderById(orderId);
```

### Navigation

**Navigate to Order Details:**

```typescript
router.push({
  pathname: '/order-details' as any,
  params: { orderId: 'some-order-id' },
});
```

**Navigate to Make Order:**

```typescript
router.push('/make-order' as any);
```

## File Structure

```
src/features/order/
├── api/
│   ├── endpoints.ts          # API endpoint definitions
│   └── queries/
│       ├── useGetOrder.ts    # Hook for fetching single order
│       ├── useGetOrders.ts   # Hook for fetching order list
│       └── index.ts
├── components/
│   ├── OrderCard.tsx         # Order summary card component
│   ├── EmptyOrdersState.tsx  # Empty state component
│   └── index.ts
├── data/
│   └── mockOrders.ts         # Mock data for testing
├── screens/
│   ├── OrderScreen.tsx       # Order history screen
│   ├── OrderDetailsScreen.tsx # Order details screen
│   └── index.ts
├── types/
│   └── order.dtos.ts         # TypeScript types and interfaces
```

## Integration Points

### Required API Integration

The following API endpoints need to be implemented on the backend:

1. **GET /orders** - Returns paginated list of orders
   - Query params: `status`, `page`, `limit`
   - Response: `{ orders: Order[], total: number, page: number, limit: number }`

2. **GET /orders/:id** - Returns single order details
   - Response: `{ order: Order }`

3. **POST /orders/:id/cancel** - Cancel a pending order
   - Response: Success/error status

### Navigation Requirements

Routes needed:

- `/order` - Already exists as a tab
- `/order-details` - Created in `src/app/order-details.tsx`
- `/make-order` - Should exist or be created for order creation

### State Management

Currently uses React Query for:

- Fetching orders list
- Fetching order details
- Caching and automatic refetching

## Styling

The feature uses:

- `react-native-unistyles` for theming
- Theme colors from `@/core/styles/theme.ts`
- Responsive design with proper spacing
- Status-based color coding

## Future Enhancements

Potential improvements:

- [ ] Order cancellation mutation
- [ ] Real-time order status updates
- [ ] Order tracking with map
- [ ] Order rating and feedback
- [ ] Order search functionality
- [ ] Export order history
- [ ] Reorder functionality
- [ ] Order notifications
- [ ] Pull-to-refresh
- [ ] Infinite scroll pagination

## Testing Checklist

- [ ] View empty state
- [ ] Filter orders by All/Pending/Completed
- [ ] Navigate to order details
- [ ] View pending order with actions
- [ ] View completed order
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Test with no network connection
- [ ] Test navigation back from details
- [ ] Test with various order statuses

## Notes

- Order images currently use placeholder URLs - replace with actual product images
- Phone number format follows Nigerian standard
- Currency is displayed as ₦ (Nigerian Naira)
- Dates should be formatted based on user locale
- Consider adding order search/filter by date range
- Add error boundaries for better error handling
