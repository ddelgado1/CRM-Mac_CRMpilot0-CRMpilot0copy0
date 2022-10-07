import { getContacts } from './actions/contact.js';
import { getWorkers, getCalendarInformation } from './actions/worker';
import { getWorkersAndContactsJoin } from './actions/jointable'
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";//Makes it so that only wbwood people will be able to log in
import { loginRequest } from './authConfig.js';

import './App.css';
import { Outlet } from 'react-router-dom';    

const App = (props) => {
  
    const { instance, accounts } = useMsal();
    
    const dispatch = useDispatch();

    useEffect(() => {
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
            dispatch(getCalendarInformation(accessToken, accounts[0].localAccountId))
          })
    }, [instance, accounts, dispatch]);


      useEffect(() => {
        dispatch(getContacts());
        dispatch(getWorkers());
        dispatch(getWorkersAndContactsJoin());
      }, [dispatch]);
    return(
        <div className='App'>
            <PageLayout>
          <AuthenticatedTemplate>
            <Outlet />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <p>You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </PageLayout>
        </div>

    )
}
export default App;

// import { Link, Outlet } from 'react-router-dom';
// import { getContacts, deleteContactErrorsAndRevertSearchedCustomers } from './actions/contact.js';
// import { getWorkers, deleteWorkerErrors } from './actions/worker';
// import { getWorkersAndContactsJoin } from './actions/jointable'
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { Login } from '@microsoft/mgt-react';  //Agenda is the calendar itself and Login is the login button


// import './App.css';

// const App = (props) => {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getContacts());
//         dispatch(getWorkers());
//         dispatch(getWorkersAndContactsJoin());
//       }, [dispatch]);

//     const handleClick = (e) => {
//         //To delete errors on page change and reset contacts
//         dispatch(deleteContactErrorsAndRevertSearchedCustomers());
//         dispatch(deleteWorkerErrors());
//         dispatch(getContacts());
//     }
//     return(
//         <div className='App'>
//             <header className='app_header'>
//                 <h3><Link to="contacts" onClick={e => handleClick(e)}>View All Customers</Link></h3>
//                 <h3><Link to="new_contact" onClick={e => handleClick(e)}>Create a New Customer</Link></h3>
//                 <h3><Link to="search" onClick={e => handleClick(e)}>Search Customers</Link></h3>
//                 <h3><Link to="new_worker" onClick={e => handleClick(e)}>Add a New Worker</Link></h3>
//                 <h3><Link to="calendar" onClick={e => handleClick(e)}>Calendar</Link></h3>
//                 <Login />
//             </header>
//             <Outlet />
            
//         </div>
//     )
// }

// export default App;