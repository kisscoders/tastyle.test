import React from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import { getCurrentUser } from "../services/authService";
import AddressBook from "../components/dashboard/addressBook";
import OrdersDash from "../components/dashboard/ordersDash";
import ProductsDash from "../components/dashboard/productsDash";
import ProfileDash from "../components/dashboard/profileDash";
import PurchasesDash from "../components/dashboard/purchasesDash";
import UsersDash from "../components/dashboard/usersDash";
import { Redirect } from "react-router-dom";
import { CardBody1, CardHeader1, Card1 } from "../components/common/cards";
import { Container } from "react-bootstrap";
import { H2 } from "../components/common/text/headings";
import { RED } from "../theme/colors";
const user = getCurrentUser();

const Dashboard = () => {
  if (!user) return <Redirect to="/" />;
  return (
    <Container fluid>
      <H2>
        Hi <RED>{user.name}</RED> !
      </H2>
      <CardBody1>
        <Tab.Container defaultActiveKey="#profile">
          <Row>
            <Col sm={3}>
              <Card1>
                <CardBody1>
                  <ListGroup>
                    <ListGroup.Item action href="#profile">
                      Profile
                    </ListGroup.Item>
                    <ListGroup.Item action href="#purchases">
                      Purchases
                    </ListGroup.Item>
                    <ListGroup.Item action href="#address">
                      Address Book
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
                </CardBody1>
              </Card1>
            </Col>
            <Col sm={9}>
              <Card1>
                <CardBody1>
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
                </CardBody1>
              </Card1>
            </Col>
          </Row>
        </Tab.Container>
      </CardBody1>
    </Container>
  );
};

export default Dashboard;
