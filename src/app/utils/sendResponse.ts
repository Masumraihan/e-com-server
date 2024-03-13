import { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data?.meta,
  });
};

export default sendResponse;
