import React, { Component } from 'react'
import {registerUser} from '../../actions/authActions';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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
              <TextFieldGroup 
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup 
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <TextFieldGroup 
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup 
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

Register.propTypes = {
  // I want function to be here
  registerUser: PropTypes.func.isRequired,
  // I want object to be here
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// connect is a function
// connent(what you need to read back from the store, what action to trigger)
export default connect(mapStateToProps, {registerUser})(withRouter(Register)); 