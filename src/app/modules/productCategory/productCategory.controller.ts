import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { productCategoryServices } from './productCategory.service';
import catchAsync from '../../utils/catchAsync';

const createProductCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const productCategory = await productCategoryServices.createProductCategoryIntoDb(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Product Category created successfully',
    data: productCategory,
  });
});

const getAllProductCategories = catchAsync(async (req, res) => {
  const result = await productCategoryServices.getAllProductCategoriesFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Product Categories fetched successfully',
    data: result,
  });
});

const getSingleProductCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.getSingleProductCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Product Category fetched successfully',
    data: result,
  });
});

const updateProductCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await productCategoryServices.updateProductCategoryFromDb(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product Category updated successfully',
    data: result,
  });
});

const deleteProductCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.deleteProductCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product Category deleted successfully',
    data: result,
  });
});

export const productCategoryControllers = {
  createProductCategory,
  getAllProductCategories,
  getSingleProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
