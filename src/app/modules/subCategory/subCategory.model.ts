import { Schema, model } from 'mongoose';
import { TSubCategory } from './subCategory.interface';

const subCategorySchema = new Schema<TSubCategory>({
  subCategory: {
    type: String,
    unique: true,
    required: [true, 'SubCategory is required'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: [true, 'Category is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

export const SubCategoryModel = model<TSubCategory>('SubCategory', subCategorySchema);
