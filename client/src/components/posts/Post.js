import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-2">
            <a href="profile.html">
              <img
                class="rounded-circle d-none d-md-block"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
            </a>
            <br />
            <p class="text-center">John Doe</p>
          </div>
          <div class="col-md-10">
            <p class="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
