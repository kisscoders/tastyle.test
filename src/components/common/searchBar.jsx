import React from "react";

const SearchBar = ({ value, onChange, variant }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value, variant)}
    />
  );
};

export default SearchBar;
