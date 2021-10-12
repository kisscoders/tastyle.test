import React from "react";
// import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import { addOrder, getOrder } from "../../services/orderService";
class OrderForm extends Form {
	state = {
		data: {
			productName: "",
			user: "",
			quantityVar: "",
			price: "",
			orderType: "",
			orderStatus: "",
		},
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

	// async populateGenres() {
	// 	const { data: genres } = await getGenres();
	// 	this.setState({ genres });
	// }

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
		// await this.populateGenres();
		await this.populateOrder();
	}

	mapToViewModel(order) {
		return {
			_id: order._id,
			productName: order.product.title,
			user: order.user.name,
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
				<h1>Order Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("productName", "Product")}
					{this.renderInput("user", "Customer")}
					{this.renderInput("price", "Price")}
					{this.renderInput("quantityVar", "Quantity")}
					{/* {this.renderSelect("isSubs", "Subscription", "Do you want to subscribe?")} */}
					{/* {this.renderInput("deliverTo", "Delivery Address")} */}
					{this.renderInput("orderStatus", "We are currently")}
					{this.renderButton("Order")}
				</form>
			</div>
		);
	}
}

export default OrderForm;
