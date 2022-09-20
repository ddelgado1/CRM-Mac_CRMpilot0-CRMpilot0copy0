import axios from 'axios';

export const getContacts = () => dispatch => {
  axios.get("http://localhost:3001/contacts")
  .then(response => dispatch({ type: 'GET_ALL_CONTACTS', payload: response.data
  }))
}

