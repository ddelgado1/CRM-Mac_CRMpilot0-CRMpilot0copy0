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
      .catch(() => dispatch({type: 'CALENDAR_ERROR', payload: "Can't find calendar for account"}));
  }

  export const deleteCalendarErrors = () => dispatch => {
    //Does exactly what it says it does
    dispatch({type: "REMOVE_CALENDAR_ERRORS"});
  }