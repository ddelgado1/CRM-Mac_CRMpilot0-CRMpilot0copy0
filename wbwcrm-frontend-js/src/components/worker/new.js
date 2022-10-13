import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createWorker } from '../../actions/worker';

import '../components.scss';

const New = () => {
     
    const [worker, setWorker] = useState(
        {
            name: "",
            email: "",
            confirmation_email: "",
            admin: false
        }
    );

    const [checked, setChecked] = useState(false); //Determines if admin checkbox is checked or not
    const [successMessage, setSuccessMessage] = useState(null); //If there's a success in the uploading process, we simply will put a message at the bottom.

    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errors.error);
    const selectedWorker = useSelector((state) => state.workers.current_worker); //We will be using this to determine if the user has a right to access this page
 
    const renderedAlreadyRef = useRef(false); //Let's us know if we've rendered it already or not

    useEffect(() => {
        //We'll be using this to see if allWorkers.workers has been updated. We also use the ref renderedAlreadyRef to ensure it only runs after rendering
        if (renderedAlreadyRef.current === true && Object.keys(errors).length === 0){
            setSuccessMessage("Worker created successfully");
        }
    }, [errors])

    const handleSubmit = (e) => {
        //Handles submitting the form
        e.preventDefault();
        dispatch(createWorker(worker));
        renderedAlreadyRef.current = true;
    }


    const handleChange = (e) => {
        const newKey = e.target.id;
        const newValue = e.target.value
        if (newKey === "admin"){
            setChecked(!checked)
            setWorker(oldState => ({...oldState, "admin": !checked}))
        }
        else{
            setWorker(oldState => ({ ...oldState, [newKey]: newValue}));
        }
        
        
    }
    if (Object.keys(selectedWorker).length !== 0){
        if (selectedWorker.admin === 1){
            return(
                <>
                    <form id="worker_form" onSubmit={e => handleSubmit(e)}>
                        <label>
                            Worker Name: 
                            <input type="text" defaultValue={worker.name} id="name" onChange={e => handleChange(e)}></input>
                        </label>
                        <label>
                            Worker Email:  
                            <input type="text" defaultValue={worker.email} id="email" onChange={e => handleChange(e)}></input>
                        </label>
                        <label>
                            Confirmation Email: 
                            <input type="text" defaultValue={worker.confirmation_email} id="confirmation_email" onChange={e => handleChange(e)}></input>
                        </label>
                        <label>
                            Are they an admin?: <input type="checkbox" checked={checked} id="admin" onChange={e => handleChange(e)} />
                        </label>
                        <button type="submit" onClick={e => handleSubmit(e)} className="submit_new_button">Submit</button>
                    </form>
                    <h3 className='new_messages'>{successMessage}</h3>
                </>
            )
        }
        else{
            return(
                <div id="Forbidden">
                    <h1>Error 403 - Forbidden</h1>
                    <h2>You do not have access to this page</h2>
                </div>
            )
        }
    }
    else{
        return(<h1>Loading...</h1>)
    }
}

export default New;


