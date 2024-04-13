import { Types } from 'mongoose';

export type TSubCategory = {
  subCategory: string;
  category: Types.ObjectId;
  isFeatured: boolean;
  icon: string;
  user: Types.ObjectId;
};
