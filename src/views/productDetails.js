import styled from "styled-components";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Image, Col, Row, Container } from "react-bootstrap";
import { GREEN, RED } from "../theme/colors";
import { ButtonL } from "../components/common/buttons";
import { DiDatabase } from "react-icons/di";
import { FaClipboardList, FaLeaf, FaBullseye } from "react-icons/fa";
import { getCurrentUser } from "../services/authService";
import { img_merch2_1, img_merch3_1, img_merch5_1 } from "../assets";
import { getProduct } from "../services/productService";
import IncrementCount from "../components/common/incrementCounter";

const H1 = styled.h1`
  font-weight: 700;
  font-size: 48px;
  margin: 20px 0px;
`;

const INFOBACKBOX1 = styled(Container)`
  background-color: #fff4f3;
  border-radius: 15px;
  box-shadow: 8px 8px #ef9a9a;
  transition: all 0.4s ease-in-out 0s;
  padding: 30px 20px;
  margin: 10px auto 40px auto;
  &:hover {
    box-shadow: 12px 12px #ef9a9a, 0 2px 0 rgba(90, 97, 105, 0.11),
      0 4px 8px rgba(90, 97, 105, 0.12), 0 10px 10px rgba(90, 97, 105, 0.06),
      0 7px 70px rgba(90, 97, 105, 0.1);
  }
`;

const Crop = styled.div`
  width: 200px;
  height: 150px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border-radius: 30px;
  object-fit: fill;
`;

export default class ProductDetails extends Component {
  state = {
    data: {
      title: "",
      price: "",
      category: "",
      description: "",
      img: "",
    },
    count: 1,
    errors: {},
  };

