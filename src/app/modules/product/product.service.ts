import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../Builders/QueryBuilder';
import getUserWithEmail from '../../utils/getUserWithEmail';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createProductIntoDb = async (payload: TProduct, user: JwtPayload) => {
  const isUserExist = await getUserWithEmail(user.email);
  payload.user = isUserExist._id;
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await productQuery.modelQuery;
  const meta = await productQuery.meta();
  return { data, meta };
};

const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateProductIntoDb = async (id: string, payload: Partial<TProduct>) => {
  const { keywords, ...restUpdatedInfo } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await ProductModel.findOneAndUpdate({ _id: id, isDeleted: false }, restUpdatedInfo, {
      new: true,
      runValidators: true,
      session,
    });

    if (keywords?.length) {
      const newKeywords = keywords.filter((keyword) => keyword.isDelete === false);

      const deletableKeywords = keywords.filter((keyword) => keyword.isDelete === true);

      await ProductModel.findOneAndUpdate(
        { _id: id },
        {
          $pull: {
            keywords: {
              value: {
                $in: deletableKeywords.map((keyword) => keyword.value),
              },
            },
          },
        },
        { session },
      );

      await ProductModel.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            keywords: newKeywords,
          },
        },
        { session },
      );
    }
    await session.commitTransaction();
    await session.endSession();
    const product = await ProductModel.findOne({ _id: id });

    return product;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
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
