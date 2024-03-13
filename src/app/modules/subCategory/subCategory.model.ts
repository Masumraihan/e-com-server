import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const SubCategoryModel = model('SubCategory', subCategorySchema);
