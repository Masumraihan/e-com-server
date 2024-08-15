import mongoose from 'mongoose';
import QueryBuilder from '../../Builders/QueryBuilder';
import PaymentModel from '../payment/payment.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrder = async (data: TOrder) => {
  const date = new Date();
  const transactionId = data.address + date.getFullYear() + date.getMonth() + date.getDate() + date.getTime();

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await OrderModel.create({ ...data, transactionId });

    await PaymentModel.create({
      order: order._id,
      paymentMethod: 'COD',
      transactionId,
      amount: data.amount,
    });

    await session.commitTransaction();
    await session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find().populate('user products.product'), query)
    .filter()
    .paginate()
    .fields();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.meta();
  return {
    data: result,
    meta,
  };
};

export const orderServices = {
  createOrder,
  getAllOrders,
};
