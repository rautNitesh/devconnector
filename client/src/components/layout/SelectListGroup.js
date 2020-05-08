import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({ name, value, onChange, error, options, text }) => {
  const selectOption = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        value={value}
        onChange={onChange}>
        {selectOption}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  option: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  text: PropTypes.string,
};

export default SelectListGroup;
