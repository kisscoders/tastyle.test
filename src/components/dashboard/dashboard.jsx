import React from "react";
// import { Route } from "react-router-dom";
import { Tab, Row, Col, ListGroup, Container } from "react-bootstrap";
// import Users from "../admin/users";
// import Posts from "../admin/posts";
// import SideBar from "./sidebar";
import authService from "../../services/authService";
import OrdersDash from "./ordersDash";
import ProductsDash from "./productsDash";
import ProfileDash from "./profileDash";
import PurchasesDash from "./purchasesDash";
import UserDash from "./usersDash";

const Dashboard = () => {
	const user = authService.getCurrentUser();
	return (
		<Container fluid>
			{user && <h1>Hi {user.name}!</h1>}
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
				<Row>
					<Col sm={3}>
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
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="#orders">
								<OrdersDash />
							</Tab.Pane>
							<Tab.Pane eventKey="#profile">
								<ProfileDash />
							</Tab.Pane>
							<Tab.Pane eventKey="#products">
								<ProductsDash />
							</Tab.Pane>
							<Tab.Pane eventKey="#purchases">
								<PurchasesDash />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	);
};

export default Dashboard;
