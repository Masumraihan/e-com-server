import { StatusCodes } from 'http-status-codes';
import UserModel from '../modules/user/user.model';
import AppError from '../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';

const getUserWithEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
    }
    return user;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }
};

export default getUserWithEmail;
