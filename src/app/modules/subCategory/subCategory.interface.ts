import { Types } from 'mongoose';

export type TSubCategory = {
  subCategory: string;
  category: Types.ObjectId;
  user: Types.ObjectId;
  isDeleted: boolean;
};
