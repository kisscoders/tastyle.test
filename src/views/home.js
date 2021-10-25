import React from "react";
import { Link } from "react-router-dom";
import {
  GrHomeLanding,
  GrHomePerson1,
  GrHomePnB2,
  GrHomePack1,
  GrHomeProduct1,
} from "../assets";
import {
  Card1,
  CardBody1,
  CardText1,
  CardTitle1,
  CardImg1,
  CardHeader1,
} from "../components/common/cards";
import { ButtonL } from "../components/common/buttons";

import Carousel from "react-bootstrap/Carousel";
import { H1, Quote, TAG, TAG2 } from "../components/common/text/headings";
import { GREEN, RED } from "../theme/colors";
import { Image, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Footer from "../components/layout/footer";
import styled from "styled-components";

const LandingImage = styled(Image)`
  position: absolute;
  top: 12%;
  right: 3%;
  width: 60%;
  margin: auto;
`;

const CustomCorousel = styled(Carousel)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.5) 0px 10px 30px -10px;
  border-radius: 30px;
`;

const Crop = styled.div`
  border: 4px solid white;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin: 0;
  border-radius: 30px;
  ${Image} {
  }
`;

const Home = () => {
  return (
    <React.Fragment>
      <Container>
        <div>
          <Row className="my-5">
            <div className="pt-5 col-6">
              <TAG>More than just food 🖤</TAG>
              <H1>
                The <RED>Food</RED> <br /> You <GREEN>Trust</GREEN>, At
                <br />
                Your Door
              </H1>
              <Quote>
                Fundamentally Healthy, 💪🏽 <br /> Taste and Style comes with the
                Brand as a 🎁 Gift 😉
              </Quote>
              <ButtonL as={Link} to="/list">
                Get Shopping 🛍
              </ButtonL>
            </div>
            <LandingImage fluid src={GrHomeLanding} alt="land image" />
          </Row>

          <div className="row my-4">
            <Card1 className="col col-lg-50">
              <CardHeader1 as="h5">
                The Complete Food <br /> You have been waiting For...
              </CardHeader1>
              <CardBody1>
                <CardTitle1>Over 150 million meals sold</CardTitle1>
                <CardText1>
                  Swap out lunch, swap in tastyle. Get all the carbs, protein,
                  fiber, fats and 27 vitamins and minerals you need from a meal.
                  Plus, save time on meal prep. From just $1.91 per serving.
                </CardText1>
                <br />
                <div class="d-grid mx-auto mt-4">
                  <ButtonL className="mx-auto">Shop Now</ButtonL>
                </div>
              </CardBody1>
            </Card1>
            <Card1 className="col col-lg-50">
              <CardBody1>
                <CardImg1
                  variant="bottom"
                  src={GrHomeProduct1}
                  className=""
                  alt="Card image"
                />
                <br />
              </CardBody1>
            </Card1>
          </div>

          <CustomCorousel>
            <CustomCorousel.Item>
              <Crop>
                <Image fluid className="d-block w-100" src={GrHomePerson1} />
              </Crop>
              <CustomCorousel.Caption className="my-3">
                <TAG2>Community First</TAG2>
              </CustomCorousel.Caption>
            </CustomCorousel.Item>
            <CustomCorousel.Item>
              <Crop>
                <Image fluid className="d-block w-100" src={GrHomePnB2} />
              </Crop>
              <CustomCorousel.Caption className="my-3">
                <TAG2>We are Health nerds</TAG2>
              </CustomCorousel.Caption>
            </CustomCorousel.Item>
            <CustomCorousel.Item>
              <Crop>
                <Image fluid className="d-block w-100" src={GrHomePack1} />
              </Crop>
              <CustomCorousel.Caption className="my-3">
                <TAG2>Robust Team</TAG2>
              </CustomCorousel.Caption>
            </CustomCorousel.Item>
          </CustomCorousel>
        </div>
      </Container>
      <div className="m-0 p-0 mt-4">
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
