import { JwtPayload } from 'jsonwebtoken';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { productSearchableFields } from './product.constant';
import QueryBuilder from '../../Builders/QueryBuilder';
import getUserWithEmail from '../../utils/getUserWIthEmail';
import { TUser } from '../user/user.interface';

const createProductIntoDb = async (payload: TProduct, user: JwtPayload) => {
  const isUserExist = await getUserWithEmail(user.email);
  payload.user = isUserExist._id;
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query).search().filter().sort().paginate().fields();
  const data = await productQuery.modelQuery;

  const meta = await productQuery.meta();

  return { data, meta };
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
