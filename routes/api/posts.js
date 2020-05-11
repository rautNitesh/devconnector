const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../model/Post");
const Profile = require("../../model/Profile");
const ValidationPostInput = require("../../validation/post");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidationPostInput(req.body);
    if (!isValid) {
      res.status("400").json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  }
);

router.get("/", (req, res) => {
  Post.find().then((posts) => {
    if (!posts) {
      res.status(404).json({ noposts: "no posts found" });
    } else {
      res.json(posts);
    }
  });
});

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ nopost: "no post matching this id found" });
      } else {
        res.json(post);
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ Unauthorized: "Unauthorized to delete" });
          }
          post.remove().then(res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "post not found" })
        );
    });
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((item) => item.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(400).json({ alreadyliked: "liked post already" });
          }

          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "post not found" })
        );
    });
  }
);
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((item) => item.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "you haven't liked this post yet" });
          }
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "post not found" })
        );
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidationPostInput(req.body);
    if (!isValid) {
      res.status("400").json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          avatar: req.body.avatar,
          name: req.body.name,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.json({ nopostfound: "no post found" }));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ notfound: "comment not found" });
        }
        const removeIndex = post.comments
          .map((item) => item._id)
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);

        post.save().then((posr) => res.json(post));
      })
      .catch((err) => res.json({ nofound: "comment not found" }));
  }
);
module.exports = router;
