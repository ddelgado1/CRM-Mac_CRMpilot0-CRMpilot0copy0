import express from 'express';
import { index, create } from '../controllers/jointables_controller.js';

const workerContactsRouter = express.Router();

workerContactsRouter.get('/', index);

workerContactsRouter.post('/', create);
// workerContactsRouter.post('/', create);

// contactRouter.post('/id', update); //Need to figure out how to do routes of individual ids

// router.post('/add-product', (req, res, next) => {
//     console.log(req.body.title);
//     res.redirect('/');
// });

export default workerContactsRouter;