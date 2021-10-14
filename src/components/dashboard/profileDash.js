import React, { Component } from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Input from "../common/input";
import { Button } from "../common/buttons";
import { ClassCard, CardHeader } from "../layout/card";
import { Card } from "react-bootstrap";

class ProfileDash extends Component {
	state = {
		data: {
			name: "",
			email: "",
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

	// validateProperty = ({ name, value }) => {
	// 	const obj = { [name]: value };
	// 	const schema = { [name]: this.schema[name] };
	// 	const { error } = Joi.validate(obj, schema);
	// 	return error ? error.details[0].message : null;
	// };

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handlePassChange = (e) => {
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
		_id: Joi.string(),
		email: Joi.string().email().required().label("Email"),
		name: Joi.string().required().label("Name"),
	};

	renderButton(label) {
		return <Button disabled={this.validate()}>{label}</Button>;
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
			if (error.response && error.response.status === 404) {
				this.props.history.replace("/not-found");
			}
			console.log(error);
			toast.error("Something Happened");
		}
	}

	async componentDidMount() {
		await this.populateFields();
	}

	mapToViewModel(user) {
		return {
			_id: user._id,
			name: user.name,
			email: user.email,
		};
	}

	doSubmit = async () => {
		try {
			const response = await authService.register(this.state.data);
			authService.loginWithJwt(response.headers["x-auth-token"]);
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div>
				<ClassCard className="mb-4">
					<CardHeader as="h4" className="mx-3 px-0">
						Your Info
					</CardHeader>
					<Card.Body>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("name", "Name")}
							{this.renderInput("email", "Email")}
							{this.renderButton("Save")}
						</form>
					</Card.Body>
				</ClassCard>
				<ClassCard>
					<CardHeader as="h4" className="mx-3 px-0">
						Change Password
					</CardHeader>
					<Card.Body>
						<form onSubmit={this.handlePassChange}>
							{this.renderInput("currentPass", "Current Password")}
							{this.renderInput("newPass", "New Password")}
							{this.renderInput("confPass", "Confirm Password")}
							{this.renderButton("Update")}
						</form>
					</Card.Body>
				</ClassCard>
			</div>
		);
	}
}

export default ProfileDash;
