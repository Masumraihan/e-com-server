import { Schema, model } from 'mongoose';
import { TProductCategory } from './category.interface';

const productCategorySchema = new Schema<TProductCategory>(
  {
    category: {
      type: String,
      unique: true,
      required: [true, 'Category is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const ProductCategoryModel = model<TProductCategory>('Category', productCategorySchema);
