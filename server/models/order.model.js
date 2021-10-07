const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";
import { addressSchema } from "./address.model";
import { productSchema } from "./product.model";
// import { userSchema } from "./user.model";

const orderSchema = new Schema({
	product: {
		type: productSchema,
		required: true,
	},
	quantityVar: {
		type: String,
		required: true,
	},
	priceSum: {
		type: Number,
		required: true,
	},
	orderType: {
		type: String,
		required: true,
		default: "onetime",
	},
	deliverTo: {
		type: addressSchema,
		required: true,
	},
	// customer: {
	// 	type: userSchema,
	// 	required: true,
	// },
	orderStatus: {
		type: String,
		required: true,
		default: "Processing...",
	},
	deliveredAt: Date,
	createdAt: {
		type: String,
		default: Date.now,
	},
	// paymentInfo: {
	// 	status: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	status: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	paidAt: {
	// 		type: Date,
	// 		required: true,
	// 	},
	// },
});

function validate(order) {
	const schema = Joi.object({});
	return schema.validate(order);
}
const Order = model("Order", orderSchema);
export { validate, orderSchema, Order };
export default model("Order", orderSchema);
