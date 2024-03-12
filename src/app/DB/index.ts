import { encrypt } from 'secure-encrypt';
import config from '../config';
import UserModel from '../modules/user/user.model';

const seedSuperAdmin = async () => {
  const superAdmin = await UserModel.findOne({ role: 'superAdmin' });
  if (!superAdmin) {

    const hashedPassword = encrypt('superAdmin@123', config.password_secret);

    await UserModel.create({
      name: 'Md Masum Raihan',
      email: 'mdmasumraihan1@gmail.com',
      password: hashedPassword,
      role: 'superAdmin',
      address: 'Natore, Bangladesh',
    });
  }
};

export default seedSuperAdmin;
