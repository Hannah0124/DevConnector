import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';  // allow us to provide a store
import store from './store';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-crendentials/AddExperience';
import AddEducation from './components/add-crendentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

import setAuthToken from './utils/setAuthtoken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';

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
    store.dispatch(clearCurrentProfile());
    // Redirect the user to login (when the session is out) 
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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />

            <Switch> 
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/feed" component={Posts}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/post/:id" component={Post}/>
            </Switch>
            <Switch> 
              <PrivateRoute exact path="/not-found" component={NotFound}/>
            </Switch>

          </div>
          <Footer />
        </div>
      </Router>
    </Provider> 
  );
}

export default App;
