import { Types } from 'mongoose';
import productStatus from './product.contant';

export type TProduct = {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
  quantity: number;
  discount: number;
  status: 'in stock' | 'out of stock';
  user: Types.ObjectId;
  size?: string;
  color?: string;
  keywords?: string[];
  isDeleted: boolean;
};
