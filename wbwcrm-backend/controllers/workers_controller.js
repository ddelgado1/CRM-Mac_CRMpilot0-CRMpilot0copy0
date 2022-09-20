
import Worker from '../models/worker.js';


export const index = (req, res, next) =>{
    Worker.all('workers')
    .then(([rows, fieldData]) => {
        res.json(rows)
    })
    .catch(err => console.log(err))
};

export const create = (req, res, next) => {
    const worker = new Worker(null, req.params.name, req.params.email, req.params.admin)
    worker.save()
    .then(() => {
        console.log('here');
    })
    .catch(err => console.log(err))
}

//Now that I understand how to make this work, we just need to figure out how to work with React then we're gucci ;(