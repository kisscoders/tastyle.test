import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Card1, CardBody1, CardHeader1 } from "../components/common/cards";

class SignupForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

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
			<div className="justify-content-md-center row">
				<Card1 className="col col-lg-6">
					<CardHeader1 as="h2">Register</CardHeader1>
					<CardBody1>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("name", "Name")}
							{this.renderInput("username", "Username")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Register")}
						</form>
					</CardBody1>
				</Card1>
			</div>
		);
	}
}

export default SignupForm;
