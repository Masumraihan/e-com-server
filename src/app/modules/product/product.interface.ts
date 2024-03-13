import { Types } from 'mongoose';

export type TKeyword = {
  value: string;
};

export type TProduct = {
  title: string;
  description: string;
  price: number;
  subCategory: Types.ObjectId;
  images: string[];
  quantity: number;
  discount: number;
  status: 'in stock' | 'out of stock';
  user: Types.ObjectId;
  size?: string;
  color?: string;
  keywords?: TKeyword[];
  isDeleted: boolean;
};
