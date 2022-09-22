import axios from 'axios';

export const getWorkers = () => dispatch => {
  axios.get("http://localhost:3001/workers")
  .then(response => dispatch({ type: 'GET_ALL_WORKERS', payload: response.data}))
}

