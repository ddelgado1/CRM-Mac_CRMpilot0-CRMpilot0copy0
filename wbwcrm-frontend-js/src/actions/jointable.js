import axios from 'axios';


export const getWorkersAndContactsJoin = () => dispatch => {
  axios.get("http://localhost:3001/workerContacts")
  .then(response => dispatch({ type: 'GET_ALL_JOIN_TABLE_INFORMATION', payload: response.data}))
}

// export const searchForJoinTableRows = (worker_list) => dispatch => {
//   //We're making this its own thing so that we can separate the two functions and thus ensure we are able to actually get the intersection of the two
//   dispatch({type: 'SEARCH_FOR_JOIN_TABLE_ROWS', payload: worker_list})
// }