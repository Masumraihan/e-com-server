import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { userRole } from '../auth/auth.constant';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: [userRole.customer, userRole.admin, userRole.superAdmin],
      default: userRole.customer,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    profile_picture: {
      type: String,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
