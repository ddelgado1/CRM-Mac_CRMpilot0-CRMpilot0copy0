import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class Contact{
    constructor(id, company, name, email, number, title, old_address, new_address, category, broker_name, broker_company,
         broker_number, broker_email, architect_name, architect_company, architect_number, architect_email, consultant_name, consultant_company, consultant_number, consultant_email, notes){
        this.id = id;
        this.company = company;
        this.name = name;
        this.email = email;
        this.number = number;
        this.title = title;
        this.old_address = old_address;
        this.new_address = new_address;
        this.category = category;
        this.broker_name = broker_name;
        this.broker_company = broker_company;
        this.broker_number = broker_number;
        this.broker_email = broker_email;
        this.architect_name = architect_name;
        this.architect_company = architect_company;
        this.architect_number = architect_number;
        this.architect_email = architect_email;
        this.consultant_name = consultant_name;
        this.consultant_company = consultant_company;
        this.consultant_number = consultant_number;
        this.consultant_email = consultant_email;
        this.notes = notes;
        
    }
    save(){
    // The purpose of this function is to save a new element to the database.
    return db.execute(`INSERT INTO workers (company, name, email, number, title, old_address, new_address, category, broker_name, broker_company,
        broker_number, broker_email, architect_name, architect_company, architect_number, architect_email, consultant_name, consultant_company, consultant_number, consultant_email, notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [this.company, this.name, this.email, this.number, this.title, this.old_address, this.new_address, this.category, this.broker_name, this.broker_company, this.broker_number, this.broker_email,
        this.architect_name, this.architect_company, this.architect_number, this.architect_email, this.consultant_name, this.consultant_company, this.consultant_number, this.consultant_email, this.notes]);
    }

    updateNotes(new_notes_text){
        //Uses SQL to update the notes text saved to this specific customer
        return db.execute('UPDATE contacts SET notes = ? WHERE id = ?', [new_notes_text, this.id])
    }

    deleteMe(){
        //Uses SQL to delete an individual customer element
        return db.execute('DELETE FROM contacts WHERE id = ?', [this.id]);
    }

    static all(){
    // Will give us all of the elements within the database (specific to contacts)
        return db.execute('SELECT * FROM contacts')
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM contacts WHERE contacts.id = ?', [element_id]);
    }

    static companyValidator(element_company){
        // Determines if company name is unique as to not have overlaps  
        return db.execute('SELECT * FROM contacts WHERE contacts.company = ?', [element_company]);
    }

    
    
}

export default Contact

        

