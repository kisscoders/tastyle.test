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
	border: 1.5px solid #007bff;
	color: #007bff;
	padding: 0.5625rem 1rem;
	margin: 0.5rem 0;
	font-size: 0.9rem;
	line-height: 1.125;
	border-radius: 0.3rem;
	cursor: pointer;
	transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
	&:hover {
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 123, 255, 0.25);
	}
`;
