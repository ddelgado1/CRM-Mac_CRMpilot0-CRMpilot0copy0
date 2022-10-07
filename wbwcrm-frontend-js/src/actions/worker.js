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
      dispatch({type: 'WORKER_ERROR', payload: err.response.data.message})})
  }
  else{
    dispatch({type: 'WORKER_ERROR', payload: "Email and confirmation email do not match"})
  }
}

export const deleteWorkerErrors = () => dispatch => {
  //Does exactly what it says it does
  dispatch({type: "REMOVE_WORKER_ERRORS"});
}

export const getCalendarInformation = (accessToken) => dispatch => {
  //Gets us our calendar stuff

    axios.get(`https://graph.microsoft.com/v1.0/me/events`,
    {headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
          'Prefer' : 'outlook.body-content-type="text"'
    }})
    .then(response => {dispatch({type: 'USER_CALENDAR_INFORMATION', payload: response.data.value})})
    .catch(error => console.log(error));
  // .then(results => {
  //   debugger;
  //   dispatch({type: "USER_CALENDAR_INFORMATION", payload: results.data})
  // })
  // .catch(err => dispatch({type: 'WORKER_ERROR', payload: err.response.data.message}))
}