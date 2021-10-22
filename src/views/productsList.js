import React, { Component } from "react";
import _ from "lodash";
import { getProducts } from "../services/productService";
import { Card, Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import "./product.css";
import { GrHomeAllProd2, GrHomeIngredients, GrHomePack2 } from "../assets";
//import { Link } from "react-router-dom";

class ProductsGrid extends Component {
  // columns = [
  // 	{
  // 		path: "title",
  // 		content: (product) => (
  // 			<Link to={`/products/${product._id}`}>{product.title}</Link>
  // 		),
  // 	},
  // 	{ path: "price", label: "Price" },
  // 	{ path: "category", label: "Category" },
  // 	{ path: "description", label: "Description" },
  // 	{ path: "img", label: "Image" },
  // 	// { path: "cloudinary_id", label: "cloudinary" },
  // 	// {
  // 	// 	key: "like",
  // 	// 	content: (product) => (
  // 	// 		<Like liked={product.liked} onClick={() => this.props.onLike(product)} />
  // 	// 	),
  // 	// },
  // 	{
  // 		key: "image",
  // 		content: (product) => <image src={product.img} />,
  // 	},
  // 	{
  // 		key: "Des",
  // 		content: (product) => <Link to={`/products/d/${product._id}`}>Buy Now</Link>,
  // 	},
  // ];

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
        <div
          className="box1"
          style={{ width: "100%", height: "500px", align: "center" }}
        >
          <Card
            style={{
              borderRadius: "40px",
              backgroundColor: "#FFF4F3",
              height: "450px",
            }}
          >
            <Row>
              <Col xs={6}>
                <h1 style={{ padding: "60px", textAlign: "center" }}>
                  Fast Food Not A Junk Food
                </h1>
                <p
                  style={{
                    textAlign: "justify",
                    paddingLeft: "30px",
                    fontStyle: "italic",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in
                </p>
              </Col>
              <Col xs={6}>
                <Image src={GrHomeAllProd2} className="icon1"></Image>
              </Col>
            </Row>
          </Card>
        </div>
        <div>
          <Row>
            <Col xs={6}>
              <Card style={{ borderRadius: "40px" }} className="box2">
                <Row>
                  <Col xs={6}>
                    <h4 style={{ paddingTop: "40px", paddingLeft: "30px" }}>
                      {" "}
                      Tastyle Shaker Bottle{" "}
                    </h4>
                    <p
                      style={{
                        textAlign: "justify",
                        paddingLeft: "20px",
                        fontStyle: "italic",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,{" "}
                    </p>
                    <Button
                      variant="#F54749"
                      className="btn1"
                      style={{
                        backgroundColor: "#F54749",
                        color: "white",
                        marginLeft: "50px",
                      }}
                    >
                      More Info
                    </Button>
                  </Col>

                  <Col xs={6}>
                    <Image
                      src={GrHomeIngredients}
                      style={{
                        width: "250px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    ></Image>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={6}>
              <Card style={{ borderRadius: "40px" }} className="box2">
                <Row>
                  <Col xs={6}>
                    <h4 style={{ paddingTop: "40px", paddingLeft: "30px" }}>
                      {" "}
                      Tastyle Shaker Bottle{" "}
                    </h4>
                    <p
                      style={{
                        textAlign: "justify",
                        paddingLeft: "20px",
                        fontStyle: "italic",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,{" "}
                    </p>
                    <Button
                      variant="#F54749"
                      className="btn1"
                      style={{
                        backgroundColor: "#F54749",
                        color: "white",
                        marginLeft: "50px",
                      }}
                    >
                      More Info
                    </Button>
                  </Col>

                  <Col xs={6}>
                    <Image
                      src={GrHomePack2}
                      style={{
                        width: "250px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    ></Image>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <br />
        <br />
        <Row md={"auto"} className="g-4">
          {products.map((item) => (
            <Col>
              <Card
                key={item._id}
                style={{ width: "23rem", borderRadius: "15px" }}
                className="shadowbox"
              >
                {/* <Card.Header>{item.title}</Card.Header> */}
                <Card.Title className="title">{item.title}</Card.Title>
                <Card.Img
                  variant="top"
                  alt=""
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
                {/* <Card.Header>{item.title}</Card.Header> */}
                <Card.Body className="cardbody">
                  <Card.Title>{item.category}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                  {/* <Card.Text>Buy Now</Card.Text> */}
                  <Button
                    variant="#F54749"
                    className="btn1"
                    style={{ backgroundColor: "#F54749", color: "white" }}
                  >
                    Buy Now
                  </Button>
                  {""} {""} {""} {""}
                </Card.Body>
              </Card>
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
