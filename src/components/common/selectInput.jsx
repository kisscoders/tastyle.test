import React from "react";

const SelectInput = ({ name, options, label, error, ...rest }) => {
	return (
		<div className="mb-3">
			<label htmlFor={name}>{label}</label>
			<select name={name} id={name} {...rest} className="form-select">
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default SelectInput;
