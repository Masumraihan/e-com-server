export const orderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;
export const paymentStatus = {
  PENDING: 'unpaid',
  PAID: 'paid',
} as const;

export const orderSearchableFields = ['user', 'address', 'paymentMethod', 'paymentStatus', 'status'];
