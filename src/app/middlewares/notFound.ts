import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response) => {
  return res.json({
    status: StatusCodes.NOT_FOUND,
    message: ' API Not Found',
    error: 'Not Found',
  });
};
export default notFound;
