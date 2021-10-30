import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import SelectInput from "../common/selectInput";
import {
  getMyAddresses,
  getOrder,
  addOrUpdateOrder,
} from "../../services/orderService";
import { getProducts } from "../../services/productService";
import authService from "../../services/authService";
import { Card1, CardBody1, CardHeader1, CardImg1 } from "../common/cards";
import { ButtonL } from "../common/buttons";
import { Col, Image, Row } from "react-bootstrap";
import { img_landing_order_1 } from "../../assets";
import styled from "styled-components";

export const H3 = styled.h3`
  font-weight: 700;
  font-size: 36px;
  margin: auto auto 30px auto;
`;

class OrderPage extends Form {
  state = {
    data: {
      productId: "",
      quantityVar: "2cl",
      priceSum: "4500",
      orderType: "",
      addressId: "",
      orderStatus: "",
    },
    displyData: [{ type: "onetime" }, { type: "subscription" }],
    addresses: [],
    products: [],
    errors: {},
    quantity: 2,
  };

  schema = {
    _id: Joi.string(),
    productId: Joi.string().required().label("Product"),
    quantityVar: Joi.string().required().label("Quantity"),
    orderType: Joi.string().required().label("Type"),
    priceSum: Joi.number().required().label("Price"),
    addressId: Joi.string().required().label("Address"),
    orderStatus: Joi.string(),
  };

  async populateAddresses() {
    const addresses = await getMyAddresses();
    this.setState({ addresses });
  }
  async populateProducts() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  async populateOrder() {
    try {
      const orderId = this.props.match.params.id;
      if (orderId === "new") return;

      const order = await getOrder(orderId);
      console.log(order);
      this.setState({
        data: this.mapToViewModel(order),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
      toast.error("What can I say get the backend ready");
    }
  }

  async componentDidMount() {
    await this.populateAddresses();
    await this.populateProducts();
    await this.populateOrder();
  }

  renderSelectMod(name, label, text, options, field) {
    const { data, errors } = this.state;
    return (
      <SelectInput
        name={name}
        value={data[name]}
        label={label}
        options={options}
        field={field}
        onChange={this.handleChange}
        error={errors[name]}
        text={text}
      />
    );
  }

  renderPriceSum() {
    console.log(this.state.addresses);
  }

  mapToViewModel(order) {
    const user = authService.getCurrentUser();
    return {
      _id: order._id,
      productId: order.product._id,
      product: order.product.title,
      user: user.name,
      quantityVar: order.quantityVar,
      price: order.priceSum,
      orderType: order.orderType,
      deliverTo: order.deliverTo.contactNo,
      addressId: order.deliverTo._id,
      orderStatus: order.orderStatus,
    };
  }

  handleSubmitMod = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    // if (errors) return

    console.log("handling Submit");
    this.doSubmit();
  };

  doSubmit = async () => {
    console.log(this.state.data);
    await addOrUpdateOrder(this.state.data);
    // Call the server
    this.props.history.push("/dash");
    // let changedTitle = this.state.data.title;
    // console.log("Submitted", changedTitle);
    toast("Your Order is under Process... 😊");
  };

  simpleLogging(e) {
    e.preventDefault();
    console.log("Hello execution");
  }

  render() {
    const { addresses, products, data } = this.state;

    return (
      <Row className="container mx-auto mb-5">
        <Col className="m-auto">
          {addresses.length !== 0 && (
            <div className="m-5 mx-auto">
              <CardHeader1 as="h5">
                We are Excited for you 🤩 <br />
                Let's get something interesting... 🛍
              </CardHeader1>
              <div className="p-5">
                <CardImg1
                  fluid
                  src={img_landing_order_1}
                  alt="Products image"
                  variant="bottom"
                  className=""
                />
              </div>
            </div>
          )}
          {addresses.length === 0 && (
            <div className="text-center">
              <H3>
                Ready for your First 📦 Delivery? <br /> Add an address 🏡 to
                begin 🎁
              </H3>
              <div className="p-5">
                <Image
                  fluid
                  src={img_landing_order_1}
                  alt="Products image"
                  variant="bottom"
                  className=""
                />
              </div>
              <p>
                {/* {AddressForm(data, handleSubmit, handleChange, errors)} */}
              </p>
            </div>
          )}
        </Col>
        <Col>
          <Card1 className="container mx-auto">
            <CardHeader1 as="h5" className="mt-4">
              Order Form
            </CardHeader1>
            <CardBody1 className="mx-5">
              <form>
                {this.renderSelectMod(
                  "productId",
                  "Product",
                  "What's your favorite?",
                  this.state.products,
                  "title"
                )}
                <h4>Total Amount : {this.state.data.priceSum}</h4>
                <h4>Quantity : {this.state.quantity}</h4>
                {this.renderSelectMod(
                  "addressId",
                  "Address",
                  "Where you want it?",
                  this.state.addresses,
                  "addressName"
                )}
                {this.renderSelectMod(
                  "orderType",
                  "Type",
                  "Do you want it repeatedly?",
                  this.state.displyData,
                  "type"
                )}
                <ButtonL onClick={this.handleSubmitMod}>Order</ButtonL>
              </form>
            </CardBody1>
          </Card1>
        </Col>
      </Row>
    );
  }
}

export default OrderPage;
