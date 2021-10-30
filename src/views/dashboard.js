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
import { RED } from "../theme/colors";
import styled from "styled-components";
const user = getCurrentUser();

const FlagBox = styled(Card1)`
  &.red {
    border-left: solid 10px var(--red);
  }
  &.green {
    border-right: solid 10px var(--green);
  }
`;

const DashList = styled(ListGroup)`
  border: none;
  border-radius: 10px;
  &:active {
  }
`;

const DashListItem = styled(ListGroup.Item)`
  border: none;
  border-radius: 10px;
  font-weight: 500;
  &:active {
    /* background-color: var(--red); */
  }
  /* border-style: none; */
`;

const Dashboard = () => {
  if (!user) return <Redirect to="/" />;
  return (
    <Container fluid className="mb-5">
      <Tab.Container defaultActiveKey="#profile">
        <Row>
          <Col sm={3}>
            <FlagBox className="green">
              <CardBody1>
                <DashList>
                  <DashListItem action href="#profile">
                    Profile
                  </DashListItem>
                  <DashListItem action href="#purchases">
                    Purchases
                  </DashListItem>
                  <DashListItem action href="#address">
                    Address Book
                  </DashListItem>
                  {user.role === "admin" && (
                    <React.Fragment>
                      <DashListItem action href="#orders">
                        Orders
                      </DashListItem>
                      <DashListItem action href="#products">
                        Products
                      </DashListItem>
                      <DashListItem action href="#users">
                        Users
                      </DashListItem>
                    </React.Fragment>
                  )}
                </DashList>
              </CardBody1>
            </FlagBox>
          </Col>
          <Col sm={9}>
            <FlagBox className="red">
              <CardHeader1>
                Hi <RED>{user.name}</RED> !
              </CardHeader1>
              <CardBody1 className="dashboard">
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
            </FlagBox>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
