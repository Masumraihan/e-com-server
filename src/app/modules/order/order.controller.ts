import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const data = req.body;
  const order = await orderServices.createOrder(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const query = req.query;
  const orders = await orderServices.getAllOrders(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
};
