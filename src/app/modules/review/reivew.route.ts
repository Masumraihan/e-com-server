import { Router } from 'express';
import { reviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidations } from './review.validation';

const reviewRoutes = Router();

reviewRoutes.post(
  '/create-review',
  auth('customer'),
  validateRequest(reviewValidations.reviewValidationSchema),
  reviewControllers.createView,
);
reviewRoutes.get('/get-product-reviews/:id', reviewControllers.getProductReview);
reviewRoutes.get('/get-all-product-reviews', reviewControllers.getAllReviews);

export default reviewRoutes;
