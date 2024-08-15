import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/get-all-orders', auth('superAdmin', 'admin'), orderController.getAllOrders);
router.post('/create', auth('superAdmin', 'admin', 'customer'), orderController.createOrder);
export const orderRoutes = router;
