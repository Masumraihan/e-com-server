import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    message: ' API Not Found',
    error: 'Not Found',
    path: req.originalUrl,
  });
};
export default notFound;
