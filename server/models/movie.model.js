import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";
import { genreSchema } from "./genre.model";

const movieSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	genre: {
		type: genreSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
});

function validate(movie) {
	const schema = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required(),
	});
	return schema.validate(movie);
}
const Movie = model("Movie", movieSchema);
export { validate, movieSchema, Movie };
export default model("Movie", movieSchema);
