import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';



// The thing below should be routerbale (react side of routing). 
function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      {/* Rather than writing <Landing />, we will replace with route.  */}
      {/* When you come to the exact homepage "/", you get to see the <landing> page. */}
      <Route exact path="/" component={Landing}/>
      {/* type ".container", then it will automatically populated <div> tag</div> */}
      <div className="container">
        {/* I'm going to route them into my "/register" and "/login" component. */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
