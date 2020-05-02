const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategLoginInput = (data) => {
  let errors = {};

  data.email = !isMatch(data.email) ? data.email : "";
  data.password = !isMatch(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
