import { Schema, model } from 'mongoose';
import { TSubCategory } from './subCategory.interface';

const subCategorySchema = new Schema<TSubCategory>({
  subCategory: {
    type: String,
    unique: true,
    required: [true, 'SubCategory is required'],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  icon: {
    type: String,
    required: [true, 'Icon is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

export const SubCategoryModel = model<TSubCategory>('SubCategory', subCategorySchema);
