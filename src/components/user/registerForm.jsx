import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import authService from "../../services/authService";

class RegisterForm extends Form {
	state = {
		data: {
			email: "",
			password: "",
			name: "",
			role: "",
		},
		errors: {},
	};

	schema = {
		email: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
		role: Joi.string().required().label("Role"),
	};

	async populateUser() {
		try {
			const userId = this.props.match.params.id;
			if (userId === "new") return;

			const user = await authService.getUserById(userId);
			this.setState({
				data: this.mapToViewModel(user),
			});
		} catch (error) {
			if (error.response && error.response.status === 404)
				this.props.history.replace("/not-found");
		}
	}

	async componentDidMount() {
		await this.populateUser();
	}

	mapToViewModel(user) {
		return {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	}

	doSubmit = async () => {
		try {
			const response = await authService.register(this.state.data);
			authService.loginWithJwt(response.headers["x-auth-token"]);
			window.location = "/";
		} catch (ex) {
			// if (ex.response && ex.response.status === 400) {
			// 	const errors = { ...this.state.errors };
			// 	errors.username = ex.response.data;
			// 	this.setState({ errors });
			// }
		}
	};

	render() {
		const userId = this.props.match.params.id;

		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("name", "Name")}
					{userId === "new" && (
						<React.Fragment>
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Register")}
						</React.Fragment>
					)}
					{!(userId === "new") && (
						<React.Fragment>
							{this.renderInput("role", "Role")}
							{this.renderButton("Update")}
						</React.Fragment>
					)}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
