import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class Worker{
    constructor(id, name, email, admin){
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
    }
    
    save(){
        /* The purpose of this function is to save a new element to the database. */
        return db.execute(`INSERT INTO workers (name, email, admin) VALUES(?, ?, ?)`, [this.name, this.email, this.admin]);
    }

    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM workers');
    }

    static getElementById(element_id){
        /* Will give us a specific element based on the id that is fed to it (the element_id) */   
        return db.execute('SELECT * FROM workers WHERE workers.id = ?', [element_id]);
    }
    
}

export default Worker
