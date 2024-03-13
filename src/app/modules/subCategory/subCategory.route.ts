import { Router } from 'express';
import { subCategoryControllers } from './subCategory.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { subCategoryValidations } from './subCategory.validation';

const subCategoryRoutes = Router();

subCategoryRoutes.post(
  '/create-sub-category',
  auth('admin', 'superAdmin'),
  validateRequest(subCategoryValidations.createSubCategoryValidationSchema),
  subCategoryControllers.createSubCategory,
);
subCategoryRoutes.get('/get-all-sub-categories', subCategoryControllers.getAllSubCategories);
subCategoryRoutes.patch(
  '/update-sub-category/:id',
  auth('admin', 'superAdmin'),
  validateRequest(subCategoryValidations.updateSubCategoryValidationSchema),
  subCategoryControllers.updateSubCategory,
);
subCategoryRoutes.delete(
  '/delete-sub-category/:id',
  auth('admin', 'superAdmin'),
  subCategoryControllers.deleteSubCategory,
);

export default subCategoryRoutes;
