import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  disabled,
  text,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {text && <small className="form-text text-muted">{text}</small>}
    </div>
  );
};

TextInputField.defaults = {
  type: "text",
1};

TextInputField.propTypes = ({
  disabled: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  text: PropTypes.string,
});
export default TextInputField;
