import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { Button } from "../common/buttons";

export const ClassCard = styled(Card)`
	padding: 0.5em;
	margin: 0.5em;
	${"" /* color: ${(props) => props.inputColor || "palevioletred"}; */}
	background-color: #fff;
	border: none;
	border-radius: 0.625rem;
	box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
		0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
`;

export const CardHeader = styled(Card.Header)`
	padding: 0.25em;
	margin: 0.25em;
	background-color: #fff;
	font-size: 2rem;
`;

function ClassicCard() {
	return (
		<ClassCard>
			<CardHeader as="h5">Featured</CardHeader>
			<Card.Body>
				<Card.Title>Special title treatment</Card.Title>
				<Card.Text>
					With supporting text below as a natural lead-in to additional content.
				</Card.Text>
				<Button>Go somewhere</Button>
			</Card.Body>
		</ClassCard>
	);
}

export default ClassicCard;

// export default function ClassicCard (props) {
//     var className = props.className,
//         innerRef = props.innerRef,
//         Tag = props.tag,
//         theme = props.theme,
//         outline = props.outline,
//         small = props.small,
//         attrs = _objectWithoutProperties(props, ["className", "innerRef", "tag", "theme", "outline", "small"]);

//     var classes = classNames(className, "card", small && "card-small", theme && "".concat(outline ? "border" : "bg", "-").concat(theme));
//     return(
//         React__default.createElement(Tag, _extends({}, attrs, {
//             className: classes,
//             ref: innerRef
//         }))

// };
