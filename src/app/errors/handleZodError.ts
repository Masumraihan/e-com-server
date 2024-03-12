import { ZodError } from 'zod';

const handleZodError = (error: ZodError) => {
  return error?.issues?.map((issue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
};

export default handleZodError;
