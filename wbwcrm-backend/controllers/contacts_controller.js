
import Contact from '../models/contact.js';

export const index = (req, res, next) =>{
    // The index method for contacts that gives us all of them
    Contact.all('contacts')
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: "We made an oopsie"}));
};

export const show = (req, res, next) => {
    //Uses the method findByID from the contact.js models file. This is the show method where we only get one element
    Contact.findByID(req.params.id)
    .then(([contact]) => {
        res.json(contact);
    } )
    .catch(err => res.json({message: "We made an oopsie"}));
}


export const create = (req, res, next) => {
    // You shouldn't need new since we're not doing the rendering on the server side. Instead, we simply do the create function. This creates (and saves) a new contact element
    const contact = new Contact(
        null, req.params.company, req.params.name, req.params.email, req.params.number, req.params.title, req.params.old_address, req.params.new_address, req.params.category,  
        req.params.broker_name, req.params.broker_company, req.params.broker_number, req.params.broker_email, req.params.architect_name, req.params.architect_company, req.params.architect_number, req.params.architect_email,  
        req.params.consultant_name, req.params.consultant_company, req.params.consultant_number, req.params.consultant_email, req.params.notes
        )
    Contact.companyValidator(contact.company)
    .then(([contact]) => {
        if (contact){
            res.json({message: "company already has a contact"});
        }
        else{
            contact.save()
            .then(() => {
                res.json({message: "Contact created successfully"})
            })
            .catch(err => res.json({message: "Something went wrong when you tried to save your contact"}))
        }
    })
    .catch(err => res.json({error: "Something went wrong on our end, very sorry"}) )
    }
    
export const update = (req, res, next) => {
    // Rather than make a traditional update method, we'd just have the changes to the notes be done on the client side via axios requests in which case we would catch those here and then update it
    Contact.findByID(req.params.id)
    .then(([contact]) => {
        contact.updateNotes(req.params.notes)
        .then(res.json({message: "Notes updated successfully"}))
        .catch(err => res.json({message: "We made an oopsie"}))
    })
}

export const destroy = (req, res, next) => {
    // Here is when we want to remove an existing contact
    Contact.findByID(req.params.id)
    .then(([contact]) => {
        contact.deleteMe()
        .then(() => res.json({message: "Contact has been deleted successfully"}))
        .catch(err => res.json({message: "Couldn't delete for some reason"}));
    })
    .catch(err => res.json({message: "Couldn't find the customer for some reason"}));
}