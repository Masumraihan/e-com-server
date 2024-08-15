import { Schema, model } from 'mongoose';
import { orderStatus, paymentStatus } from './order.constant';
import { TOrder } from './order.interface';

const oderProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    products: [
      {
        type: oderProductSchema,
        required: [true, 'Products are required'],
      },
    ],
    paymentStatus: {
      type: String,
      enum: [...Object.values(paymentStatus)],
      default: 'unpaid',
    },
    status: {
      type: String,
      enum: [...Object.values(orderStatus)],
      default: 'pending',
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction id is required'],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = model<TOrder>('Order', orderSchema);
export default OrderModel;
