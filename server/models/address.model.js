const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  displayName: {
    type: String,
  },
  addressName: {
    type: String,
    required: true,
  },
  // Display Name
  contactNo: {
    type: String,
    required: true,
  },
  addLine1: {
    type: String,
    required: true,
  },
  addLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
    default: "Jaffna",
  },
  zipcode: {
    type: String,
    default: "40000",
  },
  landmarks: {
    type: String,
  },
});

function validate(address) {
  const schema = Joi.object({});
  return schema.validate(address);
}

const Address = model("Address", addressSchema);
export { validate, addressSchema, Address };
export default model("Address", addressSchema);
