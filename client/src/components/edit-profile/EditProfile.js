import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextInputField from "../layout/TextInputField";
import SelectListGroup from "../layout/SelectListGroup";
import InputGroup from "../layout/InputGroup";
import TextAreaField from "../layout/TextAreaField";
import { createProfile, getCurrentProfile } from "../../action/profileAction";
import isMatch from "../../validation/isMatch";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaysocialinputs: false,
      handle: "",
      website: "",
      skills: "",
      status: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      githubusername: "",
      bio: "",
      errors: {},
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile.profile;
      const skillsCsv = profile.skills.join(",");
      profile.handle = !isMatch(profile.handle) ? profile.handle : "";
      profile.company = !isMatch(profile.company) ? profile.company : "";
      profile.website = !isMatch(profile.website) ? profile.website : "";
      profile.location = !isMatch(profile.location) ? profile.location : "";
      profile.githubusername = !isMatch(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.social = !isMatch(profile.social) ? profile.social : {};
      profile.facebook = !isMatch(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isMatch(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isMatch(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isMatch(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      this.setState({
        handle: profile.handle,
        website: profile.website,
        skills: skillsCsv,
        location: profile.location,
        status: profile.status,
        facebook: profile.social.facebook,
        instagram: profile.social.instagram,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        githubusername: profile.githubusername,
        bio: profile.bio,
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      handle: this.state.handle,
      website: this.state.website,
      skills: this.state.skills,
      location: this.state.location,
      status: this.state.status,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
    };
    this.props.createProfile(userData, this.props.history);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addSocial = (e) => {
    this.setState({
      displaysocialinputs: !this.state.displaysocialinputs,
    });
  };
  render() {
    const { errors } = this.state;
    let socialInputs;
    if (this.state.displaysocialinputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            icon="fab fa-facebook"
            type="text"
            text="Enter link to your facebook profile"
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            icon="fab fa-instagram"
            type="text"
            text="Enter link to your instagram profile"
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Linkedin"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            icon="fab fa-linkedin"
            type="text"
            text="Enter link to your linkedin profile"
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            icon="fab fa-youtube"
            type="text"
            text="Enter link to your youtube profile"
            error={errors.youtube}
          />
        </div>
      );
    }
    const options = [
      { label: "*Select Your Working Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];
    return (
      <div className="create-profile">
        <div className="container ">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 pb-4 text-center">Edit Your Profile</h1>
              <small className="d-block text-muted">*=Required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  placeholder="*Profile Handle"
                  text="The profile handle should be unique"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                />
                <TextInputField
                  placeholder="Your Website"
                  text="Enter your website URL"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextInputField
                  placeholder="Company name"
                  text="Enter where you work"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextInputField
                  placeholder="Github Username"
                  text="Enter your github username if you want your github repositeries to be visible in your profile"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                />
                <TextAreaField
                  placeholder="Something about yourself"
                  text="This field is for your bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <TextInputField
                  placeholder="*Skills"
                  text="Each skill should be separated by comma"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <div className="mb-3 text-center">
                  <div className="btn btn-light  pd-3" onClick={this.addSocial}>
                    Add Social Links
                  </div>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-primary text-center "
                  name="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
