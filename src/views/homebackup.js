import React from "react";
import CabinIllustration from "../assets/illustrations/cabin.svg";
import { Button } from "../components/common/buttons";
import {
	Card1,
	CardBody1,
	CardHeader1,
	CardImg1,
	CardText1,
	CardTitle1,
} from "../components/common/cards";

const Home = () => {
	return (
		<div className="justify-content-md-center row">
			<Card1 className="col col-lg-6">
				<CardHeader1 as="h5">Home</CardHeader1>
				<CardBody1>
					<CardTitle1>Where we want to go? That's the question isn't it?</CardTitle1>
					<CardText1>We are Here for the Awsomeness</CardText1>
					{/* <Card.Img variant="bottom" src={<CabinIllustration />} /> */}
					<CardImg1
						variant="bottom"
						src={CabinIllustration}
						className="p-3"
						alt="Card image"
					/>
					<br />
					<div className="d-grid mx-auto mt-4">
						<Button className="mx-auto">Explore</Button>
					</div>
				</CardBody1>
			</Card1>
		</div>
	);
};

export default Home;
