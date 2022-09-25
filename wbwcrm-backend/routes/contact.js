import express from 'express';
import { index, create } from '../controllers/contacts_controller.js';

const contactRouter = express.Router();

contactRouter.get('/', index);

contactRouter.post('/', create);

// contactRouter.post('/id', update); //Need to figure out how to do routes of individual ids

// router.post('/add-product', (req, res, next) => {
//     console.log(req.body.title);
//     res.redirect('/');
// });

export default contactRouter;