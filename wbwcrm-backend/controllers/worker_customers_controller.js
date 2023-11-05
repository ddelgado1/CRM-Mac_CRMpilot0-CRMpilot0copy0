
import WorkerCustomer from '../models/workercustomer.js';

export const index = (req, res, next) => {
    // The index method for join table rows that gives us all of them
    WorkerCustomer.all()
        .then(([rows, fieldData]) => {
            res.json(rows);
        })
        .catch(err => res.status(500).json({ message: "Something went wrong on our end. Try to reload the page and start again" }));
};

export const allCustomers = (req, res, next) => {
    // The index method for join table rows that gives us all of them
    const workerId = req.params.workerId

    console.log('Worker Id ==> ', req);

    WorkerCustomer.allCustomers(workerId)
        .then(([rows, fieldData]) => {
            res.json(rows);
        })
        .catch(err => res.status(500).json({ message: "Something went wrong on our end. Try to reload the page and start again" }));
};



