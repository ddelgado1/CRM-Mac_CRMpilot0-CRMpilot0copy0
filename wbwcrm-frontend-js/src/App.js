const App = () => {
}
export default App;

// const [userStuff, setUserStuff] = useState([{}]);
//   useEffect(() => {
//     
//   })


//   if (userStuff.length === 0)
//   return(
//     <>
//       <h1>Loading...</h1>
//     </>
//   )
//   else{
//     return(
//       <>
//         <h1>{userStuff[0].name}</h1>
//       </>
//     )
//   }
  
//   }



// // import './App.css';
// import React, { useState, useEffect } from 'react';
// import { Agenda, Login } from '@microsoft/mgt-react';
// import { Providers, ProviderState } from '@microsoft/mgt-element';

// import Calendar from './calendar';

// const App = () => {

//   const [calendarView, setCalendarView] = useState(false); //If calendarView == false, that means that it's in viewing events and if it's true, it's in adding an event
//   const useIsSignedIn = (): [boolean] => {
//     //The purpose of this function is to determine of a user is signed in
//     const [isSignedIn, setIsSignedIn] = useState(false);
  
//     useEffect(() => {
//       const updateState = () => {
//         const provider = Providers.globalProvider;
//         setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
//       };
  
//       Providers.onProviderUpdated(updateState);
//       updateState();
  
//       return () => {
//         Providers.removeProviderUpdatedListener(updateState);
//       }
//     }, []);
  
//     return [isSignedIn];
//   }

//   const switchToCreateCalendarEventPage = (event: React.FormEvent<HTMLButtonElement>) => {
//     setCalendarView(!calendarView)
//   }
//   const [isSignedIn] = useIsSignedIn();

//   return (

//     <div className="App">
//       <header className="App-header">
//         <Login />
//       </header>
//       <div>
//         {isSignedIn && (calendarView === false ? 
//         <Agenda /> : <Calendar />)}
//         <button onClick={e => switchToCreateCalendarEventPage(e)}>Make New Event</button>
//       </div>
//     </div>
//   );
// }

// export default App;
