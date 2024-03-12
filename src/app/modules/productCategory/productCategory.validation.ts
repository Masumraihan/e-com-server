import { z } from 'zod';

const createProductCategoryValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category is required' }),
  }),
});

const updateProductCategoryValidationSchema = z.object({
  body: z.object({
    category: z.string().optional(),
  }),
});

export const productCategoryValidation = {
  createProductCategoryValidationSchema,
  updateProductCategoryValidationSchema,
};
