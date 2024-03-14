import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { TReview } from './review.interface';
import ReviewModel from './review.model';
import { JwtPayload } from 'jsonwebtoken';
import getUserWithEmail from '../../utils/getUserWithEmail';

const createProductReviewIntoDb = async (payload: TReview, user: JwtPayload) => {
  const isUserExist = await getUserWithEmail(user.email);

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }

  const isProductExist = await ProductModel.findOne({
    _id: payload.product,
    isDeleted: false,
  });

  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  payload.user = isUserExist._id;
  const result = await ReviewModel.create(payload);
  return result;
};

const getProductReviewsFromDb = async (productId: string) => {
  const result = await ReviewModel.find({ product: productId }).populate('user product');
  return result;
};

const getAllReviewsFromDb = async () => {
  const result = await ReviewModel.find().populate('user product');
  return result;
};

export const reviewServices = {
  createProductReviewIntoDb,
  getProductReviewsFromDb,
  getAllReviewsFromDb,
};
