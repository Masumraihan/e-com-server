import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './auth.validation';
import { authController } from './auth.controller';

const authRoutes = Router();

authRoutes.post('/register', validateRequest(userValidations.registerUserValidationSchema), authController.register);
authRoutes.post('/login', validateRequest(userValidations.loginUserValidationSchema), authController.login);
authRoutes.get('/refresh', authController.refreshToken);
export default authRoutes;
