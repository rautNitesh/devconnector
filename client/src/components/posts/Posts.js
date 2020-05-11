import React, { Component } from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { getPosts } from "../../action/postAction";
import PropTypes from "prop-types";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props.post;
    return (
      <div>
        <PostForm />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
}
Posts.protoType = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
