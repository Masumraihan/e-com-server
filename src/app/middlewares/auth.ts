import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { verifyToken } from '../modules/auth/auth.utils';
import UserModel from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

    const isUserExist = await UserModel.findOne({ email: decoded.email });

    if (!isUserExist) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    if (isUserExist.isDeleted) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    if (isUserExist.isBlocked) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }

    req.user = decoded;
    next();
  });
};
export default auth;
