import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';

import App from './App';
import Index from './components/contact/contact_index.js';
import New from './components/contact/new.js';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './storeconfig';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route index element={<Home />} */}
              <Route path="contacts" element={<Index />} />
              <Route path="new_contact" element={<New />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// initMessageListener(store);