import axios from 'axios';
import { generatePath } from 'react-router-dom';

export const getContacts = () => dispatch => {
  axios.get("http://localhost:3001/contacts")
  .then(response => 
    {
      if (response.data.message){
        dispatch({type: 'CONTACT_ERROR', payload: response.data.message})
      }
      else{
        dispatch({ type: 'GET_ALL_CONTACTS', payload: response.data})
      }
    })
} 

export const createContact = (contact_information, selected_workers, navigate) => dispatch => {
  axios.post("http://localhost:3001/contacts", {contact: contact_information, workers: selected_workers})
  .then(response => { 
    if (response.data.message){
      dispatch({type: 'CONTACT_ERROR', payload: response.data.message})
    }
    else{
      dispatch({ type: 'CREATE_NEW_CONTACT', payload: {contact: response.data.contact[0], workers: response.data.workers}})
      axios.post("http://localhost:3001/workerContacts", {contact_id: response.data.contact[0].id, workers: response.data.workers})
      .then(response => { 
        if (response.data.message){
          dispatch({type: 'CONTACT_ERROR', payload: response.data.message})
        }
        else{
          dispatch({ type: 'CREATE_NEW_JOIN_TABLES', payload: {contact_id: response.data.contact_id, tables: response.data.tables} })
          const path = generatePath("/contact/:id", {
            id: response.data.contact_id
          });
          navigate(path);
        }
      })
    }
  })
}

export const lookAtSpecificContact = (contact_information, workers) => dispatch => {
  dispatch({type: 'CUSTOMER_SHOW_PAGE', payload: {contact: contact_information, workers: workers}});
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