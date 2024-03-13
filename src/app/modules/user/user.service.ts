import { JwtPayload } from 'jsonwebtoken';
import { userRole } from '../auth/auth.constant';
import { TUser } from './user.interface';
import UserModel from './user.model';
import getUserWithEmail from '../../utils/getUserWithEmail';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { decrypt, encrypt } from 'secure-encrypt';
import config from '../../config';
import QueryBuilder from '../../Builders/QueryBuilder';

const getAllCustomerFromDb = async () => {
  const result = await UserModel.find({ isDeleted: false, role: userRole.customer });
  return result;
};

const getUserProfileFromDb = async (user: JwtPayload) => {
  const result = await UserModel.findOne({
    email: user.email,
    isDeleted: false,
    isBlocked: false,

    role: user.role,
  });
  return result;
};

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find({ isDeleted: false, isBlocked: false }), query).filter();
  const data = await userQuery.modelQuery;
  const meta = await userQuery.meta();

  return { data, meta };
};

// ADMIN ONLY CAN UPDATE USER STATUS LIKE BLOCK AND UNBLOCK, AND DELETE
const updateUserStatusIntoDb = async (id: string, payload: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ _id: id, role: userRole.customer }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const updateProfileIntoDb = async (user: JwtPayload, payload: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ email: user.email, role: user.role }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const changePasswordIntoDb = async (user: JwtPayload, payload: { oldPassword: string; newPassword: string }) => {
  const isUserExist = await UserModel.findOne({ email: user.email }).select('password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const currentHashedPassword = isUserExist.password;
  const currentPainTextPassword = decrypt(currentHashedPassword, config.password_secret);

  if (currentPainTextPassword !== payload.oldPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Old password is incorrect');
  }

  const newHashedPassword = encrypt(payload.newPassword, config.password_secret);

  const result = await UserModel.findOneAndUpdate(
    { email: user.email, role: user.role },
    { password: newHashedPassword },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

//const deleteUserFromDb = async (id: string) => {
//  const result = await UserModel.findOneAndUpdate({ _id: id, role: userRole.customer }, { isDeleted: true });
//  return result;
//};

export const userServices = {
  getAllCustomerFromDb,
  getAllUsersFromDb,
  getUserProfileFromDb,
  updateUserStatusIntoDb,
  updateProfileIntoDb,
  changePasswordIntoDb,
};
