import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class JoinTable{
    constructor(id, contact_id, worker_id){
        this.id = id;
        this.contact_id = contact_id;
        this.worker_id = worker_id;
    }
    
    save(){
        /* The purpose of this function is to save a new element to the database. */
        return db.execute(`INSERT INTO workercontacts (contact_id, worker_id) VALUES(?, ?)`, [this.contact_id, this.worker_id]);
    }

    deleteMe(){
        //Uses SQL to delete an individual customer element
        return db.execute('DELETE FROM workercontacts WHERE id = ?', [this.id]);
    }

    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM workercontacts');
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM workerContacts WHERE workerContacts.id = ?', [element_id]);
    }

    
    
}

export default JoinTable;
