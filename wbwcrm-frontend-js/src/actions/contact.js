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

export const lookAtSpecificContact = (contact_information) => dispatch => {
  dispatch({type: 'CUSTOMER_SHOW_PAGE', payload: contact_information});
}

export const patchNotes = (note_data) => dispatch => {
  //Since we will be defaulting with the notes already blank, we only need patch
  axios.patch(`__Haven't_decided_link_yet/contacts/${note_data.id}`, {value: note_data.value, id: note_data.id})
      .then(resp => dispatch({type: 'NOTE_UPDATED', payload: resp.data}))
}

export const destroyContact = (id) => dispatch => {
  //Not sure if delete is the right thing. Gotta check with axios. Also gotta check what correct route for destroy is
  axios.delete(`__Haven't_decided_link_yet/contacts/${id}`)
      .then(resp => dispatch({type: 'CONTACT_DESTROYED', payload: resp.data}))
}