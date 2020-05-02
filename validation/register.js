const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validateRegisterInput = (data) => {
  let errors = {};
  data.name = !isMatch(data.name) ? data.name : "";
  data.email = !isMatch(data.email) ? data.email : "";
  data.password = !isMatch(data.password) ? data.password : "";
  data.password2 = !isMatch(data.password2) ? data.password2 : "";
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be 2 to 30 characters long";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "password field should be at least 6 and at most 30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (Validator.equals(data.password, data.password2)) {
    errors.password2 = "password mis match";
  }
  return {
    errors,
    isValid: isMatch(errors),
  };
};
