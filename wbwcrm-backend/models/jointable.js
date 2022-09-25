import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class JoinTable{
    constructor(id, worker_id, contact_id){
        this.id = id;
        this.worker_id = worker_id;
        this.contact_id = contact_id;
    }
    
    save(){
        /* The purpose of this function is to save a new element to the database. */
        return db.execute(`INSERT INTO __name_of_join_table__ (worker_id, contact_id) VALUES(?, ?, ?)`, [this.worker_id, this.contact_id]);
    }

    deleteMe(){
        //Uses SQL to delete an individual customer element
        return db.execute('DELETE FROM __name_of_join_table__ WHERE id = ?', [this.id]);
    }

    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM __name_of_join_table__');
    }

    static findByContactID(id_of_contact_in_response){
        /* Will give us a list of elements that have the contact_id from response  */   
        return db.execute('SELECT * FROM __name_of_join_table__ WHERE __name_of_join_table__.contact_id = ?', [id_of_contact_in_response]);
    }

    
    
}

export default JoinTable;
