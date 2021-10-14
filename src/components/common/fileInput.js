import React from "react";
import styled from "styled-components";
// import { Card } from "react-bootstrap";
// import { Button } from "../common/buttons";

export const Label = styled.label`
	display: inline-block;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	background-color: white;
	font-weight: 600;
	border: 2px solid #007bff;
	color: #007bff;
	padding: 0.5625rem 1rem;
	margin: 0.5rem 0;
	font-size: 0.8rem;
	line-height: 1.125;
	cursor: pointer;
	border-radius: 0.5rem;
	transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
	&:hover {
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 123, 255, 0.25);
	}
`;

function FileInput(text, func) {
	return (
		<div className="m">
			<input
				type="file"
				name="file"
				id="file"
				className="d-none"
				onChange={func}
			/>
			{/* <label for="file">
				<span>Choose a file…</span>
			</label> */}
			<Label htmlFor="file">
				<span>{text}</span>
			</Label>
		</div>
	);
}

// {
// 	/* <input type="file" name="file" id="" onChange={this.handleFileStats} />; */
// }
export default FileInput;