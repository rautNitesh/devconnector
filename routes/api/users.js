const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).status({ email: "email already exits." });
    } else {
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
              res.json(user);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status("400").json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const payload = {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        res.status("400").json({ email: "invalid credentials" });
      }
    });
  });
});
module.exports = router;
