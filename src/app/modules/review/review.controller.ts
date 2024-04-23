import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { reviewServices } from './review.service';
import sendResponse from '../../utils/sendResponse';

const createView = catchAsync(async (req, res) => {
  const result = await reviewServices.createProductReviewIntoDb(req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getProductReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getProductReviewsFromDb(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review fetched successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All reviews fetched successfully',
    data: result,
  });
});

export const reviewControllers = {
  createView,
  getProductReview,
  getAllReviews,
};
