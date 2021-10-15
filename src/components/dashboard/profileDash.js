import React, { Component } from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { Input } from "../common/inputs";
import { Button } from "../common/buttons";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
import { Col, Row } from "react-bootstrap";
import FileInput from "../common/inputs/fileInput";

class ProfileDash extends Component {
	state = {
		avatarFile: null,
		data: {
			name: "",
			email: "",
			avatarurl: "",
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

		// const errors = this.validate();
		// this.setState({ errors: errors || {} });
		// if (errors) return;

		this.doSubmit();
	};

	handlePassChange = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleAvatar = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleUpload = async (e) => {
		e.preventDefault();
		await this.doUpload();
		const data = authService.getCurrentUser();
		this.setState({ avatarFile: null });
		console.log(data);
		this.setState({ data });
		await this.populateFields();
	};

	doUpload = async () => {
		try {
			const avatar = new FormData();
			avatar.append("avatar", this.state.avatarFile);
			await authService.updateProf(avatar);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	handleFileStats = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		console.log(file);
		this.setState({
			avatarFile: file,
			loaded: 0,
		});
		console.log(this.state);
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
			avatarurl: user.avatar.url,
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
		const { data, avatarFile } = this.state;
		const doc = {};
		if (avatarFile && avatarFile.name) {
			doc.text = avatarFile.name;
		} else doc.text = "Choose avatar";
		doc.style1 = avatarFile ? "" : "d-none";
		return (
			<Row>
				<Col sm={5}>
					<Card1 className="m-0 bg-primary bg-opacity-10">
						<div className="my-3 mx-auto">
							<img
								className="rounded-circle mt-3 border border-4 border-primary"
								src={data.avatarurl}
								alt="profile"
								width="140"
							/>
						</div>
						<CardBody1 className="mx-auto text-center">
							<h3>{data.name}</h3>
							{FileInput(doc.text, this.handleFileStats)}
							<Button onClick={this.handleUpload} className={doc.style1}>
								Upload
							</Button>
						</CardBody1>
					</Card1>
				</Col>
				<Col sm={7}>
					<Card1 className="m-0">
						<CardHeader1 as="h4" className="mx-3 px-0">
							Account Info
						</CardHeader1>
						<CardBody1>
							<form onSubmit={this.handleSubmit}>
								{this.renderInput("name", "Name")}
								{this.renderInput("email", "Email")}
								{this.renderButton("Save")}
							</form>
						</CardBody1>
					</Card1>
					<Card1 className="mx-0 mt-4">
						<CardHeader1 as="h4" className="mx-3 px-0">
							Change Password
						</CardHeader1>
						<CardBody1>
							<form onSubmit={this.handlePassChange}>
								{this.renderInput("currentPass", "Current Password")}
								{this.renderInput("newPass", "New Password")}
								{this.renderInput("confPass", "Confirm Password")}
								{this.renderButton("Update")}
							</form>
						</CardBody1>
					</Card1>
				</Col>
			</Row>
		);
	}
}

export default ProfileDash;
