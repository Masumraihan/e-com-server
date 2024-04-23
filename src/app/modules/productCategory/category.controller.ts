import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { productCategoryServices } from './category.service';
import catchAsync from '../../utils/catchAsync';

const createCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const productCategory = await productCategoryServices.createCategoryIntoDb(data, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: productCategory,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await productCategoryServices.getAllCategoriesFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Categories fetched successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.getSingleCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Category fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await productCategoryServices.updateCategoryFromDb(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productCategoryServices.deleteCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category deleted successfully',
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
