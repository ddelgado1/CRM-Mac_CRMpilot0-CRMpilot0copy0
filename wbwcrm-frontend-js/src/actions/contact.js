import axios from 'axios';

export const getContacts = () => dispatch => {
  axios.get("http://localhost:3001/contacts")
  .then(response => dispatch({ type: 'GET_ALL_CONTACTS', payload: response.data}))
}

export const createContact = (contact_information) => dispatch => {
  axios.post("http://localhost:3001/contacts", contact_information)
  .then(response => { 
    if (response.data.errors){
      dispatch({type: 'CONTACT_CREATION_ERROR', payload: response.data.errors})
    }
    else{
      dispatch({ type: 'CREATE_NEW_CONTACT', payload: response.data})
    }
  })
}