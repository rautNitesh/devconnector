import React, { Component } from "react";

class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-2">
            <a href="profile.html">
              <img
                class="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p class="text-center">{post.name}</p>
          </div>
          <div class="col-md-10">
            <p class="lead">{post.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
