import { useDispatch, useSelector } from 'react-redux';
import { patchNotes } from '../../actions/contact';

import './contact.scss';

const Show = () => {

    const dispatch = useDispatch();
    const customerChosen = useSelector((state) => state.contacts.selected_customer) //This is the current customer we get from redux
    const selected_workers = useSelector((state) => state.contacts.selected_customer_workers) //These are the workers themselves
    console.log(customerChosen)
    const renderMaker = () => {
        //Determines what gets rendered
        const divs = [];
        for (const key of Object.keys(customerChosen)){
            if (key !== "notes" && key !== "id" && customerChosen[key] !== ""){
                divs.push(
                    <div key={key} className='show_h2_div'>
                        <h2>{key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h2>
                        <h3 key={key}>{customerChosen[key]}</h3>
                    </div>
                )
            }
            if (key === "contact_title"){
                divs.push(
                <div key="workers" className='show_h2_div'>
                    <h2>Workers</h2>
                    {selected_workers.map(worker =>{
                        return(<h3 key={worker}>{worker.label}</h3>)
                    })}
                </div>
                )
            }
            
        }
        return divs;
    }

    const handleSubmission = (event) => {
        //Here we handle the submission of the notes
        dispatch(patchNotes({value: event.target.value, id: customerChosen.id}));   
    }

    const handleDeletion = (event) => {
        /* Want an alert to pop up asking if they're sure they want to delete it. That alert has a button which deletes on click */
        //ALERT
        //if alert delete button pressed, run delete and reroute
        //else do nothing
    }

    return(
        <>
            <div>{renderMaker().map(element => element)}</div>
            <div key="notes" className='show_h2_div'>
                <h2>Notes:</h2>
                <h3>{customerChosen.notes}</h3>
                <textarea id='notes_textarea'></textarea><br/>
                <button onClick={e => handleSubmission(e)}>Submit Notes</button>
            </div>
            <button id="deletion_button" onClick={e => handleDeletion(e)}>Delete this Customer</button>
        </>
    )
}

export default Show;
