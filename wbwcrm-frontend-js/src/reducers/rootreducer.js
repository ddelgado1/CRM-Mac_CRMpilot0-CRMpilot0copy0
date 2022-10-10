import { withReduxStateSync } from 'redux-state-sync';

import {combineReducers} from 'redux';
import contactReducer from './contactreducer';
import workerReducer from './workerreducer';
import workerContactReducer from './jointablereducer';
import calendarReducer from './calendarreducer';

export default withReduxStateSync(combineReducers({contacts: contactReducer, workers: workerReducer, workerContacts: workerContactReducer, calendar: calendarReducer}))