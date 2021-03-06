import React, { Component } from "react";
import { connect } from "react-redux";
import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addExperience } from "../../action/profileAction";
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      from: "",
      to: "",
      disabled: false,
      isCurrent: false,
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
      title: this.state.title,
      company: this.state.company,
      from: this.state.from,
      to: this.state.to,
      disabled: this.state.disabled,
      isCurrent: this.state.isCurrent,
      location: this.state.location,
      description: this.state.description,
    };
    this.props.addExperience(expData, this.props.history);
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
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error,
});
export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
