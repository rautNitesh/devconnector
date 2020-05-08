import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaField = ({ placeholder, name, value, onChange, error, text }) => {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {text && <div className="invalid-feedback">{text}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  text: PropTypes.string,
};
export default TextAreaField;
