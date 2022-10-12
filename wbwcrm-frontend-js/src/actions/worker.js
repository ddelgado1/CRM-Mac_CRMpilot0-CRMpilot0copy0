import axios from 'axios';

export const getWorkers = () => dispatch => {
  axios.get("http://localhost:3001/workers")
  .then(response => dispatch({ type: 'GET_ALL_WORKERS', payload: response.data}))
}

export const createWorker = (worker_information) => dispatch => {
  //Does exactly what it says it does
  if (worker_information.email === worker_information.confirmation_email){
    // We add this if since we're just gonna do the confirmation email validation here to simplify things since it's not a key in the worker table
    axios.post("http://localhost:3001/workers", worker_information)
    .then(response => {
      dispatch({ type: 'CREATE_NEW_WORKER', payload: response.data}) 
    })
    .catch(err => {
      dispatch({type: 'WORKER_ERROR', payload: {err_message: err.response.data.message, err_code: err.response.request.status, err_value: err.response.request.statusText}})})
  }
  else{
    dispatch({type: 'WORKER_ERROR', payload: "Email and confirmation email do not match"})
  }
}

export const setCurrentWorker = (worker_information) => dispatch => {
  //Once we have confirmation that the worker is signed in, we set the current worker to be this
  dispatch({type: 'SET_CURRENT_WORKER', payload: worker_information});
}

