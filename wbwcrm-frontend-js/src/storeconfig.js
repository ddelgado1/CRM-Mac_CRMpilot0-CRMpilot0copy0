import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducer from './reducers/rootreducer';
import { configureStore } from "@reduxjs/toolkit";



const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
   };
  
const pReducer = persistReducer(persistConfig, reducer);



export const store = configureStore({
    reducer: pReducer
  });
export const persistor = persistStore(store);