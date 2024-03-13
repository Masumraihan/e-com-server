import { Router } from 'express';
import authRoutes from '../modules/auth/auth.route';
import productCategoryRoutes from '../modules/productCategory/productCategory.route';
import userRoutes from '../modules/user/user.route';
import productRoutes from '../modules/product/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/category',
    route: productCategoryRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
