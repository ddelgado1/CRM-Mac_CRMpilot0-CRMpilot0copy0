import {lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';

import { getCustomers } from './actions/customer.js';
import { getWorkers } from './actions/worker';

import { getWorkerCustomers } from './actions/workercustomer'
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { PageLayout } from "./components/PageLayout";
import './App.css';  

const Index = lazy(() => import('./components/customer/customer_index.js'));
const NewCustomer = lazy(() => import('./components/customer/new.js'));
const Show = lazy(() => import('./components/customer/show.js'));
const Search = lazy(() => import('./components/customer/search.js'));
const NewWorker = lazy(() => import('./components/worker/new.js'));
const OutlookCalendarDisplay = lazy(() => import('./components/calendar/calendarDisplay.js'));

const App = () => {
    
    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(getCustomers());
        dispatch(getWorkers());
        dispatch(getWorkerCustomers());
      }, [dispatch]);

    return(
      <Suspense fallback={<span>Loading...</span>}>
        <div className='App'>
          <PageLayout />
          <Routes>
            <Route path="customers" element={<Index />} />
            <Route path="new_customer" element={<NewCustomer />} />
            <Route path="customer" element={<Show />} />
            <Route path="search" element={<Search />} />
            <Route path="new_worker" element={<NewWorker />} />
            <Route path="calendar" element={<OutlookCalendarDisplay />} />
          </Routes>
          
        </div>
      </Suspense>
    )
}
export default App;