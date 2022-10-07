import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getCalendarInformation } from '../../actions/worker.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import "./calendar scsses/styles.scss"; //Just how to style it ya know?
const localizer = momentLocalizer(moment);

const OutlookCalendar = (props) => {

  // const dispatch = useDispatch();

  const [myEventsList, setEvents] = useState([{
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Some title",
  },])

  // useEffect(() => {
  //     //Here we will be dispacthcing the user information on page render IF the user is logged in
  //     dispatch(getCalendarInformation())
  // }, [dispatch])
  const handleEventClicked = (e) => {
    //Here will be where we move to the show page for the individual events (including the information about them such as title, date, time, people involved, etc.)
    console.log(e);
  }
  return(
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        onSelectEvent={e => handleEventClicked(e)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
  </div>
  )
}


export default OutlookCalendar;


// import { Providers, ProviderState } from '@microsoft/mgt-element';
// import { Agenda } from '@microsoft/mgt-react';
// import React, { useState, useEffect } from 'react';

// function useIsSignedIn(): [boolean] {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   useEffect(() => {
//     const updateState = () => {
//       const provider = Providers.globalProvider;
//       debugger;
//       setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
//     };

//     Providers.onProviderUpdated(updateState);
//     updateState();

//     return () => {
//       Providers.removeProviderUpdatedListener(updateState);
//     }
//   }, []);

//   return [isSignedIn];
// }

// function Calendar() {
//   const [isSignedIn] = useIsSignedIn();

//   return (
//     <div className="Calendar">
//       <div>
//         {isSignedIn &&
//           <Agenda />}
//       </div>
//     </div>
//   );
// }

// export default Calendar;