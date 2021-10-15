import React from "react";
import { Button } from "../components/common/buttons";
import { FileInput } from "../components/common/inputs";
import {
	Card1,
	CardBody1,
	CardHeader1,
	CardText1,
	CardTitle1,
} from "../components/common/cards";

function TestPage() {
	return (
		<Card1>
			<CardHeader1 as="h5">Featured</CardHeader1>
			<CardBody1>
				<CardTitle1>Special title treatment</CardTitle1>
				<CardText1>
					With supporting text below as a natural lead-in to additional content.
				</CardText1>
				<Button>Go somewhere</Button>
				{FileInput("file upload")}
			</CardBody1>
		</Card1>
	);
}

export default TestPage;
