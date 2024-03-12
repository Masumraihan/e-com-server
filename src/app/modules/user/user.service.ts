import { userRole } from '../auth/auth.constant';
import { TUser } from './user.interface';
import UserModel from './user.model';

const getAllUserFromDb = async () => {
  const result = await UserModel.find({ isDeleted: false, role: userRole.customer });
  return result;
};

const getSingleUserFromDb = async (id: string) => {
  const result = await UserModel.findOne({ _id: id, isDeleted: false, role: userRole.customer });
  console.log(result);
  return result;
};

const getAllAdmins = async () => {
  const result = await UserModel.find({ isDeleted: false, role: userRole.admin });
  return result;
};

// ADMIN ONLY CAN UPDATE USER STATUS LIKE BLOCK AND UNBLOCK, AND DELETE
const updateUserStatusIntoDb = async (id: string, payload: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ _id: id, role: userRole.customer }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

//const deleteUserFromDb = async (id: string) => {
//  const result = await UserModel.findOneAndUpdate({ _id: id, role: userRole.customer }, { isDeleted: true });
//  return result;
//};

export const userServices = {
  getAllUserFromDb,
  getAllAdmins,
  getSingleUserFromDb,
  updateUserStatusIntoDb,
};
