import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

// "combineReducers" is a function. 
// It says "In my store, there will be a section called "auth" which is going to contain authentication information. That is going to be written by "authReducer"
export default combineReducers({
  //authentication reducer 
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
})