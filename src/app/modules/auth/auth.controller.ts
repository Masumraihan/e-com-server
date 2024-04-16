import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const data = req.body;
  const { accessToken, refreshToken } = await authServices.registerIntoDb(data);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.node_env !== 'development', // Only send over HTTPS in production
    sameSite: 'none', // Mitigate CSRF attacks
    maxAge: 1000 * 60 * 60 * 24, // 1 day for access token
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'development',
    sameSite: 'strict', // Limit refresh token access to the same site
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year for refresh token (consider security implications)
  });
  
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Registered successfully',
    data: { accessToken },
  });
});

const login = catchAsync(async (req, res) => {
  const data = req.body;
  const { accessToken, refreshToken } = await authServices.loginIntoDb(data);

   res.cookie('accessToken', accessToken, {
     httpOnly: true,
     secure: config.node_env === 'production', // Only send over HTTPS in production
     sameSite: 'none', // Mitigate CSRF attacks
     maxAge: 1000 * 60 * 60 * 24, // 1 day for access token
   });

   res.cookie('refreshToken', refreshToken, {
     httpOnly: true,
     secure: config.node_env === 'production',
     sameSite: 'strict', // Limit refresh token access to the same site
     maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year for refresh token (consider security implications)
   });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successfully',
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const accessToken = await authServices.refreshToAccess(refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Refreshed successfully',
    data: accessToken,
  });
});

export const authController = {
  register,
  login,
  refreshToken,
};
