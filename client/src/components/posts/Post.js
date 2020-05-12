import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePost } from "../../action/postAction";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
    };
    this.onDelClick = this.onDelClick.bind(this);
  }
  onDelClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post } = this.props;
    const { auth } = this.props;
    let delButton;
    if (auth.isAuthenticated) {
      if (auth.users.id === post.user) {
        delButton = (
          <button
            onClick={() => this.onDelClick(post._id)}
            className="btn btn-danger">
            Delete
          </button>
        );
      }
    }
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
          </div>
        </div>
        <div className="col-md-6">
          <p className="lead">{delButton}</p>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost })(Post);
