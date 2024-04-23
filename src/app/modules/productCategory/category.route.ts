import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { categoryValidation } from './category.validation';
import { categoryControllers } from './category.controller';

const categoryRoutes = Router();

categoryRoutes.post(
  '/create-category',
  auth('admin', 'superAdmin'),
  validateRequest(categoryValidation.createCategoryValidationSchema),
  categoryControllers.createCategory,
);

categoryRoutes.get('/get-all-categories', categoryControllers.getAllCategories);
categoryRoutes.get('/get-single-category/:id', categoryControllers.getSingleCategory);
categoryRoutes.patch(
  '/update-category/:id',
  auth('admin', 'superAdmin'),
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  categoryControllers.updateCategory,
);
categoryRoutes.delete('/delete-category/:id', auth('admin', 'superAdmin'), categoryControllers.deleteCategory);

export default categoryRoutes;
