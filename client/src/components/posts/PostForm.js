import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../action/postAction";
import PropTypes from "prop-types";
import TextAreaField from "../layout/TextAreaField";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
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
  onSubmit = (e) => {
    e.preventDefault();
    const { users } = this.props.auth;
    const newPost = {
      text: this.state.text,
      avatar: users.avatar,
      name: users.name,
    };
    this.props.addPost(newPost);
    this.setState({
      text: "",
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaField
                  name="text"
                  onChange={this.onChange}
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  value={this.state.text}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});
export default connect(mapStateToProps, { addPost })(PostForm);
