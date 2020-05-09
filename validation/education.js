const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategEducationInput = (data) => {
  let errors = {};

  data.school = !isMatch(data.school) ? data.school : "";
  data.degree = !isMatch(data.degree) ? data.degree : "";
  data.from = !isMatch(data.from) ? data.from : "";
  data.fieldofstudy = !isMatch(data.fieldofstudy) ? data.fieldofstudy : "";

  if (data.isCurrent === false) {
    data.to = !isMatch(data.to) ? data.to : "";
    if (Validator.isEmpty(data.to)) {
      errors.to =
        "To field is required, if it is current job please check the current box";
    }
  }
  if (Validator.isEmpty(data.school)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "data field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from date field is required";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "field of study field is required";
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
