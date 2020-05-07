import React, { Component } from "react";

import { connect } from "react-redux";
import { registerUser } from "../../action/authAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextInputField from "../layout/TextInputField";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        errors: nextProps.error,
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextInputField
                  error={errors.name}
                  placeholder="Enter your name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextInputField
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  text=" This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />

                <TextInputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextInputField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
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
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
