import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import { getMovie, saveMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.min(0)
			.max(100)
			.required()
			.label("Number in Stock"),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("Daily Rental Rate"),
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovies() {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === "new") return;

			const { data: movie } = await getMovie(movieId);
			this.setState({
				data: this.mapToViewModel(movie),
			});
		} catch (error) {
			if (error.response && error.response.status === 404)
				this.props.history.replace("/not-found");
			toast.error("What can I say get the backend ready");
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovies();
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);
		// Call the server
		this.props.history.push("/movies");
		let changedTitle = this.state.data.title;
		console.log("Submitted", changedTitle);
		toast("Updated");
	};

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default MovieForm;
