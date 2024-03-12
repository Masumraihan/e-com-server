import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import seedSuperAdmin from './app/DB';

let server: Server;

async function bootstrap() {
  async function main() {
    await mongoose.connect(config.mongoURI);
    seedSuperAdmin();
  }
  main();
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

bootstrap();
