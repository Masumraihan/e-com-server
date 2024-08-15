import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import { TErrorType } from '../types/error.types';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const handleGlobalError: ErrorRequestHandler = (error, req, res, next) => {
  const formattedError: TErrorType = {
    errorSources: [
      {
        path: '',
        message: error?.message || 'Something went wrong!',
      },
    ],
    message: error?.message || 'Something went wrong!',
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error instanceof ZodError) {
    formattedError.errorSources = handleZodError(error);
  } else if (error?.name === 'ValidationError') {
    formattedError.errorSources = handleValidationError(error);
  } else if (error?.name === 'CastError') {
    formattedError.errorSources = handleCastError(error);
  } else if (error?.code === 11000) {
    formattedError.errorSources = handleDuplicateError(error);
  }

  formattedError.message = formattedError.errorSources[0]?.message;
  //formattedError.statusCode = StatusCodes.BAD_REQUEST;

  res.status(formattedError.statusCode).json({
    success: false,
    message: formattedError.message,
    errorSources: formattedError.errorSources,
    //error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};
export default handleGlobalError;
