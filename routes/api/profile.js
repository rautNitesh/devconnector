const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "no profile found";
          return res.status("404").json({ errors });
        } else {
          res.json({ profile });
        }
      })
      .catch((err) => console.log(err));
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        Profile.findOne({ handle: profileFields.handle })
          .populate("user", ["name", "avatar"])
          .then((profile) => {
            if (profile) {
              errors.handle = "handle exists";
              res.status(400).json(erros);
            }
          });
        new Profile(profileFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "Profile not found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "Profile not found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofiles = "no profiles found";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        from: req.body.from,
        to: req.body.to,
        isCurrent: req.body.isCurrent,
        description: req.body.description,
      };
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        from: req.body.from,
        isCurrent: req.body.isCurrent,
        to: req.body.to,
        fieldofstudy: req.body.fieldofstudy,
        description: req.body.description,
      };
      profile.education.unshift(newEdu);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => [
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf({ _id: req.params.edu_id });
      profile.education.splice(removeIndex, 1);
      profile.save().then((profile) => res.json(profile));
    }),
  ]
);
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => [
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf({ _id: req.params.exp_id });
      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).json(err));
    }),
  ]
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => [
    Profile.findOneAndRemove({ user: req.user.id }).then((profile) => {
      User.findByOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    }),
  ]
);
module.exports = router;
