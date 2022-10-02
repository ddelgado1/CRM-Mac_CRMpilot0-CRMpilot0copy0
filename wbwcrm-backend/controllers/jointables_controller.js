
import JoinTable from '../models/jointable.js';

export const index = (req, res, next) =>{
    // The index method for join tables that gives us all of them
    JoinTable.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.error(err));
};

export const create = (req, res, next) => {
    const newJoinsPromiseArray = [];
    for (const worker of req.body.workers){
        const newJoinElement = new JoinTable(null, req.body.contact_id, worker.value) //We use value here since it's in the form that multi-select gave us
        newJoinsPromiseArray.push(newJoinElement.save().then(result => JoinTable.findByID(result[0].insertId)))
    }
    Promise.all(newJoinsPromiseArray).then((values) => res.json(values.map(val => val[0]).flat()))
}

export const destroy = (req, res) => {
    // Here is when we want to remove an existing contact
    JoinTable.deleteMe(req.body.id)
    .then(() => res.json("Join tables deleted"))
    .catch((err) => res.error(err))
}
