
import Contact from '../models/contact.js';

export const index = (req, res) =>{
    // The index method for contacts that gives us all of them
    Contact.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}));
};

export const create = (req, res) => {
    // Here we create new customers (or contacts, I can never seem to agree on what they're called, but nor can Richard so it's kind of a moot point...)
    const contact = new Contact(
        null, req.body.contact.company, req.body.contact.contact_name, req.body.contact.email, req.body.contact.number, req.body.contact.title, req.body.contact.old_address, req.body.contact.new_address, req.body.contact.category,  
        req.body.contact.broker_name, req.body.contact.broker_company, req.body.contact.broker_number, req.body.contact.broker_email, req.body.contact.architect_name, req.body.contact.architect_company, req.body.contact.architect_number, req.body.contact.architect_email,  
        req.body.contact.consultant_name, req.body.contact.consultant_company, req.body.contact.consultant_number, req.body.contact.consultant_email, ""
        )
    Contact.companyValidator(contact.company)
    .then(([found_contact_element]) => {
        if (found_contact_element.length !== 0){
            res.status(500).json({message: "Company already has an associated customer"});
        }
        
        else{
            (contact.contactValidator() && req.body.workers.length !== 0) ? 
            contact.save()
            .then((result) => {
                Contact.findByID(result[0].insertId)
                .then(([new_contact]) =>{
                    res.json({contact: new_contact, workers: req.body.workers})
                })
                .catch(err => res.status(500).json({message: "We had some trouble saving on our end. Please try to reload page and try again"}))
                
            })
            .catch(err => res.status(500).json({message: "We had some trouble saving on our end. Please try to reload page and try again"}))
            :
            res.status(500).json({message: "Must have company name, contact name, workers, and category filled"});
        }
    })
    .catch(err => res.status(500).json({message: "Something went wrong on our end, please try to reload page and try again"}) )
    }
    
export const update = async (req, res) => {
    // In here, we update our notes by concatenating the old notes with the new ones along with a timestamp
    try{
        const [found_contact] = await Contact.findByID(req.body.id)
        const updated_contact = await Contact.updateNotes(req.body.value, req.body.id, found_contact[0].notes)
        res.json(updated_contact[0])
    }
    catch (err){
        res.status(500).json({message: "Something went wrong when trying to save your notes. Try and reload the page and try again"})
    }
}

export const destroy = (req, res) => {
    // Here is when we want to remove an existing contact
    Contact.deleteMe(req.body.id)
    .then(() => res.json("Contact deleted"))
    .catch((err) => res.status(500).json({message: "Something went wrong when trying to save delete this. Try and reload the page and try again "}))
}
