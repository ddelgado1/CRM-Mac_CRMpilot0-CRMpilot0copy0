import { withReduxStateSync } from 'redux-state-sync';

import {combineReducers} from 'redux';
import contactReducer from './contactreducer';

export default withReduxStateSync(combineReducers({contacts: contactReducer}))