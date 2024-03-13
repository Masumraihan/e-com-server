import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { productCategoryServices } from './category.service';
import catchAsync from '../../utils/catchAsync';

const createCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const productCategory = await productCategoryServices.createProductCategoryIntoDb(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Product Category created successfully',
    data: productCategory,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await productCategoryServices.getAllProductCategoriesFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Product Categories fetched successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.getSingleProductCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Product Category fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
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

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.deleteProductCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product Category deleted successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
