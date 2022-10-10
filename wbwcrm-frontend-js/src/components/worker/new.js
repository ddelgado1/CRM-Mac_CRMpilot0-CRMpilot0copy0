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
    const allWorkers = useSelector((state) => state.workers);//We're going to use this to both get an error message if there is any as well as let us know when we've had a success

    const renderedAlreadyRef = useRef(false); //Let's us know if we've rendered it already or not

    useEffect(() => {
        //We'll be using this to see if allWorkers.workers has been updated. We also use the ref renderedAlreadyRef to ensure it only runs after rendering
        if (renderedAlreadyRef.current === true && allWorkers.errors === ""){
            setSuccessMessage("Worker created successfully");
        }
        else{
            setSuccessMessage(null);
        }
    }, [allWorkers])

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
            <h3 className='new_messages'>{allWorkers.errors}</h3>
        </>
    )
}

export default New;

// 
// 
// const contacts = useSelector((state) => state.contacts);
// const workerContacts = useSelector((state) => state.workerContacts);
// const navigate = useNavigate();

// const currentContactRef = useRef(contacts); //This is to determine if there are errors in the current customer without it triggering the useEffect when contacts changes
// const hasBeenRenderedRef = useRef(false); //Used to determine if we've rendered it yet or not so that we don't have to run second useEffect at first render

// useEffect(() => {
//     //This final useEffect is here to tell us when contacts changes so that we can update our currentContactRef
//     currentContactRef.current = contacts;
// }, [contacts])

// useEffect(() => {
// //This useEffect is for determining if we've had our workersTables changed so that we can render our show and not worry about the index page having a lack of workers in it
// if (hasBeenRenderedRef.current === true){
//     if (currentContactRef.current.errors === ""){
//         navigate("/contact");
//     }
// }
// }, [workerContacts, navigate]) 




// return(
//     <>
//         <h1>Create a new Customer</h1>
//         <form id="customer_form" onSubmit={handleSubmit}>
//             
//             <label>
//                 Contact: 
//                 <input type="text" defaultValue={customer.contact_name} id="contact_name" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Workers: 
//                 <div id="multi_select">
//                 <MultiSelect 
//                     options={workers.select_tag_worker_list}
//                     value={selected}
//                     onChange={setSelected}
//                     labelledBy="Select"
//                 />
//                 </div>
               
                
//             </label>
//             <label>
//                 Title: 
//                 <input type="text" id="title" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Email: 
//                 <input type="text" defaultValue={customer.email} id="email" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Number: 
//                 <input type="text" defaultValue={customer.number} id="number" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Old Address: 
//                 <input type="text" defaultValue={customer.old_address} id="old_address" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 New Address: 
//                 <input type="text" defaultValue={customer.new_address} id="new_address" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Category: 
//                 <select id="category"onChange={e => handleChange(e)}>
//                     <option value="EU">EU</option>
//                     <option value="REB">REB</option>
//                     <option value="A&D">A&D</option>
//                     <option value="PMfirm">PMfirm</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </label>
//             <label>
//                 Broker Company: 
//                 <input type="text" defaultValue={customer.broker_company} id="broker_company" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Broker Name: 
//                 <input type="text" defaultValue={customer.broker_name} id="broker_name" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Broker Number: 
//                 <input type="text" defaultValue={customer.broker_number} id="broker_number" onChange={e => handleChange(e)}></input>
//             </label>

//             <label>
//                 Broker Email: 
//                 <input type="text" defaultValue={customer.broker_email} id="broker_email" onChange={e => handleChange(e)}></input>
//             </label>

//             <label>
//                 Architect Company: 
//                 <input type="text" defaultValue={customer.architect_company} id="architect_company" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Architect Name: 
//                 <input type="text" defaultValue={customer.architect_name} id="architect_name" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Architect Number: 
//                 <input type="text" defaultValue={customer.architect_number} id="architect_number" onChange={e => handleChange(e)}></input>
//             </label>

//             <label>
//                 Architect Email: 
//                 <input type="text" defaultValue={customer.architect_email} id="architect_email" onChange={e => handleChange(e)}></input>
//             </label>

//             <label>
//                 Consultant Company: 
//                 <input type="text" defaultValue={customer.consultant_company} id="consultant_company" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Consultant Name: 
//                 <input type="text" defaultValue={customer.consultant_name} id="consultant_name" onChange={e => handleChange(e)}></input>
//             </label>
//             <label>
//                 Consultant Number: 
//                 <input type="text" defaultValue={customer.consultant_number} id="consultant_number" onChange={e => handleChange(e)}></input>
//             </label>

//             <label>
//                 Consultant Email: 
//                 <input type="text" defaultValue={customer.consultant_email} id="consultant_email" onChange={e => handleChange(e)}></input>
//             </label>
//         
//         </form>
//         <h2 id="new_errors">{contacts.errors}</h2>
//     </>
// )