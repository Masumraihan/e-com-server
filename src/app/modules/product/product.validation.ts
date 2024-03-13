import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    images: z.array(
      z.string({
        required_error: 'At least one image are required',
      }),
    ),
    quantity: z.number({
      required_error: 'Quantity is required',
    }),
    discount: z.number().optional(),
    user: z.string({
      required_error: 'User is required',
    }),
    size: z.string().optional(),
    color: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    images: z.array(z.string()).optional(),
    quantity: z.number().optional(),
    discount: z.number().optional(),
    user: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
