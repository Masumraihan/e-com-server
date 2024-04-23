import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TProductCategory } from './category.interface';
import { ProductCategoryModel } from './category.model';
import getUserWithEmail from '../../utils/getUserWithEmail';

const createCategoryIntoDb = async (payload: TProductCategory, user: JwtPayload) => {
  const isUserExist = await getUserWithEmail(user.email);
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }
  payload.user = isUserExist._id;

  const productCategory = await ProductCategoryModel.create(payload);
  return productCategory;
};

const getAllCategoriesFromDb = async () => {
  const result = await ProductCategoryModel.find();
  return result;
};

const getSingleCategoryFromDb = async (id: string) => {
  const result = await ProductCategoryModel.findById(id);
  return result;
};

const updateCategoryFromDb = async (id: string, payload: Partial<TProductCategory>) => {
  const result = await ProductCategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategoryFromDb = async (id: string) => {
  const result = await ProductCategoryModel.findByIdAndDelete(id);
  return result;
};

export const productCategoryServices = {
  createCategoryIntoDb,
  getAllCategoriesFromDb,
  getSingleCategoryFromDb,
  updateCategoryFromDb,
  deleteCategoryFromDb,
};
