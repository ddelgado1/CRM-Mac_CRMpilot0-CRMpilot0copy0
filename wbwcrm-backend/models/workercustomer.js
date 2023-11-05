import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class WorkerCustomer{
    constructor(id, customer_id, worker_id){
        this.id = id;
        this.customer_id = customer_id;
        this.worker_id = worker_id;
    }
    
    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM workercustomers');
    }

    static allCustomers(workerId){
        /* Will give us all of the elements within the database */
        return db.execute(`
            SELECT 
        c.id AS customer_id,
        c.company,
        c.contact_name,
        CASE 
            WHEN wc.id IS NOT NULL AND wc.worker_id = ${workerId} THEN c.contact_email
            ELSE 'N/A'
        END AS contact_email,
        CASE 
            WHEN wc.id IS NOT NULL AND wc.worker_id = ${workerId} THEN c.contact_phone_number
            ELSE 'N/A'
        END AS contact_phone_number,
        -- c.contact_title,
        c.category,
        w.name
    FROM 
        customers c
    LEFT JOIN 
        workercustomers wc ON c.id = wc.customer_id
    LEFT JOIN
        workers w ON wc.worker_id = w.id;
            `);
        // return db.execute('SELECT * FROM workercustomers');
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM workercustomers');

        // return db.execute('SELECT * FROM workerCustomers WHERE workerCustomers.id = ?', [element_id]);
    }

    save(worker_id, customer_id){
        // The purpose of this function is to save a new element to the database.
        return db.execute(`INSERT INTO workercustomers (customer_id, worker_id) VALUES(?, ?)`, [customer_id, worker_id])
    }
     
}

export default WorkerCustomer;
