import jwt, { verify } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

export const createToken = (
  jwtPayload: { email: string; name: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  let decoded;
  try {
    decoded = verify(token, secret);
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }
  return decoded;
};
