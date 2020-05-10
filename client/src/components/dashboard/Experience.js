import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../action/profileAction";

class Experience extends Component {
  onDelClick(id) {
    this.props.deleteExperience(id, this.props.history);
  }
  render() {
    const { experience } = this.props;
    const expList = experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
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
        <h4 className="mb-4">Experiences</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
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
Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(withRouter(Experience));
