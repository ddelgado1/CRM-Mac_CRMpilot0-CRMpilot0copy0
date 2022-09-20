import {useState} from 'react';
import { MultiSelect } from "react-multi-select-component";

import './contact.css';

const Show = () => {
    const [notes, setNotes] = useState("");

    /* Since we don't have access to the database, we will need to just assume we know the customer information using dummy code */
    const handleSubmit = (e) => {
        console.log("Here, I will run a dispatch that will then send the info to the backend. Since I'm doing this on the pc I'm doing this")
        console.log(notes)
    }

    
    const handleChange = (e) => {
        setNotes(e.target.value);
    }

    return(
        <>
            <div id="company_div">
                <h2>Company</h2>
                <h3></h3>
            </div>
            <form id="customer_form" onSubmit={handleSubmit}>
                <label>
                    Company: 
                    <input type="text" defaultValue={customer.company} id="company" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Contact: 
                    <input type="text" defaultValue={customer.contact} id="contact" onChange={e => handleChange(e)}></input>
                </label>
                <label>
                    Workers: 
                    <div id="multi_select">
                    <MultiSelect 
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                    </div>
                   
                    
                </label>
                <label>
                    Title: 
                    <input type="text" defaultValue={customer.title} id="title" onChange={e => handleChange(e)}></input>
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
                    <input type="text" defaultValue={customer.category} id="category" onChange={e => handleChange(e)}></input>
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
        </>
    )
}

export default Show;