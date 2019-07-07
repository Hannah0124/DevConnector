import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {
  constructor() {
    // Call parent first
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      // errors object to contain all the errors
      errors: {}
    };
    // Give Alias
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // Any time you want to change "state", you need to use "setState".
    // When you type "name", <onChange> function will be fired.
    // "target" means "let's check who fired this and get the name of that control (e.g. name, password)"
    this.setState({[e.target.name]:e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    // Create a new user object
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Ready to fire my API.
    // Client component is firing a call to the server side by passing this newUSer object above.
    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={this.onSubmit} noValidate>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Register;