import express from 'express';
import { index, create, destroy } from '../controllers/worker_customers_controller.js';

const workerCustomersRouter = express.Router();

workerCustomersRouter.get('/', index);

workerCustomersRouter.post('/', create);

workerCustomersRouter.post('/destroy',destroy);

export default workerCustomersRouter;