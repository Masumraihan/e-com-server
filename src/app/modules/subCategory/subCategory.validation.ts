import { z } from 'zod';

const createSubCategoryValidationSchema = z.object({
  body: z.object({
    subCategory: z.string({ required_error: 'SubCategory is required' }),
    category: z.string({ required_error: 'Category is required' }),
    user: z.string({ required_error: 'User is required' }),
  }),
});

const updateSubCategoryValidationSchema = z.object({
  body: z.object({
    subCategory: z.string().optional(),
    category: z.string().optional(),
    user: z.string().optional(),
  }),
});

export const subCategoryValidations = {
  createSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
}
