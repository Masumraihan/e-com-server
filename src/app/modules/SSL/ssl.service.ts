import axios from 'axios';
import { TSSLPaymentData } from './ssl.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const sslPaymentInit = async (paymentData: TSSLPaymentData) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: paymentData.amount,
      currency: 'BDT',
      tran_id: paymentData.transactionId, // use unique tran_id for each api call
      success_url: config.ssl.paymentSuccessUrl,
      fail_url: config.ssl.paymentFailedUrl,
      cancel_url: config.ssl.paymentCancelUrl,
      ipn_url: '',
      shipping_method: '',
      product_name: '',
      product_category: '',
      product_profile: '',
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: '',
      cus_city: '',
      cus_state: '',
      cus_postcode: '',
      cus_country: '',
      cus_phone: '',
      cus_fax: '',
      ship_name: '',
      ship_add1: '',
      ship_add2: '',
      ship_city: '',
      ship_state: '',
      ship_postcode: 0,
      ship_country: '',
    };

    const response = await axios({
      method: 'POST',
      url: config.ssl.sslPaymentApi,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new AppError(StatusCodes.BAD_REQUEST, error.message || 'Something went wrong while making payment');
  }
};

const validatePayment = async (payload: any) => {
  const response = await axios({
    method: 'POST',
    url: `${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=JSON`,
    data: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const SSLService = {
  sslPaymentInit,
  validatePayment,
};
