import React from "react";
import CabinIllustration from "../assets/illustrations/cabin.svg";
import { CardHeader, ClassCard } from "../components/layout/card";
import { Card } from "react-bootstrap";
import { Button } from "../components/common/buttons";

const Home = () => {
	return (
		<div className="justify-content-md-center row">
			<ClassCard className="col col-lg-6">
				<CardHeader as="h5">Home</CardHeader>
				<Card.Body>
					<Card.Title>Where we want to go? That's the question isn't it?</Card.Title>
					<Card.Text>We are Here for the Awsomeness</Card.Text>
					{/* <Card.Img variant="bottom" src={<CabinIllustration />} /> */}
					<Card.Img
						variant="bottom"
						src={CabinIllustration}
						className="p-3"
						alt="Card image"
					/>
					<br />
					<div className="d-grid mx-auto mt-4">
						<Button className="mx-auto">Explore</Button>
					</div>
				</Card.Body>
			</ClassCard>
		</div>
	);
};

export default Home;
