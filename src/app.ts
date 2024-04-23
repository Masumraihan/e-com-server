import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import handleGlobalError from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// PARSERS
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://e-commerse-flax.vercel.app'],
    credentials: true,
    
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// ROUTES
app.use('/api/v1', router);

// GLOBAL ERROR HANDLERS
app.use(handleGlobalError);

// NOT FOUND ROUTES
app.all('*', notFound);

export default app;
