// import { getContacts } from './actions/contact.js';
// import { getWorkers } from './actions/worker';
// import { getWorkersAndContactsJoin } from './actions/jointable'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";//Makes it so that only wbwood people will be able to log in


import './App.css';
import { Outlet } from 'react-router-dom';    

const App = () => {
    
    const dispatch = useDispatch();

      useEffect(() => {
        // dispatch(getContacts());
        // dispatch(getWorkers());
        // dispatch(getWorkersAndContactsJoin());
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