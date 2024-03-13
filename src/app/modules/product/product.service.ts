import { JwtPayload } from 'jsonwebtoken';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createProductIntoDb = async (payload: TProduct, user: JwtPayload) => {
  const isUserExist = await UserModel.findOne({ email: user.email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }

  payload.user = isUserExist._id;

  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDb = async () => {
  const result = await ProductModel.find({ isDeleted: false });
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateProductIntoDb = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const productServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductIntoDb,
  deleteProductFromDb,
};
