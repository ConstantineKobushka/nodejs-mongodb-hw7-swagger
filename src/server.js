import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import contactRoutes from './routes/contacts.js';
import authRouter from './routes/auth.js';

import { getEnvVar } from './utils/getEnvVar.js';
import { loger } from './middlewares/loger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static('uploads'));
  app.use(cookieParser());
  app.use(loger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactRoutes);
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
