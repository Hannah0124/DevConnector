import React, { Component } from 'react'
import classnames from 'classnames';
import {registerUser} from '../../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    // When I receive next props with errors
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {user} = this.props.auth; // it could be this.props.xyz if I named it xyz below
    const {errors} = this.state; // deconstruction of "const errors = this.state.errors;"
    return (
      <div className="register">
        {/* binding */}
        {user? user.name : null}
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={this.onSubmit} noValidate>
              <div className="form-group">
                <input type="text" className={classnames('form-control form-control-lg', {'is-invalid':errors.name})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} required />
                {/* Only if "errors" is true, we will print out "erros.name" */}
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input type="email" className={classnames('form-control form-control-lg', {'is-invalid':errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid':errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid':errors.password2})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                {errors.password2 && (
                  <div className="invalid-feedback">
                    {errors.password2}
                  </div>
                )}
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

Register.propTypes = {
  // I want function to be here
  registerUser: PropTypes.func.isRequired,
  // I want object to be here
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// connect is a function
// connent(what you need to read back from the store, what action to trigger)
export default connect(mapStateToProps, {registerUser})(Register);