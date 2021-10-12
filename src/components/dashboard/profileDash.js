import React from "react";
// import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import authService from "../../services/authService";

class ProfileDash extends Form {
	state = {
		data: {
			userName: "",
			email: "",
			role: "",
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
			const user = await authService.getCurrentUser();
			this.setState({
				data: this.mapToViewModel(user),
			});
		} catch (error) {
			if (error.response && error.response.status === 404)
				this.props.history.replace("/not-found");
			toast.error("What can I say get the backend ready");
		}
	}

	async componentDidMount() {
		await this.populateOrder();
	}

	mapToViewModel(user) {
		return {
			_id: user._id,
			userName: user.name,
			email: user.email,
			role: user.role,
		};
	}

	doSubmit = async () => {
		// await addOrder(this.state.data);
	};

	render() {
		return (
			<div>
				<h1>User Dash</h1>
				<form>
					{this.renderInput("userName", "Name")}
					{this.renderInput("email", "Email")}
					{/* {this.renderSelect("isSubs", "Subscription", "Do you want to subscribe?")} */}
					{/* {this.renderInput("deliverTo", "Delivery Address")} */}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default ProfileDash;
