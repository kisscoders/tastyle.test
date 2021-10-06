import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import { getProduct, saveProduct } from "../../services/productService";
// import { getGenres } from "../../services/genreService";

class ProductForm extends Form {
	state = {
		data: {
			title: "",
			price: "",
			category: "",
			description: "",
		},
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		price: Joi.number().required().label("Price"),
		category: Joi.string().min(0).max(100).required().label("Category"),
		description: Joi.string().min(0).max(50).required().label("Description"),
	};

	// async populateGenres() {
	// 	const { data: genres } = await getGenres();
	// 	this.setState({ genres });
	// }

	async populateProducts() {
		try {
			const productId = this.props.match.params.id;
			if (productId === "new") return;

			const { data: product } = await getProduct(productId);
			this.setState({
				data: this.mapToViewModel(product),
			});
		} catch (error) {
			if (error.response && error.response.status === 404)
				this.props.history.replace("/not-found");
			toast.error("What can I say get the backend ready");
		}
	}

	async componentDidMount() {
		// await this.populateGenres();
		await this.populateProducts();
	}

	mapToViewModel(product) {
		return {
			_id: product._id,
			title: product.title,
			category: product.category,
			price: product.price,
			description: product.description,
		};
	}

	doSubmit = async () => {
		await saveProduct(this.state.data);
		// Call the server
		this.props.history.push("/products");
		let changedTitle = this.state.data.title;
		console.log("Submitted", changedTitle);
		toast("Updated");
	};

	render() {
		return (
			<div>
				<h1>Product Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderInput("category", "Category")}
					{this.renderInput("price", "Price")}
					{this.renderInput("description", "Description")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default ProductForm;
