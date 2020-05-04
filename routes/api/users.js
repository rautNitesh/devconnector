const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).status(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", //size
      r: "pg", //ratings
      d: "mm", //default
    });
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      avatar,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) console.log(err);

        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            return res.json(user);
          })
          .catch((err) => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        return res.status(400).json({ password: "invalid credentials" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
