import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './user/user.reducers';

const reducer = combineReducers({userReducer});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
