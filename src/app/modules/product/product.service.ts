import { JwtPayload } from 'jsonwebtoken';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { productSearchableFields } from './product.contant';
import QueryBuilder from '../../Builders/QueryBuilder';

const createProductIntoDb = async (payload: TProduct, user: JwtPayload) => {
  const isUserExist = await UserModel.findOne({ email: user.email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }

  payload.user = isUserExist._id;

  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  //const queryObj = { ...query };

  //let searchTerm = '';
  //if (query?.searchTerm) {
  //  searchTerm = query.searchTerm as string;
  //}

  //// SEARCHING
  //const search = ProductModel.find({
  //  $or: productSearchableFields.map((field) => ({
  //    [field]: {
  //      $regex: searchTerm,
  //      $options: 'i',
  //    },
  //  })),
  //});

  //// FILTERING
  //const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'fields'];
  //excludeFields.forEach((field) => delete queryObj[field]);
  //const filter = search.find({ ...queryObj });

  //// SORTING
  //const sortBy = (query.sortBy as string) || '-createdAt';
  //const sort = filter.find().sort(sortBy);

  //// PAGINATION
  //const page = Number(query?.page) || 1;
  //const limit = Number(query?.limit) || 1;
  //const skip = (page - 1) * limit;

  //const paginate = sort.find().skip(skip).limit(limit);

  //// FIELDS
  //const fields = (query.fields as string).replace(',', ' ') || '-__v';
  //const field = await paginate.find().select(fields);
  //return field;
  const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'fields'];
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search()
    .filter(excludeFields)
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;

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
