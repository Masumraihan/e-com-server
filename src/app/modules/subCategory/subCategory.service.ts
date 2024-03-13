import { JwtPayload } from 'jsonwebtoken';
import { TSubCategory } from './subCategory.interface';
import { SubCategoryModel } from './subCategory.model';
import getUserWithEmail from '../../utils/getUserWithEmail';
import QueryBuilder from '../../Builders/QueryBuilder';

const createSubCategoryIntoDb = async (payload: TSubCategory, user: JwtPayload) => {
  const isUserExist = await getUserWithEmail(user.email);
  payload.user = isUserExist._id;
  const result = await SubCategoryModel.create(payload);
  return result;
};

const getAllSubCategoriesFromDb = async (query: Record<string, unknown>) => {
  const subCategorySearchableFields = ['subCategory'];
  const result = new QueryBuilder(SubCategoryModel.find(), query).search(subCategorySearchableFields);
  return result;
};

const updateSubCategoryIntoDb = async (id: string, payload: Partial<TSubCategory>) => {
  const result = await SubCategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSubCategoryFromDb = async (id: string) => {
  const result = await SubCategoryModel.findByIdAndDelete(id);
  return result;
};

export const subCategoryServices = {
  createSubCategoryIntoDb,
  getAllSubCategoriesFromDb,
  updateSubCategoryIntoDb,
  deleteSubCategoryFromDb,
};
