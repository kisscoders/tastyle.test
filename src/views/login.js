import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";
import { Card1, CardBody1, CardHeader1 } from "../components/common/cards";

class LoginPage extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await authService.login(data.username, data.password);

			const { state } = this.props.location;
			window.location = state ? state.from.pathname : "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (authService.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div className="justify-content-md-center row">
				<Card1 className="col col-lg-6">
					<CardHeader1 as="h2">Login</CardHeader1>
					<CardBody1>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("username", "Username")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Login")}
						</form>
					</CardBody1>
				</Card1>
			</div>
		);
	}
}

export default LoginPage;
