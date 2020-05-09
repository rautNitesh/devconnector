import React, { Component } from "react";
import { connect } from "react-redux";
import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      from: "",
      to: "",
      disabled: false,
      current: false,
      location: "",
      description: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto ">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <small className="text-muted">*=Required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  placeholder="Job Title"
                  text="Enter your job title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextInputField
                  placeholder="Company name"
                  text="Enter your company name"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextInputField
                  placeholder="Company location"
                  text="Enter your company location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextInputField
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />{" "}
                <h6>To Date</h6>
                <TextInputField
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  id="current"
                  value={this.state.current}
                  onChange={this.onCheck}
                />
                <label htmlFor="current" className="form-check-label">
                  Current
                </label>
                <TextAreaField
                  placeholder="Something about your job "
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error,
});
export default connect(mapStateToProps)(withRouter(AddExperience));
