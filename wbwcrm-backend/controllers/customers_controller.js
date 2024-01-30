
import Customer from '../models/customer.js';

// Your function to extract worker ID from token
const extractWorkerIdFromToken = (authHeader) => {
  // Implement this function
  return "someWorkerId";
};
// Your function to get worker role
const getWorkerRole = (workerId) => {
  // Implement this function
  return "administrator";
};

export const index = (req, res) => {
  const workerId = extractWorkerIdFromToken(req.headers['Authorization']); // Implement this function
  const workerRole = getWorkerRole(workerId); // Implement this function

  // const workerId = req.headers['worker-id']; // Or req.body.workerId or req.query.workerId
  // const workerRole = req.headers['worker-role']; // Similarly, this can be from the body or query

  // const workerId = req.body.workerId; // Fetching from request body DD 11/2/23
  // const workerRole = req.body.role; // Fetching role from request body DD 11/2/23

  if (workerRole === 'administrator') {
    // Return all customer data
    Customer.all()
      .then(([rows, fieldData]) => {
        res.json(rows);
      })
      .catch(err => res.status(500).json({ message: "Something went wrong on our end. Try to reload the page and start again" }));
  } else {
    // Return only customer data owned by the worker
    Customer.byWorker(workerId)
      .then(([rows, fieldData]) => {
        res.json(rows);
      })
      .catch(err => res.status(500).json({ message: "Something went wrong on our end. Try to reload the page and start again" }));
  }
};

/*

export const index = (req, res) =>{
    // The index method for customers that gives us all of them
    Customer.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}));
};
*/
export const create = (req, res) => {
  console.log("Req Body ==> ", req.body.customer);
  /*const customer = new Customer(
    null, req.body.customer.company, req.body.customer.contact_name, req.body.customer.email, req.body.customer.number, req.body.customer.title, req.body.customer.old_address, req.body.customer.new_address, req.body.customer.category,
    req.body.customer.broker_name, req.body.customer.broker_company, req.body.customer.broker_number, req.body.customer.broker_email, req.body.customer.architect_name, req.body.customer.architect_company, req.body.customer.architect_number, req.body.customer.architect_email,
    req.body.customer.consultant_name, req.body.customer.consultant_company, req.body.customer.consultant_number, req.body.customer.consultant_email, ""
  ) */

  const customer = new Customer(
    null, req.body.customer.company, req.body.customer.contact_name, req.body.customer.email, req.body.customer.number, req.body.customer.title, req.body.customer.category, ""
  )


  console.log("New Customer ==> ", customer);
  Customer.companyValidator(customer.company)
    .then(([found_customer_element]) => {
      if (found_customer_element.length !== 0) {
        res.status(406).json({ message: "Company already has an associated customer" });
      }

      else {
        (customer.customerValidator() && req.body.workers.length !== 0) ?
          customer.save(req.body.workers)
            .then(([new_customer, new_worker_customers]) => {
              res.json({ customer: new_customer[0], new_worker_customers: new_worker_customers[0] })
            })
            .catch(err => res.status(500).json({ message: "We had some trouble saving on our end. Please try to reload page and try again" }))
          :
          res.status(406).json({ message: "Must have company name, customer name, workers, and category filled" });
      }
    })
    .catch(err => res.status(500).json({ message: "Something went wrong on our end, please try to reload page and try again" }))
}

export const update = async (req, res) => {
  // In here, we update our notes by concatenating the old notes with the new ones along with a timestamp
  try {
    const [found_customer] = await Customer.findByID(req.body.id)
    const updated_customer = await Customer.updateNotes(req.body.value, req.body.id, found_customer[0].notes)
    res.json(updated_customer[0])
  }
  catch (err) {
    res.status(500).json({ message: "Something went wrong when trying to save your notes. Try and reload the page and try again" })
  }
}

export const destroy = (req, res) => {
  // Here is when we want to remove an existing customer
  Customer.deleteMe(req.body.id)
    .then(() => res.json("Customer deleted"))
    .catch((err) => res.status(500).json({ message: "Something went wrong when trying to save delete this. Try and reload the page and try again " }))
}
