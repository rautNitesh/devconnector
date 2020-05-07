import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../action/profileAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { users } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let displayContent;
    if (profile === null || loading) {
      displayContent = <h1>Loading...</h1>;
    } else {
      if (Object.keys(profile).length > 0) {
        displayContent = <h1>Profile</h1>;
      } else {
        displayContent = (
          <div className="conatainer">
            <h1 className="lead text-muted">Hello {users.name}</h1>
            <span className="container">
              You dont have a profile right now. Wanna Create now ?
            </span>
            <Link to="/create-profile" className="btn btn-info pd-4">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            <div className="row">{displayContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
