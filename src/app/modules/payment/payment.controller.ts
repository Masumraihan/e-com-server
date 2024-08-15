import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { paymentServices } from './payment.service';
import sendResponse from '../../utils/sendResponse';

const paymentInit = catchAsync(async (req, res) => {
  const result = await paymentServices.paymentInit(req.params.orderId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Initiated successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const result = await paymentServices.verifyPayment(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment Verified successfully',
    data: result,
  });
});

export const paymentController = {
  paymentInit,
  verifyPayment,
};
