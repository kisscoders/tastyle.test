import React from "react";

const SelectInput = ({ name, options, label, text, error, field, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-select">
        <option defaultValue>{text}</option>
        {options.map((option) => (
          <option key={option._id || option[field]} value={option._id}>
            {option[field]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
