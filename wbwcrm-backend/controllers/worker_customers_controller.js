
import WorkerCustomer from '../models/workercustomer.js';

export const index = (req, res, next) =>{
    // The index method for join table rows that gives us all of them
    WorkerCustomer.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}));
};

export const create = (req, res, next) => {
    const newWorkerCustomersPromiseArray = [];
    for (const worker of req.body.workers){
        const newWorkerCustomerElement = new WorkerCustomer(null, req.body.customer_id, worker.value) //We use value here since it's in the form that multi-select gave us
        newWorkerCustomersPromiseArray.push(newWorkerCustomerElement.save().then(result => WorkerCustomer.findByID(result[0].insertId)))
    }
    Promise.all(newWorkerCustomersPromiseArray).then((values) => res.json(values.map(val => val[0]).flat()))
}

export const destroy = (req, res) => {
    // Here is when we want to remove an existing customer
    WorkerCustomer.deleteMe(req.body.id)
    .then(() => res.json("WorkerCustomer tables deleted"))
    .catch(err => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}))
}
