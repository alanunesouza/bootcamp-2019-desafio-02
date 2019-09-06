import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/meetups', authMiddleware, MeetupController.index);
routes.post('/meetups', authMiddleware, MeetupController.store);
routes.put('/meetups/:id', authMiddleware, MeetupController.update);
routes.delete('/meetups/:id', authMiddleware, MeetupController.delete);

routes.get('/subscriptions', authMiddleware, SubscriptionController.index);
routes.post(
  '/meetups/:meetupId/subscriptions',
  authMiddleware,
  SubscriptionController.store
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
