import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  node_env: process.env.NODE_ENV,
  password_secret: process.env.PASSWORD_SECRET,
  access_token_secret: process.env.ACCESS_TOKEN_SECRETE,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRETE,
  refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
