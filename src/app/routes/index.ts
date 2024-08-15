import { Router } from 'express';
import authRoutes from '../modules/auth/auth.route';
import categoryRoutes from '../modules/productCategory/category.route';
import userRoutes from '../modules/user/user.route';
import productRoutes from '../modules/product/product.route';
import subCategoryRoutes from '../modules/subCategory/subCategory.route';
import reviewRoutes from '../modules/review/reivew.route';
import { orderRoutes } from '../modules/order/order.route';
import { paymentRoutes } from '../modules/payment/payment.route';

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
    route: categoryRoutes,
  },
  {
    path: '/sub-category',
    route: subCategoryRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/review',
    route: reviewRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },

  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
