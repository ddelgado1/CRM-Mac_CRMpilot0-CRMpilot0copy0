I'm working on a project where at one point, I run a series of promises and then push their results (in the .then() portion) to an array. The issue is that, although the promise itself is providing a result value, nothing is actually being pushed to the array itself. Below is the create function in my code where I'm using `Promise.all()` to run a series of processes on an array made of promises called `newJoinsPromiseArray`.

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    export const create = (req, res, next) => {
        const newJoinsPromiseArray = []; //This will be an array of the new joins that we are adding
        for (const worker of req.body.workers){
            const newJoinElement = new JoinTable(null, req.body.contact_id, worker.value) //We use value here since it's in the form that multi-select gave us
            newJoinElement.save()
            .then((result) => {
                newJoinsPromiseArray.push(JoinTable.findByID(result[0].insertId))
            })
            .catch(err => res.json({message: err}))
        }
        Promise.all(newJoinsPromiseArray).then((values) => {console.log(values)})
    }

<!-- end snippet -->

So whenever I console.log(newJoinsPromiseArray), it just prints `[]`. I've tried this also by just running the JoinTable.findByID function on each element then pushing what it returns to the array, although I think that's the same thing.

Below are my functions for save and findByID:

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    save(){
            /* The purpose of this function is to save a new element to the database. */
            return db.execute(`INSERT INTO workercontacts (contact_id, worker_id) VALUES(?, ?)`, [this.contact_id, this.worker_id]);
        }

<!-- end snippet -->

<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    static findByID(element_id){
            // Will give us a specific element based on the id 
            return db.execute('SELECT * FROM workerContacts WHERE workerContacts.id = ?', [element_id]);
        }

<!-- end snippet -->

I'm using a MySQL database,