
import Contact from '../models/contact.js';

export const index = (req, res, next) =>{
    // The index method for contacts that gives us all of them
    Contact.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: err}));
};

export const create = (req, res, next) => {
    // Here we create new customers (or contacts, I can never seem to agree on what they're called, but nor can Richard so it's kind of a moot point...)
    const contact = new Contact(
        null, req.body.contact.company, req.body.contact.contact_name, req.body.contact.email, req.body.contact.number, req.body.contact.title, req.body.contact.old_address, req.body.contact.new_address, req.body.contact.category,  
        req.body.contact.broker_name, req.body.contact.broker_company, req.body.contact.broker_number, req.body.contact.broker_email, req.body.contact.architect_name, req.body.contact.architect_company, req.body.contact.architect_number, req.body.contact.architect_email,  
        req.body.contact.consultant_name, req.body.contact.consultant_company, req.body.contact.consultant_number, req.body.contact.consultant_email, ""
        )
    Contact.companyValidator(contact.company)
    .then(([found_contact_element]) => {
        if (found_contact_element.length !== 0){
            res.json({message: "company already has a contact"});
        }
        
        else{
            (contact.contactValidator() && req.body.workers.length !== 0) ? 
            contact.save()
            .then((result) => {
                Contact.findByID(result[0].insertId)
                .then(([new_contact]) =>{
                    res.json({contact: new_contact, workers: req.body.workers})
                })
                .catch(err => res.json(err))
                
            })
            .catch(err => res.json({message: err}))
            :
            res.json({message: "Must have company name, contact name, workers, and category filled"})
        }
    })
    .catch(err => res.json({message: err}) )
    }
    
export const update = (req, res, next) => {
    // Rather than make a traditional update method, we'd just have the changes to the notes be done on the client side via axios requests in which case we would catch those here and then update it
    Contact.findByID(req.body.id)
    .then(([contact]) => {
        contact.updateNotes(req.body.notes)
        .then(res.json({message: "Notes updated successfully"}))
        .catch(err => res.json({message: "Your notes couldn't be updated"}))
    })
}

export const destroy = (req, res, next) => {
    // Here is when we want to remove an existing contact
    Contact.findByID(req.body.id)
    .then(([contact]) => {
        contact.deleteMe()
        .then(() => res.json({message: "Contact has been deleted successfully"}))
        .catch(err => res.json({message: "Couldn't delete for some reason"}));
    })
    .catch(err => res.json({message: "Couldn't find the customer for some reason"}));
}
