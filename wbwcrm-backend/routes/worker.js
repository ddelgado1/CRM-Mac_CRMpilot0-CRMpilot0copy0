import express from 'express';
import { index } from '../controllers/workers_controller.js';

const workerRouter = express.Router();

workerRouter.get('/', index);

// router.post('/add-product', (req, res, next) => {
//     console.log(req.body.title);
//     res.redirect('/');
// });

export default workerRouter;