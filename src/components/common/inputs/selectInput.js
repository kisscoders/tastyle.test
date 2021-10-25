import React from "react";

const SelectInput = ({ name, options, label, text, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <select
        key={name}
        name={name}
        id={name}
        {...rest}
        className="form-select"
      >
        <option key="default" defaultValue>
          {text}
        </option>
        {options.map((option) => (
          <option key={option._id || option.name} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
