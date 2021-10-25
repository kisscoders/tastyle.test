const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  product: {
    type: Schema.ObjectId,
    ref: "Product",
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
    enum: {
      values: ["onetime", "subscription"],
      message: "{VALUE} is not supported",
    },
    default: "onetime",
  },
  deliverTo: {
    type: Schema.ObjectId,
    ref: "Address",
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: {
      values: ["Processing...", "On the way", "Delivered"],
      message: "{VALUE} is not supported",
    },
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
