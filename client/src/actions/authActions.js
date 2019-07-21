import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
    // Ready to fire my API.
    // Client component is firing a call to the server side by passing this newUSer object above.
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))
      // I'm setting errors back into that err's object.
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
} 

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const loginUser = userdata => dispatch => {
  // Ready to fire my API.
  axios
  .post('/api/users/login', userdata)
  .then(res => {
    // Save to localstorage
    const {token} = res.data // deconstruction of const token = res.data.token
    // Set token to ls
    localStorage.setItem('jwtToken', token);
    // Set token to auth header
    setAuthToken(token);
    // Decode token to get user data 
    const decoded = jwt_decode(token);
    // set current user 
    dispatch(setCurrentUser(decoded))
    
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const logoutUser = () => dispatch => {
  // Step1) Remove token from localstorage 
  localStorage.removeItem('jwtToken');
  // Step2) Remove token from auth headers
  setAuthToken(false);
  // Step3) Clean the user data from Redux store
  dispatch(setCurrentUser({})); 
}