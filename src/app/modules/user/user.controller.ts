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

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUserFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User fetched successfully',
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
  getSingleUser,
  updateUserStatus,
};
