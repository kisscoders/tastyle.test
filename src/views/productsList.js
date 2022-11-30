import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import { getProducts } from "../services/productService";
import { Card, Row, Col, Container, Image } from "react-bootstrap";
import { GrHomePack3, GrHomeLanding } from "../assets";
import { Link } from "react-router-dom";
import { ButtonL } from "../components/common/buttons";
import { GREEN, RED } from "../theme/colors";
import { TAG2 } from "../components/common/text/headings";

const H1 = styled.h1`
  font-weight: 600;
  font-size: 48px;
  margin: 40px 0 20px 0;
  padding: 0 0 0 30px;
`;

const H3 = styled.h3`
  font-weight: 600;
  /* margin: 30px 0px; */
  padding: 10px 0 0 10px;
  margin: 2px;
`;

const BOX1 = styled(Card)`
  border-radius: 25px;
  background-color: #fff4f3;
  /* height: 450px; */
  padding: 10px;
  box-shadow: 3px 5px #ef9a9a;
  transition: all 0.3s ease-in-out 0s;

  &:hover {
    transform: scale(1.01);
    background-color: #fff4f3;
    box-shadow: 7px 10px #ef9a9a;
  }
`;

const BOX2 = styled(Card)`
  padding: 20px;
  border-radius: 40px;
  transition: all 0.3s ease-in-out 0s;
  background-color: #fff;
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
  &:hover {
    transform: scale(1.01);
    background-color: #fff4f3;
  }
`;

const PROBOX1 = styled(Card)`
  width: 23rem;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  background-color: #fff;
  transition: all 0.3s ease-in-out 0s;
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  }
`;

const BOXIMAGE2 = styled(Image)`
  /* width: 250px; */
  padding: none;
  margin: 2px;
  border-radius: 40px;
`;

const BOXIMAGE1 = styled(Image)`
  position: absolute;
  width: 45%;
  top: 15%;
  right: 2%;
`;

const Para = styled.p`
  padding: 10px 0 0 13px;
  margin: 2px;
  font-weight: 600;
  font-size: 18px;
`;

class ProductsGrid extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  renderField = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { products } = this.state;

    return (
      <Container className="mt-5">
        <div style={{ width: "100%", height: "500px", align: "center" }}>
          <Row>
            <Col xs={7}>
              <BOX1 className="box1">
                <H1 className="anim-typewriter anim-line-1">
                  <GREEN>Fast Food </GREEN>Not <RED>Junk Food.</RED> 😊
                </H1>
                <Para className="p-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. <br />
                  <br /> Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book. <br />
                  <br /> It has survived not only five centuries, but also the
                  leap into electronic typesetting, remaining essentially
                  unchanged.
                </Para>
              </BOX1>
            </Col>
            <Col xs={5}>
              <BOXIMAGE1 fluid src={GrHomeLanding} />
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xs={6}>
              <BOX2>
                <Row className="m-0 p-0">
                  <Col xs={6} className="m-0 p-0">
                    <H3>Tastyle Shaker Bottle</H3>
                    <Para>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. <br />
                      <br />
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s.
                    </Para>
                  </Col>
                  <Col xs={6} className="m-0 p-0">
                    <BOXIMAGE2 fluid src={GrHomePack3}></BOXIMAGE2>
                  </Col>
                  <ButtonL className="m-auto mt-2 text-dark border-dark">
                    More Info
                  </ButtonL>
                </Row>
              </BOX2>
            </Col>
            <Col xs={6}>
              <BOX2>
                <Row className="m-0 p-0">
                  <Col xs={6} className="m-0 p-0">
                    <H3>Tastyle T-Shirt</H3>
                    <Para>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. <br />
                      <br />
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s.
                    </Para>
                  </Col>
                  <Col xs={6} className="m-0 p-0">
                    <BOXIMAGE2 fluid src={GrHomePack3}></BOXIMAGE2>
                  </Col>
                  <ButtonL className="m-auto mt-2 text-dark border-dark">
                    More Info
                  </ButtonL>
                </Row>
              </BOX2>
            </Col>
          </Row>
        </div>

        <div className="my-5 pt-2">
          <H1 className="anim-typewriter2 anim-line-1 ">
            <RED>Trending 🥂 </RED>
            <GREEN>Now... </GREEN>
          </H1>
        </div>
        <Row md={"auto"} className="g-4">
          {products.map((item) => (
            <Col>
              <PROBOX1 key={item._id}>
                <H3 className="text-center mb-4">{item.title}</H3>
                <Card.Img
                  variant="top"
                  alt={"product" + item.title}
                  src={item.img}
                  style={{
                    width: "19rem",
                    height: "15rem",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "12px",
                  }}
                />
                <Card.Body className="text-center">
                  <Card.Text className="my-4">
                    <TAG2 className="">{"Rs. " + item.price}</TAG2>
                  </Card.Text>
                  {/* <Card.Text>{item.description}</Card.Text> */}
                  {/* <Card.Text>Buy Now</Card.Text> */}
                  {/* <Link to={`/productdetails/${item._id}`}>Buy Now</Link> */}
                 
                  <ButtonL as={Link}   to={`/productdetails/${item._id}`}>
                    Buy Now
                  </ButtonL>
                </Card.Body>
              </PROBOX1>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ProductsGrid;

// </div>
//         </div>
// 			<tbody>
// 				{data.map((item) => (
// 					<tr key={item._id}>
// 						{columns.map((column) => (
// 							<td key={this.createKey(item, column)}>
// 								{this.renderCell(item, column)}
// 							</td>
// 						))}
// 					</tr>
// 				))}
// 			</tbody>
// <Row xs={1} md={2} className="g-4">

// 	{Array.from({ length: 4 }).map((_, idx) => (
// 		<Col>
// 			<Card>
// 				<Card.Img variant="top" src="holder.js/100px160" />
// 				<Card.Body>
// 					<Card.Title>Card title</Card.Title>
// 					<Card.Text>
// 						This is a longer card with supporting text below as a natural lead-in
// 						to additional content. This content is a little bit longer.
// 					</Card.Text>
// 				</Card.Body>
// 			</Card>
// 		</Col>
// 	))}
// </Row>
