import React from "react";
import styled from "styled-components";

const I = styled.i`
  background-color: white;
  color: #007bff;
  padding: 0.5rem 0.75rem;
  margin: 5px;
  font-size: 1.2rem;
  border-radius: 5rem;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
`;

const Edit = (props) => {
  let classes = "ri-edit-box-";
  classes += props.clicked ? "fill" : "line";
  return <I onClick={props.onClick} className={classes} />;
};

export default Edit;
