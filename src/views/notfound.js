import React from "react";
import CabinIllustration from "../assets/illustrations/error.svg";
import { Button } from "../components/common/buttons";
import {
	Card1,
	CardBody1,
	CardHeader1,
	CardImg1,
	CardText1,
	CardTitle1,
} from "../components/common/cards";

const NotFound = () => {
	return (
		<div className="justify-content-md-center row">
			<Card1 className="col col-lg-5 text-center">
				<CardHeader1 as="h5">404</CardHeader1>
				<CardBody1>
					<CardTitle1>Where have you come?</CardTitle1>
					<CardText1>Nothing here but crickets</CardText1>
					<CardImg1
						variant="bottom"
						src={CabinIllustration}
						className="p-3"
						alt="Card image"
					/>
					<br />
					<div className="d-grid mx-auto mt-4">
						<Button className="mx-auto">Go Back</Button>
					</div>
				</CardBody1>
			</Card1>
		</div>
	);
};

export default NotFound;
