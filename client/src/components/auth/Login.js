import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../action/authAction";
import PropTypes from "prop-types";
import TextInputField from "../layout/TextInputField";
class Login extends Component {
  state = {
    email: "",
    password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newLogin = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newLogin);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit} action="dashboard.html">
                <TextInputField
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                />

                <TextInputField
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  placeholder="Password"
                  name="password"
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateTopProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});

export default connect(mapStateTopProps, { loginUser })(Login);
