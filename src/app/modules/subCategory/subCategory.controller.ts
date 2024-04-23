import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subCategoryServices } from './subCategory.service';

const createSubCategory = catchAsync(async (req, res) => {
  const data = req.body;
  const subCategory = await subCategoryServices.createSubCategoryIntoDb(data, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'SubCategory created successfully',
    data: subCategory,
  });
});

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await subCategoryServices.getAllSubCategoriesFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All SubCategories fetched successfully',
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await subCategoryServices.updateSubCategoryIntoDb(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'SubCategory updated successfully',
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await subCategoryServices.deleteSubCategoryFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'SubCategory deleted successfully',
    data: result,
  });
});

export const subCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
