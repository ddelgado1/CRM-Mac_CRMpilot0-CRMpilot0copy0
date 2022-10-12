import axios from 'axios';

export const getCalendarInformation = (accessToken) => dispatch => {
    //Gets us our calendar stuff
  
      axios.get(`https://graph.microsoft.com/v1.0/me/events`,
      {headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
            'Prefer' : 'outlook.body-content-type="text"'
      }})
      .then(response => {dispatch({type: 'USER_CALENDAR_INFORMATION', payload: response.data.value})})
      .catch(err => dispatch({type: 'CALENDAR_ERROR', payload: {err_message: "Can't find calendar for account", err_code: err.response.request.status, err_value: err.response.request.statusText}}));
  }
