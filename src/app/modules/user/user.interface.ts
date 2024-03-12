import { userRole } from '../auth/auth.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  profile_picture?: string;
  address: string;
  isBlocked: boolean;
  isDeleted: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof userRole;
