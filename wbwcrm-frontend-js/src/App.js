import { getCustomers } from './actions/customer.js';
import { getWorkers } from './actions/worker';

import { getWorkerCustomers } from './actions/workercustomer'
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { PageLayout } from "./components/PageLayout";
import './App.css';  

const App = () => {
    
    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getCustomers());
        dispatch(getWorkers());
        dispatch(getWorkerCustomers());
      }, [dispatch]);

    return(
        <PageLayout /> 
    )
}
export default App;