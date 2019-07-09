import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';  // allow us to provide a store
import store from 'store';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';



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
