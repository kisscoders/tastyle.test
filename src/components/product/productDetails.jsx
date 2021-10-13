import React, { Component } from "react";
import { toast } from "react-toastify";
import { getProduct } from "../../services/productService";

class ProductDetails extends Component {
	state = {
		data: {
			title: "",
			price: "",
			category: "",
			description: "",
			img: "",
		},
	};

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
		await this.populateProducts();
	}

	mapToViewModel(product) {
		return {
			_id: product._id,
			title: product.title,
			category: product.category,
			price: product.price,
			description: product.description,
			img: product.img,
		};
	}

	handleShop = () => {
		// navigate to products
	};

	// componentDidMount() {
	// 	this.generateProductName(this.props.match.params.id);
	// }

	// generateProductName = (match) => {
	// 	const result = this.products.find((e) => JSON.stringify(e.id) === match);
	// 	if (result && result.name) {
	// 		const productName = result.name;
	// 		this.setState({ productName });
	// 	}
	// };

	renderField(name) {
		const { data } = this.state;
		// const name = name
		return data[name];
	}

	// addOne = (val) => {
	// 	if (val && val >= 0) val = val++;
	// 	console.log(val);
	// };

	// subOne = (val) => {
	// 	if (val && val >= 0) val = val--;
	// 	console.log(val);
	// };

	render() {
		return (
			<div>
				<h1>{this.renderField("title")}</h1>
				<h4>Category: {this.renderField("category")}</h4>
				<h4>Price: {this.renderField("price")}</h4>
				<h4>Description: {this.renderField("description")}</h4>
				<img alt="" src={this.renderField("img")} />
				<button onClick={this.handleShop} className="btn btn-primary mt-2">
					Shop Now
				</button>
			</div>
			// 		<i
			// 			onClick={() => this.addOne(val)}
			// 			style={{ cursor: "pointer" }}
			// 			className="ri-add-circle-fill ri-2x"
			// 		></i>
			// 		{val}
			// 		<i
			// 			onClick={() => this.subOne(val)}
			// 			style={{ cursor: "pointer" }}
			// 			className="ri-indeterminate-circle-fill ri-2x"
			// 		></i>
		);
	}
}

export default ProductDetails;
