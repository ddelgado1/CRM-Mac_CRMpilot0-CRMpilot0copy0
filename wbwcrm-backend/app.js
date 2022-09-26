// // import {requestHandler} from './routes.js';
// import express from 'express';
// import adminRouter from './routes/admin.js';
// import sequelize from './util/database.js';

// const app = express();

// app.use(express.urlencoded({extended: true}));
// app.use(express.json())

// app.use(adminRouter);
// app.use((req, res, next) => {
//     res.status(404).send('<h1>Page not found</h1>');
// });

// sequelize.sync()
// .then(result => {
//     app.listen(3000);
// })
// .catch(err => {
//     console.log(err);
// })
import express from 'express';
import workerRouter from './routes/worker.js';
import contactRouter from './routes/contact.js';
import workerContactRouter from './routes/jointable.js';
import cors from 'cors';

// import db from './util/database.js'

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/workers', workerRouter);
app.use('/contacts', contactRouter);
app.use('/workerContacts', workerContactRouter);
// db.execute('SELECT * FROM workers')
// .then(result => {
//     console.log(result[0][0].name);
//     console.log('here');
// })
// .catch(err => console.log(err));

app.listen(3001);