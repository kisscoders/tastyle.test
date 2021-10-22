// import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  text-decoration: none;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: white;
  font-weight: 500;
  border: 1.5px solid var(--primary);
  color: var(--primary);
  padding: 0.5625rem 1rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.125;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  &:hover {
    color: #fff;
    background-color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
`;

export const ButtonL = styled.button`
  text-decoration: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
  font-weight: 700;
  border: 3px solid var(--red);
  color: var(--red);
  padding: 0.5625rem 1rem;
  margin: 10px 0;
  line-height: 1.125;
  border-radius: 20px;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  &:hover {
    color: black;
    background-color: var(--yellow);
    border: 3px solid black;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
`;
