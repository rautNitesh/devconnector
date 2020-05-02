const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategProfileInput = (data) => {
  let errors = {};

  data.handle = !isMatch(data.handle) ? data.handle : "";
  data.status = !isMatch(data.status) ? data.status : "";
  data.skills = !isMatch(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  if (!isMatch(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid URL";
    }
  }
  if (!isMatch(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Invalid URL";
    }
  }
  if (!isMatch(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facbook = "Invalid URL";
    }
  }
  if (!isMatch(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Invalid URL";
    }
  }
  if (!isMatch(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL";
    }
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
