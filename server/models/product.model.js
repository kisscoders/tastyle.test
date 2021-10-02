// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";

const productSchema = new Schema({
	title: {
		type: String,
		trim: true,
		require: true,
	},
	price: {
		type: Number,
		trim: true,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
});

const Product = model("Product", productSchema);
export { productSchema, Product };
export default model("Product", productSchema);
