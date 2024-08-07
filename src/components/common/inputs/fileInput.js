import React from "react";
import styled from "styled-components";

export const Label = styled.label`
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: white;
  font-weight: 600;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0.5625rem 1rem;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  line-height: 1.125;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  &:hover {
    span {
      display: none;
    }
    color: #fff;
    background-color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
  &:hover:before {
    content: "Choose";
    padding: 2rem;
  }
`;

const FileInput = (displaytext, onChangeFunc) => {
  return (
    <div className="">
      <input type="file" id="file" className="d-none" onChange={onChangeFunc} />
      <Label htmlFor="file">
        <span>{displaytext}</span>
      </Label>
    </div>
  );
};

export default FileInput;
