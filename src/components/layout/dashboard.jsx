import React from "react";
// import { Route } from "react-router-dom";
import { Tab, Row, Col, ListGroup, Container } from "react-bootstrap";
// import Users from "../admin/users";
// import Posts from "../admin/posts";
// import SideBar from "./sidebar";
import authService from "../../services/authService";
import Orders from "../order/orders";
import Products from "../product/products";

const Dashboard = () => {
	const user = authService.getCurrentUser();
	return (
		<Container fluid>
			{user && <h1>Hi {user.name}!</h1>}
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
				<Row>
					<Col sm={3}>
						<ListGroup>
							<ListGroup.Item action href="#link1">
								Profile
							</ListGroup.Item>
							<ListGroup.Item action href="#link1">
								Purchases
							</ListGroup.Item>
							<ListGroup.Item action href="#link1">
								Addressbook
							</ListGroup.Item>
							<ListGroup.Item action href="#link1">
								Orders
							</ListGroup.Item>
							<ListGroup.Item action href="#link1">
								Products
							</ListGroup.Item>
							<ListGroup.Item action href="#link2">
								Users
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="#link1">
								<Orders />
							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								<Products />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	);
};

export default Dashboard;
