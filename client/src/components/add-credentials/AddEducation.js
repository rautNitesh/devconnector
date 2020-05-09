import React, { Component } from "react";
import { connect } from "react-redux";
import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addEducation } from "../../action/profileAction";
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      school: "",
      from: "",
      to: "",
      disabled: false,
      isCurrent: false,
      fieldofstudy: "",
      location: "",
      description: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const expData = {
      degree: this.state.degree,
      school: this.state.school,
      from: this.state.from,
      to: this.state.to,
      disabled: this.state.disabled,
      isCurrent: this.state.isCurrent,
      fieldofstudy: this.state.fieldofstudy,
      description: this.state.description,
      location: this.state.location,
    };
    this.props.addEducation(expData, this.props.history);
  };
  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      isCurrent: !this.state.isCurrent,
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <small className="text-muted">*=Required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  placeholder="degree"
                  text="Enter your degree name"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextInputField
                  placeholder="school"
                  text="Enter your school name"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextInputField
                  placeholder="school location"
                  text="Enter your school location"
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
                  name="isCurrent"
                  id="isCurrent"
                  value={this.state.isCurrent}
                  onChange={this.onCheck}
                />
                <label htmlFor="isCurrent" className="form-check-label">
                  isCurrent
                </label>
                <TextAreaField
                  placeholder="Something about your job "
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextAreaField
                  placeholder="field of study "
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
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
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error,
});
export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
