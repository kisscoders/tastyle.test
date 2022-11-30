import React from "react";
import { Carousel } from "react-bootstrap";
import { Container, Row, Col, Image, Table, Card } from "react-bootstrap";
import {
  FaHandHoldingHeart,
  FaAppleAlt,
  FaLeaf,
  FaClock,
} from "react-icons/fa";
import styled from "styled-components";
//import { Card1 } from "../components/common/cards";
import {
  GrHomePack1,
  GrHomeProduct3,
  GrHomeProduct5,
  GrHomeProduct1,
  GrA,
  GrT,
  GrS,
  GrD,
} from "../assets";
import { TAG2 } from "../components/common/text/headings";
import { GREEN, RED } from "../theme/colors";

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

const UlList = styled.ul`
  text-align: justify;
  padding-left: 150px;
  padding-right: 150px;
`;

const CustomCorousel = styled(Carousel)`
  // margin-top: 100px;
  box-shadow: rgba(50, 50, 93, 0.4) 0px 2px 5px -1px,
    rgba(255, 0, 0, 0.6) 0px 10px 30px -10px;
  border-radius: 30px;
`;

const Crop = styled.div`
  border: 4px solid white;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0;
  border-radius: 30px;
`;

const Image1 = styled(Image)`
  width: 150px;
  height: 150px;
  margin-left: auto;
  border: 1px solid;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const H6 = styled.h6`
  text-align: justify;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 20px;
`;

const Td = styled.td`
  padding-top: 8px;
  margin-left: 15px;
  margin-right: 200px;
  padding-left: 10px;
  padding-right: 25px;
  text-indent: 50px;
  text-align: center;
  border-bottom: none;
  border-top: none;
  color: rgb(95, 93, 93);
`;

const Table1 = styled(Table)`
  border-bottom: none;
  border-top: none;
`;

const Row1 = styled(Row)`
  text-align: justify;
  padding-right: 100px;
  padding-left: 100px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const H1 = styled.h1`
  text-align: justify;
  padding-right: 100px;
  padding-left: 100px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const H3 = styled.h3`
  text-align: center;
  padding-right: 100px;
  padding-left: 100px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
`;

const H2 = styled.h2`
  padding-top: 50px;
  text-align: center;
`;

const Quote1 = styled.p`
  text-align: justify;
  padding-left: 100px;
  padding-right: 100px;
`;

const About = () => {
  return (
    <Container>
      <CustomCorousel>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomeProduct1} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>We are Health nerds</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomeProduct3} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>Community First</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
        <CustomCorousel.Item>
          <Crop>
            <Image fluid className="d-block w-100" src={GrHomeProduct5} />
          </Crop>
          <CustomCorousel.Caption>
            <TAG2>Be Amazed</TAG2>
          </CustomCorousel.Caption>
        </CustomCorousel.Item>
      </CustomCorousel>
      <div>
        <H1>
          <RED>About tastyle</RED>
        </H1>
        <Row1>
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
          </Col>
          <Col sm={8}>
            <Image className="mb-4" width="100%" src={GrHomePack1} />
            <Quote>
              To make nutritionally complete, convenient, affordable food, with
              minimal impact on animals and the environment.
            </Quote>
          </Col>
        </Row1>
      </div>
      <Card className="About_shadow">
        <H3>What makes us different</H3>
        <Table1>
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
        </Table1>
        <Table1>
          <tr>
            <Td>Wild & Eco Friendly</Td>
            <Td>Organic</Td>
            <Td>Healthy & Convenient</Td>
            <Td>24/7 Available</Td>
          </tr>
        </Table1>
        <H2>When, where, how to use Tastyle</H2>
        <br></br>
        <Quote1>
          It’s simple: Huel is ideal for when you’re pressured for time, when
          you’re on the go, in a rush, and away from the kitchen. Typically this
          means breakfast or lunch during the working week, leaving room to
          enjoy a more “traditional” meal with family and friends in the evening
          or on the weekend.
        </Quote1>
        <br></br>
        <br></br>
        <H6>Find out below what our Hueligans have to say...</H6>
        <UlList>
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
        </UlList>
      </Card>
      <div
        className="d-block text-center"
        style={{ backgroundColor: "#fff4f3", boxShadow: "3px 5px #ef9a9a" }}
      >
        <h2 className="mt-4 mb-2">
          <GREEN>Our Team us..</GREEN>
        </h2>
        <p className="text-center">
          <RED>Lorem Ipsum is not simply random text</RED>
        </p>
        <br></br>
        <br></br>
        <Row>
          <Col sm={2} md={2} className="mx-auto">
            <Image1 src={GrT} />
            <br></br>
            <br></br>
            <div>
              <h5>Mr.S.Thuvaragan</h5>
              <h6>Designer</h6>
            </div>
          </Col>

          <Col sm={2} md={2} className="About_Team_Image">
            <Image1 src={GrA} />
            <br></br>
            <br></br>
            <h5>Miss.M. Amshika</h5>
            <h6>Designer</h6>
          </Col>

          <Col sm={2} md={2} className="About_Team_Image">
            <Image1 src={GrD} />
            <br></br>
            <br></br>
            <div>
              <h5>Mr. S . Dilaxshan</h5>
              <h6>Designer</h6>
            </div>
          </Col>

          <Col sm={2} md={2} className="About_Team_Image">
            <Image1 src={GrS} />
            <br></br>
            <br></br>
            <div>
              <h5>Miss. V . Sinthusa</h5>
              <h6>Designer</h6>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default About;
