import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password too short'),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Not a valid email').optional(),
    address: z.string().optional(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .min(6, 'Password too short'),
  }),
});

export const userValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  updateUserValidationSchema,
  changePasswordValidationSchema,
};
