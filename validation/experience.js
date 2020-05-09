const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategExperienceInput = (data) => {
  let errors = {};

  data.title = !isMatch(data.title) ? data.title : "";
  data.comapny = !isMatch(data.company) ? data.company : "";
  data.from = !isMatch(data.from) ? data.from : "";
  if (data.isCurrent === false) {
    data.to = !isMatch(data.to) ? data.to : "";
    if (Validator.isEmpty(data.to)) {
      errors.to =
        "To field is required, if it is current job please check the current box";
    }
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "company name  field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from date field is required";
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
