
import Contact from '../models/contact.js';

export const index = (req, res, next) =>{
    // The index method for contacts that gives us all of them
    Contact.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: "We made an oopsie"}));
};

export const show = (req, res, next) => {
    //Uses the method findByID from the contact.js models file. This is the show method where we only get one element
    Contact.findByID(req.body.id)
    .then(([contact]) => {
        res.json(contact);
    } )
    .catch(err => res.json({message: "We made an oopsie"}));
}


export const create = (req, res, next) => {
    // Here we create new customers (or contacts, I can never seem to agree on what they're called, but nor can Richard so it's kind of a moot point...)
    //Need to figure out how to properly validate if company already exists
    const contact = new Contact(
        null, req.body.company, req.body.name, req.body.email, req.body.number, req.body.title, req.body.old_address, req.body.new_address, req.body.category,  
        req.body.broker_name, req.body.broker_company, req.body.broker_number, req.body.broker_email, req.body.architect_name, req.body.architect_company, req.body.architect_number, req.body.architect_email,  
        req.body.consultant_name, req.body.consultant_company, req.body.consultant_number, req.body.consultant_email, req.body.notes
        )
    Contact.companyValidator(contact.company)
    .then(([contact]) => {
        if (contact){
            console.log("Company already has a contact")
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
    Contact.findByID(req.body.id)
    .then(([contact]) => {
        contact.updateNotes(req.body.notes)
        .then(res.json({message: "Notes updated successfully"}))
        .catch(err => res.json({message: "We made an oopsie"}))
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