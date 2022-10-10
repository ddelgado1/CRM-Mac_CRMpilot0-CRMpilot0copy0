import { getContacts } from './actions/contact.js';
import { getWorkers } from './actions/worker';
import { getWorkersAndContactsJoin } from './actions/jointable'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PageLayout } from "./components/PageLayout";


import './App.css';  

const App = () => {
    
    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getContacts());
        dispatch(getWorkers());
        dispatch(getWorkersAndContactsJoin());
      }, [dispatch]);
    return(
        <div className='App'>
          <PageLayout>
          </PageLayout>
        </div>

    )
}
export default App;