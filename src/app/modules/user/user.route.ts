import { Router } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const userRoutes = Router();

userRoutes.get('/get-all-users', auth('admin', 'superAdmin'), userControllers.getAllUser);
//userRoutes.get('/get-all-admins', auth('superAdmin'), userControllers.getAllAdmins);
userRoutes.get('/get-single-user/:id', auth('admin', 'superAdmin'), userControllers.getSingleUser);
userRoutes.patch('/update-user/:id', auth('admin', 'superAdmin'), userControllers.updateUserStatus);
//userRoutes.delete('/delete-user/:id', auth('admin', 'superAdmin'), userControllers.deleteUser);

export default userRoutes;
