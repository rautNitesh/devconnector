import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, auth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
