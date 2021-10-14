import React, { Component } from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Input from "../common/input";
import { Button } from "../common/buttons";

class ProfileDash extends Component {
	state = {
		data: {
			userName: "",
			email: "",
			role: "",
		},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
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
	renderButton(label) {
		return (
			<Button disabled={this.validate()} className="mt-2">
				{label}
			</Button>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}
	async populateFields() {
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
		await this.populateFields();
	}

	mapToViewModel(user) {
		return {
			_id: user._id,
			userName: user.name,
			email: user.email,
			role: user.role,
		};
	}

	render() {
		return (
			<div>
				<form>
					<h1>Update user info</h1>
					{this.renderInput("userName", "Name")}
					{this.renderInput("email", "Email")}
					{/* {this.renderSelect("isSubs", "Subscription", "Do you want to subscribe?")} */}
					{/* {this.renderInput("deliverTo", "Delivery Address")} */}
					{this.renderButton("Save")}
				</form>
				<form>
					<h1>Reset Password</h1>

					{this.renderInput("userName", "Name")}
					{this.renderInput("email", "Email")}
					{/* {this.renderSelect("isSubs", "Subscription", "Do you want to subscribe?")} */}
					{/* {this.renderInput("deliverTo", "Delivery Address")} */}
					{this.renderButton("Save")}
				</form>
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
