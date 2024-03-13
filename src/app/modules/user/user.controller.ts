import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDb();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All user fetched successfully',
    data: result,
  });
});
const getAllAdmins = catchAsync(async (req, res) => {
  const result = await userServices.getAllAdmins();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All admins fetched successfully',
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.getUserProfileFromDb(req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await userServices.updateUserStatusIntoDb(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.updateProfileIntoDb(req.user, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.changePasswordIntoDb(req.user, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password updated successfully',
    data: result,
  });
});

//const deleteUser = catchAsync(async (req, res) => {
//  const { id } = req.params;
//  const result = await userServices.deleteUserFromDb(id);
//  sendResponse(res, {
//    statusCode: StatusCodes.OK,
//    success: true,
//    message: 'User deleted successfully',
//    data: result,
//  });
//});

export const userControllers = {
  getAllUser,
  getAllAdmins,
  getUserProfile,
  updateUserStatus,
  updateProfile,
  changePassword,
};
