import {useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import { useSelector, useDispatch } from 'react-redux';
import { getWorkers } from '../../actions/worker.js';
import {createContact} from '../../actions/contact.js';
import { useNavigate } from 'react-router-dom';

import './contact.css';

const New = (props) => {
    const [customer, setCustomer] = useState(
        {
         company: "",
         contact_name: "",
         title: "",
         email: "",
         number: "",
         old_address: "",
         new_address: "",
         category: "EU",
         broker_company: "",
         broker_name: "",
         broker_number: "",
         broker_email: "",
         architect_company: "",
         architect_name: "",
         architect_number: "",
         architect_email: "",
         consultant_company: "",
         consultant_name: "",
         consultant_number: "",
         consultant_email: ""
        });

    const [selected, setSelected] = useState([]); //This determines what has and hasn't been selected yet with workers

    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers)
    const contacts = useSelector((state) => state.contacts)
    const navigate = useNavigate();

    useEffect(() => {
        //We get the workers information on startup (acts like componentDidMount)
        dispatch(getWorkers())
      }, [dispatch]);

    const handleSubmit = (e) => {
        //Handles submitting the form
        e.preventDefault();
        dispatch(createContact(customer, selected, navigate))
    }

    

    const handleChange = (e) => {
        const newKey = e.target.id;
        const newValue = e.target.value
        setCustomer(oldState => ({ ...oldState, [newKey]: newValue}));
    }
    return(
        <>
            <h1>Create a new Customer</h1>
            <form id="customer_form" onSubmit={handleSubmit}>
                <label>
                    Company: 
                    <input type="text" defaultValue={customer.company} id="company" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Contact: 
                    <input type="text" defaultValue={customer.contact_name} id="contact_name" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Workers: 
                    <div id="multi_select">
                    <MultiSelect 
                        options={workers.select_tag_worker_list}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                    </div>
                   
                    
                </label>
                <label>
                    Title: 
                    <input type="text" id="title" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Email: 
                    <input type="text" defaultValue={customer.email} id="email" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Number: 
                    <input type="text" defaultValue={customer.number} id="number" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Old Address: 
                    <input type="text" defaultValue={customer.old_address} id="old_address" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    New Address: 
                    <input type="text" defaultValue={customer.new_address} id="new_address" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Category: 
                    <select id="category"onChange={e => handleChange(e)}>
                        <option value="EU">EU</option>
                        <option value="REB">REB</option>
                        <option value="A&D">A&D</option>
                        <option value="PMfirm">PMfirm</option>
                        <option value="Other">Other</option>
                    </select>
                    {/* Category should be a dropdown as well (I don't have access to the options now since I'm on a plane) */}
                </label>
                <label>
                    Broker Company: 
                    <input type="text" defaultValue={customer.broker_company} id="broker_company" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Broker Name: 
                    <input type="text" defaultValue={customer.broker_name} id="broker_name" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Broker Number: 
                    <input type="text" defaultValue={customer.broker_number} id="broker_number" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Broker Email: 
                    <input type="text" defaultValue={customer.broker_email} id="broker_email" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Architect Company: 
                    <input type="text" defaultValue={customer.architect_company} id="architect_company" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Architect Name: 
                    <input type="text" defaultValue={customer.architect_name} id="architect_name" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Architect Number: 
                    <input type="text" defaultValue={customer.architect_number} id="architect_number" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Architect Email: 
                    <input type="text" defaultValue={customer.architect_email} id="architect_email" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Consultant Company: 
                    <input type="text" defaultValue={customer.consultant_company} id="consultant_company" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Consultant Name: 
                    <input type="text" defaultValue={customer.consultant_name} id="consultant_name" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Consultant Number: 
                    <input type="text" defaultValue={customer.consultant_number} id="consultant_number" onChange={e => handleChange(e)}></input>
                </label>

                <label>
                    Consultant Email: 
                    <input type="text" defaultValue={customer.consultant_email} id="consultant_email" onChange={e => handleChange(e)}></input>
                </label>
            <button type="submit" onClick={e => handleSubmit(e)} id="submit_new_customer">Submit</button>
            </form>
            <h2 id="new_errors">{contacts.errors}</h2>
        </>
    )
}

export default New;