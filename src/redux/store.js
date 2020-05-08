import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user/user.reducers';
import jobsReducer from './jobs/jobs.reducers';

const reducer = combineReducers({userReducer, jobsReducer});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
