import { Router } from 'express';
import auth from '../../middlewares/auth';
import { productControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';

const productRoutes = Router();

productRoutes.post(
  '/create-product',
  auth('admin', 'superAdmin'),
  validateRequest(productValidations.createProductValidationSchema),
  productControllers.createProduct,
);
productRoutes.get('/get-all-products', productControllers.getAllProducts);
productRoutes.get('/get-single-product/:id', productControllers.getSingleProduct);
productRoutes.patch(
  '/update-product/:id',
  auth('admin', 'superAdmin'),
  validateRequest(productValidations.updateProductValidationSchema),
  productControllers.updateProduct,
);
productRoutes.delete('/delete-product/:id', auth('admin', 'superAdmin'), productControllers.deleteProduct);

export default productRoutes;
