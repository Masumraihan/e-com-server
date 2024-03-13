import { Router } from 'express';
import { productCategoryControllers } from './productCategory.controller';
import { productCategoryValidation } from './productCategory.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const categoryRoutes = Router();

categoryRoutes.post(
  '/create-category',
  auth('admin', 'superAdmin'),
  validateRequest(productCategoryValidation.createProductCategoryValidationSchema),
  productCategoryControllers.createProductCategory,
);

categoryRoutes.get('/get-all-categories', productCategoryControllers.getAllProductCategories);
categoryRoutes.get('/get-single-category/:id', productCategoryControllers.getSingleProductCategory);
categoryRoutes.patch(
  '/update-category/:id',
  auth('admin', 'superAdmin'),
  validateRequest(productCategoryValidation.updateProductCategoryValidationSchema),
  productCategoryControllers.updateProductCategory,
);
categoryRoutes.delete(
  '/delete-category/:id',
  auth('admin', 'superAdmin'),
  productCategoryControllers.deleteProductCategory,
);

export default categoryRoutes;
