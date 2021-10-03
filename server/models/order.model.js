const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";

const orderSchema = new Schema({
	orderedProducts: [
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			image: {
				type: String,
				required: true,
			},
			product: {
				type: Schema.ObjectId,
				ref: "Product",
				required: true,
			},
		},
	],
	deliverTo: {
		type: addressSchema,
		required: true,
	},
	customer: {
		type: userSchema,
		// type: mongoose.Schema.ObjectId,
		// ref: "User",
		required: true,
	},
	paymentInfo: {
		id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	paidAt: {
		type: Date,
		required: true,
	},
	itemsPrice: {
		type: Number,
		required: true,
		default: 0,
	},
	// taxPrice: {
	// 	type: Number,
	// 	required: true,
	// 	default: 0,
	// },
	// shippingPrice: {
	// 	type: Number,
	// 	required: true,
	// 	default: 0,
	// },
	totalPrice: {
		type: Number,
		required: true,
		default: 0,
	},
	orderStatus: {
		type: String,
		required: true,
		default: "Processing",
	},
	deliveredAt: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

function validate(order) {
	const schema = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required(),
	});
	return schema.validate(order);
}
const Order = model("Order", orderSchema);
export { validate, orderSchema, Order };
export default model("Order", orderSchema);
