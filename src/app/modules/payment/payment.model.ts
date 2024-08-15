import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order is required'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    transactionId: {
      type: String,
      unique: true,
      required: [true, 'Transaction id is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    paymentGatewayData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export const PaymentModel = model<TPayment>('Payment', paymentSchema);

export default PaymentModel;
