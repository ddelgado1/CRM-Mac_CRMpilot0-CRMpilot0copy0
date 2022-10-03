import axios from 'axios';

export const getContacts = () => dispatch => {
  //Does exactly what it says it does
  axios.get("http://localhost:3001/contacts")
  .then(response => dispatch({ type: 'GET_ALL_CONTACTS', payload: response.data}))
  .catch(err => dispatch({type: 'CONTACT_ERROR', payload: err.response.data.message}))
} 

export const createContact = (contact_information, selected_workers) => dispatch => {
  //Does exactly what it says it does
  axios.post("http://localhost:3001/contacts", {contact: contact_information, workers: selected_workers})
  .then(response => {
    dispatch({ type: 'CREATE_NEW_CONTACT', payload: {contact: response.data.contact[0], workers: response.data.workers}}) 
    axios.post("http://localhost:3001/workerContacts", {contact_id: response.data.contact[0].id, workers: response.data.workers})
      .then(response => { 
        dispatch({type: 'DELETE_CONTACT_ERROR'})
          dispatch({ type: 'CREATE_NEW_JOIN_TABLES', payload: response.data })
      })
      .catch(err => dispatch({type: 'CONTACT_ERROR', payload: response.data.message}))
  })
  .catch(err => {
    dispatch({type: 'CONTACT_ERROR', payload: err.response.data.message})})
}

export const lookAtSpecificContact = (contact_information, workers) => dispatch => {
  // renders show page
  dispatch({type: 'CUSTOMER_SHOW_PAGE', payload: {contact: contact_information, workers: workers}});
}

export const updateNotes = (note_data) => dispatch => {
  //Since we will be defaulting with the notes already blank, we only need patch This both sends the data to the back end as well as updates the current notes on the front end
  console.log(note_data)
  dispatch({type: 'NOTE_UPDATED', payload: note_data})
  axios.post(`http://localhost:3001/contacts/update`, {value: note_data.value, id: note_data.id})
}

export const destroyCustomer = (customer_id) => dispatch => {
  //This deletes the customer
  
  axios.post(`http://localhost:3001/contacts/destroy`, {id: customer_id})
  .then(() => {
    dispatch({type: 'CUSTOMER_DESTROYED', payload: customer_id});
    axios.post(`http://localhost:3001/workerContacts/destroy`, {id: customer_id}) //I'm scared that the first thing will run but the second one won't, causing a lot of problems. We can deal with this by just throwing a big error message for the user hopefully
    .then(() => {
      dispatch({type: 'JOIN_TABLE_ROWS_DESTROYED', payload: customer_id});
    })
    .catch(err => dispatch({type: 'CONTACT_ERROR', payload: err.response.data.message}))
  
    })
  .catch(err => dispatch({type: 'CONTACT_ERROR', payload: err.response.data.message}))
}

export const searchCustomers = (customer_search_qualities, worker_chosen, join_tables_ordered_by_customer_id) => dispatch => {
  //This is how we search for the customers if there are no workers selected
  dispatch({type: 'SEARCH_FOR_CUSTOMERS', payload: {search_qualities: customer_search_qualities, worker_id: worker_chosen.value, all_joins: join_tables_ordered_by_customer_id}});
}

export const deleteContactErrorsAndRevertSearchedCustomers = () => dispatch => {
  //Does exactly what it says it does
  dispatch({type: "REMOVE_CONTACT_ERROR_AND_SEARCHED_CUSTOMERS"});
}
