import { Types } from 'mongoose';

export type TProductCategory = {
  category: string;
  user: Types.ObjectId;
  isDeleted: boolean;
};
