import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarInformation } from '../../actions/worker.js';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../authConfig.js';

import "./calendar scsses/styles.scss"; //Just how to style it ya know?
const localizer = momentLocalizer(moment);

const OutlookCalendar = (props) => {
  const { instance, accounts } = useMsal();
    
  const dispatch = useDispatch();
  const calendar_info = useSelector((state) => state.workers.calendar_info) // Here are all of the contacts

  useEffect(() => {
    //Here's all of the stuff to actually get the calendar events and send it to the reducer. We do it here instead of App for some 
    //Reason (maybe so we don't have to load that data all of the time, but like we run the risk of it not having been changed yet)
    const accessTokenRequest = {
      ...loginRequest,
      account: accounts[0]
    }
    instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          // Call your API with token
          dispatch(getCalendarInformation(accessToken))
        })
  }, [instance, accounts, dispatch]);

  useEffect(() => {
    //This is to make the data in the calendar_info variable viable for the events in the Calendar component
  }, [])

  const handleEventClicked = (e) => {
    //Here will be where we move to the show page for the individual events (including the information about them such as title, date, time, people involved, etc.)
    console.log(e);
  }
  
  return(
    calendar_info.length !== 0 ? 
    <div>
      <Calendar
        localizer={localizer}
        onSelectEvent={e => handleEventClicked(e)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
  </div>
  :
  <h1>Loading Calendar</h1>
  )
  

}


export default OutlookCalendar;
