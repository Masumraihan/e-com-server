import { Router } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../auth/auth.validation';

const userRoutes = Router();

userRoutes.get('/get-all-customers', auth('admin', 'superAdmin'), userControllers.getAllCustomers);
userRoutes.get('/get-all-users', auth('superAdmin'), userControllers.getAllUsers);
userRoutes.get('/profile', auth('admin', 'superAdmin', 'customer'), userControllers.getUserProfile);
userRoutes.patch(
  '/update-profile',
  auth('admin', 'superAdmin', 'customer'),
  validateRequest(userValidations.updateUserValidationSchema),
  userControllers.updateProfile,
);
userRoutes.put(
  '/change-password',
  auth('admin', 'superAdmin', 'customer'),
  validateRequest(userValidations.changePasswordValidationSchema),
  userControllers.changePassword,
);
userRoutes.patch('/update-user/:id', auth('admin', 'superAdmin'), userControllers.updateUserStatus);
userRoutes.delete('/delete-user/:id', auth('admin', 'superAdmin'), userControllers.deleteUser);

export default userRoutes;
