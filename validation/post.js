const Validator = require("validator");
const isMatch = require("./isMatch");

module.exports = validategPostInput = (data) => {
  let errors = {};

  data.text = !isMatch(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 4, max: 400 })) {
    errors.text = "text field in post should be 4 to 400 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isMatch(errors),
  };
};
