import express from 'express';
import db from './database/connection';
import convertHoursToMinutes from './utils/convertHoursToMinutes';
import ClassController from './controllers/ClassController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classController = new ClassController();
const connectionsController  = new ConnectionsController();

routes.get('/classes', classController.index);

routes.post('/classes', classController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);


export default routes;