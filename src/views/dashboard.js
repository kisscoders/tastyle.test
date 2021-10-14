import React from "react";
import { Tab, Row, Col, ListGroup, Card } from "react-bootstrap";
import authService from "../services/authService";
import AddressBook from "../components/dashboard/addressBook";
import OrdersDash from "../components/dashboard/ordersDash";
import ProductsDash from "../components/dashboard/productsDash";
import ProfileDash from "../components/dashboard/profileDash";
import PurchasesDash from "../components/dashboard/purchasesDash";
import UsersDash from "../components/dashboard/usersDash";
import { CardHeader, ClassCard } from "../components/layout/card";

const Dashboard = () => {
	const user = authService.getCurrentUser();
	return (
		<ClassCard>
			<CardHeader as="h2">Hi {user.name}!</CardHeader>
			<Card.Body>
				<Tab.Container defaultActiveKey="#profile">
					<Row>
						<Col sm={3}>
							<ClassCard>
								<Card.Body>
									<ListGroup>
										<ListGroup.Item action href="#profile">
											Profile
										</ListGroup.Item>
										<ListGroup.Item action href="#purchases">
											Purchases
										</ListGroup.Item>
										<ListGroup.Item action href="#address">
											Addressbook
										</ListGroup.Item>
										{user.role === "admin" && (
											<React.Fragment>
												<ListGroup.Item action href="#orders">
													Orders
												</ListGroup.Item>
												<ListGroup.Item action href="#products">
													Products
												</ListGroup.Item>
												<ListGroup.Item action href="#users">
													Users
												</ListGroup.Item>
											</React.Fragment>
										)}
									</ListGroup>
								</Card.Body>
							</ClassCard>
						</Col>
						<Col sm={9}>
							<ClassCard>
								<Card.Body>
									<Tab.Content>
										<Tab.Pane eventKey="#profile">
											<ProfileDash />
										</Tab.Pane>
										<Tab.Pane eventKey="#orders">
											<OrdersDash />
										</Tab.Pane>
										<Tab.Pane eventKey="#products">
											<ProductsDash />
										</Tab.Pane>
										<Tab.Pane eventKey="#purchases">
											<PurchasesDash />
										</Tab.Pane>
										<Tab.Pane eventKey="#address">
											<AddressBook />
										</Tab.Pane>
										<Tab.Pane eventKey="#users">
											<UsersDash />
										</Tab.Pane>
									</Tab.Content>
								</Card.Body>
							</ClassCard>
						</Col>
					</Row>
				</Tab.Container>
			</Card.Body>
		</ClassCard>
	);
};

export default Dashboard;
