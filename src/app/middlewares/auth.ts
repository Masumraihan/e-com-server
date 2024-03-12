import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { verifyToken } from '../modules/auth/auth.utils';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    const accessToken = token.split(' ')[1];
    const decoded = verifyToken(accessToken, config.access_token_secret) as JwtPayload;

    if (!decoded) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    req.user = decoded;

    next();
  });
};
export default auth;
