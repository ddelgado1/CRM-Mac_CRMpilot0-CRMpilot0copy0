import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class WorkerCustomer{
    constructor(id, customer_id, worker_id){
        this.id = id;
        this.customer_id = customer_id;
        this.worker_id = worker_id;
    }
    
    save(){
        /* The purpose of this function is to save a new element to the database. */
        return db.execute(`INSERT INTO workercustomers (customer_id, worker_id) VALUES(?, ?)`, [this.customer_id, this.worker_id]);
    }

    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM workercustomers');
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM workerCustomers WHERE workerCustomers.id = ?', [element_id]);
    }

    static deleteMe(customer_id){
        //Uses SQL to delete an individual customer element
        return db.execute('DELETE FROM workercustomers WHERE workerCustomers.customer_id = ?', [customer_id]);
    }

    
    
}

export default WorkerCustomer;
