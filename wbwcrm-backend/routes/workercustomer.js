import express from 'express';
import { index, create } from '../controllers/worker_customers_controller.js';

const workerCustomersRouter = express.Router();

workerCustomersRouter.get('/', index);

workerCustomersRouter.post('/', create);


export default workerCustomersRouter;