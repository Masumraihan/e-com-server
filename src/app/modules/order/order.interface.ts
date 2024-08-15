import { Schema } from 'mongoose';

type TProduct = {
  product: Schema.Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  user: Schema.Types.ObjectId;
  address: string;
  products: TProduct[];
  paymentStatus: string;
  status: string;
  transactionId: string;
  amount: number;
};
