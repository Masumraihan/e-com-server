import { Schema } from 'mongoose';

export type TPayment = {
  order: Schema.Types.ObjectId;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  amount: number;
  paymentGatewayData: any;
};
