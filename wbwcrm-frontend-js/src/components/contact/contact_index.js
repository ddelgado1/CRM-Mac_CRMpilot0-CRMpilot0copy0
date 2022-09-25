import './contact.css'
import { getContacts, lookAtSpecificContact } from '../../actions/contact';
import { getWorkers } from '../../actions/worker';
// import { getWorkersAndContactsJoin } from '../../actions/jointable'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Index = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts)
    const workers = useSelector((state) => state.workers)
    useEffect(() => {
        dispatch(getContacts())
        dispatch(getWorkers())
      }, [dispatch]);
    
    // const specificWorkerGetter = (id_of_contact) => {
    //     //Using join table to get worker information 
    //     const workers_list = [];
    //     for (const worker in workers.workers) {
            
    //     }
    // }
    const handleClick = (e, chosen_contact) => {
        //This should mean they clicked on a choice and now they're supposed to be routed to the show page of that specific customer
        dispatch(lookAtSpecificContact(chosen_contact))
        /* Route to page once redux saves the information */
    }
    return(
        
        <div className="index">
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Category</th>
                        <th>WBW Worker</th>
                        <th>See Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.contacts.length === 0 ? null : 
                    contacts.contacts.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.company}</td>
                            <td>{val.contact_name}</td>
                            <td>{val.category}</td>
                            <td>Hi</td>
                            {/* TODO make the workers thing work */}
                            <td><button onClick={e => handleClick(e, val)}>Click To see</button></td>
                        </tr>
                    )
                    })}  
                </tbody>
                
            </table>
        </div>
    )
}



export default Index;
