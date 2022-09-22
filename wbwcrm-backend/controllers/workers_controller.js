
import Worker from '../models/worker.js';


export const index = (req, res, next) =>{
    // The index method for workers that gives us all of them. This is useful for when we make new contacts and need a list of workers
    Worker.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(err => res.json({message: "We made an oopsie"}));
};

// export const create = (req, res, next) => {
//     const worker = new Worker(null, req.params.name, req.params.email, req.params.admin)
//     worker.save()
//     .then(() => {
//         console.log('here');
//     })
//     .catch(err => console.log(err))
// }

//Now that I understand how to make this work, we just need to figure out how to work with React then we're gucci ;(