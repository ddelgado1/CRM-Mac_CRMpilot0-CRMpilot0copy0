import axios from 'axios';


export const getWorkersAndContactsJoin = () => dispatch => {
  axios.get("http://localhost:3001/workerContacts")
  .then(response => dispatch({ type: 'GET_ALL_JOIN_TABLE_INFORMATION', payload: response.data}))
}