import '../components.scss';
import { lookAtSpecificContact } from '../../actions/contact';
import { useMemo, lazy, Suspense, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Table = lazy(() => import('./contact_index_table.js'));


const Index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contacts = useSelector((state) => state.contacts) // Here are all of the contacts
    const customersIfNoSearchedCustomersElseSearchedCustomersRef = useRef([]) //The reason we're including this is that if there are searched customers, we want to use them instead of all customers
    const workers = useSelector((state) => state.workers)
    const workerContacts = useSelector((state) => state.workerContacts)
    

    const columns = useMemo( //These are the columns for the table we're using
        () => [
          {
            Header: 'Customers',
            columns: [
              {
                Header: 'Company Name',
                accessor: 'company',
              },
              {
                Header: 'Contact Name',
                accessor: 'contact_name',
              },
              {
                Header: 'Category',
                accessor: 'category',
              },
              {
                Header: 'Workers',
                accessor: 'workers',
              },
              {
                Header: "See Customer",
                accessor: "customer_button"
              }
            ],
          }
        ],
        []
      )
    
    const workerListMaker = (id_of_contact) => {
        //Using join table to get worker information 
        const workers_list = [];
        const join_list = workerContacts.tables.filter(x => x.contact_id === id_of_contact);
        for (const join_table of join_list){
            workers_list.push(workers.workers.find(worker => worker.id === join_table.worker_id).name)
        }
        return workers_list
    }
    
    const dataMaker = () => {
        //This is how we make the array work in a way that 
        if (contacts.searched){
            customersIfNoSearchedCustomersElseSearchedCustomersRef.current = contacts.searched_customers
        }
        else{
            customersIfNoSearchedCustomersElseSearchedCustomersRef.current = contacts.contacts
        }
        return (customersIfNoSearchedCustomersElseSearchedCustomersRef.current.map((individual_customer) => {
            const workers_array = workerListMaker(individual_customer.id).map((worker, index, workers) => {
                if (index + 1 === workers.length){
                    return worker;
                }
                else{
                    return worker + ", ";
                }
            });
            return(
                {
                    company: individual_customer.company,
                    contact_name: individual_customer.contact_name,
                    category: individual_customer.category,
                    workers: workers_array,
                    customer_button: <button onClick={e => handleClick(e, individual_customer)}>Click To see</button>
                }
            )
        }))
    }
    
    const handleClick = (e, chosen_contact) => {
        //This should mean they clicked on a choice and now they're supposed to be routed to the show page of that specific customer
        dispatch(lookAtSpecificContact(chosen_contact, workerListMaker(chosen_contact.id)))
        navigate('/contact')
        /* Route to page once redux saves the information */
    }

    if (workerContacts.tables.length === 0 || contacts.contacts.length === 0 || workers.workers.length === 0 || workerContacts.tables.length === 0){
        return <h1>Loading...</h1>
    }
    else{
        return(
            <div className="index">
                <Suspense fallback={<h1>Loading...</h1>}><Table columns={columns} data={dataMaker()} /></Suspense>
            </div>
        )
    }
    
}



export default Index;
