import React from "react";
// import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
// import { getMovie, saveMovie } from "../../services/movieService";
// import { getGenres } from "../../services/genreService";

class OrderForm extends Form {
	state = {
		data: {
			productId: "",
			quantityVar: "",
			price: "",
			orderType: "",
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

	// async populateMovies() {
	// 	try {
	// 		const movieId = this.props.match.params.id;
	// 		if (movieId === "new") return;

	// 		const { data: movie } = await getMovie(movieId);
	// 		this.setState({
	// 			data: this.mapToViewModel(movie),
	// 		});
	// 	} catch (error) {
	// 		if (error.response && error.response.status === 404)
	// 			this.props.history.replace("/not-found");
	// 		toast.error("What can I say get the backend ready");
	// 	}
	// }

	// async componentDidMount() {
	// 	await this.populateGenres();
	// 	await this.populateMovies();
	// }

	// mapToViewModel(movie) {
	// 	return {
	// 		_id: movie._id,
	// 		title: movie.title,
	// 		genreId: movie.genre._id,
	// 		numberInStock: movie.numberInStock,
	// 		dailyRentalRate: movie.dailyRentalRate,
	// 	};
	// }

	doSubmit = async () => {
		// await saveMovie(this.state.data);
		// Call the server
		this.props.history.push("/orders");
		// let changedTitle = this.state.data.title;
		// console.log("Submitted", changedTitle);
		toast("Updated");
	};

	render() {
		return (
			<div>
				<h1>Order Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("productId", "Product")}
					{this.renderInput("price", "Price")}
					{this.renderInput("quantityVar", "Quantity")}
					{this.renderInput("product", "Product")}
					{/* {this.renderSelect("isSubs", "Subscription", "Do you want to subscribe?")} */}
					{this.renderInput("deliverTo", "Delivery Address")}
					{this.renderInput("orderStatus", "We are currently")}
					{this.renderButton("Order")}
				</form>
			</div>
		);
	}
}

export default OrderForm;
