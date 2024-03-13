import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.service';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;

  const product = await productServices.createProductIntoDb(data, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productServices.getAllProductsFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All products fetched successfully',
    meta: products.meta,
    data: products.data,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getSingleProductFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await productServices.updateProductIntoDb(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productServices.deleteProductFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: product,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
