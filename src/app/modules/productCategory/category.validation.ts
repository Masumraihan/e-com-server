import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category is required' }),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    category: z.string().optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
