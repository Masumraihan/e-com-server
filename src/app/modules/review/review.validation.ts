import { z } from 'zod';

const reviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .max(5, 'Rating should not be greater than 5'),
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});

export const reviewValidations = {
  reviewValidationSchema,
};
