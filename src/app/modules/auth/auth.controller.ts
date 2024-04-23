import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const data = req.body;
  const { accessToken, refreshToken } = await authServices.registerIntoDb(data);

  // SET REFRESH TOKEN IN COOKIE
  res.cookie('refreshToken', refreshToken, {
    httpOnly: config.node_env === 'production',
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: config.node_env === 'production',
    secure: true,
    sameSite: 'none',
    // cookie access token expires in 1 day
    maxAge: 1000 * 60 * 60 * 24,
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

  // SET REFRESH TOKEN IN COOKIE
  res.cookie('refreshToken', refreshToken, {
    httpOnly: config.node_env === 'production',
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: config.node_env === 'production',
    secure: true,
    sameSite: 'none',
    // cookie access token expires in 1 day
    maxAge: 1000 * 60 * 60 * 24,
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
