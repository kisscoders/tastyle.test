import React from "react";
import "./About.css";
import { Carousel } from "react-bootstrap";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import {
  FaHandHoldingHeart,
  FaAppleAlt,
  FaLeaf,
  FaClock,
} from "react-icons/fa";
import styled from "styled-components";
import { Card1 } from "../components/common/cards";
import {
  GrHomeAllProd2,
  GrHomeIngredients,
  GrHomePack1,
  GrHomePerson2,
  GrHomePnB1,
  GrHomePnB2,
} from "../assets";
import { TAG2 } from "../components/common/text/headings";

const Quote = styled.p`
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
  font-style: italic;
  background-color: rgb(241, 244, 252);
  border-left: solid 5px var(--red);
`;

const CustomCorousel = styled(Carousel)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.5) 0px 10px 30px -10px;
  border-radius: 30px;
`;

const Crop = styled.div`
  border: 4px solid white;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0;
  border-radius: 30px;
  ${Image} {
  }
`;

const About = () => {
  return (
    <Container className="my-5">
      <CustomCorousel>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomePerson2} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>We are Health nerds</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomePnB1} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>Community First</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomeIngredients} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>Be Amazed</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
      </CustomCorousel>

      <div>
        <h1 className="align">About tastyle</h1>
        <Row className="align1">
          <Col sm={4}>
            <p>
              Tastyle (Taste + Style) is nutritionally complete food. This means
              every Tastyle meal contains a balance of all 27 essential vitamins
              and minerals, protein, essential fats, carbs, fiber and
              phytonutrients in a single product.
            </p>
            <p>
              Tastyle is made from plant-based sustainable ingredients like
              oats, peas, rice, flaxseed, coconut, and sunflower, and it is
              available in a range of six products: Powder, Black Edition,
              Complete Protein, Hot & Savory, Ready-to-drink, and Bars.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </Col>
          <Col sm={8}>
            <Image className="mb-4" width="100%" src={GrHomePack1} />
            <Quote>
              To make nutritionally complete, convenient, affordable food, with
              minimal impact on animals and the environment.
            </Quote>
          </Col>
        </Row>
      </div>

      <Card1 className="colorAdd">
        <h3 className="alignTextH3">What makes us different</h3>
        <Table className="aligntr">
          <tr>
            <th>
              <FaAppleAlt className="iconDesign" />
            </th>
            <th>
              <FaLeaf className="iconDesign" />
            </th>
            <th>
              <FaHandHoldingHeart className="iconDesign" />
            </th>
            <th>
              <FaClock className="iconDesign" />
            </th>
          </tr>
        </Table>
        <Table className="aligntr">
          <tr>
            <td className="alignText">Wild & Eco Friendly</td>
            <td className="alignText">Organic</td>
            <td className="alignText">Healthy & Convenient</td>
            <td className="alignText">24/7 Available</td>
          </tr>
        </Table>
        <h2 className="alignH2">When, where, how to use Huel</h2>
        <br></br>
        <p className="alignP">
          It’s simple: Huel is ideal for when you’re pressured for time, when
          you’re on the go, in a rush, and away from the kitchen. Typically this
          means breakfast or lunch during the working week, leaving room to
          enjoy a more “traditional” meal with family and friends in the evening
          or on the weekend.
        </p>
        <br></br>
        <h6 className="alignP">
          Find out below what our Hueligans have to say...
        </h6>
        <ul className="alignUl">
          <li>"Reduces my tendency to eat unhealthy food for lunch"</li>
          <li>"Cheap, nutritious food, no more drive-throughs for lunch"</li>
          <li>
            “Huel has genuinely changed my life. I get to eat healthy, eat
            ethically, and save money.”
          </li>
          <li>
            “It's easy, tasty, convenient and just fantastic. I get so much more
            done with Huel in my diet!”
          </li>
        </ul>
      </Card1>
      <div className="card_design">
        <Row>
          <h3 className="mb-4">Our Team us..</h3>

          <Col xs={6} md={4}>
            <Image className="image_design" src={GrHomePnB2} />
          </Col>

          <Col xs={6} md={4}>
            <div>
              <h5>Mr. S . Thuvaragan</h5>
              <h6>Designer</h6>
              <p>
                It's freeing to be able to catch up on customized news and not
                be distracted by a social media element on the same site
              </p>
            </div>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col xs={6} md={4}>
            <div>
              <h5>Miss . M . Amshika</h5>
              <h6>Designer</h6>
              <p>
                The simple and intuitive design makes it easy for me use. I
                highly recommend Fetch to my peers.
              </p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <Image className="image_design1" src={GrHomeAllProd2} />
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <Image className="image_design" src={GrHomePerson2} />
          </Col>
          <br></br>
          <Col>
            <div>
              <h5>Mr. S . Dilaxshan</h5>
              <h6>Designer</h6>
              <p>
                I enjoy catching up with Fetch on my laptop, or on my phone when
                I'm on the go!
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <h5>Miss. V . Sinthusa</h5>
              <h6>Designer</h6>
              <p>
                I enjoy catching up with Fetch on my laptop, or on my phone when
                I'm on the go!
              </p>
            </div>
          </Col>

          <Col>
            <Image className="image_design1" src={GrHomePerson2} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default About;
