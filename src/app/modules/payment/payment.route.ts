import express from 'express';
import { paymentController } from './payment.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/payment-init/:orderId', auth('superAdmin', 'admin', 'customer'), paymentController.paymentInit);
router.post('/verify-payment', auth('superAdmin'), paymentController.verifyPayment);
export const paymentRoutes = router;
