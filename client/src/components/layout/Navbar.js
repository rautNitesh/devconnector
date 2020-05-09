import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../action/authAction";
import { clearCurrentUser } from "../../action/profileAction";
import PropTypes from "prop-types";

class Navbar extends Component {
  onLogout(e) {
    this.props.clearCurrentUser();
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/";
  }

  render() {
    const { isAuthenticated, users } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogout.bind(this)} className="nav-link">
            <img
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              src={users.avatar}
              alt={users.name}
              title="you should have gravatar associated with your email to have an avatar"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, clearCurrentUser })(
  Navbar
);