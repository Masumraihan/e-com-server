import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await userServices.getAllCustomerFromDb();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All customers fetched successfully',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDb(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All users fetched successfully',
    data: result.data,
    meta: result.meta,
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
  getAllCustomers,
  getAllUsers,
  getUserProfile,
  updateUserStatus,
  updateProfile,
  changePassword,
};
