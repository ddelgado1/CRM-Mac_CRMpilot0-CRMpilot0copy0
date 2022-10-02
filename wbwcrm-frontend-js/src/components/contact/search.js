import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {searchCustomers} from '../../actions/contact.js';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import './contact.scss';

const Search = () => {
    const [customer, setCustomer] = useState(
        {
         company: "",
         contact_name: "",
         category: ""
        });

    const [selected, setSelected] = useState({}); //This determines what has and hasn't been selected yet with workers

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const search_select_workers = useSelector((state) => state.workers.select_tag_worker_list);
    const contacts = useSelector((state) => state.contacts);
    const workerContacts = useSelector((state) => state.workerContacts);

    const hasRenderedRef = useRef(false); //This determines if it's been rendered yet so we don't risk navigating on render

    useEffect(() => {
        //Navigates to the index page on the change of searched_customers
        if (hasRenderedRef.current === true){
            navigate("/contacts");
        };
        
    }, [contacts.searched_customers, navigate]);
   
    const handleSubmit = (e) => {
        //Handles submitting the form
        e.preventDefault();
        hasRenderedRef.current = true;
        dispatch(searchCustomers(customer, selected, workerContacts.tables_ordered_by_customer))
        
    }

    const handleChange = (e) => {
        //Handle change for all elements that aren't the Select component
        const newKey = e.target.id;
        const newValue = e.target.value;
        setCustomer(oldState => ({ ...oldState, [newKey]: newValue}));
    }

    const handleSelect = (e) => {
        //Handle change for the Select component
        setSelected(e);
    }
    return(
        <>
            <h1>Search</h1>
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
                    Category: 
                    <select id="category"onChange={e => handleChange(e)}>
                        <option disabled selected value> -- select an option -- </option>
                        <option value="EU">EU</option>
                        <option value="REB">REB</option>
                        <option value="A&D">A&D</option>
                        <option value="PMfirm">PMfirm</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>
                    Workers: 
                    <div id="select_search">
                        <Select options={search_select_workers} onChange={e => handleSelect(e)} />
                    </div>
                </label>
            <button type="submit" onClick={e => handleSubmit(e)} id="submit_new_customer">Submit</button>
            </form>
            <h2 id="new_errors">{contacts.errors}</h2>
        </>
    )
}

export default Search;


// if (selected.length === 0){
        //     dispatch(searchCustomers(customer));
        //     customersFullyRenderedRef.current = true;
        // }
        // else{
        //     dispatch(searchCustomers(customer));
        //     dispatch(searchForJoinTableRows(selected));
        //     hasBeenRenderedAndWorkersRef.current = true;
        // }
 // useEffect(() => {
    //     //This useEffect is for determining if we've had our searched_customers value changed so we know we can navigate (and we don't have workers)
    //     if (customersFullyRenderedRef.current === true){
    //         navigate("/contacts");
    //     }
    //     }, [contacts, navigate]) 

    // useEffect(() => {
    //     //What we do here is first determine that we've already rendered. Then, if true, we run a dispatch that finalizes the filtering process using both the workerContacts "searched_rows" element and the searched_customers element
    //     if (hasBeenRenderedAndWorkersRef.current === true && customersFullyRenderedRef.current === false){
    //         dispatch(filterCustomersWithJoinTables(workerContacts.searched_rows));
    //         customersFullyRenderedRef.current = true;
    //     }
    //     }, [workerContacts, dispatch]) 