import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";
import { CardHeader, ClassCard } from "../components/layout/card";
import { Card } from "react-bootstrap";

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
				<ClassCard className="col col-lg-6">
					<CardHeader as="h2">Login</CardHeader>
					<Card.Body>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("username", "Username")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Login")}
						</form>
					</Card.Body>
				</ClassCard>
			</div>
		);
	}
}

export default LoginPage;
