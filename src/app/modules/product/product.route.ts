import { Router } from 'express';
import auth from '../../middlewares/auth';
import { productControllers } from './product.controller';

const productRoutes = Router();

productRoutes.post('/create-product', auth('admin', 'superAdmin'), productControllers.createProduct);
productRoutes.get('/get-all-products', productControllers.getAllProducts);
productRoutes.get('/get-single-product/:id', productControllers.getSingleProduct);
productRoutes.patch('/update-product/:id', auth('admin', 'superAdmin'), productControllers.updateProduct);
productRoutes.delete('/delete-product/:id', auth('admin', 'superAdmin'), productControllers.deleteProduct);

export default productRoutes;