  componentDidMount() {
    this.populateProductDetails();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      img: product.img,
    };
  }

  async populateProductDetails() {
    try {
      const productId = this.props.match.params.id;
      // if (productId === "new") return;
      const { data: product } = await getProduct(productId);
      this.setState({
        data: this.mapToViewModel(product),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
      toast.error("Oops Something went wrong in ProductDetails");
    }
  }
  render() {
    const productId = this.props.match.params.id;
    const user = getCurrentUser();
    const { title, price, category, description, img } = this.state.data;
    return (
      <INFOBACKBOX1>
        <Row className="mx-5">
          <Col lg={5}>
            <H1>{title}</H1>
            <span>&#11088; &#11088; &#11088; &#11088; &#11088;</span>
            <h4>Rs. {price}</h4>
            <br />
            <p style={{ align: "justify" }}>
              {description}
              Tastyle Complete Protein is a nutritionally complete, plant-based,
              high-protein snack that contains more essential amino acids (EAAs)
              per gram than whey protein. It's made from sustainably sourced,
              high-quality animal-free ingredients such as hemp, fun, and pea
              protein, and is naturally gluten-free.
            </p>
            <Row>
              <Col>
                <br />
                <h5>
                  <RED>
                    <DiDatabase />
                  </RED>
                  <GREEN> Affordable </GREEN>
                </h5>
                <br />
                <h5>
                  <RED>
                    <FaClipboardList />
                  </RED>
                  <GREEN> Complete </GREEN>
                </h5>
              </Col>
              <Col>
                <br />
                <h5>
                  <RED>
                    <FaLeaf />
                  </RED>
                  <GREEN> Plant-based </GREEN>
                </h5>
                <br />
                <h5>
                  <RED>
                    <FaBullseye />
                  </RED>
                  <GREEN> Convenient </GREEN>
                </h5>
              </Col>
            </Row>
            {user && (
              <div>
                <IncrementCount />
                <ButtonL as={Link} to={`/orders/${productId}`} flex>
                  Order Now
                </ButtonL>
              </div>
            )}
            {!user && (
              <ButtonL as={Link} to="/login" flex>
                Join & Order Now
              </ButtonL>
            )}
          </Col>
          <Col lg={5} className="m-auto">
            <Image fluid width="500" height="auto" src={img} />
          </Col>
          <Col lg={2} className="my-auto me-0">
            <Row className="mx-auto">
              <Crop className="mx-auto">
                <Image fluid className="my-2 d-block" src={img_merch2_1} />
              </Crop>
            </Row>
            <Row className="mx-auto">
              <Crop className="mx-auto">
                <Image fluid className="my-2 d-block" src={img_merch3_1} />
              </Crop>
            </Row>
            <Row className="mx-auto">
              <Crop className="mx-auto">
                <Image fluid className="my-2 d-block" src={img_merch5_1} />
              </Crop>
            </Row>
          </Col>
        </Row>
      </INFOBACKBOX1>
    );
  }
}

// export default class ProductDetails extends Component {
//   render() {
//     const user = getCurrentUser();
//     return (
//       <div className="info-alignment">
//         <Row>
//           <Col xs={7}>
//             <H1>
//               <RED>Tastyle</RED>
//               <GREEN> Complete Protein</GREEN>
//             </H1>
//             <p style={{ align: "center" }}>
//               Tstyle Complete Protein is a nutritionally complete, plant-based,
//               high-protein snack that contains more essential amino acids (EAAs)
//               per gram than whey protein. It's made from sustainably sourced,
//               high-quality animal-free ingredients such as hemp, faba, and pea
//               protein, and is naturally gluten-free.
//             </p>
//             <br />
//             <p style={{ fontWeight: "bold", fontSize: "20px" }}>
//               First time ordering Tastyle? Claim your
//               <RED> FREE Tastyle T-shirt </RED>at checkout.
//             </p>

//             <p style={{ fontWeight: "bold", fontSize: "20px" }}>
//               <GREEN> FREE Shaker </GREEN>included for first-time Tastyle
//               customers. Scoop included inside every tub of Complete Protein.
//             </p>
//             {/* <img src={image1} alt="" style={{width:"780px"}}/> */}
//             <div>
//               <Carousel>
//                 <Carousel.Item interval={1000}>
//                   <Image className="d-block" src={GrInfo2} />
//                 </Carousel.Item>
//                 <Carousel.Item interval={500}>
//                   <Image className="d-block " src={GrInfo1} />
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <Image className="d-block" src={GrInfo4} />
//                 </Carousel.Item>
//               </Carousel>
//             </div>
//           </Col>
//           <Col xs={4}>
//             <div className="info-soice">
//               <h4>Flavors</h4>
//               <ListGroup>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Vanilla Caramel
//                 </ListGroup.Item>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Chocolate Fudge Brownie
//                 </ListGroup.Item>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Banana Pudding
//                 </ListGroup.Item>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Salted Caramel
//                 </ListGroup.Item>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Strawberry Shortcake
//                 </ListGroup.Item>
//                 <ListGroup.Item style={{ backgroundColor: "#FFF4F3" }}>
//                   Unflavored & Unsweetened
//                 </ListGroup.Item>
//               </ListGroup>
//             </div>
//             {/* <Form.Check type="radio" aria-label="radio 1"  label="Check me out" /> */}
//             <div className="selection">
//               <Tabs
//                 defaultActiveKey="Subscribe 10%off"
//                 transition={false}
//                 id="noanim-tab-example"
//                 className="mb-3"
//               >
//                 {/* <Form.Check type="radio" aria-label="radio 1"  label="Check me out" /> */}
//                 <Tab
//                   eventKey="home"
//                   title="Subscribe 10%off"
//                   type="radio"
//                   aria-label="radio 1"
//                 >
//                   <h5 className="p-2" style={{ textAlign: "center" }}>
//                     Select delivery frequency
//                   </h5>

//                   <div class="form-floating">
//                     <select
//                       class="form-select"
//                       id="floatingSelect"
//                       aria-label="Floating label select example"
//                     >
//                       <option selected>Every 4 Weeks (Most Common)</option>
//                       <option value="1">Every 1 Week</option>
//                       <option value="2">Every 2 Weeks</option>
//                       <option value="3">Every 3 Weeks</option>
//                       <option value="4">Every 4 Weeks (Most Common)</option>
//                       <option value="5">Every 5 Weeks</option>
//                       <option value="6">Every 6 Weeks</option>
//                       <option value="7">Every 7 Weeks</option>
//                       <option value="8">Every 8 Weeks</option>
//                       <option value="9">Every 9 Weeks</option>
//                     </select>
//                     <label for="floatingSelect"></label>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "left",
//                       paddingTop: "20px",
//                       paddingLeft: "20px",
//                     }}
//                   >
//                     <AiFillCloseCircle size={20} />
//                     <span>Cancel when you want to </span>
//                   </div>
//                   <p className="p-2" style={{ textIndent: "30px" }}>
//                     Easily cancel with no fees required
//                   </p>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "left",
//                       paddingLeft: "20px",
//                     }}
//                   >
//                     <AiFillEdit size={20} />
//                     <span> Edit your subscription anytime</span>
//                   </div>
//                   <p className="p-2" style={{ textIndent: "30px" }}>
//                     Edit flavors, quantities and even delivery schedule
//                   </p>
//                 </Tab>

//                 <Tab eventKey="profile" title="One-time">
//                   <h5 className="p-2" style={{ textAlign: "center" }}>
//                     You could save with a subscription
//                   </h5>
//                   <p className="p-2">
//                     You selected one-off purchase. Why not switch to our
//                     flexible subscription and save 10% on your Huel?
//                   </p>
//                   <p className="p-2">
//                     You selected one-off purchase. Why not switch to our
//                     flexible subscription and save 10% on your Huel?
//                   </p>
//                 </Tab>
//               </Tabs>
//             </div>

//             {user && (
//               <ButtonL
//                 as={Link}
//                 to="/orders/new"
//                 style={{ marginLeft: "150px", marginTop: "30px" }}
//                 flex
//               >
//                 Order Now
//               </ButtonL>
//             )}
//             {!user && (
//               <ButtonL
//                 as={Link}
//                 to="/login"
//                 style={{ marginLeft: "150px", marginTop: "30px" }}
//                 flex
//               >
//                 Join & Order Now
//               </ButtonL>
//             )}
//           </Col>
//         </Row>
//         <br />
//         <br />
//         <br />

//         <Row>
//           <h2 className="info-heading4">What goes in Tastyle Black Edition</h2>
//           <Col xs={3}>
//             <br />
//             <h3>Nutritionally Complete</h3>
//             <p>
//               There’s more to our protein powder than protein – you also get
//               essential fats, fiber, and all 27 essential vitamins & minerals.
//             </p>

//             <h3>Guilt-free Snacking</h3>
//             <p>
//               Sugar-free Huel Complete Protein contains only 110kcal – perfect
//               for a snack whenever and wherever you need one.
//             </p>

//             <h3>Helps Normal Function of the Immune System</h3>
//             <p>With vitamin C, D3, zinc and selenium.</p>
//           </Col>
//           <Col xs={4}>
//             <Image src={GrHomePack1} alt="" className="info-huel" />
//           </Col>
//           <Col xs={4}>
//             <div className="contant">
//               <h3>More EAAs Per Gram of Protein Than Whey</h3>
//               <p>
//                 Every 20g of protein contains 5g of Branched-chain Amino Acids
//                 (BCAAs) and 9g of essential amino acids (EAAs).
//               </p>

//               <h3>Plant-based Protein</h3>
//               <p>
//                 Vegan protein powder, made with faba, hemp and pea protein, with
//                 a better amino acid profile than whey.
//               </p>

//               <h3>Good Stuff at a Great Price</h3>
//               <p>
//                 You can have all this from only $1.25 per serving. Subscribe &
//                 save 10%.
//               </p>
//             </div>
//           </Col>
//         </Row>

//         <br />
//         {/* <div className="mb-2">
//           <ButtonL  size="lg">
//             Nutritional Information
//           </ButtonL>{" "}
//           <ButtonL  size="lg" className="info-btn">
//             Ingredients Information
//           </ButtonL>
//         </div> */}
//       </div>
//     );
//   }
// }
