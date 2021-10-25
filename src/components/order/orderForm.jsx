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
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
import { ButtonL } from "../common/buttons";
// import { Button } from "../common/buttons";

class OrderForm extends Form {
  state = {
    data: {
      // product: "",
      productId: "",
      // user: "",
      quantityVar: "",
      priceSum: "",
      orderType: "",
      // deliverTo: "",
      addressId: "",
      orderStatus: "",
    },
    displyData: [{ type: "onetime" }, { type: "subscription" }],
    addresses: [],
    products: [],
    errors: {},
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
      // _id: order._id,
      // productId: order.product._id,
      // product: order.product.title,
      // user: user.name,
      // quantityVar: order.quantityVar,
      // price: order.priceSum,
      // orderType: order.orderType,
      // deliverTo: order.deliverTo.contactNo,
      // addressId: order.deliverTo._id,
      // orderStatus: order.orderStatus,
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
    toast("Updated");
  };

  simpleLogging(e) {
    e.preventDefault();
    console.log("Hello execution");
  }

  render() {
    const { addresses, products, data } = this.state;

    return (
      <div className="container m-auto mt-4">
        <Card1 className="container">
          <CardHeader1 as="h5">Order Form</CardHeader1>
          <CardBody1>
            <form>
              {this.renderSelectMod(
                "productId",
                "Product",
                "What's your favorite?",
                this.state.products,
                "title"
              )}
              {this.renderInput("quantityVar", "Quantity")}
              {this.renderPriceSum()}
              {this.renderInput("priceSum", "Price")}
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
      </div>
    );
  }
}

export default OrderForm;
