import express from 'express';
import { index, create, destroy } from '../controllers/jointables_controller.js';

const workerContactsRouter = express.Router();

workerContactsRouter.get('/', index);

workerContactsRouter.post('/', create);

workerContactsRouter.post('/destroy',destroy);

export default workerContactsRouter;