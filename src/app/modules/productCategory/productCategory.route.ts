import { Router } from 'express';
import { productCategoryControllers } from './productCategory.controller';
import { productCategoryValidation } from './productCategory.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const productCategoryRoutes = Router();

productCategoryRoutes.post(
  '/create-category',
  auth('admin', 'superAdmin'),
  validateRequest(productCategoryValidation.createProductCategoryValidationSchema),
  productCategoryControllers.createProductCategory,
);

productCategoryRoutes.get('/get-all-categories', productCategoryControllers.getAllProductCategories);
productCategoryRoutes.get('/get-single-category/:id', productCategoryControllers.getSingleProductCategory);
productCategoryRoutes.patch(
  '/update-category/:id',
  auth('admin', 'superAdmin'),
  validateRequest(productCategoryValidation.updateProductCategoryValidationSchema),
  productCategoryControllers.updateProductCategory,
);
productCategoryRoutes.delete(
  '/delete-category/:id',
  auth('admin', 'superAdmin'),
  productCategoryControllers.deleteProductCategory,
);

export default productCategoryRoutes;
