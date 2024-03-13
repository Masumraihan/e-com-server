import { JwtPayload } from 'jsonwebtoken';
import { TSubCategory } from './subCategory.interface';
import { SubCategoryModel } from './subCategory.model';

const createSubCategoryIntoDb = async (payload: TSubCategory, user: JwtPayload) => {
  const isUserExist = await SubCategoryModel.findOne({ subCategory: payload.subCategory });
  

  const subCategory = await SubCategoryModel.create(payload);
};
