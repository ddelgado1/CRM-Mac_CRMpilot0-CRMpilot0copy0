
import JoinTable from '../models/jointable.js';

export const index = (req, res, next) =>{
    // The index method for join tables that gives us all of them
    JoinTable.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: "We couldn't find any groupings of workers and customers"}));
};

export const create = (req, res, next) => {
    const newJoinsPromiseArray = [];
    for (const worker of req.body.workers){
        const newJoinElement = new JoinTable(null, req.body.contact_id, worker.value) //We use value here since it's in the form that multi-select gave us
        newJoinsPromiseArray.push(newJoinElement.save().then(result => JoinTable.findByID(result[0].insertId)))
    }
    Promise.all(newJoinsPromiseArray).then((values) => res.json(values.map(val => val[0]).flat()))
}
    

// export const destroy = (req, res, next) => {
//     // Since there are multiple workers per customer, we will have to do multiple destructions
//     JoinTable.findByContactID(req.contact_id)
//     .then((join_table_elements) => {
//         for(const table of join_table_elements){
//             if (table.contact_id === req.contact_id){
//                 table.deleteMe()
//                 .then(() => res.json({message: "Contact has been deleted successfully"}))
//                 .catch(err => res.json({message: "Couldn't delete join table"}))
//             }
            
//         }
//     })
//     .catch(err => res.json({message: "Couldn't find any join tables for some reason"}));
// }


// export const show = (req, res, next) => {
//     //Uses the method findByID from the contact.js models file. This is the show method where we only get one element
//     Contact.findByID(req.body.id)
//     .then(([contact]) => {
//         res.json(contact);
//     } )
//     .catch(err => res.json({message: "We made an oopsie"}));
// }