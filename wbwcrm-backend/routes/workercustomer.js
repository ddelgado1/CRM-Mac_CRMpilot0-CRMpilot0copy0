import express from 'express';
import { allCustomers, index } from '../controllers/worker_customers_controller.js';

const workerCustomersRouter = express.Router();

workerCustomersRouter.get('/', index);
workerCustomersRouter.get('/:workerId', allCustomers);



export default workerCustomersRouter;