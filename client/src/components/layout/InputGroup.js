import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  text,
  icon,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <i className={icon} />
        </div>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string.isRequired,
};
InputGroup.defautl = {
  type: "text",
};

export default InputGroup;
