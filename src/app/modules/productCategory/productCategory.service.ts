import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TProductCategory } from './productCategory.interface';
import { ProductCategoryModel } from './productCategory.model';

const createProductCategoryIntoDb = async (payload: TProductCategory) => {
  //const isUserExist = await UserModel.findById(payload.user);
  //if (!isUserExist) {
  //  throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  //}

  const productCategory = await ProductCategoryModel.create(payload);
  return productCategory;
};

const getAllProductCategoriesFromDb = async () => {
  const result = await ProductCategoryModel.find({ isDeleted: false });
  return result;
};

const getSingleProductCategoryFromDb = async (id: string) => {
  const result = await ProductCategoryModel.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateProductCategoryFromDb = async (id: string, payload: Partial<TProductCategory>) => {
  const result = await ProductCategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductCategoryFromDb = async (id: string) => {
  const result = await ProductCategoryModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const productCategoryServices = {
  createProductCategoryIntoDb,
  getAllProductCategoriesFromDb,
  getSingleProductCategoryFromDb,
  updateProductCategoryFromDb,
  deleteProductCategoryFromDb,
};
