import React, { Component } from "react";
import {
  Image,
  Col,
  Row,
  ListGroup,
  Button,
  Carousel,
  Tabs,
  Tab,
} from "react-bootstrap";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { GrHomeIngredients, GrHomePack1, GrHomePack2 } from "../assets";
//import Form from 'react-bootstrap/Form';
//import FloatingLabel from 'react-bootstrap/FloatingLabel'

import "../Product.css";

export default class ProductDetails extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={7}>
            <h1>Huel Complete Protein</h1>
            <p style={{ align: "center" }}>
              Huel Complete Protein is a nutritionally complete, plant-based,
              high-protein snack that contains more essential amino acids (EAAs)
              per gram than whey protein. It's made from sustainably sourced,
              high-quality animal-free ingredients such as hemp, faba, and pea
              protein, and is naturally gluten-free.
            </p>
            <br />
            <p>
              First time ordering Huel? Claim your FREE Huel T-shirt at
              checkout.
            </p>
            <br />
            <p>
              FREE Shaker included for first-time Huel customers. Scoop included
              inside every tub of Complete Protein.
            </p>
            {/* <img src={image1} alt="" style={{width:"780px"}}/> */}
            <div className="bg">
              <Carousel>
                <Carousel.Item interval={1000}>
                  <Image className="d-block" src={GrHomePack1} />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <Image className="d-block " src={GrHomePack2} />
                </Carousel.Item>
                <Carousel.Item>
                  <Image className="d-block" src={GrHomeIngredients} />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
          <Col xs={5}>
            <div className="soice">
              <h5>Flavors</h5>
              <ListGroup>
                <ListGroup.Item>Vanilla Caramel</ListGroup.Item>
                <ListGroup.Item>Chocolate Fudge Brownie</ListGroup.Item>
                <ListGroup.Item>Banana Pudding</ListGroup.Item>
                <ListGroup.Item>Salted Caramel</ListGroup.Item>
                <ListGroup.Item>Strawberry Shortcake</ListGroup.Item>
                <ListGroup.Item>Unflavored & Unsweetened</ListGroup.Item>
              </ListGroup>
            </div>
            {/* <Form.Check type="radio" aria-label="radio 1"  label="Check me out" /> */}
            <div className="selection">
              <Tabs
                defaultActiveKey="Subscribe 10%off"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                {/* <Form.Check type="radio" aria-label="radio 1"  label="Check me out" /> */}
                <Tab
                  eventKey="home"
                  title="Subscribe 10%off"
                  type="radio"
                  aria-label="radio 1"
                >
                  <h5 className="p-2">Select delivery frequency</h5>

                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Every 4 Weeks (Most Common)</option>
                      <option value="1">Every 1 Week</option>
                      <option value="2">Every 2 Weeks</option>
                      <option value="3">Every 3 Weeks</option>
                      <option value="4">Every 4 Weeks (Most Common)</option>
                      <option value="5">Every 5 Weeks</option>
                      <option value="6">Every 6 Weeks</option>
                      <option value="7">Every 7 Weeks</option>
                      <option value="8">Every 8 Weeks</option>
                      <option value="9">Every 9 Weeks</option>
                    </select>
                    <label for="floatingSelect"></label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <AiFillCloseCircle size={20} />
                    <span>Cancel when you want to </span>
                  </div>
                  <p className="p-2">Easily cancel with no fees required</p>

                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <AiFillEdit size={20} />
                    <span> Edit your subscription anytime</span>
                  </div>
                  <p className="p-2">
                    Edit flavors, quantities and even delivery schedule
                  </p>
                </Tab>

                <Tab eventKey="profile" title="One-time">
                  <h5 className="p-2">You could save with a subscription</h5>
                  <p className="p-2">
                    You selected one-off purchase. Why not switch to our
                    flexible subscription and save 10% on your Huel?
                  </p>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 className="heading4">What goes in Huel Black Edition</h2>
          <Col xs={3}>
            <br />
            <h3>Nutritionally Complete</h3>
            <p>
              There’s more to our protein powder than protein – you also get
              essential fats, fiber, and all 27 essential vitamins & minerals.
            </p>

            <h3>Guilt-free Snacking</h3>
            <p>
              Sugar-free Huel Complete Protein contains only 110kcal – perfect
              for a snack whenever and wherever you need one.
            </p>

            <h3>Helps Normal Function of the Immune System</h3>
            <p>With vitamin C, D3, zinc and selenium.</p>
          </Col>
          <Col xs={4}>
            <Image src={GrHomePack1} alt="" className="huel" />
          </Col>
          <Col xs={4}>
            <div className="contant">
              <h3>More EAAs Per Gram of Protein Than Whey</h3>
              <p>
                Every 20g of protein contains 5g of Branched-chain Amino Acids
                (BCAAs) and 9g of essential amino acids (EAAs).
              </p>

              <h3>Plant-based Protein</h3>
              <p>
                Vegan protein powder, made with faba, hemp and pea protein, with
                a better amino acid profile than whey.
              </p>

              <h3>Good Stuff at a Great Price</h3>
              <p>
                You can have all this from only $1.25 per serving. Subscribe &
                save 10%.
              </p>
            </div>
          </Col>
        </Row>

        <br />
        <div className="mb-2">
          <Button variant="dark" size="lg">
            Nutritional Information
          </Button>{" "}
          <Button variant="dark" size="lg" className="btn">
            Ingredients Information
          </Button>
        </div>
      </div>
    );
  }
}
