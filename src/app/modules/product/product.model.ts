import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, 'Category is required'],
    },
    images: {
      type: [String],
      required: [true, 'Images are required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['in stock', 'out of stock'],
      default: 'in stock',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    keywords: {
      type: [
        {
          value: String,
        },
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<TProduct>('Product', productSchema);
