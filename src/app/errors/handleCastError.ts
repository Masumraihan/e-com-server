import mongoose from 'mongoose';

const handleCastError = (error: mongoose.CastError) => {
  return [
    {
      path: '',
      message: `No item found with id: ${error?.value}`,
    },
  ];
};

export default handleCastError;
