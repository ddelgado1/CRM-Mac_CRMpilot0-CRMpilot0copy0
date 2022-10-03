import React from 'react';
import {lazy, Suspense} from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './storeconfig';

const App = lazy(() => import('./App'));
const Index = lazy(() => import('./components/contact/contact_index.js'));
const NewCustomer = lazy(() => import('./components/contact/new.js'));
const Show = lazy(() => import('./components/contact/show.js'));
const Search = lazy(() => import('./components/contact/search.js'));
const NewWorker = lazy(() => import('./components/worker/new.js'));


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<span>Loading...</span>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} >
              {/* <Route index element={<Home />} */}
                <Route path="contacts" element={<Index />} />
                <Route path="new_contact" element={<NewCustomer />} />
                <Route path="contact" element={<Show />} />
                <Route path="search" element={<Search />} />
                <Route path="new_worker" element={<NewWorker />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// initMessageListener(store);