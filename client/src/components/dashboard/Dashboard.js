import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteProfile } from "../../action/profileAction";
import AddButtons from "./AddButtons";
import PropTypes from "prop-types";
import Experience from "./Experience";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  DeleteProfile = (e) => {
    this.props.deleteProfile();
  };
  render() {
    const { users } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let displayContent;
    if (profile === null || loading) {
      displayContent = <h1>Loading...</h1>;
    } else {
      if (Object.keys(profile).length > 0) {
        displayContent = (
          <div>
            <h3 className="lead text-muted">
              Hello <Link to={`/profile/${users.handle}`}>{users.name}</Link>
            </h3>
            <AddButtons />
            <Experience experience={profile.profile.experience} />
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.DeleteProfile}
                className="btn btn-danger mb-4">
                Delete Profile
              </button>
            </div>
          </div>
        );
      } else {
        displayContent = (
          <div className="conatainer">
            <h3 className="lead text-muted">Hello {users.name}</h3>
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
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
  Dashboard
);
