const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategExperienceInput = (data) => {
  let errors = {};

  data.title = !isMatch(data.title) ? data.title : "";
  data.comapny = !isMatch(data.company) ? data.company : "";
  data.from = !isMatch(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "title field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "title field is required";
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
