import { StatusCodes } from 'http-status-codes';
import { JwtPayload, verify } from 'jsonwebtoken';
import { decrypt, encrypt } from 'secure-encrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLogin, TUser } from '../user/user.interface';
import UserModel from '../user/user.model';
import { createToken, verifyToken } from './auth.utils';

const registerIntoDb = async (payload: TUser) => {
  const { password, ...restInfo } = payload;

  const hashedPassword = encrypt(payload.password, config.password_secret);

  const user = await UserModel.create({
    ...restInfo,
    password: hashedPassword,
  });

  if (!user) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.access_token_secret, config.access_token_expires_in);
  const refreshToken = createToken(jwtPayload, config.refresh_token_secret, config.refresh_token_expires_in);

  return { accessToken, refreshToken };
};

const loginIntoDb = async (payload: TLogin) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials');
  }

  // DECRYPT PASSWORD
  const currentPassword = decrypt(user?.password, config.password_secret);

  // VERIFY PASSWORD
  if (currentPassword !== password) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials');
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
  };

  // CREATE ACCESS AND REFRESH TOKEN
  const accessToken = createToken(jwtPayload, config.access_token_secret, config.access_token_expires_in);
  const refreshToken = createToken(jwtPayload, config.refresh_token_secret, config.refresh_token_expires_in);
  return { accessToken, refreshToken };
};

const refreshToAccess = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }

  // VERIFY REFRESH TOKEN
  const decoded = verifyToken(refreshToken, config.refresh_token_secret) as JwtPayload;

  const { email, name, role } = decoded;
  const user = await UserModel.findOne({ email, name });
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }
  // CREATE ACCESS TOKEN
  const accessToken = createToken({ email, name, role }, config.access_token_secret, config.access_token_expires_in);
  return { accessToken };
};

export const authServices = {
  registerIntoDb,
  loginIntoDb,
  refreshToAccess,
};
