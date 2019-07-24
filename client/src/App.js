import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';  // allow us to provide a store
import store from './store';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthtoken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header 
  setAuthToken(localStorage.jwtToken);
  // Decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000;
  // (If expired, time to log out)
  if (decoded.exp < currentTime) { // exp = expired
    // Logout user 
    store.dispatch(logoutUser());
    // Clear current profile 

    // (When the session is out) Redirect the user to login 
    window.location.href = '/login';
    // (if not expired)
  } 
}

// The thing below should be routerbale (react side of routing). 
function App() {
  return (
    // Provider is the one that will define my store
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider> 
  );
}

export default App;
