import mongoose from 'mongoose';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  return Object.keys(error?.errors).map((e) => {
    return {
      path: e,
      message: error?.errors[e]?.message,
    };
  });
};

export default handleValidationError;
