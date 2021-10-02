import { Schema, model } from "mongoose";
const Joi = require("joi");

const genreSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

function validate(genre) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
	});

	return schema.validate(genre);
}
const Genre = model("Genre", genreSchema);
export { validate, genreSchema, Genre };
export default model("Genre", genreSchema);
