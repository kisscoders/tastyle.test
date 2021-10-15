import React from "react";
// import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import {
	addOrder,
	getMyAddresses,
	getOrder,
} from "../../services/orderService";
import { getProducts } from "../../services/productService";
import authService from "../../services/authService";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
class OrderForm extends Form {
	state = {
		data: {
			productName: "",
			productId: "",
			user: "",
			quantityVar: "",
			price: "",
			orderType: "",
			orderStatus: "",
		},
		addresses: [],
		products: [],
		errors: {},
	};

	schema = {
		// _id: Joi.string(),
		// name: Joi.string().required().label("Name"),
		// isSubs: Joi.string().required().label("Subscription"),
		// numberInStock: Joi.number()
		// 	.min(0)
		// 	.max(100)
		// 	.required()
		// 	.label("Number in Stock"),
		// dailyRentalRate: Joi.number()
		// 	.min(0)
		// 	.max(10)
		// 	.required()
		// 	.label("Daily Rental Rate"),
	};

	async populateAddresses() {
		const { data: addresses } = await getMyAddresses();
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

	mapToViewModel(order) {
		const user = authService.getCurrentUser();
		return {
			_id: order._id,
			productId: order.productId,
			deliverTo: order.addressId,
			user: user.name,
			quantityVar: order.quantityVar,
			price: order.priceSum,
			orderType: order.orderType,
			orderStatus: order.orderStatus,
		};
	}

	doSubmit = async () => {
		await addOrder(this.state.data);
		// Call the server
		this.props.history.push("/orders");
		// let changedTitle = this.state.data.title;
		// console.log("Submitted", changedTitle);
		toast("Updated");
	};

	render() {
		return (
			<div>
				<Card1>
					<CardHeader1 as="h5">Order Form</CardHeader1>
					<CardBody1>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("productName", "Product")}
							{this.renderInput("user", "Customer")}
							{this.renderInput("price", "Price")}
							{this.renderInput("quantityVar", "Quantity")}
							{this.renderSelect(
								"productId",
								"Product",
								"What's your favorite?",
								this.state.products
							)}
							{/* {this.renderInput("deliverTo", "Delivery Address")} */}
							{this.renderInput("orderStatus", "We are currently")}
							{this.renderButton("Order")}
						</form>
					</CardBody1>
				</Card1>
			</div>
		);
	}
}

export default OrderForm;
