import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import OrderModel from '../order/order.model';
import { SSLService } from '../SSL/ssl.service';
import mongoose from 'mongoose';
import PaymentModel from './payment.model';

const paymentInit = async (orderId: string) => {
  const paymentData = (await OrderModel.findOne({ _id: orderId }).populate('user')) as any;

  if (!paymentData) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Order not found');
  }
  const res = await SSLService.sslPaymentInit({
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.user.name,
    email: paymentData.order?.user.email,
    address: paymentData.address,
  });

  return {
    paymentUrl: res.GatewayPageURL,
  };
};

const verifyPayment = async (payload: Record<string, unknown>) => {
  // * FOR LOCALLY VALIDATION
  const res = payload as any;

  // * FOR PRODUCTION VALIDATION
  //if (!payload || !payload.status || payload.status !== 'VALID') {
  //  throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid payment data');
  //}

  //const res = await SSLService.validatePayment(payload);

  //if (res.status !== 'VALID' || !res.tran_id) {
  //  throw new AppError(StatusCodes.BAD_REQUEST, 'Payment Failed');
  //}

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await OrderModel.findOneAndUpdate(
      {
        transactionId: res.tran_id,
      },
      { paymentStatus: 'paid' },
      { session },
    );
    const payment = await PaymentModel.findOneAndUpdate(
      { transactionId: res.tran_id },
      { paymentStatus: 'paid', paymentGatewayData: res },
      { session },
    );
    console.log({ order, payment, res });
    await session.commitTransaction();
    await session.endSession();
    return {
      message: 'Payment Successful',
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const paymentServices = {
  paymentInit,
  verifyPayment,
};
