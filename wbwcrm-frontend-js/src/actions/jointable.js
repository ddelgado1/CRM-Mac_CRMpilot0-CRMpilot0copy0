import axios from 'axios';

export const getWorkersAndContactsJoin = () => dispatch => {
  axios.get("http://localhost:3001/joinTables")
  .then(response => dispatch({ type: 'GET_ALL_JOIN_TABLE_INFORMATION', payload: response.data}))
}

