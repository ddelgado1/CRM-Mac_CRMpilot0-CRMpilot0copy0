import { useSelector, useDispatch } from 'react-redux';
import { patchNotes, destroyContact } from '../../actions/contact';

import './contact.css';

const Show = () => {
    /* 
        Since we're using redux, we just need to useSelector to get the information about the current worker (which we will set
            when they press the button to the right of the index page's individual elements)

    */    

    const dispatch = useDispatch();
    const customerChosen = useSelector((state) => state.contacts.selected_customer) //This is the current customer we get from redux
    const selected_workers = useSelector((state) => state.contacts.selected_customer_workers) //These are the workers themselves

    const handleChange = (event) => {
        dispatch(patchNotes({value: event.target.value, id: customerChosen.id}));
    
    }
    
    const renderMaker = () => {
        //Determines what gets rendered
        const divs = [];
        for (const key of Object.keys(customerChosen)){
            if (key !== "notes" && key !== "id" && customerChosen[key] !== ""){
                divs.push(
                    <div key={key} className='show_h2_div'>
                        <h2>{key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h2>
                        <h3>{customerChosen[key]}</h3>
                    </div>
                )
            }
            if (key === "contact_title"){
                divs.push(
                <div key="workers" className='show_h2_div'>
                    <h2>Workers</h2>
                    {selected_workers.map(worker =>{
                        return(<h3 key={worker.value}>{worker.label}</h3>)
                    })}
                </div>
                )
            }
            
        }
        return divs;
    }
    const handleDeletion = (event) => {
        /* Want an alert to pop up asking if they're sure they want to delete it. That alert has a button which deletes on click */
        //ALERT
        //if alert delete button pressed, run delete and reroute
        //else do nothing
    }

    return(
        <>
            {renderMaker().map(element => element)}
            <div className='show_h2_div'>
                <h2>Notes:</h2>
                <textarea id='notes_textarea' onChange={event => handleChange(event)} defaultValue={customerChosen.notes.data} ></textarea><br/>
                <button onClick={e => handleDeletion(e)}>Delete this Customer</button>
            </div>
            
        </>
    )
}

export default Show;

    // const whichThingsToRender = () => {
    //     /*
    //     Let's say our customer looks like this:
    //     {company: "Doug's food emporium", contact: "Greg Jones", ... old_address: "123 West Road" ...}
    //     We can just run through the thing and make it make divs that look like this:
    //     <div>
    //         <h2>Company</h2>
    //         <h3>__company_name_from_redux__</h3>
    //     </div>
    //     etc. This function does that
    //     */
    //     for (const key of Object.keys(customerChosen)){
            
    //     }
    // }

            /* <div id="company_div">
                <h2>Company</h2>
                <h3>__company_name_from_redux__</h3>
            </div>
            <div id="category_div">
                <h2>Category</h2>
                <h3>__category_from_redux__</h3>
            </div>
            <div id="contact_name_div">
                <h2>Contact Name</h2>
                <h3>__contact_name_from_redux__</h3>
            </div>
            <div id="title_div">
                <h2>Title</h2>
                <h3>__title_from_redux__</h3>
            </div>
            <div id="contact_name_div">
                <h2>Contact Name</h2>
                <h3>__contact_name_from_redux__</h3>
            </div>
            <div id="title_div">
                <h2>Title</h2>
                <h3>__title_from_redux__</h3>
            </div> */

/*                 
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
            </form> */