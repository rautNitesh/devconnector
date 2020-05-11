import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../action/profileAction";

class Education extends Component {
  onDelClick(id) {
    this.props.deleteEducation(id, this.props.history);
  }
  render() {
    const { education } = this.props;
    const expList = education.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.degree}</td>
        <td>{exp.school}</td>
        <td>{exp.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
          {exp.to === null ? (
            <p>Now</p>
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDelClick.bind(this, exp._id)}
            className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="experience">
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>School Name</th>
              <th>Field Of Study</th>
              <th>Date</th>
              <th>To</th>
            </tr>
          </thead>
          {expList}
        </table>
      </div>
    );
  }
}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(withRouter(Education));
