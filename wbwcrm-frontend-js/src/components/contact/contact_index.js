import './contact.css'
import { lookAtSpecificContact } from '../../actions/contact';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';


const Index = (props) => {
    const dispatch = useDispatch();
    
    const contacts = useSelector((state) => state.contacts)
    const workers = useSelector((state) => state.workers)
    const workerContacts = useSelector((state) => state.workerContacts)
    console.log(workerContacts)
    const navigate = useNavigate();
    
    const workerListMaker = (id_of_contact) => {
        //Using join table to get worker information 
        const workers_list = [];
        const join_list = workerContacts.tables.filter(x => x.contact_id === id_of_contact);
        for (const join_table of join_list){
            workers_list.push(workers.workers.find(worker => worker.id === join_table.worker_id).name)
        }
        return workers_list
    }
    
    const handleClick = (e, chosen_contact) => {
        //This should mean they clicked on a choice and now they're supposed to be routed to the show page of that specific customer
        const path = generatePath("/contact/:id", {
            id: chosen_contact.id
          });
        console.log(workerListMaker(chosen_contact.id))
        dispatch(lookAtSpecificContact(chosen_contact, workerListMaker(chosen_contact.id)))
        navigate(path)
        /* Route to page once redux saves the information */
    }
    if (workerContacts.tables.length === 0){
        return <h1>Loading...</h1>
    }
    else{
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
                        contacts.contacts.map(element => {
                        return (
                            <tr key={element.company}>
                                <td>{element.company}</td>
                                <td>{element.contact_name}</td>
                                <td>{element.category}</td>
                                <td>{workerListMaker(element.id).map((item) => 
                                 item)}</td>
                                {/* TODO make the workers thing work */}
                                <td><button onClick={e => handleClick(e, element)}>Click To see</button></td>
                            </tr>
                        )
                        })}  
                    </tbody>
                    
                </table>
            </div>
        )
    }
    
}



export default Index;
