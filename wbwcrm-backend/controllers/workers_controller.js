
import Worker from '../models/worker.js';


export const index = (req, res, next) =>{
    // The index method for contacts that gives us all of them
    Worker.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: "We couldn't find any workers"}));
};

export const create = (req, res, next) => {
    // Here we create new workers
    //Need to figure out how to properly validate if worker already exists
    const worker = new Worker(
        null, req.body.company, req.body.name, req.body.email, req.body.number, req.body.title, req.body.old_address, req.body.new_address, req.body.category,  
        req.body.broker_name, req.body.broker_company, req.body.broker_number, req.body.broker_email, req.body.architect_name, req.body.architect_company, req.body.architect_number, req.body.architect_email,  
        req.body.consultant_name, req.body.consultant_company, req.body.consultant_number, req.body.consultant_email, req.body.notes
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
    .catch(err => res.json({message: "Something went wrong on our end, very sorry"}) )
    }

// export const create = (req, res, next) => {
//     const worker = new Worker(null, req.params.name, req.params.email, req.params.admin)
//     worker.save()
//     .then(() => {
//         console.log('here');
//     })
//     .catch(err => console.log(err))
// }

//Now that I understand how to make this work, we just need to figure out how to work with React then we're gucci ;(